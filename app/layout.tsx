import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Joude Car',
  description: 'Location de voitures au Maroc',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '512x512', type: 'image/x-icon' },
    ],
    shortcut: [{ url: '/favicon.ico', sizes: '512x512' }],
    apple: { url: '/favicon.ico', sizes: '512x512' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="512x512" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon.ico" sizes="512x512" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
