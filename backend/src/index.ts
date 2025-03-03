// server.ts ファイルを修正
import express from 'express'
import path from 'path'
// 他のインポート...

const app = express()
// 既存のミドルウェアとAPIルート...

// APIルートの後に追加
if (process.env.NODE_ENV === 'production') {
  // フロントエンドのビルドフォルダへのパス
  app.use(express.static(path.join(__dirname, '../../client/build')))

  // 他のすべてのリクエストをindex.htmlにリダイレクト
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
  })
}

export default app
