// Créer un fichier src/data/fake_quotations.sql
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

function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomPastDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 30));
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function generateFile() {
    const nbQuotations = 1000;
    const quotations = [];
    for (let i = 0; i < nbQuotations; i++) {
        const quotation = {
            id: i,
            reference: getRandomAlphaNumeric(10),
            type: getRandomArrayElement([
                'sol',
                'comble',
                'pac_rr',
                'pac_ro',
                'cet',
                'pg',
                'pv',
            ]),
            total: Math.floor(Math.random() * 10000),
            created_at: getRandomPastDate(),
            send_at: Math.random() >= 0.5 ? getRandomPastDate() : null,
        };
        quotations.push(quotation);
    }
    const sql = `INSERT INTO quotations (id, reference, type, total, created_at, send_at) VALUES
    ${quotations
        .map(
            (quotation) =>
                `(${quotation.id}, '${quotation.reference}', '${quotation.type}', ${quotation.total}, '${quotation.created_at}', ${
                    quotation.send_at === null
                        ? 'NULL'
                        : `'${quotation.send_at}'`
                })`
        )
        .join(',\n')};`;
    fs.writeFile('src/data/fake_quotations.sql', sql, function (err) {
        if (err) return console.log(err);
        console.log('fake_quotations.sql generated');
    });
}

generateFile();
