import { BreadcrumbItem } from "@/components/navigation/Breadcrumbs/Breadcrumbs";


// パンくずリスト設定
export const breadcrumbConfigs = {
  // ホームページ
  home: (): BreadcrumbItem[] => [
    { label: 'ホーム' }
  ],

  // 投稿一覧ページ
  posts: (): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: '投稿一覧' }
  ],

  // 投稿詳細ページ
  postDetail: (): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: '投稿一覧', href: '/posts' },
    { label: '投稿詳細' }
  ],

  // AI相談ページ
  consultation: (): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: '投稿一覧', href: '/posts' },
    { label: 'AIリフレーミング相談' }
  ],

  // 投稿作成ページ
  createPost: (): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: '投稿一覧', href: '/posts' },
    { label: '新規投稿' }
  ],

  // 動的パンくずリスト（カスタム）
  custom: (items: BreadcrumbItem[]): BreadcrumbItem[] => items,

  // 特定の投稿詳細（投稿者名入り）
  postDetailWithAuthor: (authorName: string): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: '投稿一覧', href: '/posts' },
    { label: `${authorName}の投稿` }
  ],

  // ユーザープロフィール
  userProfile: (userName: string): BreadcrumbItem[] => [
    { label: 'ホーム', href: '/' },
    { label: 'ユーザー一覧', href: '/users' },
    { label: `${userName}のプロフィール` }
  ],
};