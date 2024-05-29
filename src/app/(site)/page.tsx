'use client'

import { useEffect, useState } from 'react'
import { selectAction } from '../actions/db.actions'
import { Tables } from '@/types/supabase'
import DataTable, { columns } from '@/components/DataTable'
import Spinner from '@/components/Spinner'

const HomePage = () => {
    const [links, setLinks] = useState<Tables<'links'>[] | null>(null)

    useEffect(() => {
        async function fetch() {
            const { data } = await selectAction({
                query: ''
            })

            setLinks(data)
        }
        fetch()
    }, [])

    return (
        <div className='mt-12 px-2 md:px-6 lg:px-36'>
            {links 
                ? (
                    <DataTable 
                        columns={columns} 
                        data={links} 
                    />
                ) : (
                    <Spinner />
                )
            }
        </div>
    )
}

export default HomePage