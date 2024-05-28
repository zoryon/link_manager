import Navbar from '@/components/Navbar'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Navbar />
            <ScrollArea className='w-full'>
                {children}
            </ScrollArea>
        </div>
    )
}
