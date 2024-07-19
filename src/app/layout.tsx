import { Inter } from 'next/font/google'

import { HomeLayout } from '@/features/layout'
import AuthProvider from '@/providers/auth'
import ReactQueryProvider from '@/providers/reactQuery'

import type { Metadata } from 'next'

import './globals.css'
import '@aws-amplify/ui-react/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '名入れ丸ごとサポート',
  description: '',
  robots: { index: false }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`min-w-[800px] bg-gray-100 text-base ${inter.className}`}>
        <AuthProvider>
          <ReactQueryProvider>
            <HomeLayout>{children}</HomeLayout>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
