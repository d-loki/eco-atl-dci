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

const formSchema = z.object({
    api_key: z
        .string()
        .length(32, { message: 'La clé doit faire 32 caractères' }),
    dropbox_directory: z.string(),
});

const ParameterPage = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            api_key: '',
            dropbox_directory: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
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
                    <CardContent className="space-y-8">
                        <FormField
                            control={form.control}
                            name="api_key"
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
                        <FormField
                            control={form.control}
                            name="dropbox_directory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mon dossier dropbox</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John/Doe/MonDossier"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ce dossier est utilisé pour stocker vos
                                        fichiers sur Dropbox
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
