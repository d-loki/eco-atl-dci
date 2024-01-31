import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    FolderOpen,
    FolderX,
    ListChecks,
    MoreHorizontal,
    Pencil,
    Send,
    Trash2,
} from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/data-table/column-header.tsx';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { format } from 'date-fns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuotationItem = {
    reference: string;
    type: string;
    customer: string;
    total: number;
    created_at: string;
    is_send: boolean;
};

export const columns: ColumnDef<QuotationItem>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'reference',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Référence" />
        ),
    },
    {
        accessorKey: 'type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
            const slug = row.getValue('type');
            // TODO : Faire la logique en récupérant les données de l'ERP ou via constante dans le DCO
            let value = '';
            switch (slug) {
                case 'pv':
                    value = 'Panneaux photovoltaïques';
                    break;
                case 'sol':
                    value = 'Isolation des sols';
                    break;
                case 'comble':
                    value = 'Isolation des combles';
                    break;
                case 'pac_rr':
                    value = 'Pompe à chaleur air/air';
                    break;
                case 'pac_ro':
                    value = 'Pompe à chaleur air/eau';
                    break;
                case 'cet':
                    value = 'Chauffe-eau thermodynamique';
                    break;
                case 'pg':
                    value = 'Poêle à granulés';
                    break;
            }
            return <Badge variant="outline">{value}</Badge>;
        },
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Client" />
        ),
    },
    {
        accessorKey: 'total',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total" />
        ),
        cell: ({ row }) => {
            let amount = row.getValue<number>('total');
            amount = amount / 100;
            const formatted = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
            }).format(amount);

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Crée le" />
        ),
        cell: ({ row }) => {
            const date = row.getValue<string>('created_at');
            const formatted = format(new Date(date), 'dd/MM/yyyy');

            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: 'is_send',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transmis" />
        ),
        cell: ({ row }) => {
            const value = row.getValue('is_send');
            if (value) {
                return <Badge variant="success">Transmis</Badge>;
            }
            return <Badge variant="destructive">Non transmis</Badge>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const navigate = useNavigate();
            const reference = row.getValue('reference');
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigate(`/devis/${reference}`)}
                        >
                            <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Éditer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ListChecks className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Vérifier les éléments
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FolderOpen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Ouvrir le répertoire
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FolderX className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Suppression du DCI
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2 className="mr-2 h-3.5 w-3.5  text-muted-foreground/70" />
                            Suppression Dropbox + DCI
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Send className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Transmettre
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
