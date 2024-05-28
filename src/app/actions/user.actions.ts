'use server'

import { AddLinkActionProps } from '@/types'
import { createClient } from '@/utils/supabase/server'

export const loginAction = async ({
    email,
    password,
}: {
    email: string,
    password: string,
}) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    if (!data.session) {
        return { error: 'No session' }
    }

    return { error: null }
}

export const logoutAction = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: error.message }
    }

    return { error: null }
}

export const addLinkAction = async ({ params }: { params: AddLinkActionProps }) => {
    if (!params.meta || !params.link) {
        return {
            data: null,
            error: 'La meta o il link non sono stati aggiunti correttamente.'
        }
    }

    const supabase = createClient()
    const { error } = await supabase
        .from('links')
        .insert(params)

    if (error) {
        return {
            data: null,
            error: 'Errore nel database, perfavore riprova più tardi.'
        }
    }

    return {
        data: 'Link aggiunto correttamente.',
        error: null
    }
}