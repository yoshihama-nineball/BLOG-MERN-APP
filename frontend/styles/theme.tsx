import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7ac142', // 優しい黄緑をメインカラーに
      light: '#a0d66d', // より明るい緑
      dark: '#5a9320', // より暗い緑
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8fd3c7', // 柔らかいティール系の色を追加
      light: '#b4e3da', // ライトカラー
      dark: '#63a399', // ダークカラー
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f9e0', // より黄色みのある薄い背景色
      paper: '#ffffff',
    },
    neutral: {
      main: '#9e9e9e',
      light: '#cfcfcf',
      dark: '#707070',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#3c4c34', // 緑に合うダークテキスト
      secondary: '#6b7d63', // 緑に合う薄めのテキスト
    },
    // グラデーション用のカスタムカラー
    // MUIにはデフォルトでグラデーションの設定がないため、CSSで使う用の色を定義
    customGradient: {
      start: '#f2f7cf', // より黄色みのある薄い色（グラデーション開始色）
      middle: '#d9ecb0', // 黄色みを増した中間色
      end: '#a0d66d', // 濃い目の黄緑（グラデーション終了色）
    },
  },
  // グローバルなCSSの上書き
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background: linear-gradient(135deg, #f2f7cf 0%, #d9ecb0 50%, #a0d66d 100%);
          background-attachment: fixed;
        }
        
        .gradient-card {
          background: linear-gradient(135deg, #fcfde8 0%, #f2f7cf 100%);
          border-radius: 16px;
        }
        
        .circle-button {
          background: white;
          border-radius: 50%;
          padding: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        
        .circle-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.12);
        }
      `,
    },
  },
  shape: {
    borderRadius: 12, // 全体的に少し丸みを持たせる
  },
  typography: {
    fontFamily:
      '"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
})

// TypeScriptの型定義を拡張
declare module '@mui/material/styles' {
  interface Palette {
    customGradient: {
      start: string
      middle: string
      end: string
    }
    neutral: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
  }

  interface PaletteOptions {
    customGradient?: {
      start: string
      middle: string
      end: string
    }
    neutral?: {
      main: string
      light: string
      dark: string
      contrastText: string
    }
  }
}

// Buttonコンポーネントでneutralカラーを使えるようにする
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// IconButtonコンポーネントでneutralカラーを使えるようにする
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

export default theme
