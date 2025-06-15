'use client';

import {
  ArrowBack,
  AutoAwesome,
  Bookmark,
  BookmarkBorder,
  Comment,
  Edit,
  Home,
  Send,
  VolunteerActivism,
} from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// 修正されたテーマ - 淡いベージュがメイン、ピンクがベース
const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5dc', // 淡いベージュ（メインカラー）
      light: '#faf8f3',
      dark: '#e8e8dc',
    },
    secondary: {
      main: '#f8bbd9', // ピンク（ベースカラー）
      light: '#fce4ec',
      dark: '#e1bee7',
    },
    background: {
      default: '#faf8f3',
      paper: '#ffffff',
    },
    text: {
      primary: '#5d4e75', // 紺色っぽい（アクセントカラー）
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
  comments: PostComment[];
  timestamp: Date;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

interface PostComment {
  id: string;
  text: string;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
  };
}

interface PostDetailPageProps {
  postId: string;
}

const PostDetailPage: React.FC<PostDetailPageProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  // サンプルデータ（実際はAPIから取得）
  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    // 模擬API呼び出し
    const fetchPost = async () => {
      setLoading(true);
      
      // サンプルデータ
      const samplePosts: Post[] = [
        {
          id: '1',
          beforeText: '仕事でミスをしてしまって、周りに迷惑をかけてしまった。自分はダメな人間だと思ってしまう...',
          aiSuggestions: [
            'ミスは誰にでもあることです。このミスから何を学べるか、次にどう活かせるかを考えてみませんか？',
            '一つのミスで人間性が決まるわけではありません。これまでの成功体験や周りからの評価も思い出してみましょう。'
          ],
          userReframing: 'ミスは確かにしてしまったけど、それに気づいてすぐに報告できた。次回同じミスを避けるための対策も考えられた。完璧な人はいないし、これも成長の一歩だと思う。',
          aiAnalysis: '学習機会としての捉え直し、時間的視点の転換',
          aiPraise: '失敗を学習の機会として捉え直し、具体的な対策まで考えられていて素晴らしいです！成長マインドセットが身についていますね✨',
          watchCount: 12,
          isBookmarked: false,
          comments: [
            {
              id: 'c1',
              text: '2週間経って、あの時のミスのおかげで新しいチェック体制ができて、チーム全体のミスが減りました。結果的に良い変化につながったかも。',
              timestamp: new Date('2024-06-01'),
              author: { name: 'ユーザーA', avatar: 'A' }
            },
            {
              id: 'c1b',
              text: '1ヶ月後の振り返り：新しいプロセスが定着して、部署全体のエラー率が30%減少。当時の落ち込みが今では貴重な学びだったと思えます。',
              timestamp: new Date('2024-06-15'),
              author: { name: 'ユーザーA', avatar: 'A' }
            }
          ],
          timestamp: new Date('2024-05-15'),
          tags: ['仕事', '失敗', '成長'],
          author: {
            name: 'ユーザーA',
            avatar: 'A'
          }
        },
        {
          id: '2',
          beforeText: '最近、将来への不安で夜眠れない日が続いています。このままで大丈夫なのか、自分の選択は正しいのか分からなくて...',
          aiSuggestions: [
            '不安を感じるのは、将来をしっかり考えている証拠です。今できることに集中して、一歩ずつ進んでいけば大丈夫ですよ。',
            '完璧な選択というものは存在しません。どの道を選んでも、あなたならその道で最善を尽くせるはずです。'
          ],
          userReframing: '確かに将来を考えているから不安になる。それって悪いことじゃないかも。今まで大変な時期も乗り越えてきたし、この不安も成長のサインなのかもしれない。一歩ずつでも前に進んでいこう。',
          aiAnalysis: '感情と事実の分離、強みの発見',
          aiPraise: '不安を成長のサインとして捉え直し、過去の経験から自分の力を見つけられていて素晴らしいです！前向きな視点転換ができていますね🌟',
          watchCount: 7,
          isBookmarked: true,
          comments: [
            {
              id: 'c2',
              text: '1週間後、小さなことでも前進していることに気づきました。不安は完全にはなくならないけど、それでも歩き続けることが大切だと実感しています。',
              timestamp: new Date('2024-06-17'),
              author: { name: 'あなた', avatar: '自' }
            },
            {
              id: 'c3',
              text: '今思うと、あの時の不安があったから今の自分がある。不安を感じることも成長の一部だったんだなと思えるようになりました。',
              timestamp: new Date('2024-06-20'),
              author: { name: 'あなた', avatar: '自' }
            }
          ],
          timestamp: new Date('2024-06-10'),
          tags: ['将来', '不安', '成長'],
          author: {
            name: 'あなた',
            avatar: '自'
          }
        },
        {
          id: '3',
          beforeText: '友達と喧嘩してしまった。相手から連絡が来ないのは、もう友達じゃないからかもしれない...',
          aiSuggestions: [
            '相手も同じように悩んでいる可能性があります。連絡が来ないのは嫌われたからではなく、何と言えばいいか分からないからかもしれませんね。',
            '長年の友情は一度の喧嘩で終わるほど脆いものではないはずです。冷静になって、お互いの気持ちを確認する時間かもしれません。'
          ],
          userReframing: '確かに、相手も連絡をどうしようか迷っているかもしれない。私たちは5年間友達だったし、お互いに大切な存在。少し時間を置いてから、素直に謝ってみようと思う。',
          aiAnalysis: '多角的な視点、感情と事実の分離',
          aiPraise: '相手の立場になって考え、長期的な関係性を大切にする視点が素晴らしいです！冷静な判断ができていますね💪',
          watchCount: 8,
          isBookmarked: true,
          comments: [],
          timestamp: new Date('2024-05-20'),
          tags: ['人間関係', '友達', '喧嘩'],
          author: {
            name: 'ユーザーB',
            avatar: 'B'
          }
        },
        {
          id: '4',
          beforeText: '転職活動がうまくいかない。面接で落ち続けて、自分には価値がないのかもしれない...',
          aiSuggestions: [
            '転職活動は運やタイミングも大きく影響します。スキルや経験は確実にあるのに、まだ合う会社に出会えていないだけかもしれません。',
            '面接での経験は全て次に活かせる貴重な練習になっています。回数を重ねるごとに上達していることに注目してみませんか？'
          ],
          userReframing: '確かに面接の回数を重ねるごとに、自分の強みを伝えるのが上手くなってきている。今の会社で身につけたスキルもたくさんある。きっと私を必要としてくれる会社があるはず。',
          aiAnalysis: '強みの発見、学習機会としての捉え直し',
          aiPraise: '自分の成長と強みをしっかり認識できていて素晴らしいです！前向きな姿勢が必ず良い結果につながりますよ🌟',
          watchCount: 15,
          isBookmarked: false,
          comments: [],
          timestamp: new Date('2024-06-05'),
          tags: ['転職', 'キャリア', '自己肯定感'],
          author: {
            name: 'ユーザーC',
            avatar: 'C'
          }
        }
      ];

      // 500ms後にデータを返す（API呼び出しを模擬）
      setTimeout(() => {
        const foundPost = samplePosts.find(p => p.id === postId);
        setPost(foundPost || null);
        setLoading(false);
      }, 500);
    };

    fetchPost();
  }, [postId]);

  // 見守る機能
  const handleWatch = () => {
    if (post) {
      setPost({ ...post, watchCount: post.watchCount + 1 });
    }
  };

  // ブックマーク機能
  const handleBookmark = () => {
    if (post) {
      setPost({ ...post, isBookmarked: !post.isBookmarked });
    }
  };

  // コメント追加
  const handleAddComment = () => {
    if (!post || !newComment.trim()) return;

    const comment: PostComment = {
      id: Date.now().toString(),
      text: newComment,
      timestamp: new Date(),
      author: { name: 'あなた', avatar: '自' }
    };

    setPost({
      ...post,
      comments: [...post.comments, comment]
    });

    setNewComment('');
    setCommentDialogOpen(false);
  };

  // コメント編集開始
  const handleEditComment = (commentId: string, currentText: string) => {
    setEditCommentId(commentId);
    setEditCommentText(currentText);
  };

  // コメント編集保存
  const handleSaveComment = () => {
    if (!post || !editCommentId || !editCommentText.trim()) return;

    setPost({
      ...post,
      comments: post.comments.map(comment =>
        comment.id === editCommentId
          ? { ...comment, text: editCommentText }
          : comment
      )
    });

    setEditCommentId(null);
    setEditCommentText('');
  };

  // コメント編集キャンセル
  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText('');
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography variant="h6">読み込み中...</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  if (!post) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box textAlign="center" py={8}>
            <Typography variant="h6" gutterBottom>
              投稿が見つかりません
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              指定された投稿は存在しないか、削除された可能性があります。
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => window.location.href = '/posts'}
              sx={{ mt: 2 }}
            >
              投稿一覧に戻る
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* ヘッダー */}
      <AppBar position="sticky" sx={{ bgcolor: 'secondary.main', color: 'text.primary' }}>
        <Toolbar>
          <IconButton 
            color="inherit" 
            onClick={() => window.location.href = '/posts'} 
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            投稿詳細
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={() => window.location.href = '/'}
          >
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* パンくずリスト */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link 
            href="/" 
            color="inherit" 
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
          >
            ホーム
          </Link>
          <Link 
            href="/posts" 
            color="inherit" 
            underline="hover"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/posts';
            }}
          >
            投稿一覧
          </Link>
          <Typography color="text.primary">投稿詳細</Typography>
        </Breadcrumbs>

        {/* 投稿詳細 */}
        <Card sx={{ mb: 3, border: '1px solid', borderColor: 'secondary.light' }}>
          <CardContent sx={{ p: 4 }}>
            {/* 投稿者情報 */}
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: 'secondary.main', color: 'text.primary', mr: 2, width: 56, height: 56 }}>
                {post.author.avatar}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.timestamp.toLocaleDateString('ja-JP')} {post.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>

            {/* タグ */}
            <Box mb={3}>
              {post.tags.map((tag, idx) => (
                <Chip 
                  key={idx} 
                  label={`#${tag}`} 
                  size="medium" 
                  sx={{ mr: 1, mb: 1, bgcolor: 'primary.light', fontSize: '0.9rem' }}
                />
              ))}
            </Box>

            {/* リフレーミング前 */}
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                💭 リフレーミング前の気持ち
              </Typography>
              <Paper sx={{ p: 3, bgcolor: 'secondary.light' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {post.beforeText}
                </Typography>
              </Paper>
            </Box>

            {/* AI提案 */}
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                <AutoAwesome sx={{ fontSize: 20, mr: 1 }} />
                AIからの提案
              </Typography>
              {post.aiSuggestions.map((suggestion, idx) => (
                <Paper key={idx} sx={{ p: 3, mb: 2, bgcolor: '#e8f5e8' }}>
                  <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                    💡 {suggestion}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* ユーザーのリフレーミング */}
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                ✨ リフレーミング後
              </Typography>
              <Paper sx={{ p: 3, bgcolor: 'primary.light' }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {post.userReframing}
                </Typography>
              </Paper>
            </Box>

            {/* AI分析とフィードバック */}
            <Alert severity="success" sx={{ mb: 3, p: 3 }}>
              <Typography variant="body1">
                <strong>📊 {post.aiAnalysis}</strong><br />
                <Box component="span" sx={{ fontSize: '1rem', mt: 1, display: 'block' }}>
                  {post.aiPraise}
                </Box>
              </Typography>
            </Alert>

            {/* アクション */}
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<VolunteerActivism />}
                  onClick={handleWatch}
                  sx={{ color: 'secondary.main', borderColor: 'secondary.main' }}
                >
                  見守った {post.watchCount}
                </Button>
                <Button
                  variant={post.isBookmarked ? 'contained' : 'outlined'}
                  startIcon={post.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  onClick={handleBookmark}
                  color="secondary"
                >
                  {post.isBookmarked ? 'ブックマーク済み' : 'ブックマーク'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* コメントセクション */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                💬 成長の記録・追加の気づき ({post.comments.length})
              </Typography>
              {/* 自分の投稿の場合のみコメント追加ボタンを表示 */}
              {post.author.name === 'あなた' && (
                <Button
                  variant="contained"
                  startIcon={<Comment />}
                  onClick={() => setCommentDialogOpen(true)}
                  color="secondary"
                >
                  気づきを追加
                </Button>
              )}
            </Box>

            {post.comments.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary">
                  まだコメントがありません
                </Typography>
                {post.author.name === 'あなた' ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    時間が経って新しい気づきがあったら追加してみましょう
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {post.author.name}さんの成長の記録をそっと見守りましょう
                  </Typography>
                )}
              </Paper>
            ) : (
              <Box>
                {/* すべてのコメントを表示（閲覧は誰でも可能） */}
                {post.comments.map((comment, index) => (
                  <Box key={comment.id}>
                    <Paper sx={{ p: 3, bgcolor: comment.author.name === 'あなた' ? 'primary.light' : 'grey.50' }}>
                      <Box display="flex" alignItems="flex-start" mb={2}>
                        <Avatar sx={{ bgcolor: 'secondary.main', color: 'text.primary', mr: 2 }}>
                          {comment.author.avatar}
                        </Avatar>
                        <Box flexGrow={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {comment.author.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" color="text.secondary">
                                {comment.timestamp.toLocaleString('ja-JP')}
                              </Typography>
                              {/* 編集ボタンは自分のコメントかつ自分の投稿の場合のみ表示 */}
                              {comment.author.name === 'あなた' && post.author.name === 'あなた' && editCommentId !== comment.id && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditComment(comment.id, comment.text)}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                          
                          {editCommentId === comment.id ? (
                            <Box>
                              <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={editCommentText}
                                onChange={(e) => setEditCommentText(e.target.value)}
                                sx={{ mb: 2 }}
                              />
                              <Box display="flex" gap={1}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={handleSaveComment}
                                  color="secondary"
                                >
                                  保存
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={handleCancelEdit}
                                >
                                  キャンセル
                                </Button>
                              </Box>
                            </Box>
                          ) : (
                            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                              {comment.text}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Paper>
                    {index < post.comments.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
                
                {/* 他人の投稿でコメントがある場合の見守りメッセージ */}
                {post.author.name !== 'あなた' && post.comments.length > 0 && (
                  <Box mt={3} p={2} sx={{ bgcolor: 'primary.light', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontStyle: 'italic' }}>
                      💖 {post.author.name}さんの成長の軌跡を温かく見守っています
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* コメント追加ダイアログ（自分の投稿の場合のみ） */}
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
              rows={4}
              label="時間が経って新しく気づいたことがあれば..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              helperText="思考の変化や成長を記録しましょう"
              sx={{ mt: 1 }}
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
              color="secondary"
              startIcon={<Send />}
            >
              追加する
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default PostDetailPage;