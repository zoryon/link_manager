'use server'

import { createClient } from '@/utils/supabase/server'

export async function isAdmin() {
    const supabase = createClient()

    const { data } = await supabase.auth.getUser()
    const { user } = data

    if (user && user.id === process.env.ADMIN_ID_1) {
        return true
    }

    return false
}