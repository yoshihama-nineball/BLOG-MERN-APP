import express from 'express'
import { Request, Response } from 'express'
import 'dotenv/config'
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import Post from '../models/Post/Post'
import cors from 'cors'

const app = express()

connectDB()

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())


//! Create post
app.post('/api/v1/posts/create', async (req: Request, res: Response):Promise<void> => {
  try {
    const postData = req.body;
    const postCreated = await Post.create(postData)
    res.json({
      status: "success",
      message: "Postの作成に成功しました",
      postCreated
    })
  } catch (err) {
    res.json(err)
  }
})

//! List posts
app.get('/api/v1/posts', async (req: Request, res: Response) => {
  try {
    const getPosts = await Post.find()
    res.json({
      status: "success",
      message: "すべての記事を表示しました",
      getPosts
    })
  } catch (err) {
    res.json(err)
  }
})

//! update post
app.put('/api/v1/posts/:postId', async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true })
    res.json({
      status: "success",
      message: "記事を更新しました",
      updatedPost
    })
  } catch (err) {
    res.json(err)
  }
})

//! get post

app.get('/api/v1/posts/:postId', async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const getPost = await Post.findById(postId)
    res.json({
      status: "success",
      message: "記事を表示しました",
      getPost
    })
  } catch (err) {
    res.json(err)
  }
})

//! delete post

app.delete('/api/v1/posts/:postId', async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId)
    res.json({
      status: "success",
      message: "記事を削除しました",
    })
  } catch (err) {
    console.log(err);
    
  }
})

export default app