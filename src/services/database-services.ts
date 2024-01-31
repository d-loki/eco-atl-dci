import Database from 'tauri-plugin-sql-api';
import { z } from 'zod';
import { toast } from 'sonner';

async function loadDatabase(): Promise<Database> {
    return await Database.load('sqlite:database.db');
}

const countQuotationSchema = z.array(
    z.object({
        count: z.number(),
    })
);

const quotationSchema = z.array(
    z.object({
        reference: z.string(),
        type: z.string(),
        total: z.number(),
        created_at: z.string(),
        send_at: z.string().nullable(),
        customer_first_name: z.string().nullable(),
        customer_last_name: z.string().nullable(),
    })
);
type Quotations = z.infer<typeof quotationSchema>;
export async function getQuotations(): Promise<Quotations> {
    const db = await loadDatabase();
    const response = await db.select(
        'SELECT q.reference, q.type, q.total, q.created_at, q.send_at, c.first_name as customer_first_name, c.last_name as customer_last_name FROM quotations as q LEFT JOIN customers as c ON q.customer_id = c.id'
    );
    const result = quotationSchema.safeParse(response);

    if (!result.success) {
        toast.error('Impossible de récupérer les devis');
        return [];
    } else {
        return result.data;
    }
}

export async function countQuotationsLast30Days(): Promise<number> {
    const db = await loadDatabase();
    const response = await db.select(
        'SELECT COUNT(*) AS count FROM quotations WHERE created_at >= date("now", "-30 days")'
    );
    const result = countQuotationSchema.safeParse(response);

    if (!result.success) {
        return 0;
    } else {
        return result.data[0].count;
    }
}

export async function countValidatedQuotationsLast30Days(): Promise<number> {
    const db = await loadDatabase();
    const response = await db.select(
        'SELECT COUNT(*) AS count FROM quotations WHERE created_at >= date("now", "-30 days") and send_at IS NOT NULL'
    );
    const result = countQuotationSchema.safeParse(response);

    if (!result.success) {
        return 0;
    } else {
        return result.data[0].count;
    }
}

export async function sumQuotationsLast30Days(): Promise<number> {
    const db = await loadDatabase();
    const response = await db.select(
        'SELECT SUM(total) AS count FROM quotations WHERE created_at >= date("now", "-30 days")'
    );
    const result = countQuotationSchema.safeParse(response);

    if (!result.success) {
        return 0;
    } else {
        return result.data[0].count;
    }
}
