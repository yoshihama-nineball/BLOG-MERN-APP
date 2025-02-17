# 仕様技術一覧

このプロジェクトでは以下の技術を使用しています。

<!-- TODO: バージョンや技術選定をする -->
![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-13.2.4-000000?style=flat-square&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-20.10-blue?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2025-2088FF?style=flat-square&logo=github-actions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-7.32.0-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-2.3.0-F7B93E?style=flat-square&logo=prettier&logoColor=black)


# プロジェクト名
## アプリ名
BLOG MERN APP
## 機能
1. ブログ投稿機能
2. 認証機能
　　Google認証を用いたログインが可能です(jwt認証適宜追加)
3. 


## 目次
- [概要](#概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [セットアップ方法](#セットアップ方法)
- [使用方法](#使用方法)
- [技術スタック](#技術スタック)
- [ライセンス](#ライセンス)
- [トラブルシューティング](#トラブルシューティング)

## 概要

このプロジェクトは、MERNスタック（MongoDB, Express, React, Node.js）を使用して作成したウェブアプリケーションです。アプリケーションの目的や概要を簡潔に説明します。

## ディレクトリ構成

このプロジェクトのディレクトリ構成は次のようになっています。

```plaintext
/BLOG-MERN-APP                # プロジェクトのルートディレクトリ
├── /app                       # Next.jsのappディレクトリ（App Router）
│   ├── /layout.tsx            # レイアウトコンポーネント
│   ├── /page.tsx              # ルートページ
│   ├── /error.tsx             # エラーページ
│   ├── /loading.tsx           # ローディングページ
│   ├── /post                  # 投稿関連のルート
│   │   ├── /page.tsx          # 投稿のページ
│   │   └── /loading.tsx       # 投稿ページ用のローディング表示
│   └── /about                 # Aboutページ
│       └── /page.tsx          # Aboutページのコンテンツ
├── /components                # 再利用可能なコンポーネント
│   ├── /elements              # UI要素のコンポーネント
│   │   ├── /Button            # ボタンコンポーネント
│   │   │   └── Button.tsx
│   │   ├── /Tab               # タブコンポーネント
│   │   │   └── Tab.tsx
│   │   ├── /Table             # テーブルコンポーネント
│   │   │   └── Table.tsx
│   │   ├── /Alert             # アラートコンポーネント
│   │   │   └── Alert.tsx
│   │   ├── /Breadcrumb        # パンくずリストコンポーネント
│   │   │   └── Breadcrumb.tsx
│   │   ├── /Loading           # ローディングコンポーネント
│   │   │   └── Loading.tsx
│   │   ├── /Menu              # メニューコンポーネント
│   │   │   └── Menu.tsx
│   │   ├── /Modal             # モーダルコンポーネント
│   │   │   └── Modal.tsx
│   │   ├── /Select            # セレクトボックス関連
│   │   │   ├── Select.tsx
│   │   │   ├── RadioList.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   └── Dropdown.tsx
│   │   └── /Card              # カードコンポーネント
│   │       └── Card.tsx
│   └── /layouts               # レイアウトコンポーネント
│       └── /Header            # ヘッダー
│           └── Header.tsx
├── /features                  # 機能ごとのディレクトリ
│   └── /post                   # 投稿関連の機能
│       ├── /api               # API関連の処理
│       │   └── getPost.ts      # 投稿の取得処理
│       ├── /styles             # スタイル関連
│       ├── /components         # 投稿ページのコンポーネント
│       │   ├── Post.tsx        # 投稿コンポーネント
│       │   └── Posts.tsx       # 複数の投稿を表示
│       ├── /hooks              # カスタムフック
│       │   └── usePost.ts      # 投稿取得のカスタムフック
│       └── /types              # 型定義
│           └── index.ts
├── /hooks                      # グローバルで使うカスタムフック
├── /styles                     # グローバルなスタイル
├── /types                      # 型定義
├── /libs                       # ライブラリ
└── /utils                      # ヘルパー関数やユーティリティ
├── /docker-compose.yml         # Docker Compose設定ファイル
├── /README.md                  # プロジェクトの概要とセットアップ手順
├── /.gitignore                 # Gitの無視ファイル（node_modulesやDockerのキャッシュなど）
├── /package.json               # プロジェクト全体の依存関係（サーバーとクライアントをまとめたもの、または空のファイル）
├── /.github                    # GitHub関連の設定ファイル
│   ├── /workflows              # GitHub Actionsのワークフロー設定ファイル
│   │   ├── ci.yml              # CI用GitHub Actions設定ファイル
│   │   ├── deploy.yml          # CD用GitHub Actions設定ファイル
│   │   ├── lint.yml            # Linting用GitHub Actions設定ファイル
│   │   ├── coverage.yml        # コードカバレッジ用GitHub Actions設定ファイル
│   │   ├── release.yml         # リリース用GitHub Actions設定ファイル
│   │   └── manual_trigger.yml  # 手動トリガー用GitHub Actions設定ファイル
│   ├── /ISSUE_TEMPLATE         # Issue用のテンプレート
│   │   ├── bug_report.md       # バグ報告用テンプレート
│   │   └── feature_request.md  # 機能リクエスト用テンプレート
│   └── /PULL_REQUEST_TEMPLATE.md # プルリクエスト用のテンプレート

```




- **`/client`**: フロントエンド（React）アプリケーションのコードが含まれます。
- **`/server`**: バックエンド（Node.js + Express）APIサーバーのコードが含まれます。
- **`/docker-compose.yml`**: Dockerコンテナを一括で管理する設定ファイルです。
- **`README.md`**: プロジェクトのドキュメントです。

## セットアップ方法

### 1. 必要なもの

- Node.js（バージョン16以上推奨）
- Docker（Docker Composeも含む）
- MongoDB（Docker Composeで管理）

### 2. ローカル環境の構築


1. .env ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成
   ```.env
   MYSQL_ROOT_PASSWORD=root
   MYSQL_DATABASE=django-db
   MYSQL_USER=django
   MYSQL_PASSWORD=django
   MYSQL_HOST=db
   MYSQL_PORT=3306
   SECRET_KEY=django
   DJANGO_SETTINGS_MODULE=project.settings.local
   ```
2. リポジトリをクローンします。

   ```bash
   git clone git@github.com:yoshihama-nineball/BLOG-MERN-APP.git
   cd BLOG-MERN-APP
   ```

3. Docker Composeを使ってすべてのサービスを起動します。

   ```bash
   docker compose up --build
   ```

   サーバーが起動し、MongoDBが接続されるのを確認します。

4. サーバーとクライアントの起動
   サーバーはlocalhost:5000でアクセスできます。
   クライアントはlocalhost:3000で表示されます。

### 3. 環境変数の一覧

<!-- TODO: 後で編集。テンプレ -->

| 変数名                 | 役割                                      | デフォルト値                       | DEV 環境での値                           |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| MYSQL_ROOT_PASSWORD    | MySQL のルートパスワード（Docker で使用） | root                               |                                          |
| MYSQL_DATABASE         | MySQL のデータベース名（Docker で使用）   | django-db                          |                                          |
| MYSQL_USER             | MySQL のユーザ名（Docker で使用）         | django                             |                                          |
| MYSQL_PASSWORD         | MySQL のパスワード（Docker で使用）       | django                             |                                          |
| MYSQL_HOST             | MySQL のホスト名（Docker で使用）         | db                                 |                                          |
| MYSQL_PORT             | MySQL のポート番号（Docker で使用）       | 3306                               |                                          |
| SECRET_KEY             | Django のシークレットキー                 | secretkey                          | 他者に推測されないランダムな値にすること |
| ALLOWED_HOSTS          | リクエストを許可するホスト名              | localhost 127.0.0.1 [::1] back web | フロントのホスト名                       |
| DEBUG                  | デバッグモードの切り替え                  | True                               | False                                    |
| TRUSTED_ORIGINS        | CORS で許可するオリジン                   | http://localhost                   |                                          |
| DJANGO_SETTINGS_MODULE | Django アプリケーションの設定モジュール   | project.settings.local   

## 使用方法
サーバーAPIにアクセスするには、/apiエンドポイントを使用します。例えば、GET /api/tasksでタスクリストを取得できます。

クライアント側では、ReactのコンポーネントからバックエンドAPIを呼び出してデータを表示します。

## 技術スタック
<!-- TODO: テンプレ載せているだけなので、後でバージョン決定する -->
| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Python                | 3.11.4     |
| Django                | 4.2.1      |
| Django Rest Framework | 3.14.0     |
| MySQL                 | 8.0        |
| Node.js               | 16.17.0    |
| React                 | 18.2.0     |
| Next.js               | 13.4.6     |
| Terraform             | 1.3.6      |

## ライセンス
MITライセンスで公開しています。詳細についてはLICENSEファイルをご覧ください。

## トラブルシューティング

### .env: no such file or directory

.env ファイルがないので環境変数の一覧を参考に作成しましょう

### docker daemon is not running

Docker Desktop が起動できていないので起動させましょう

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります
<br>
下記記事を参考にしてください
<br>
[コンテナ起動時に Ports are not available: address already in use が出た時の対処法について](https://qiita.com/shun198/items/ab6eca4bbe4d065abb8f)


### 各セクションの説明

1. **概要**:
   - プロジェクトの目的や簡単な説明を記載します。MERNスタックの特徴やアプリケーションがどのようなことを行うかを説明します。

2. **ディレクトリ構成**:
   - プロジェクトのファイルとディレクトリの構成をツリー形式で示し、それぞれの役割や目的について簡潔に説明します。

3. **セットアップ方法**:
   - プロジェクトをローカルで実行するための手順を記載します。Docker Composeを使ったセットアップ方法や依存関係のインストール方法を詳細に説明します。

4. **使用方法**:
   - プロジェクトの利用方法について説明します。バックエンドのAPIエンドポイントや、フロントエンドからのデータの扱い方、ユーザーインターフェースの使い方などを記載します。

5. **技術スタック**:
   - プロジェクトで使用している技術（MongoDB、Express、React、Node.jsなど）について説明します。

6. **ライセンス**:
   - プロジェクトのライセンス情報を記載します。例えば、MITライセンスであればその旨を記載し、ライセンスファイルがある場合はその場所を示します。

7. **トラブルシューティング**:
   - 

