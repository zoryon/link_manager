'use server'

import { createClient } from '@/utils/supabase/server'

export const selectAction = async ({ query }: { query: string }) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('links')
        .select()
    
    if (error) {
        return {
            data: null,
            error: 'Errore nel database, perfavore riprova più tardi.',
        }
    }

    if (!data){
        return {
            data: null,
            error: 'Errore nel database, perfavore riprova più tardi.',
        }
    }

    return {
        data: data,
        error: null,
    }
}