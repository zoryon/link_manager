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
                    title: 'Credenziali sbagliate..',
                    description: 'Le credenziali sono sbagliate, perfavore riprova.'
                })
            } else {
                toast({
                    title: 'Successo..',
                    description: 'Login effettuato correttamente.'
                })
                router.push('/')
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='w-[90vw] sm:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw] grid gap-5'
            >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => {
                        return (
                            <FormItem className='w-full flex flex-col justify-center items-center'>
                                <FormLabel className='text-[0.8rem]'>Email</FormLabel>
                                <FormControl>
                                    <div className='relative w-72'>
                                        <Input
                                            className='border-softblue rounded-2xl flex items-center 
                                            text-[0.8rem] pl-10'
                                            disabled={isPending}
                                            placeholder='example@gmail.com'
                                            type='email'
                                            {...field}
                                        />
                                        <div 
                                            className='absolute left-1 top-1/2 transform -translate-y-1/2 flex 
                                            items-center pl-3 pointer-events-none'
                                        >
                                            <i className='fa-light fa-envelope'></i>
                                        </div>
                                    </div>
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
                            <FormItem className='w-full flex flex-col justify-center items-center mt-4'>
                                <FormLabel className='text-[0.8rem]'>Password</FormLabel>
                                <FormControl>
                                    <div className='relative w-72'>
                                        <Input
                                            className='w-72 border-softblue rounded-2xl flex items-center 
                                            text-[0.8rem] pl-10'
                                            disabled={isPending}
                                            placeholder='example'
                                            type='password'
                                            {...field}
                                        />
                                        <div 
                                            className='absolute left-1 top-1/2 transform -translate-y-1/2 flex
                                            items-center pl-3 pointer-events-none'
                                        >
                                            <i className='fa-light fa-lock'></i>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <div className='w-full flex justify-center mt-8'>
                    <Button
                        disabled={isPending}
                        type='submit'
                        className='bg-softblue w-32 rounded-2xl text-foreground'
                        variant={'ghost'}
                    >
                        {isPending ? 'Signing in...' : 'Login'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm