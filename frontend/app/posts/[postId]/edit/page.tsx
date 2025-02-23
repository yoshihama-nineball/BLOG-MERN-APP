'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import { fetchPost, updatePostAPI } from '../../../../lib/api/postsAPI'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const EditPost: React.FC = () => {
  const { postId } = useParams()
  const router = useRouter()

  // データの取得
  const { data, error, isLoading } = useSWR(
    postId ? `${BASE_URL}/${postId}` : null,
    fetcher
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  useEffect(() => {
    if (data && data.getPost) {
      reset({
        title: data.getPost.title,
        description: data.getPost.description,
      })
    }
  }, [data, reset])

  const onSubmit: SubmitHandler<PostFormValues> = async (values) => {
    const postData = {
      ...values,
      postId,
    }
    try {
      await updatePostAPI(postData)
      mutate(`${BASE_URL}/${postId}`)
      router.push(`/posts/${postId}`)
    } catch (err) {
      console.error('Postの編集でエラーが起こりました:', err)
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{(error as Error).message}</p>

  return (
    <div>
      <h1>You are editing - {data?.getPost?.title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="タイトルを記入してください"
          defaultValue={data?.getPost?.title}
          {...register('title')}
        />
        {errors.title && (
          <span style={{ color: 'red' }}>{errors.title?.message}</span>
        )}
        <input
          type="text"
          placeholder="詳細を記入してください"
          defaultValue={data?.getPost?.description}
          {...register('description')}
        />
        {errors.description && (
          <span style={{ color: 'red' }}>{errors.description?.message}</span>
        )}
        <button type="submit">更新</button>
      </form>
    </div>
  )
}

export default EditPost
