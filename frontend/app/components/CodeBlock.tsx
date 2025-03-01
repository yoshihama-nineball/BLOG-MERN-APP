import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Box, Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface CodeBlockProps {
  node: any
  inline: boolean
  className: string
  children: React.ReactNode[]
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '')
  const filename = node?.meta || '' // ファイル名を取得

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
    alert('コードがクリップボードにコピーされました！')
  }

  return (
    <Box sx={{ position: 'relative', marginBottom: '1em' }}>
      {filename && (
        <Box
          sx={{
            background: '#333',
            color: '#fff',
            padding: '0.5em 1em',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{filename}</span>
          <Button
            onClick={handleCopy}
            startIcon={<ContentCopyIcon />}
            sx={{ color: '#fff' }}
          >
            コピー
          </Button>
        </Box>
      )}
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match ? match[1] : ''}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  )
}

export default CodeBlock
