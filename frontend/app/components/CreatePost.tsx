'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPostAPI } from '../../lib/api/postsAPI'

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  })

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const response = await createPostAPI(data)
      console.log('Postが作成されました:', response)
    } catch (error) {
      console.error('Postの作成でエラーが起こりました:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="タイトルを記入してください"
          {...register('title')}
        />
        {errors.title && (
          <span style={{ color: 'red' }}>{errors.title?.message}</span>
        )}
        <input
          type="text"
          placeholder="詳細を記入してください"
          {...register('description')}
        />
        {errors.description && (
          <span style={{ color: 'red' }}>{errors.description?.message}</span>
        )}
        <button type="submit">投稿</button>
      </form>
    </div>
  )
}

export default CreatePost
