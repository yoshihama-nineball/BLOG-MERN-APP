// app/posts/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BLOG MERN APP | 記事の編集',
  description: '記事の編集ページ',
}

export default function EditLayout({ children }: {children: React.ReactNode}) {
  return children
}
