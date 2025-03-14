// app/posts/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BLOG MERN APP | 記事一覧',
  description: '記事の一覧ページ',
}
export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
