import { Store } from 'tauri-plugin-store-api';
import { z } from 'zod';
import { toast } from 'sonner';

const store = new Store('.settings.dat');

export async function getValueFromTauriStore<T>(
    key: string
): Promise<T | null> {
    // await store.reset();
    return await store.get(key);
}

export async function setValueOnTauriStore<T>(key: string, value: T) {
    await store.set(key, value);
    await store.save();
}

export async function forceTauriStoreSave() {
    await store.save();
}

const commercialSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    mobile_phone: z.string().nullable(),
});

type Commercial = z.infer<typeof commercialSchema>;

export async function getCommercial(): Promise<Commercial> {
    const response = await getValueFromTauriStore<Commercial>('commercial');

    if (response === null) {
        toast.error("Aucune information commerciale n'a été enregistrée");
        throw new Error("Aucune information commerciale n'a été enregistrée");
    }

    return response;
}
