'use client'

import React from 'react'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { deletePostAPI, fetchAllPosts } from '../../lib/api/postsAPI'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostsList: React.FC = () => {
  const { data, error, isLoading } = useSWR(BASE_URL, fetchAllPosts)

  const { trigger, isMutating } = useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: string }) => {
      return deletePostAPI(arg)
    }
  )

  const deleteHandler = async (postId: string) => {
    const isConfirmed = window.confirm('本当に削除しますか？')
    if (!isConfirmed) return

    try {
      await trigger(postId)
      mutate(
        BASE_URL,
        (data: any) => ({
          ...data,
          getPosts: data.getPosts.filter((p: any) => p._id !== postId),
        }),
        false
      )
    } catch (e) {
      console.error('削除に失敗しました:', e)
      console.log(postId, '投稿ID')
    }
  }

  return (
    <div>
      {isLoading && <p>Loading....</p>}
      {error && <p>{(error as Error).message}</p>}
      {data?.getPosts.map((post: any) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <Link href={`/posts/${post._id}`}>
            <button>詳細</button>
          </Link>
          <Link href={`/posts/${post._id}/edit`}>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => deleteHandler(post._id)}
            disabled={isMutating}
          >
            削除
          </button>
        </div>
      ))}
    </div>
  )
}

export default PostsList
