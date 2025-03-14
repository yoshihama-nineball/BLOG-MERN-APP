'use client'
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      {!isMobile && (
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} BLOG MERN APP -
              MERNのブログプラットフォームアプリ
            </Typography>
          </Container>
        </Box>
      )}
    </>
  )
}

export default Footer
