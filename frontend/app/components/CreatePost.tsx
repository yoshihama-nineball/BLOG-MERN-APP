'use client'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください'),
  description: z.string().min(1, '詳細を入力してください'),
})

type PostFormValues = z.infer<typeof postSchema>

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  })

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Enter Title" {...register('title')} />
        {errors.title && (
          <span style={{ color: 'red' }}>{errors.title?.message}</span>
        )}
        <input
          type="text"
          placeholder="Enter description"
          {...register('description')}
        />
        {errors.description && (
          <span style={{ color: 'red' }}>{errors.description?.message}</span>
        )}
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default CreatePost
