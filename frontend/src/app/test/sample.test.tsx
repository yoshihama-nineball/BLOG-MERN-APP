import { render, screen } from '@testing-library/react'
import { Sample } from '../sample'
import '@testing-library/jest-dom'

describe('test', () => {
  it('testsimasu', () => {
    render(<Sample />)
    const paragraphElement = screen.getByTestId('test-paragraph')
    expect(paragraphElement).toBeInTheDocument()
    expect(paragraphElement).toHaveTextContent('Hello')
  })
  it('test', () => {
    console.log('テストスイート');
    
  })
})
