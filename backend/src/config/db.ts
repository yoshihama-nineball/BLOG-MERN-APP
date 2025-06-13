import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI
    const connecton = await mongoose.connect(url)

    console.log(connecton)

    console.log(colors.blue.bold(`mongoDBは接続しました`))
  } catch (error) {
    console.log(error.message)
  }
}
