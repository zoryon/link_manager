import Image from 'next/image'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
            <Image
                src={'/logo/logo_invibe.png'}
                alt='logo'
                width={150}
                height={150}
                className='absolute top-10 left-1/2 transform -translate-x-1/2'
            />
        </div>
    )
}
