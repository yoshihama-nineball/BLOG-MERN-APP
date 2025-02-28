import 'reflect-metadata'
import colors from 'colors'
import server from './server'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(colors.cyan.bold(`APIのポート番号は ${port}です`))
})
