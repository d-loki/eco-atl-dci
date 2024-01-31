// Créer un fichier src/data/fake_customers.sql
import fs from 'fs';

function getRandomAlphaNumeric(length) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateFile() {
    const nbCustomer = 1000;
    const customers = [];
    for (let i = 1; i <= nbCustomer; i++) {
        const quotation = {
            id: i,
            first_name: getRandomAlphaNumeric(10),
            last_name: getRandomAlphaNumeric(10),
            email: null,
            phone: null,
            mobile_phone: null,
        };
        customers.push(quotation);
    }
    const sql = `INSERT INTO customers (id, first_name, last_name, email, phone, mobile_phone) VALUES
    ${customers
        .map(
            (customer) =>
                `(${customer.id}, '${customer.first_name}', '${customer.last_name}', ${customer.email}, ${customer.phone}, ${customer.mobile_phone})`
        )
        .join(',\n')};`;
    fs.writeFile('src/data/fake_customers.sql', sql, function (err) {
        if (err) return console.log(err);
        console.log('fake_customers.sql generated');
    });
}

generateFile();
