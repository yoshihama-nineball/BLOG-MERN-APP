import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface PostData {
  postId?: string
  title: string
  description: string
}

interface Post {
  _id: string
  title: string
  description: string
  image: object
  author: string
  nextEarningDate: Date
  thisMonthEarnings: number
  totalEarnings: number
  category: string
  viewsCount: number
  likes: string[]
  dislikes: string[]
  viewers: string[]
  comments: string[]
  isBlocked: boolean
}

interface APIResponse<T> {
  data: T
  message: string
  status: string
}

// Create post API
export const createPostAPI = async (
  postData: PostData
): Promise<APIResponse<Post>> => {
  console.log(postData)
  const response = await axios.post<APIResponse<Post>>(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description,
  })
  return response.data
}

// Update post API
export const updatePostAPI = async (
  postId: string,
  postData: PostData
): Promise<APIResponse<Post>> => {
  console.log(postData)
  const response = await axios.put<APIResponse<Post>>(`${BASE_URL}/${postId}`, {
    title: postData.title,
    description: postData.description,
  })
  return response.data
}
// Fetch all posts
export const fetchAllPosts = async (): Promise<APIResponse<Post[]>> => {
  const response = await axios.get<APIResponse<Post[]>>(`${BASE_URL}`)
  return response.data
}

// Fetch post
export const fetchPost = async (postId: string): Promise<APIResponse<Post>> => {
  const response = await axios.get<APIResponse<Post>>(`${BASE_URL}/${postId}`)
  return response.data
}

// Delete post API
export const deletePostAPI = async (
  postId: string
): Promise<APIResponse<Post>> => {
  const response = await axios.delete<APIResponse<Post>>(
    `${BASE_URL}/${postId}`
  )
  return response.data
}
