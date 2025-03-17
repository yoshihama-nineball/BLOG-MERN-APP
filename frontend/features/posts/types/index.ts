// features/post/types/index.ts (機能スコープの型定義)
import { Post } from '@/types/post'

export type PostFormState = {
  isSubmitting: boolean
  errors: string[]
  success: boolean
}

export type PostEditorProps = {
  initialPost?: Post
  onSave: (post: Partial<Post>) => void
  onCancel: () => void
}
//MEMO: この実装は一例
