import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 主なベースカラー
      light: '#63a4ff', // ライトカラー
      dark: '#004ba0', // ダークカラー
      contrastText: '#ffffff', // コントラストテキスト
    },
    secondary: {
      main: '#e53935', // 赤系のカラー
      light: '#ff6f60', // ライトカラー
      dark: '#ab000d', // ダークカラー
      contrastText: '#ffffff', // コントラストテキスト
    },
    background: {
      default: '#eaedf7', // 背景色
      paper: '#ffffff', // カードなどの背景色
    },
    text: {
      primary: '#333333', // 主なテキストカラー
      secondary: '#666666', // 副次的なテキストカラー
    },
  },
})

export default theme
