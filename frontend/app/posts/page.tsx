'use client'

import Alert from '@/components/feedback/Alert/Alert'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import Button from '../../components/ui/Button/Button'
import ConfirmDialog from '../../components/ui/dialogs/ConfirmDialog'
import { deletePostAPI, fetchAllPosts } from '../../lib/api/postsAPI'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface IPost {
  _id: string
  title: string
  description: string
}

const PostsList: React.FC = () => {
  const { data, error, isLoading } = useSWR(BASE_URL, fetchAllPosts)
  const { trigger, isMutating } = useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: string }) => {
      return deletePostAPI(arg)
    }
  )

  const searchParams = useSearchParams()
  const success = searchParams ? searchParams.get('success') : null

  const [open, setOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  const handleClickOpen = (postId: string) => {
    setSelectedPostId(postId)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteHandler = async () => {
    if (!selectedPostId) return

    try {
      await trigger(selectedPostId)

      mutate(
        BASE_URL as string,
        (prevData: any) => {
          if (!prevData) return prevData
          return {
            ...prevData,
            getPosts: prevData.getPosts.filter(
              (p: IPost) => p._id !== selectedPostId
            ),
          }
        },
        { revalidate: false }
      )

      handleClose()
    } catch (e) {
      console.error('削除に失敗しました:', e)
      console.log(selectedPostId, '投稿ID')
      handleClose()
    }
  }

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <CircularProgress />}
      {success && (
        <Alert severity="success" onClose={() => {}}>
          投稿が成功しました！
        </Alert>
      )}
      {error && <Alert severity="error">{(error as Error).message}</Alert>}

      {data &&
        ((data as any)?.getPosts || []).map((post: IPost) => (
          <Paper
            key={post._id}
            sx={{
              padding: 2,
              backgroundColor: '#ffffff',
              marginBottom: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" component="h2">
              {post.title}
            </Typography>
            <Typography>{post.description}</Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button
                variant="primary"
                startIcon={<VisibilityIcon />}
                href={`/posts/${post._id}`}
              >
                詳細
              </Button>
              <Button
                variant="secondary"
                startIcon={<EditIcon />}
                href={`/posts/${post._id}/edit`}
              >
                Edit
              </Button>
              <Button
                variant="delete"
                startIcon={<DeleteIcon />}
                onClick={() => handleClickOpen(post._id)}
                loading={isMutating}
              >
                削除
              </Button>
            </Stack>
          </Paper>
        ))}

      <ConfirmDialog
        open={open}
        title="投稿を削除しますか？"
        content="本当に削除しますか？この操作は元に戻せません。"
        confirmButtonText="削除"
        cancelButtonText="キャンセル"
        confirmButtonColor="error"
        onConfirm={deleteHandler}
        onCancel={handleClose}
      />
    </Box>
  )
}

export default PostsList
