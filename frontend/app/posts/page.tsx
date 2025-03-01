'use client'

import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { deletePostAPI, fetchAllPosts } from '../../lib/api/postsAPI'
import Link from 'next/link'
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { css } from '@emotion/react'
import { useRouter, useSearchParams } from 'next/navigation'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const buttonStyle = css`
  margin-right: 8px;
`

const PostsList: React.FC = () => {
  const { data, error, isLoading } = useSWR(BASE_URL, fetchAllPosts)
  const { trigger, isMutating } = useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: string }) => {
      return deletePostAPI(arg)
    }
  )


  const searchParams = useSearchParams();
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
        BASE_URL,
        (data: any) => ({
          ...data,
          getPosts: data.getPosts.filter((p: any) => p._id !== selectedPostId),
        }),
        false
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
      {success && <Alert severity="success" sx={{width: '20%'}} onClose={() => {}}>投稿が成功しました！</Alert>}
      {/* {error && <Alert severity="error">エラーが発生しました</Alert>} */}
      {error && <Alert severity="error">{(error as Error).message}</Alert>}
      
      {data?.getPosts.map((post: any) => (
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
                // css={buttonStyle}
                startIcon={<VisibilityIcon />}
              >
                詳細
              </Button>
            </Link>
            <Link href={`/posts/${post._id}/edit`} passHref>
              <Button
                variant="contained"
                color="primary"
                // css={buttonStyle}
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
          <Button onClick={deleteHandler} color="error" autoFocus>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PostsList
