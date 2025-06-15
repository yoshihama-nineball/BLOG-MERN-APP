'use client';

import {
  Add,
  AutoAwesome,
  Bookmark,
  BookmarkBorder,
  Comment,
  Send,
  Visibility
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Fade,
  IconButton,
  Paper,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

// カスタムテーマ - ピンクと淡いベージュ
const theme = createTheme({
  palette: {
    primary: {
      main: '#f8bbd9',
      light: '#fce4ec',
      dark: '#e1bee7',
    },
    secondary: {
      main: '#f5f5dc',
      light: '#faf8f3',
      dark: '#e8e8dc',
    },
    background: {
      default: '#faf8f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#5d4e75',
      secondary: '#8e7cc3',
    },
  },
  typography: {
    fontFamily: '"Hiragino Sans", "ヒラギノ角ゴシック", "Yu Gothic", "游ゴシック", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#5d4e75',
    },
    h6: {
      fontWeight: 500,
      color: '#5d4e75',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

interface Post {
  id: string;
  beforeText: string;
  aiSuggestions: string[];
  userReframing: string;
  aiAnalysis: string;
  aiPraise: string;
  watchCount: number;
  isBookmarked: boolean;
  comments: Comment[];
  timestamp: Date;
}

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

const MimamoriApp: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [beforeText, setBeforeText] = useState('');
  const [userReframing, setUserReframing] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // AIリフレーミング提案の生成
  const generateAiSuggestions = (text: string): string[] => {
    const suggestions = [
      `「${text.slice(0, 20)}...」という状況を、学習の機会として捉えてみませんか？この経験から得られるスキルや気づきがあるかもしれません。`,
      '感情と事実を分けて考えてみましょう。今感じている気持ちと、実際に起こった出来事を整理すると、新しい視点が見えてくるかもしれません。',
      '時間軸を変えて考えてみると、1年後の自分から今の状況を振り返ったとき、どのように見えるでしょうか？',
      'この困難な状況の中にも、あなたの強みや頑張りが隠れているはずです。小さなことでも、自分を認めてあげることから始めてみませんか？'
    ];
    return suggestions.slice(0, 2 + Math.floor(Math.random() * 2));
  };

  // AI分析とフィードバック
  const generateAiAnalysis = (reframing: string): { analysis: string; praise: string } => {
    const analysisPoints = [
      '時間的視点の転換',
      '感情と事実の分離',
      '強みの発見',
      '学習機会としての捉え直し',
      '多角的な視点'
    ];
    
    const selectedPoint = analysisPoints[Math.floor(Math.random() * analysisPoints.length)];
    
    return {
      analysis: `${selectedPoint}を活用したリフレーミング`,
      praise: `${selectedPoint}を使って上手に考え方を変えることができていますね！素晴らしい成長です✨`
    };
  };

  // 新しい投稿を作成
  const handleCreatePost = () => {
    if (!beforeText.trim() || !userReframing.trim()) return;

    const { analysis, praise } = generateAiAnalysis(userReframing);
    
    const newPost: Post = {
      id: Date.now().toString(),
      beforeText,
      aiSuggestions,
      userReframing,
      aiAnalysis: analysis,
      aiPraise: praise,
      watchCount: Math.floor(Math.random() * 10) + 1,
      isBookmarked: false,
      comments: [],
      timestamp: new Date(),
    };

    setPosts([newPost, ...posts]);
    setNewPostOpen(false);
    setBeforeText('');
    setUserReframing('');
    setAiSuggestions([]);
    setShowAiSuggestions(false);
  };

  // AI提案を表示
  const handleShowAiSuggestions = () => {
    if (beforeText.trim()) {
      const suggestions = generateAiSuggestions(beforeText);
      setAiSuggestions(suggestions);
      setShowAiSuggestions(true);
    }
  };

  // 見守る機能
  const handleWatch = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, watchCount: post.watchCount + 1 }
        : post
    ));
  };

  // ブックマーク機能
  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  // コメント追加
  const handleAddComment = () => {
    if (!selectedPost || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      timestamp: new Date(),
    };

    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment('');
    setCommentDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* ヘッダー */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            見守り 💕
          </Typography>
          <Typography variant="body1" color="text.secondary">
            もやもやした気持ちを一緒にリフレーミングしましょう
          </Typography>
        </Box>

        {/* 投稿リスト */}
        <Box sx={{ mb: 10 }}>
          {posts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'secondary.light' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                まだ投稿がありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                右下のボタンから、あなたの気持ちを投稿してみませんか？
              </Typography>
            </Paper>
          ) : (
            posts.map((post, index) => (
              <Fade in={true} timeout={300 * (index + 1)} key={post.id}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    {/* リフレーミング前 */}
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        リフレーミング前の気持ち
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: '#fce4ec' }}>
                        <Typography variant="body1">
                          {post.beforeText}
                        </Typography>
                      </Paper>
                    </Box>

                    {/* AI提案 */}
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        <AutoAwesome sx={{ fontSize: 16, mr: 1 }} />
                        AIからの提案
                      </Typography>
                      {post.aiSuggestions.map((suggestion, idx) => (
                        <Paper key={idx} sx={{ p: 2, mb: 1, bgcolor: '#e8f5e8' }}>
                          <Typography variant="body2">
                            {suggestion}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>

                    {/* ユーザーのリフレーミング */}
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        あなたのリフレーミング
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
                        <Typography variant="body1">
                          {post.userReframing}
                        </Typography>
                      </Paper>
                    </Box>

                    {/* AI分析とフィードバック */}
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>{post.aiAnalysis}</strong><br />
                        {post.aiPraise}
                      </Typography>
                    </Alert>

                    {/* アクション */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleWatch(post.id)}
                          sx={{ color: 'primary.main' }}
                        >
                          見守った {post.watchCount}
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => handleBookmark(post.id)}
                          color={post.isBookmarked ? 'primary' : 'default'}
                        >
                          {post.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                        <Button
                          size="small"
                          startIcon={<Comment />}
                          onClick={() => {
                            setSelectedPost(post);
                            setCommentDialogOpen(true);
                          }}
                        >
                          コメント ({post.comments.length})
                        </Button>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {post.timestamp.toLocaleDateString('ja-JP')}
                      </Typography>
                    </Box>

                    {/* コメント表示 */}
                    {post.comments.length > 0 && (
                      <Box mt={2}>
                        <Divider sx={{ mb: 2 }} />
                        {post.comments.map((comment) => (
                          <Box key={comment.id} mb={1}>
                            <Paper sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                              <Typography variant="body2">
                                {comment.text}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {comment.timestamp.toLocaleString('ja-JP')}
                              </Typography>
                            </Paper>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            ))
          )}
        </Box>

        {/* 新規投稿FAB */}
        <Fab
          color="primary"
          aria-label="新しい投稿"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
          onClick={() => setNewPostOpen(true)}
        >
          <Add />
        </Fab>

        {/* 開発メモ */}
        <Paper sx={{ mt: 8, p: 4, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#495057', fontWeight: 600 }}>
            📝 開発メモ：リフレーミング支援アプリ「見守り」(仮称)
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              💡 アプリのコンセプト
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              もやもやした気持ちをAIと一緒にリフレーミング（考え方を変える）して、心を軽くするためのアプリ。
              就労移行支援で学んだリフレーミングの手法をAIプロンプトに組み込み、実用的なアドバイスを提供する。
            </Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ color: '#155724', fontStyle: 'italic' }}>
            (プロンプトはnoteの投稿記事参照)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              🎨 デザイン
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>カラー:</strong> ピンクと淡いベージュをベースとした優しい配色。アクセントカラーに紺色を採用(text.secondaryの色)
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>コンセプト:</strong> 安心感と温かみを重視したUI
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              ⚙️ 核となる機能
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#495057', fontWeight: 600, mb: 1 }}>
              投稿機能
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>リフレーミング前:</strong> ユーザーがもやもやした気持ちを自由に入力
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>AI提案:</strong> 就労移行支援の知見を活かしたプロンプトで、AIが複数のリフレーミング案を提案
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>ユーザーのリフレーミング:</strong> ユーザー自身が考えたリフレーミング後の考えも追加投稿可能
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              🤖 AI機能の詳細
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>リフレーミング提案時:</strong> 就労移行支援で学んだリフレーミングのポイント（視点の転換、感情と事実の分離、長期的視点、強みの発見など）を活用した提案を行う
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>ユーザー投稿の分析:</strong> ユーザーがリフレーミングを投稿した際、どのポイントを使っているかをAIが分析
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>承認とフィードバック:</strong> 時間的視点を変えて考えられているか、感情と事実・感情と認知を分けて整理できているかなど、具体的なポイントを挙げて褒める
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              📝 編集ポリシー
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>編集不可:</strong> リフレーミング前の気持ち、AIの提案、ユーザーのリフレーミング後の考えは全て編集不可
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>理由:</strong> ありのままの気持ちと、その時頑張って考えた内容を大切にするため
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              💬 コメント機能
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>自分の投稿のみ:</strong> 自分が投稿したものにだけコメント可能
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>用途:</strong> 時間が経って新しい気づきやリフレーミングが生まれた時に追加
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>価値:</strong> 思考の変化や成長過程を時系列で記録できる
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              ⭐ 評価・保存システム
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>「見守った数」のみ表示:</strong> 閲覧数を「見守られた数」として表示する
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>ブックマーク機能:</strong> ユーザーが後で見返したい投稿を保存可能
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              • <strong>ブックマーク数は非表示:</strong> 個人的な保存機能として使用し、数は表示しない
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              • <strong>理由:</strong> 競争や比較を避け、共感と支え合いの文化を作るため
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#6c757d', fontSize: '1.1rem', mb: 1 }}>
              ✨ 特徴的な価値
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              1. <strong>素直な感情を大切にする:</strong> 編集機能を制限することで、その瞬間の本当の気持ちを保護
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              2. <strong>成長過程の可視化:</strong> コメント機能により、時間をかけた心の変化を記録
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              3. <strong>専門知識の活用:</strong> 就労移行支援で学んだリフレーミング技法をAIに組み込み
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              4. <strong>温かいコミュニティ:</strong> 「見守る」という表現で支え合いの文化を醸成
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              5. <strong>個人的な学習支援:</strong> ブックマーク機能で参考になった投稿を個人的に保存可能
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 1 }}>
              6. <strong>AIによる学習サポート:</strong> ユーザーのリフレーミングスキルを具体的に認識し、成長を励ます
            </Typography>
            <Typography variant="body2" sx={{ color: '#495057', mb: 2 }}>
              7. <strong>シンプルな操作:</strong> 機能を絞ることで、悩んでいる時でも使いやすい設計
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: '#e8f5e8', borderRadius: 2, border: '1px solid #c3e6cb' }}>
            <Typography variant="body2" sx={{ color: '#155724', fontStyle: 'italic' }}>
            メインカラー: 淡いベージュ
            </Typography>
            <Typography variant="body2" sx={{ color: '#155724', fontStyle: 'italic' }}>
            ベースカラー: ピンク
            </Typography>
            <Typography variant="body2" sx={{ color: '#155724', fontStyle: 'italic' }}>
            アクセントカラー: 紺色っぽい色(text.secondaryのようなテキストカラー)
            </Typography>
          </Box>

          <Box sx={{ p: 2, bgcolor: '#e8f5e8', borderRadius: 2, border: '1px solid #c3e6cb' }}>
            <Typography variant="body2" sx={{ color: '#155724', fontStyle: 'italic' }}>
              💚 このアプリは、単なるメンタルヘルスツールではなく、ユーザーの心の成長を大切に見守る温かいコミュニティを目指したものです。
              AIが専門的な知識に基づいてサポートし、ユーザーの小さな成長も見逃さずに認めることで、リフレーミングスキルの向上と自己肯定感の育成を両立させます。
            </Typography>
          </Box>
        </Paper>

        {/* 新規投稿ダイアログ */}
        <Dialog
          open={newPostOpen}
          onClose={() => setNewPostOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>新しい気持ちを投稿</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="今のもやもやした気持ちを書いてください"
              value={beforeText}
              onChange={(e) => setBeforeText(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            {!showAiSuggestions && beforeText.trim() && (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AutoAwesome />}
                onClick={handleShowAiSuggestions}
                sx={{ mb: 2 }}
              >
                AIのリフレーミング提案を見る
              </Button>
            )}

            {showAiSuggestions && (
              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  AIからの提案：
                </Typography>
                {aiSuggestions.map((suggestion, idx) => (
                  <Paper key={idx} sx={{ p: 2, mb: 1, bgcolor: 'secondary.light' }}>
                    <Typography variant="body2">
                      {suggestion}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}

            <TextField
              fullWidth
              multiline
              rows={4}
              label="あなたなりのリフレーミングを書いてください"
              value={userReframing}
              onChange={(e) => setUserReframing(e.target.value)}
              helperText="AIの提案を参考にしながら、あなた自身の言葉で考えを整理してみてください"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewPostOpen(false)}>
              キャンセル
            </Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              disabled={!beforeText.trim() || !userReframing.trim()}
              startIcon={<Send />}
            >
              投稿する
            </Button>
          </DialogActions>
        </Dialog>

        {/* コメントダイアログ */}
        <Dialog
          open={commentDialogOpen}
          onClose={() => setCommentDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>新しい気づきを追加</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="時間が経って新しく気づいたことがあれば..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              helperText="思考の変化や成長を記録しましょう"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentDialogOpen(false)}>
              キャンセル
            </Button>
            <Button
              onClick={handleAddComment}
              variant="contained"
              disabled={!newComment.trim()}
            >
              追加する
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default MimamoriApp;

/*
=== 本格的なアプリ開発について ===

このコードは「見守り」アプリのプロトタイプ・概念実証として作成されています。
本格的なアプリケーションを開発する際は、以下の手順を推奨します：

🚀 新規プロジェクト作成
- このリポジトリではなく、新しくリポジトリを作成してください
- このプロジェクトを参考資料として活用し、1から設計・実装を行ってください

📋 本格開発時の検討事項：

【技術スタック】
- Next.js 14+ (App Router)
- TypeScript
- Prisma + PostgreSQL/MySQL（データベース）
- NextAuth.js（認証）
- Vercel/Railway（デプロイ）

【追加実装が必要な機能】
- ユーザー認証・登録システム
- データベース設計・実装
- セキュリティ対策（入力値検証、XSS対策など）
- AI API連携（OpenAI GPT-4、Claude API等）
- プッシュ通知機能
- モバイルアプリ対応（React Native/Flutter）
- 管理者機能
- バックアップ・復元機能

【設計面】
- より詳細なユーザー体験設計
- アクセシビリティ対応
- 多言語対応
- パフォーマンス最適化
- エラーハンドリング
- ログ機能

【法的・倫理的配慮】
- プライバシーポリシー
- 利用規約
- メンタルヘルス関連の注意事項
- 専門家との連携体制

このプロトタイプを基盤として、より堅牢で実用的なアプリケーションを
新しいリポジトリで開発することを強く推奨します。
*/