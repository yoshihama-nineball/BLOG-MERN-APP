'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import { fetchPost, updatePostAPI } from '../../../lib/api/postsAPI'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// fetcher関数
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const EditPost: React.FC = () => {
  const { postId } = useParams()
  const router = useRouter()

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

  return (
    <div>
      <h1>記事の詳細ページ</h1>
      {isLoading && <p>Loading....</p>}
      {error && <p>{(error as Error).message}</p>}
      <div>
        <h2>{data?.getPost?.title}</h2>
        <p>{data?.getPost?.description}</p>
        <Link href={'/posts/'}>
          <button>一覧に戻る</button>
        </Link>
      </div>
    </div>
  )
}

export default EditPost
