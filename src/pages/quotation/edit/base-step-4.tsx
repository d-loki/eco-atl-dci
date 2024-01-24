import {
    Card,
    CardContent,
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { Calendar } from '@/components/ui/calendar.tsx';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import { FileDown, Save } from 'lucide-react';

const formSchema = z.object({
    origin: z.string(),
    technical_visit_date: z.date({
        required_error: 'Une date de visite technique est requise.',
    }),
    deadline_of_execution: z.date({
        required_error: 'Une date limite d&apos;exécution est requise.',
    }),
    bonus_disabled: z.boolean(),
    cee_disabled: z.boolean(),
    ma_prime_renov_disabled: z.boolean(),
});

const BaseStep2 = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            origin: '',
            technical_visit_date: new Date(),
            deadline_of_execution: new Date(),
            bonus_disabled: false,
            cee_disabled: false,
            ma_prime_renov_disabled: false,
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
                        <CardTitle>Données du devis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="my-8 flex flex-row space-x-8">
                            <FormField
                                control={form.control}
                                name="technical_visit_date"
                                render={({ field }) => (
                                    <FormItem className="flex basis-1/3 flex-col">
                                        <FormLabel>Visite technique</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.value &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'dd/MM/yyyy'
                                                            )
                                                        ) : (
                                                            <span>
                                                                Sélectionner une
                                                                date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '2024-01-01'
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deadline_of_execution"
                                render={({ field }) => (
                                    <FormItem className="flex basis-1/3 flex-col">
                                        <FormLabel>
                                            D&apos;élai d&apos;exécution
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.value &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                'dd/MM/yyyy'
                                                            )
                                                        ) : (
                                                            <span>
                                                                Sélectionner une
                                                                date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '2024-01-01'
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="origin"
                                render={({ field }) => (
                                    <FormItem className="flex basis-1/5 flex-col">
                                        <FormLabel>Origine</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator className="my-4" />

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Paiement à crédit
                                </AccordionTrigger>
                                <AccordionContent>
                                    FORMULAIRE PAIEMENT A CREDIT
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Separator className="my-4" />
                        <div className="flex flex-row justify-center space-x-2">
                            <Button variant="outline">
                                <FileDown className="mr-2 h-4 w-4" /> Certificat
                                adresse
                            </Button>
                            <Button variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />{' '}
                                Télécharger
                            </Button>
                            <Button>
                                <Save className="mr-2 h-4 w-4" /> Sauvegarder
                            </Button>
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
