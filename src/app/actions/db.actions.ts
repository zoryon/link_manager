'use server'

import { AddLinkActionProps, DeleteActionParams } from '@/types'
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

    if (!data) {
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

export const deleteAction = async ({ params }: { params: DeleteActionParams }) => {
    const supabase = createClient()
    const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', params.link_id)

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