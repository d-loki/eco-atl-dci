import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { DataTablePagination } from '@/components/data-table/pagination.tsx';
import { DataTableViewOptions } from '@/components/data-table/column-toggle.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div>
            <div className="flex items-center space-x-2 py-4">
                <Input
                    placeholder="Référence"
                    value={
                        (table
                            .getColumn('reference')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('reference')
                            ?.setFilterValue(event.target.value)
                    }
                    className="basis-1/4"
                />
                <Input
                    placeholder="Client"
                    value={
                        (table
                            .getColumn('customer')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('customer')
                            ?.setFilterValue(event.target.value)
                    }
                    className="basis-1/4"
                />
                <div className="basis-1/4">
                    <Select
                        value={
                            (table
                                .getColumn('type')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onValueChange={(value) => {
                            if (value === 'all') {
                                return table
                                    .getColumn('type')
                                    ?.setFilterValue(undefined);
                            }
                            return table
                                .getColumn('type')
                                ?.setFilterValue(value);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="pv">
                                Panneaux photovoltaïques
                            </SelectItem>
                            <SelectItem value="pg">Poêle à granulés</SelectItem>
                            <SelectItem value="sol">
                                Isolation des sols
                            </SelectItem>
                            <SelectItem value="cet">
                                Chauffe-eau thermodynamique
                            </SelectItem>
                            <SelectItem value="comble">
                                Isolation des combles
                            </SelectItem>
                            <SelectItem value="pac_rr">
                                Pompe à chaleur air/air
                            </SelectItem>
                            <SelectItem value="pac_ro">
                                Pompe à chaleur air/eau
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grow">
                    <DataTableViewOptions table={table} />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Pas de résultats.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
