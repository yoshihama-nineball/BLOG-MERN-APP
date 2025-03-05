# BLOG MERN APP

ブログ投稿と認証機能を持つMERNスタック（MongoDB, Express, React, Node.js）で構築されたウェブアプリケーションです。

## 機能

1. ブログ投稿機能
2. 認証機能
   - Google認証を用いたログインが可能です（JWT認証適宜追加）

## デプロイ済みアプリケーション

- [フロントエンド](https://blog-mern-app-front-web.onrender.com/posts)
- [バックエンド API](https://blog-mern-app-1lw2.onrender.com/posts/)

## 技術スタック

このプロジェクトでは以下の技術を使用しています：

### フロントエンド
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-15.2.0-000000?style=flat-square&logo=next.js&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-6.4.5-007FFF?style=flat-square&logo=mui&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.5.1-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Redux](https://img.shields.io/badge/React_Redux-9.2.0-764ABC?style=flat-square&logo=redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7.9-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54.2-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-2.3.2-000000?style=flat-square&logo=vercel&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.24.2-3068B7?style=flat-square&logo=zod&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-007ACC?style=flat-square&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.20.1-4B32C3?style=flat-square&logo=eslint&logoColor=white)

### バックエンド
![Node.js](https://img.shields.io/badge/Node.js-22.12.0-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.11.0-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=flat-square&logo=typescript&logoColor=white)

### インフラ・ツール
![Docker](https://img.shields.io/badge/Docker-20.10-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2025-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat-square&logo=render&logoColor=white)

## 目次
- [概要](#概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [セットアップ方法](#セットアップ方法)
- [使用方法](#使用方法)
- [環境変数の一覧](#環境変数の一覧)
- [トラブルシューティング](#トラブルシューティング)

## 概要

このプロジェクトは、MERNスタック（MongoDB, Express, React, Node.js）を使用して作成したブログアプリケーションです。ユーザーは投稿の閲覧、作成、編集、削除などの機能を利用できます。

## ディレクトリ構成

このプロジェクトのディレクトリ構成は次のようになっています：

```plaintext
/BLOG-MERN-APP                # プロジェクトのルートディレクトリ
├── /frontend                 # フロントエンド（Next.js）
│   ├── /app                  # Next.jsのappディレクトリ（App Router）
│   │   ├── /layout.tsx       # レイアウトコンポーネント
│   │   ├── /page.tsx         # ルートページ
│   │   ├── /error.tsx        # エラーページ
│   │   ├── /loading.tsx      # ローディングページ
│   │   └── /posts            # 投稿関連のルート
│   ├── /components           # 再利用可能なコンポーネント
│   ├── /hooks                # カスタムフック
│   ├── /styles               # スタイル関連
│   ├── /types                # 型定義
│   └── /utils                # ヘルパー関数やユーティリティ
├── /backend                  # バックエンド（Node.js + Express）
│   ├── /src                  # ソースコード
│   │   ├── /config           # 設定ファイル
│   │   ├── /models           # データモデル
│   │   ├── /server.ts        # サーバー設定
│   │   └── /index.ts         # エントリーポイント
│   └── /dist                 # コンパイル後のファイル
├── /.github                  # GitHub関連の設定ファイル
│   └── /workflows            # GitHub Actionsのワークフロー設定
│       ├── /lint.yml         # リント用の設定
│       └── /cd.yml           # 継続的デリバリー用の設定
└── /docker-compose.yml       # Docker Compose設定ファイル
```

## セットアップ方法

### 1. 必要なもの

- Node.js（バージョン16以上推奨）
- Docker（Docker Composeも含む）
- MongoDB（Docker Composeで管理、またはMongoDBアトラス）

### 2. ローカル環境の構築

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/yoshihama-nineball/BLOG-MERN-APP.git
   cd BLOG-MERN-APP
   ```

2. フロントエンドのセットアップ

   ```bash
   cd frontend
   yarn install
   # .env.localを作成して環境変数を設定
   yarn dev
   ```

3. バックエンドのセットアップ

   ```bash
   cd backend
   yarn install
   # .envを作成して環境変数を設定
   yarn dev
   ```

4. Docker Composeを使用する場合

   ```bash
   docker compose up --build
   ```

   サーバーが起動し、MongoDBが接続されるのを確認します。

## 使用方法

- フロントエンドは `http://localhost:3000` でアクセスできます
- バックエンドAPIは `http://localhost:5000` で実行されます

### 開発用コマンド

フロントエンド（Next.js）:

```bash
# 開発サーバーの起動
yarn dev

# ビルド
yarn build

# プロダクションサーバーの起動
yarn start

# テストの実行
yarn test

# コードフォーマット
yarn format

# リントチェック
yarn lint
```

バックエンド:

```bash
# 開発サーバーの起動
yarn dev

# ビルド
yarn build

# プロダクションサーバーの起動
yarn start

# テストの実行
yarn test

# コードフォーマット
yarn format
```

## 環境変数の一覧

### フロントエンド (.env.local)

| 変数名 | 説明 | デフォルト値 | 
|--------|------|-------------|
| NEXT_PUBLIC_BASE_URL | バックエンドAPIのURL | http://localhost:5000/api/v1/posts |

### バックエンド (.env)

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| PORT | サーバーのポート番号 | 5000 |
| MONGODB_URI | MongoDBの接続文字列 | mongodb://localhost:27017/blog-app |
| JWT_SECRET | JWT認証用の秘密鍵 | your_secret_key |
| NODE_ENV | 実行環境 | development |

## トラブルシューティング

### MongoDB接続エラー

MongoDB Atlasを使用している場合は、IPアドレスがアクセス許可リストに追加されているか確認してください。
Renderなどのクラウドサービスから接続する場合は、`0.0.0.0/0`を許可リストに追加することで、どのIPアドレスからもアクセスできるようになります。

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります。
以下のコマンドで使用中のポートを確認し、必要に応じて停止またはポート番号を変更してください：

```bash
# Linuxの場合
sudo lsof -i :5000
sudo lsof -i :3000

# Windowsの場合
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Docker関連のエラー

- **.env: no such file or directory**: 環境変数ファイルを作成してください
- **docker daemon is not running**: Docker Desktopが起動していることを確認してください

## ライセンス

MITライセンスで公開しています。詳細についてはLICENSEファイルをご覧ください。