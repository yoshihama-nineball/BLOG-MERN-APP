'use client'

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
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
        <Alert severity="success" sx={{ width: '20%' }} onClose={() => {}}>
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
            <Box sx={{ marginTop: 2 }}>
              <Link href={`/posts/${post._id}`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                >
                  詳細
                </Button>
              </Link>
              <Link href={`/posts/${post._id}/edit`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleClickOpen(post._id)}
                disabled={isMutating}
                startIcon={<DeleteIcon />}
              >
                削除
              </Button>
            </Box>
          </Paper>
        ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'投稿を削除しますか？'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            本当に削除しますか？この操作は元に戻せません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={deleteHandler} color="error">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PostsList
