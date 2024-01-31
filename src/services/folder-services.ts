import { getValueFromTauriStore } from '@/services/tauri-settings-store.ts';
import { BaseDirectory, createDir } from '@tauri-apps/api/fs';
import { toast } from 'sonner';
import { normalize } from '@tauri-apps/api/path';
import { generateReference } from '@/services/quotation-services.ts';

export async function createFolder(
    quotationType: string,
    customerName: string
) {
    const folderPath = await getValueFromTauriStore<string>('dropbox_folder');

    if (folderPath === null) {
        toast.error("Le chemin du dossier Dropbox n'est pas défini");
        throw new Error("Le chemin du dossier Dropbox n'est pas défini");
    }
    const normalizePath = await normalize(folderPath);
    const reference = await generateReference(quotationType, customerName);

    const fullPath = `${normalizePath}/${reference}`;

    await createDir(fullPath, { dir: BaseDirectory.Home, recursive: true });
}
