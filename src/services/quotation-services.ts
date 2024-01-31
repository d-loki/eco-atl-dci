import { getCommercial } from '@/services/tauri-settings-store.ts';
import { format } from 'date-fns';

export async function generateReference(
    quotationType: string,
    customerName: string
) {
    const commercial = await getCommercial();
    const initials = commercial.first_name[0] + commercial.last_name[0];
    const date = format(new Date(), 'yyyy-MM-dd-HH-mm');

    const formattedCustomerName = customerName.replace(/ /g, '-');

    const ref = `${initials}-${date}-${formattedCustomerName}-${quotationType}`;

    return ref.toUpperCase();
}
