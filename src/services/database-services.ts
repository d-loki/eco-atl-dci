import Database from 'tauri-plugin-sql-api';
import { z } from 'zod';

async function loadDatabase(): Promise<Database> {
    return await Database.load('sqlite:database.db');
}

const countQuotationSchema = z.array(
    z.object({
        count: z.number(),
    })
);

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
