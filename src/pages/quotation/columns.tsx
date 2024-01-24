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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuotationItem = {
    reference: string;
    type: string;
    customer: string;
    total: number;
    created_at: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
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
            const amount = parseFloat(row.getValue('total'));
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
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Statut" />
        ),
    },
    {
        accessorKey: 'is_send',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transmis" />
        ),
    },
    {
        id: 'actions',
        cell: () => {
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
                        <DropdownMenuItem>
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
