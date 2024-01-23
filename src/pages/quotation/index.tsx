import {DataTable} from '@/pages/quotation/data-table.tsx';
import {columns, QuotationItem} from '@/pages/quotation/columns.tsx';

const QuotationPage = () => {
    const data: QuotationItem[] = [];

    for (let i = 0; i < 100; i++) {
        const key = Math.random().toString(36).substring(7);
        data.push({
            reference: `GB4-${key}-CET`,
            type: 'cet',
            customer: 'John Doe',
            total: Math.floor(Math.random() * 100),
            created_at: '2021-01-01',
            status: 'pending',
            is_send: false,
        });
    }


    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default QuotationPage;
