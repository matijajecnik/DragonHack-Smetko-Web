import { Space_Grotesk } from 'next/font/google'

const space_grotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Smetko Portal',
  description: 'Smetko Portal Dragonhack project 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> 
      <body className={space_grotesk.className}>{children}</body>
    </html>
  )
}
