import express from 'express'
import 'dotenv/config'
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db'
import Post from '../models/Post/Post'

const app = express()

connectDB()

app.use(morgan('dev'))

app.use(express.json())


//! Create post
app.post('/api/v1/posts/create', async(req, res) => {
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