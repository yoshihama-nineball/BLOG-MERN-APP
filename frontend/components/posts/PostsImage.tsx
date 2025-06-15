'use client';

import {
  AccessTime,
  Add,
  AutoAwesome,
  Bookmark,
  BookmarkBorder,
  Comment,
  FavoriteBorder,
  Home,
  Search,
  Send,
  Sort,
  TrendingUp
} from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
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
  Fab,
  Fade,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
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
  comments: Comment[];
  timestamp: Date;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [beforeText, setBeforeText] = useState('');
  const [userReframing, setUserReframing] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = useState(0);

  // サンプルデータの生成
  useEffect(() => {
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
            timestamp: new Date('2024-06-01')
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
        comments: [],
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
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  // 検索とフィルタリング
  useEffect(() => {
    let filtered = posts;

    // 検索
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.beforeText.includes(searchTerm) ||
        post.userReframing.includes(searchTerm) ||
        post.tags.some(tag => tag.includes(searchTerm))
      );
    }

    // ソート
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.watchCount - a.watchCount);
        break;
    }

    // タブフィルタ
    switch (tabValue) {
      case 1: // 自分の投稿
        filtered = filtered.filter(post => post.author.name === 'あなた');
        break;
      case 2: // ブックマーク
        filtered = filtered.filter(post => post.isBookmarked);
        break;
      case 3: // 人気
        filtered = filtered.filter(post => post.watchCount > 10);
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, sortBy, tabValue]);

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
      watchCount: Math.floor(Math.random() * 3) + 1,
      isBookmarked: false,
      comments: [],
      timestamp: new Date(),
      tags: ['新規投稿'],
      author: {
        name: 'あなた',
        avatar: '自'
      }
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
      
      {/* ヘッダー */}
      <AppBar position="sticky" sx={{ bgcolor: 'secondary.main', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            みかた 💕
          </Typography>
          <IconButton color="inherit" href="/">
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* 検索・フィルター */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box display="flex" gap={2} mb={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="投稿を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
            <Button
              variant="outlined"
              startIcon={<Sort />}
              onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            >
              {sortBy === 'newest' ? '新しい順' : 
               sortBy === 'oldest' ? '古い順' : '人気順'}
            </Button>
          </Box>
          
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="すべて" />
            <Tab label="自分の投稿" />
            <Tab label="ブックマーク" />
            <Tab label="人気の投稿" />
          </Tabs>
        </Paper>

        {/* ソートメニュー */}
        <Menu
          anchorEl={filterMenuAnchor}
          open={Boolean(filterMenuAnchor)}
          onClose={() => setFilterMenuAnchor(null)}
        >
          <MenuItem onClick={() => { setSortBy('newest'); setFilterMenuAnchor(null); }}>
            <AccessTime sx={{ mr: 1 }} /> 新しい順
          </MenuItem>
          <MenuItem onClick={() => { setSortBy('oldest'); setFilterMenuAnchor(null); }}>
            <AccessTime sx={{ mr: 1 }} /> 古い順
          </MenuItem>
          <MenuItem onClick={() => { setSortBy('popular'); setFilterMenuAnchor(null); }}>
            <TrendingUp sx={{ mr: 1 }} /> 人気順
          </MenuItem>
        </Menu>

        {/* 投稿リスト */}
        <Box sx={{ mb: 10 }}>
          {filteredPosts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.light' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm || tabValue > 0 ? '該当する投稿がありません' : 'まだ投稿がありません'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || tabValue > 0 ? 
                  '検索条件を変更してみてください' : 
                  '右下のボタンから、あなたの気持ちを投稿してみませんか？'
                }
              </Typography>
            </Paper>
          ) : (
            filteredPosts.map((post, index) => (
              <Fade in={true} timeout={300 * (index + 1)} key={post.id}>
                <Card 
                  sx={{ 
                    mb: 3, 
                    border: '1px solid', 
                    borderColor: 'secondary.light',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                  onClick={() => window.location.href = `/posts/${post.id}`}
                >
                  <CardContent>
                    {/* 投稿者情報 */}
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'secondary.main', color: 'text.primary', mr: 2 }}>
                        {post.author.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {post.author.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.timestamp.toLocaleDateString('ja-JP')} {post.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Box>
                    </Box>

                    {/* タグ */}
                    <Box mb={2}>
                      {post.tags.map((tag, idx) => (
                        <Chip 
                          key={idx} 
                          label={`#${tag}`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1, bgcolor: 'primary.light' }}
                        />
                      ))}
                    </Box>

                    {/* リフレーミング前 */}
                    <Box mb={2}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        💭 リフレーミング前の気持ち
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: 'secondary.light' }}>
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
                        ✨ リフレーミング後
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: 'primary.light' }}>
                        <Typography variant="body1">
                          {post.userReframing}
                        </Typography>
                      </Paper>
                    </Box>

                    {/* AI分析とフィードバック */}
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>📊 {post.aiAnalysis}</strong><br />
                        {post.aiPraise}
                      </Typography>
                    </Alert>

                    {/* アクション */}
                    <Box 
                      display="flex" 
                      justifyContent="space-between" 
                      alignItems="center"
                      onClick={(e) => e.stopPropagation()} // カードクリックを無効化
                    >
                      <Box display="flex" gap={1}>
                        <Button
                          size="small"
                          startIcon={<FavoriteBorder />}
                          onClick={() => handleWatch(post.id)}
                          sx={{ color: 'secondary.main' }}
                        >
                          見守った {post.watchCount}
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => handleBookmark(post.id)}
                          color={post.isBookmarked ? 'secondary' : 'default'}
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
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => window.location.href = `/posts/${post.id}`}
                        sx={{ minWidth: 'auto' }}
                      >
                        詳細を見る
                      </Button>
                    </Box>

                    {/* コメント表示 */}
                    {post.comments.length > 0 && (
                      <Box mt={2}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          💬 後から追加された気づき
                        </Typography>
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
          color="secondary"
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
                  <Paper key={idx} sx={{ p: 2, mb: 1, bgcolor: 'primary.light' }}>
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
              color="secondary"
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
              color="secondary"
            >
              追加する
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default PostsPage;