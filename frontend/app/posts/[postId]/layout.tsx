// app/posts/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BLOG MERN APP | 記事の詳細',
  description: '記事の詳細ページ',
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
