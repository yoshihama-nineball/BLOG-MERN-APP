'use client'

/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Home as HomeIcon } from '@mui/icons-material'
import { Button } from '@mui/material'
import PostsList from './posts/page'

const buttonStyle = css`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`

const StyledButton = styled.button`
  ${buttonStyle}
`

const ButtonComponent: React.FC = () => {
  return (
    <>
      <StyledButton>Click Me!</StyledButton>
      <HomeIcon />
      <Button>MUIのボタン</Button>
      <PostsList />
    </>
  )
}

export default ButtonComponent
