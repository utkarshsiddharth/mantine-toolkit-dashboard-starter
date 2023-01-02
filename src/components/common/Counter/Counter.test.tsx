import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import Counter from './Counter'

describe('Testing Counter Component', () => {
  const incrementBy = 1
  const decrementBy = 2
  // Arrange
  beforeEach(() => {
    render(
      <Counter
        incrementBy={incrementBy}
        decrementBy={decrementBy}
        title="Counter"
      />
    )
  })
  it('Title should be correct', () => {
    // Expect
    expect(screen.getByLabelText('counter title')).toHaveTextContent('Counter')
  })
  it('Should start with 0', () => {
    // Expect
    expect(
      screen.getByRole('heading', {
        level: 3
      })
    ).toHaveTextContent('0')
  })
  it('should have a button with content: +', () => {
    // Expect
    expect(
      screen.getByRole('button', {
        name: /increment/i
      })
    ).toHaveTextContent('+')
  })
  it('should have a button with content: -', () => {
    // Expect
    expect(screen.getByLabelText(/decrement/i)).toHaveTextContent('-')
  })
  it('should decrement the count on - click', () => {
    const countEl = screen.getByRole('heading', {
      level: 3
    })
    const count = Number(countEl.textContent)
    const decrementButton = screen.getByRole('button', {
      name: /decrement/i
    })
    fireEvent.click(decrementButton)
    expect(countEl).toHaveTextContent(`${count - decrementBy}`)
    expect(countEl).toHaveClass('text-red-500')
  })
  it('should increment the count on + click', () => {
    const countEl = screen.getByRole('heading', {
      level: 3
    })
    const count = Number(countEl.textContent)
    const incrementButton = screen.getByRole('button', {
      name: /increment/i
    })
    fireEvent.click(incrementButton)
    expect(countEl).toHaveTextContent(`${count + incrementBy}`)
    expect(countEl).toHaveClass('text-blue-500')
  })
})
