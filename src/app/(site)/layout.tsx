import { ScrollArea } from '@/components/ui/scroll-area'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ScrollArea>
            {children}
        </ScrollArea>
    )
}
