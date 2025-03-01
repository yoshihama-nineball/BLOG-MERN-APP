'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import { fetchPost, updatePostAPI } from '../../../../lib/api/postsAPI'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import { css } from '@emotion/react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// fetcher関数
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const buttonStyle = css`
  margin-top: 16px;
`

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

  const onSubmit: SubmitHandler<PostFormValues> = async (values) => {
    const postData = {
      ...values,
      postId,
    }
    try {
      await updatePostAPI(postData)
      mutate(`${BASE_URL}/${postId}`) // キャッシュを無効化し再フェッチ
      router.push(`/posts/${postId}?success=true`) // 更新後に記事の詳細画面にリダイレクト
    } catch (err) {
      console.error('Postの編集でエラーが起こりました:', err)
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        記事の詳細ページ
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{(error as Error).message}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          placeholder={data?.getPost?.title ? '入力してね' : ''}
          defaultValue={data?.getPost?.title || ''}
          inputProps={{ inputMode: 'numeric' }}
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          placeholder={data?.getPost?.description ? '入力してね' : ''}
          defaultValue={data?.getPost?.description || ''}
          inputProps={{ inputMode: 'numeric' }}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          css={buttonStyle}
        >
          更新
        </Button>
      </form>
      <Box sx={{ marginTop: 2 }}>
        <Link href={'/posts/'} passHref>
          <Button variant="contained" color="secondary">
            一覧に戻る
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default EditPost
