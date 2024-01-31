import { DataTable } from '@/pages/quotation/data-table.tsx';
import { columns, QuotationItem } from '@/pages/quotation/columns.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { useEffect, useState } from 'react';
import { getQuotations } from '@/services/database-services.ts';

const formSchema = z.object({
    type: z.string().nonempty(),
    first_name: z.string().nonempty(),
    last_name: z.string().nonempty(),
    disabled_cee: z.boolean(),
    disabled_ma_prime_renov: z.boolean(),
});

const QuotationPage = () => {
    const [quotations, setQuotations] = useState<QuotationItem[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: '',
            first_name: '',
            last_name: '',
            disabled_cee: false,
            disabled_ma_prime_renov: false,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    };

    useEffect(() => {
        getQuotations().then((quotations) => {
            const data: QuotationItem[] = [];
            quotations.forEach((quotation) => {
                let customer = `${quotation.customer_first_name} ${quotation.customer_last_name}`;
                if (quotation.customer_first_name === null) {
                    customer = '';
                }
                data.push({
                    reference: quotation.reference,
                    type: quotation.type,
                    customer: customer,
                    total: quotation.total,
                    created_at: quotation.created_at,
                    status: 'pending',
                    is_send: quotation.send_at !== null,
                });
            });

            setQuotations(data);
        });
    }, []);

    return (
        <div>
            <Dialog>
                <div className="my-4 flex w-full justify-center">
                    <DialogTrigger asChild>
                        <Button size="lg" className="basis-1/4">
                            Nouveau devis
                        </Button>
                    </DialogTrigger>
                </div>

                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle>Nouveau devis</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="my-8 flex flex-row">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/3">
                                            <FormLabel>
                                                Type de chantier
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sélectionner un type" />
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
                            </div>
                            <div className="my-8 flex flex-row space-x-8">
                                <FormField
                                    control={form.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/2">
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
                                        <FormItem className="basis-1/2">
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
                                    name="disabled_cee"
                                    render={({ field }) => (
                                        <FormItem className="flex basis-1/2 flex-row items-end space-x-4">
                                            <div className="space-y-0.5">
                                                <FormLabel>
                                                    Désactivé CEE
                                                </FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="disabled_ma_prime_renov"
                                    render={({ field }) => (
                                        <FormItem className="flex basis-1/2 flex-row items-end space-x-4">
                                            <div className="space-y-0.5">
                                                <FormLabel>
                                                    Désactivé Ma Prime Renov
                                                </FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                    <DialogFooter className="mt-8">
                        <Button type="submit">Créer le devis</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <DataTable columns={columns} data={quotations} />
        </div>
    );
};

export default QuotationPage;
