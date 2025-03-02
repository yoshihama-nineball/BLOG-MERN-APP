'use client'

import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'
// import { fetchPost } from '../../../lib/api/postsAPI'
import { Alert, Box, Button, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import CodeBlock from '../../components/CodeBlock'
import Loading from '../../components/elements/Loading'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// interface Params {
//   postId: string
// }
const PostDetail: React.FC = () => {
  const params = useParams()
  const postId = typeof params?.postId === 'string' ? params.postId : ''

  const searchParams = useSearchParams()
  const success = searchParams ? searchParams.get('success') : null

  const { data, error, isLoading } = useSWR(
    postId ? `${BASE_URL}/${postId}` : null,
    fetcher
  )

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        記事の詳細ページ
      </Typography>
      {isLoading && <Loading />}
      {success && (
        <Alert severity="success" onClose={() => {}}>
          投稿が成功しました！
        </Alert>
      )}
      {error && <Alert severity="error">{(error as Error).message}</Alert>}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          {data?.getPost?.title}
        </Typography>
        <Paper sx={{ padding: 2, backgroundColor: '#ffffff' }}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{ code: CodeBlock as React.ComponentType<any> }}
          >
            {data?.getPost?.description}
          </ReactMarkdown>
        </Paper>
        <Link href="/posts/">
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            一覧に戻る
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default PostDetail
