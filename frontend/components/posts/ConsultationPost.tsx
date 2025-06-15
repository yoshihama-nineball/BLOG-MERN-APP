'use client';

import {
  ArrowBack,
  AutoAwesome,
  CheckCircle,
  Home,
  Lightbulb,
  Psychology,
  Refresh,
  Send,
  TipsAndUpdates,
} from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Fade,
  IconButton,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

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

interface AISuggestion {
  type: 'reframing' | 'perspective' | 'action';
  title: string;
  content: string;
  explanation: string;
}

const ConsultationPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [consultation, setConsultation] = useState('');
  const [emotion, setEmotion] = useState('');
  const [situation, setSituation] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [userReframing, setUserReframing] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const emotionTags = [
    '不安', '悲しみ', '怒り', '焦り', '混乱', 
    '孤独感', 'ストレス', '自己嫌悪', '無力感', 'プレッシャー'
  ];

  const situationTags = [
    '仕事', '人間関係', '恋愛', '家族', '友人', 
    '学校', '将来', '健康', 'お金', 'キャリア'
  ];

  const steps = [
    '気持ちを整理する',
    'AIからのアドバイス',
    'あなたのリフレーミング',
    '完了'
  ];

  // AIアドバイス生成（模擬）
  const generateAIAdvice = (consultationText: string, emotions: string[], situations: string[]): AISuggestion[] => {
    const suggestions: AISuggestion[] = [
      {
        type: 'perspective',
        title: '視点を変えてみる',
        content: `今感じている${emotions[0] || '気持ち'}は、あなたが${situations[0] || '状況'}を真剣に考えている証拠です。この状況を別の角度から見てみませんか？`,
        explanation: '感情と事実を分離して、客観的な視点を持つことで新しい気づきが生まれます。'
      },
      {
        type: 'reframing',
        title: '成長の機会として捉える',
        content: 'この困難な状況は、あなたの内面的な成長と新しいスキルを身につける絶好の機会かもしれません。',
        explanation: '挑戦や困難は、個人的な成長のための重要なステップとして活用できます。'
      },
      {
        type: 'action',
        title: '小さなステップから始める',
        content: '今すぐにすべてを解決しようとせず、まずは一つ小さなことから始めてみましょう。それが変化への第一歩になります。',
        explanation: '大きな問題も小さな行動の積み重ねで解決できます。まずは今日できることを見つけてみましょう。'
      }
    ];

    return suggestions;
  };

  // ステップ1: 気持ちの整理完了
  const handleStep1Complete = () => {
    if (consultation.trim()) {
      setActiveStep(1);
      setIsLoading(true);
      
      // AIアドバイス生成（500ms後）
      setTimeout(() => {
        const suggestions = generateAIAdvice(consultation, selectedTags, selectedTags);
        setAiSuggestions(suggestions);
        setIsLoading(false);
      }, 1500);
    }
  };

  // ステップ2: リフレーミング画面へ
  const handleStep2Complete = () => {
    setActiveStep(2);
  };

  // ステップ3: 投稿作成
  const handleCreatePost = () => {
    setIsLoading(true);
    // 投稿作成の模擬処理
    setTimeout(() => {
      setActiveStep(3);
      setCompleted(true);
      setIsLoading(false);
    }, 1000);
  };

  // タグの選択/解除
  const handleTagToggle = (tag: string, isEmotion: boolean) => {
    const currentTags = selectedTags;
    const tagExists = currentTags.includes(tag);
    
    if (tagExists) {
      setSelectedTags(currentTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...currentTags, tag]);
    }
  };

  // リセット
  const handleReset = () => {
    setActiveStep(0);
    setConsultation('');
    setEmotion('');
    setSituation('');
    setAiSuggestions([]);
    setUserReframing('');
    setSelectedTags([]);
    setCompleted(false);
  };

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
            💭 AIリフレーミング相談
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
          <Typography color="text.primary">AIリフレーミング相談</Typography>
        </Breadcrumbs>

        {/* メインコンテンツ */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* ステッパー */}
            <Stepper activeStep={activeStep} orientation="vertical">
              {/* ステップ1: 気持ちの整理 */}
              <Step>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    💭 今の気持ちを聞かせてください
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      どんな小さなことでも大丈夫です。今感じているもやもやした気持ちを、そのまま書いてみてください。
                    </Typography>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="今の気持ちや状況を自由に書いてください"
                      value={consultation}
                      onChange={(e) => setConsultation(e.target.value)}
                      sx={{ mb: 3 }}
                      placeholder="例: 仕事でミスをしてしまって、周りに迷惑をかけてしまった。自分はダメな人間だと思ってしまう..."
                    />

                    {/* 感情タグ */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        今の感情（該当するものを選んでください）
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {emotionTags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            onClick={() => handleTagToggle(tag, true)}
                            color={selectedTags.includes(tag) ? 'secondary' : 'default'}
                            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                            sx={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* 状況タグ */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        関連する分野（該当するものを選んでください）
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {situationTags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            onClick={() => handleTagToggle(tag, false)}
                            color={selectedTags.includes(tag) ? 'primary' : 'default'}
                            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                            sx={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleStep1Complete}
                      disabled={!consultation.trim()}
                      startIcon={<AutoAwesome />}
                      size="large"
                    >
                      AIからアドバイスをもらう
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              {/* ステップ2: AIアドバイス */}
              <Step>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🤖 AIからのアドバイス
                  </Typography>
                </StepLabel>
                <StepContent>
                  {isLoading ? (
                    <Box display="flex" alignItems="center" justifyContent="center" py={4}>
                      <CircularProgress color="secondary" sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        あなたの気持ちを分析してアドバイスを考えています...
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        あなたの状況を分析して、3つの角度からアドバイスを用意しました。
                      </Typography>
                      
                      {aiSuggestions.map((suggestion, index) => (
                        <Fade in={true} timeout={500 * (index + 1)} key={index}>
                          <Card sx={{ mb: 2, border: '1px solid', borderColor: 'primary.light' }}>
                            <CardContent sx={{ p: 3 }}>
                              <Box display="flex" alignItems="center" mb={2}>
                                {suggestion.type === 'perspective' && <Psychology color="secondary" sx={{ mr: 1 }} />}
                                {suggestion.type === 'reframing' && <TipsAndUpdates color="secondary" sx={{ mr: 1 }} />}
                                {suggestion.type === 'action' && <Lightbulb color="secondary" sx={{ mr: 1 }} />}
                                <Typography variant="h6" fontWeight={600}>
                                  {suggestion.title}
                                </Typography>
                              </Box>
                              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                                {suggestion.content}
                              </Typography>
                              <Alert severity="info" sx={{ bgcolor: 'primary.light' }}>
                                <Typography variant="body2">
                                  💡 <strong>ポイント:</strong> {suggestion.explanation}
                                </Typography>
                              </Alert>
                            </CardContent>
                          </Card>
                        </Fade>
                      ))}

                      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleStep2Complete}
                          startIcon={<Send />}
                          size="large"
                        >
                          自分なりのリフレーミングを書く
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                              const newSuggestions = generateAIAdvice(consultation, selectedTags, selectedTags);
                              setAiSuggestions(newSuggestions);
                              setIsLoading(false);
                            }, 1000);
                          }}
                          startIcon={<Refresh />}
                        >
                          別のアドバイスを見る
                        </Button>
                      </Box>
                    </Box>
                  )}
                </StepContent>
              </Step>

              {/* ステップ3: ユーザーのリフレーミング */}
              <Step>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ✨ あなたのリフレーミング
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      AIのアドバイスを参考に、あなた自身の言葉で考えを整理してみてください。
                    </Typography>
                    
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="あなたなりのリフレーミングを書いてください"
                      value={userReframing}
                      onChange={(e) => setUserReframing(e.target.value)}
                      sx={{ mb: 3 }}
                      helperText="AIの提案を参考にしながら、あなた自身の気持ちや考えを整理してみましょう"
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreatePost}
                        disabled={!userReframing.trim() || isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} /> : <CheckCircle />}
                        size="large"
                      >
                        {isLoading ? '投稿を作成中...' : '投稿として保存する'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setActiveStep(1)}
                      >
                        AIアドバイスに戻る
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>

              {/* ステップ4: 完了 */}
              <Step>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🎉 完了しました！
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <Typography variant="body1">
                      <strong>素晴らしいです！</strong><br />
                      あなたのリフレーミングが投稿として保存されました。心の成長の記録として、いつでも見返すことができます。
                    </Typography>
                  </Alert>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => window.location.href = '/posts'}
                      size="large"
                    >
                      投稿一覧を見る
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      startIcon={<Refresh />}
                    >
                      もう一度相談する
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => window.location.href = '/'}
                    >
                      ホームに戻る
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </CardContent>
        </Card>

        {/* サイドバー的な情報 */}
        {activeStep < 3 && (
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💡 リフレーミングとは？
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                同じ出来事でも、見方や捉え方を変えることで、気持ちや行動を前向きに変化させる心理技法です。
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                📚 主なポイント:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 感情と事実を分けて考える<br />
                • 別の視点から状況を見直す<br />
                • 困難を成長の機会として捉える<br />
                • 小さな成功や強みに注目する
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ConsultationPage;