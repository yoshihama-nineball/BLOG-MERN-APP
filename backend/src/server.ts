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

//! update post

//! get post

//! delete post


export default app