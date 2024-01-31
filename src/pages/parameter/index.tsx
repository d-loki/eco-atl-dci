import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
    getCommercialInformations,
    updateCommercialInformations,
} from '@/services/api-services.ts';
import { useEffect, useState } from 'react';
import { setValueOnTauriStore } from '@/services/tauri-settings-store.ts';
import { toast } from 'sonner';
import { open } from '@tauri-apps/api/dialog';
import { FolderOpen } from 'lucide-react';

const authTokenRegex = new RegExp('oat_[A-Za-z0-9]+');

const formSchema = z.object({
    auth_token: z
        .string()
        .regex(authTokenRegex, "La clé d'identification est invalide"),
    dropbox_folder: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    mobile_phone: z.string(),
});

const ParameterPage = () => {
    const [commercialIsLogged, setCommercialIsLogged] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auth_token: '',
            dropbox_folder: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            mobile_phone: '',
        },
    });

    useEffect(() => {
        return () => {
            getCommercialInformations().then((data) => {
                if (typeof data === 'string') {
                    form.setValue('auth_token', data);
                    return;
                }
                setCommercialIsLogged(true);

                form.setValue('auth_token', data.auth_token ?? '');
                form.setValue('dropbox_folder', data.dropbox_folder);
                form.setValue('first_name', data.first_name);
                form.setValue('last_name', data.last_name);
                form.setValue('email', data.email);
                form.setValue('phone', data.phone ?? '');
                form.setValue('mobile_phone', data.mobile_phone ?? '');
            });
        };
    }, []);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await setValueOnTauriStore('auth_token', data.auth_token);
        await setValueOnTauriStore('dropbox_folder', data.dropbox_folder);
        await setValueOnTauriStore('commercial', {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            mobile_phone: data.mobile_phone,
        });

        if (!commercialIsLogged) {
            const response = await getCommercialInformations();
            if (typeof response !== 'string') {
                setCommercialIsLogged(true);

                form.setValue('auth_token', response.auth_token ?? '');
                form.setValue('dropbox_folder', response.dropbox_folder);
                form.setValue('first_name', response.first_name);
                form.setValue('last_name', response.last_name);
                form.setValue('email', response.email);
                form.setValue('phone', response.phone ?? '');
                form.setValue('mobile_phone', response.mobile_phone ?? '');
            }
        } else {
            await updateCommercialInformations(data);
        }

        toast.success('Vos paramètres ont été mis à jour');
    };

    const selectDropboxFolder = async () => {
        const selected = await open({
            directory: true,
            multiple: false,
            title: 'Sélectionner un dossier',
        });

        if (selected === null) {
            return;
        }

        if (Array.isArray(selected)) {
            toast.error('Vous devez sélectionner un dossier');
        } else {
            form.setValue('dropbox_folder', selected);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Paramètres</CardTitle>
                        <CardDescription>
                            Gérer les paramètres de votre compte
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="auth_token"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Ma clé d&apos;identification
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="eD5v2LWDFjcY1Sz4i0du4Jpp9S8zpvGF"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Cette clé est utilisée pour identifier
                                        votre compte sur l&apos;ERP
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {commercialIsLogged && (
                            <>
                                <Separator className="my-4" />
                                <FormField
                                    control={form.control}
                                    name="dropbox_folder"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mon dossier dropbox
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex w-full items-center space-x-2">
                                                    <Input
                                                        disabled
                                                        placeholder="John/Doe/MonDossier"
                                                        {...field}
                                                    />

                                                    <Button
                                                        onClick={
                                                            selectDropboxFolder
                                                        }
                                                        type="button"
                                                    >
                                                        <FolderOpen className="mr-2 h-4 w-4" />{' '}
                                                        Sélectionner
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Ce dossier est utilisé pour
                                                stocker vos fichiers sur Dropbox
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator className="my-4" />
                                <div className="my-8 flex flex-row space-x-8">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem className="flex basis-1/2 flex-col">
                                                <FormLabel>Prénom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem className="flex basis-1/2 flex-col">
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="my-8 flex flex-row space-x-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex basis-1/2 flex-col">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="my-8 flex flex-row space-x-8">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="flex basis-1/2 flex-col">
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobile_phone"
                                        render={({ field }) => (
                                            <FormItem className="flex basis-1/2 flex-col">
                                                <FormLabel>
                                                    Téléphone mobile
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Mettre à jour</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ParameterPage;
