import { z } from 'zod';

export const commercialSchema = z.object({
    auth_token: z.string().optional(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    mobile_phone: z.string().nullable(),
    dropbox_folder: z.string(),
});

export type Commercial = z.infer<typeof commercialSchema>;
