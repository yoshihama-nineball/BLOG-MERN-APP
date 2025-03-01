'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPostAPI } from '../../../lib/api/postsAPI'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'
import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const buttonStyle = css`
  margin-top: 16px;
`

const CreatePost: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  })

  const description = watch('description')

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const response = await createPostAPI(data)
      console.log('Postが作成されました:', response)
      router.push('/posts?success=true')
    } catch (error) {
      console.error('Postの作成でエラーが起こりました:', error)
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        新しい投稿を作成
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="タイトル"
          placeholder="タイトルを記入してください"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          variant="outlined"
          sx={{
            fieldset: {
              border: 'none',
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Paper sx={{ padding: 2, backgroundColor: '#ffffff' }}>
          <TextField
            fullWidth
            label="本文"
            placeholder="本文をマークダウン形式で記入してください"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
            multiline
            rows={10}
            variant="outlined"
            sx={{
              fieldset: {
                border: 'none',
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            css={buttonStyle}
          >
            投稿
          </Button>
        </Paper>
      </form>
      <Box sx={{ paddingTop: 4 }}>
        <Typography variant="h5" component="h2">
          プレビュー
        </Typography>
        <Paper sx={{ padding: 2, backgroundColor: '#ffffff' }}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {description}
          </ReactMarkdown>
        </Paper>
      </Box>
    </Box>
  )
}

export default CreatePost
