import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

const authTokenRegex = new RegExp('oat_[A-Za-z0-9]+');
const formSchema = z.object({
    auth_token: z
        .string()
        .regex(authTokenRegex, "La clé d'identification est invalide"),
    dropbox_folder: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    mobile_phone: z.string(),
});

const ParameterPage = () => {
    const defaultToken =
        'oat_MQ.b1Jza1IwZndoWG5xakhmckhXNm9CN2tPZTd3aGVCZmRfTFJxTjNRajMwOTQ1OTM0Mw';
    const bearer = 'Bearer ' + defaultToken;

    const [isSending, setIsSending] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            auth_token: defaultToken,
            dropbox_folder: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            mobile_phone: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSending(true);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: bearer,
            },
            body: JSON.stringify(values),
        };

        fetch('http://localhost:3333/api/commercials/my-informations', options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTimeout(() => {
                    setIsSending(false);
                    toast.success('Vos informations ont été mises à jour');
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Une erreur est survenue');
                setIsSending(false);
            });
    };

    useEffect(() => {
        fetch('http://localhost:3333/api/commercials/my-informations', {
            method: 'GET',
            headers: {
                Authorization: bearer,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                form.setValue('dropbox_folder', data.dropbox_folder);
                form.setValue('first_name', data.first_name);
                form.setValue('last_name', data.last_name);
                form.setValue('email', data.email);
                form.setValue('phone', data.phone ?? '');
                form.setValue('mobile_phone', data.mobile_phone ?? '');
            })
            .catch((error) => console.log(error));
    }, []);

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
                        <div className="my-8 flex flex-row space-x-8">
                            <FormField
                                control={form.control}
                                name="auth_token"
                                render={({ field }) => (
                                    <FormItem className="flex basis-1/2 flex-col">
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
                                            Cette clé est utilisée pour
                                            identifier votre compte sur
                                            l&apos;ERP
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dropbox_folder"
                                render={({ field }) => (
                                    <FormItem className="flex basis-1/2 flex-col">
                                        <FormLabel>
                                            Mon dossier dropbox
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John/Doe/MonDossier"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Ce dossier est utilisé pour stocker
                                            vos fichiers sur Dropbox
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                        <FormLabel>Téléphone mobile</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isSending ? (
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Veuillez patienter
                            </Button>
                        ) : (
                            <Button type="submit">Mettre à jour</Button>
                        )}
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default ParameterPage;
