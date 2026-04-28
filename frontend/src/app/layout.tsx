import type { Metadata } from 'next'
import '../styles/globals.css'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Filmm - Streaming Films et Séries',
  description: 'Regardez vos films et séries préférés en streaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}