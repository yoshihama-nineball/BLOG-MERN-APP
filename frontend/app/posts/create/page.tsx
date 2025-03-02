'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createPostAPI } from '../../../lib/api/postsAPI'

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  })

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const newPostData = {
        postId: crypto.randomUUID(), // より安全なユニークID生成
        ...data,
      }
      const response = await createPostAPI(newPostData)
      console.log('Postが作成されました:', response)
    } catch (error) {
      console.error('Postの作成でエラーが起こりました:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            placeholder="タイトルを記入してください"
            {...register('title')}
          />
          {errors.title && (
            <span style={{ color: 'red' }}>{errors.title.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="description">詳細</label>
          <input
            id="description"
            type="text"
            placeholder="詳細を記入してください"
            {...register('description')}
          />
          {errors.description && (
            <span style={{ color: 'red' }}>{errors.description.message}</span>
          )}
        </div>
        <button type="submit">投稿</button>
      </form>
    </div>
  )
}
