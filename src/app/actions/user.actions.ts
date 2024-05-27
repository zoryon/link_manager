'use server'

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