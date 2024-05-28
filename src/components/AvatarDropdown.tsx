'use client'

import { logoutAction } from '@/app/actions/user.actions'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const AvatarDropdown = () => {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none'>
                <Avatar
                    className='size-10'
                >
                    <AvatarImage src='/avatar/default_avatar.png' alt='@shadcn' />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Il Mio Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        logoutAction()
                        router.push('/login')
                    }}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarDropdown