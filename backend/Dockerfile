# ベースイメージとしてNodeを使用
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package.json ./

# nodemonをグローバルにインストール
RUN yarn global add nodemon

# 依存関係をインストール
RUN yarn install

# ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 5000

# アプリケーションを実行
CMD ["yarn", "dev"]
