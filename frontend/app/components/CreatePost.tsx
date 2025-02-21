'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useSWRMutation from 'swr/mutation'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

// createPostAPI関数
const createPostAPI = async (url: string, { arg }: { arg: PostFormValues }) => {
  const { title, description } = arg
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })
  return response.json()
}

const CreatePost: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { trigger, isMutating } = useSWRMutation(
    `${BASE_URL}/create`,
    createPostAPI
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  })

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const response = await trigger(data)
      console.log('Postが作成されました:', response)
      setSuccessMessage('投稿が成功しました！')
      setErrorMessage(null) // 以前のエラーメッセージをクリア
    } catch (error) {
      console.error('Postの作成でエラーが起こりました:', error)
      setErrorMessage('投稿の作成に失敗しました。')
      setSuccessMessage(null) // 以前の成功メッセージをクリア
    }
  }

  return (
    <div>
      {isMutating && <div>投稿を作成中です...</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
        <button type="submit" disabled={isMutating}>
          投稿
        </button>
      </form>
    </div>
  )
}

export default CreatePost
