import ky, { HTTPError } from 'ky';
import { getValueFromTauriStore } from '@/services/tauri-settings-store.ts';
import { toast } from 'sonner';
import { Commercial, commercialSchema } from '@/types/commercial.ts';
import { z } from 'zod';

const baseUrl = 'http://localhost:3333/api/';

export async function getCommercialInformations(): Promise<
    Commercial | string
> {
    const authToken = await getAuthToken();
    console.log('authToken : ', authToken);

    if (authToken === '') {
        return authToken;
    }

    let response;
    try {
        response = await get<Commercial>('commercials/my-informations');
    } catch (e) {
        return authToken;
    }
    response.auth_token = authToken;

    const result = commercialSchema.safeParse(response);

    if (!result.success) {
        toast.error('Les informations commerciales sont invalides');
        throw new Error('Les informations commerciales sont invalides');
    } else {
        return result.data;
    }
}

export async function updateCommercialInformations(
    commercial: Commercial
): Promise<void> {
    try {
        await ky.put(`${baseUrl}commercials/my-informations`, {
            headers: {
                Authorization: await getBearerToken(),
            },
            json: commercial,
        });
    } catch (error) {
        if (error instanceof HTTPError) {
            if (error.response.status === 401) {
                toast.error("La clé d'identification est invalide");
                throw new Error("La clé d'identification est invalide");
            }

            toast.error('Une erreur est survenue');
            throw new Error('Une erreur est survenue');
        }

        toast.error("Impossible de se connecter à l'ERP");
        throw new Error("Impossible de se connecter à l'ERP");
    }
}

const configSchema = z.object({
    key: z.string(),
    type: z.string(),
    value: z.unknown(),
    description: z.string().nullable(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
});

type ConfigType = z.infer<typeof configSchema>;

export async function getAppConfig(): Promise<ConfigType[]> {
    const response = await get<ConfigType[]>('dci-settings');
    response.forEach((config) => {
        const result = configSchema.safeParse(config);
        if (!result.success) {
            console.log('config : ', config);
            console.log(result.error);
            toast.error('Les informations de configuration sont invalides');
            throw new Error('Les informations de configuration sont invalides');
        }
    });

    return response;
}

async function getBearerToken(): Promise<string> {
    return `Bearer ${await getAuthToken()}`;
}

async function getAuthToken(): Promise<string> {
    return (await getValueFromTauriStore<string>('auth_token')) ?? '';
}

async function get<T>(url: string): Promise<T> {
    const fullUrl = baseUrl + url;

    try {
        const response = await ky.get(fullUrl, {
            headers: {
                Authorization: await getBearerToken(),
            },
        });
        return await response.json();
    } catch (error) {
        if (error instanceof HTTPError) {
            if (error.response.status === 401) {
                toast.error("La clé d'identification est invalide");
                throw new Error("La clé d'identification est invalide");
            }

            toast.error('Une erreur est survenue');
            throw new Error('Une erreur est survenue');
        }

        toast.error("Impossible de se connecter à l'ERP");
        throw new Error("Impossible de se connecter à l'ERP");
    }
}
