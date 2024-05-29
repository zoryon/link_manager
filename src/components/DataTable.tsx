'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table'
import { Tables } from '@/types/supabase'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import { deleteAction } from '@/app/actions/db.actions'
import { isAdmin } from '@/app/actions/lib.actions'

export const columns: ColumnDef<Tables<'links'>>[] = [
    {
        accessorKey: 'link',
        header: 'Link',
        cell: ({ row }) => {
            const link = row.original.link
            const truncatedLink = link.slice(0, 5)

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>{truncatedLink}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Full Link</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={link}
                            >
                                {link}
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
    {
        accessorKey: 'meta',
        header: 'Meta',
    },
    {
        accessorKey: 'turn',
        header: 'Turno',
    },
    {
        accessorKey: 'data',
        header: 'Data',
    },
    {
        accessorKey: 'nome_cognome',
        header: 'Creatore',
        cell: ({ row }) => {
            const nomeCognome = row.original.nome_cognome.split(' ')
            const nome = nomeCognome[0] ? nomeCognome[0].substring(0, 10) : ''
            const cognome = nomeCognome[1] ? nomeCognome[1].substring(0, 10) : ''

            return (
                <div className='flex flex-col'>
                    <div>
                        {nome}
                    </div>
                    <div>
                        {cognome}
                    </div>
                </div>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const link = row.original.link
            const link_id = row.original.id

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(link)}
                            className='flex gap-2 items-center'
                        >
                            <i className='fa-light fa-copy'></i>
                            Copy Link
                        </DropdownMenuItem>
                        {isAdmin()
                            .then((res) => {
                                if (!res) { return }

                                return (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className='flex gap-2 items-center'
                                            onClick={() => {
                                                deleteAction({
                                                    params: {
                                                        link_id: link_id,
                                                    }
                                                })
                                            }}
                                        >
                                            <i className='fa-light fa-trash'></i>
                                            Delete
                                        </DropdownMenuItem>
                                    </>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>
) => {
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