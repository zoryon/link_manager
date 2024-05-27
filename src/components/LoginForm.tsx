'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
    FormControl
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { loginAction } from '@/app/actions/user.actions'

// form schemas
export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
        startTransition(async () => {
            const { error } = await loginAction(values)

            if (error) {
                toast({
                    title: 'Wrong credentials..',
                    description: 'The credentials provided were not correct, please try again.' 
                })
            } else {
                toast({
                    title: 'Success..',
                    description: 'Congratulations!! You are now logged in correctly.' 
                })
                router.push('/')
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='w-[90vw] sm:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw] grid gap-5'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder='your@email.com'
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder='your password'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <Button 
                    disabled={isPending}
                    type='submit'
                >{isPending ? 'Signing in...' : 'Login'}</Button>
            </form>
        </Form>
    )
}

export default LoginForm