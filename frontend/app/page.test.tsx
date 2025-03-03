// app/page.test.tsx
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('トップページ', () => {
  it('App Router: Works with Server Components', () => {
    render(<Page />)

    // テキストが存在することを確認
    expect(screen.getByText('トップページ!!!★')).toBeInTheDocument()
  })
})
