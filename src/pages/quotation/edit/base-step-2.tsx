import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import TabButtons from '@/pages/quotation/edit/tab-buttons.tsx';
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
import { Switch } from '@/components/ui/switch.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';

const formSchema = z.object({
    civility: z.string().nonempty({ message: 'Civilité requise' }),
    firstname: z.string().nonempty({ message: 'Prénom requis' }),
    lastname: z.string().nonempty({ message: 'Nom requis' }),
    email: z.string().email({ message: 'Email invalide' }),
    phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
    mobile: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
    address: z.string().nonempty({ message: 'Adresse requise' }),
    postal_code: z.string().min(5, { message: 'Code postal invalide' }),
    city: z.string().nonempty({ message: 'Ville requise' }),
    income: z.coerce.number().min(0, { message: 'Revenu invalide' }),
    is_beneficiary: z.boolean(),
});

const BaseStep2 = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            civility: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            mobile: '',
            address: '',
            postal_code: '',
            city: '',
            income: 0,
            is_beneficiary: false,
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
                        <CardTitle>Informations client</CardTitle>
                        <CardDescription>
                            Ensemble des informations du client
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="my-8 flex flex-row space-x-8">
                            <FormField
                                control={form.control}
                                name="civility"
                                render={({ field }) => (
                                    <FormItem className="basis-1/5">
                                        <FormLabel>Email</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner une civilité" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="man">
                                                    Monsieur
                                                </SelectItem>
                                                <SelectItem value="woman">
                                                    Madame
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    Non genré
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem className="basis-2/5">
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
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem className="basis-2/5">
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="basis-2/3">
                                        <FormLabel>Adresse</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postal_code"
                                render={({ field }) => (
                                    <FormItem className="basis-1/3">
                                        <FormLabel>Code postal</FormLabel>
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
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="basis-2/3">
                                        <FormLabel>Ville</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="income"
                                render={({ field }) => (
                                    <FormItem className="basis-1/3">
                                        <FormLabel>Revenu</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="is_beneficiary"
                            render={({ field }) => (
                                <FormItem className="flex flex-row space-x-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Bénéficiaire</FormLabel>
                                        <FormDescription>
                                            Indique le client qui est
                                            bénéficiaire
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Separator className="my-16" />

                        <div className="my-8 flex flex-row space-x-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="basis-1/2">
                                        <FormLabel>E-mail</FormLabel>
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
                                    <FormItem className="basis-1/2">
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
                                name="mobile"
                                render={({ field }) => (
                                    <FormItem className="basis-1/2">
                                        <FormLabel>Portable</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <TabButtons />
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default BaseStep2;
