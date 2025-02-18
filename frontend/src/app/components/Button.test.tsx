import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render the button with the correct label', () => {
    render(<Button onClick={() => {}} label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} label="Click me" />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
