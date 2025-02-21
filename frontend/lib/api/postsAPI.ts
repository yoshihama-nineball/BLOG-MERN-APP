import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface PostData {
  postId?: string
  title: string
  description: string
}

//! Create post API
export const createPostAPI = async (postData: PostData): Promise<any> => {
  console.log(postData)
  const response = await axios.post(`${BASE_URL}/create`, {
    title: postData.title,
    description: postData.description,
  })
  return response.data
}

// //! Update post API
// export const updatePostAPI = async (postData: PostData): Promise<any> => {
//   console.log(postData)
//   const response = await axios.put(`${BASE_URL}/${postData.postId}`, {
//     title: postData.title,
//     description: postData.description,
//   })
//   return response.data
// }

// //! Fetch all posts
// export const fetchAllPosts = async (): Promise<any> => {
//   const response = await axios.get(BASE_URL)
//   return response.data
// }

// //! Fetch post
// export const fetchPost = async (postId: string): Promise<any> => {
//   const response = await axios.get(`${BASE_URL}/${postId}`)
//   return response.data
// }

// //! Delete post API
// export const deletePostAPI = async (postId: string): Promise<any> => {
//   const response = await axios.delete(`${BASE_URL}/${postId}`)
//   return response.data
// }
