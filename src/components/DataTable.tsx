import { Tables } from '@/types/supabase'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Spinner from './Spinner'

export const columns: ColumnDef<Tables<'links'>>[] = [
    {
        accessorKey: 'link',
        header: 'Link',
    },
    {
        accessorKey: 'meta',
        header: 'Meta',
    },
    {
        accessorKey: 'data',
        header: 'Data',
    },
    {
        accessorKey: 'creator_email',
        header: 'Creatore',
    },
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | null
}

const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>
) => {  
    if (data === null) {
        return (
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell 
                                colSpan={columns.length} 
                                className='w-full h-24 flex justify-center items-center'
                            >
                                <Spinner />
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>
        )
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='rounded-md border'>
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
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className='h-24 text-center'>
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable