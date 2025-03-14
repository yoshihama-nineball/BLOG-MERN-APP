// server component
import React from 'react'
import Loading from './components/feedback/Loading/Loading'
import { ClientThemeProvider } from './components/layouts/ClientThemeProvider'
import Header from './components/layouts/Header/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ClientThemeProvider>
          <Header />
          <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
        </ClientThemeProvider>
      </body>
    </html>
  )
}

