'use client'

import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { addLinkAction } from '@/app/actions/user.actions'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { META } from '@/constants/meta.constants'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import AvatarDropdown from './AvatarDropdown'
import { useToast } from './ui/use-toast'
import { MetaType } from '@/types'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/auth-js'

const Navbar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date>()
    const [meta, setMeta] = useState<string>('')
    const [link, setLink] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)
    const { toast } = useToast()

    const supabase = createClient()
    useEffect(() => {
        async function fetchUser() {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
        }
        fetchUser()
    }, [])

    return (
        <div className='w-full h-16 flex justify-between items-center border-b px-5 lg:px-12'>
            <div className='flex items-center'>
                <div className='hidden lg:flex items-center gap-6'>
                    <Image
                        src={'/logo/full_logo_invibe.png'}
                        alt='logo'
                        width={100}
                        height={100}
                        className='w-24 h-6 lg:w-full lg:h-full object-cover'
                    />
                </div>
                <div className='flex lg:hidden items-center gap-6'>
                    <Image
                        src='/logo/logo_invibe.png'
                        alt='logo'
                        width={100}
                        height={100}
                        className='w-12 h-7 object-cover'
                    />
                </div>
            </div>
            <div>
                <input
                    type='text'
                    className='w-32 lg:w-72 bg-background border rounded-md px-3 text-sm py-1'
                    placeholder='Cerca..'
                />
            </div>
            <div className='flex items-center gap-3'>
                <Dialog 
                    open={isDialogOpen} 
                    onOpenChange={() => setIsDialogOpen(isDialogOpen ? false : true)}
                >
                    <DialogTrigger asChild>
                        <Button 
                            variant='outline' 
                            className='flex items-center gap-2 h-8'
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <i className='fa-solid fa-plus'></i>
                            <span className='hidden lg:block'>Aggiungi</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>Aggiungi un nuovo link</DialogTitle>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='flex flex-col gap-4'>
                                <Label htmlFor='link'>
                                    Link
                                </Label>
                                <Input
                                    id='link'
                                    placeholder='https://example.com'
                                    onChange={(e) => setLink(e.currentTarget.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Label htmlFor='meta'>
                                    Meta
                                </Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            aria-expanded={open}
                                            className='w-[200px] justify-between'
                                        >
                                            {meta
                                                ? META.find((item) => item.value === meta)?.label
                                                : 'Scegli una meta...'}
                                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-[200px] p-0'>
                                        <Command>
                                            <CommandInput placeholder='Cerca una meta...' className='h-9' />
                                            <CommandEmpty>Non trovata.</CommandEmpty>
                                            <CommandList>
                                                {META.map((item) => (
                                                    <CommandItem
                                                        key={item.value}
                                                        value={item.value}
                                                        onSelect={(currentMeta) => {
                                                            setMeta(currentMeta === meta ? '' : currentMeta)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {item.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                'ml-auto h-4 w-4',
                                                                meta === item.value ? 'opacity-100' : 'opacity-0'
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Label htmlFor='meta'>
                                    Data
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[280px] justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {date ? format(date, 'PPP') : <span>Scegli una data</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                onClick={async () => {
                                    if(!link || !meta || !date) {
                                        return toast({
                                            title: 'Errore..',
                                            description: 'Inserisci tutti i dati, perfavore.'
                                        })
                                    }

                                    const { data, error } = await addLinkAction({
                                        params: {
                                            link: link,
                                            meta: meta as MetaType,
                                            data: date!,
                                            creator_email: user!.email!
                                        }
                                    })

                                    setIsDialogOpen(false)

                                    toast({
                                        title: data ? 'Successo..' : 'Errore..',
                                        description: data ? data : error
                                    })
                                }}
                            >
                                Aggiungi
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <AvatarDropdown />
            </div>
        </div>
    )
}

export default Navbar