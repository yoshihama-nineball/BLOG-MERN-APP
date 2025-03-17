// types/post.ts (グローバル型定義)
export type Post = {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'published' | 'archived'
}

//MEMO: この実装は一例
