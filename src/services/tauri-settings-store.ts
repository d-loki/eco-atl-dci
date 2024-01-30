import { Store } from 'tauri-plugin-store-api';

const store = new Store('.settings.dat');

export async function getValueFromTauriStore<T>(
    key: string
): Promise<T | null> {
    // await store.reset();
    return await store.get(key);
}

export async function setValueOnTauriStore<T>(key: string, value: T) {
    await store.set(key, value);
}

export async function forceTauriStoreSave() {
    await store.save();
}
