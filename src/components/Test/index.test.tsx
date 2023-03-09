import { render } from '@testing-library/react'
import { Test } from '.'

describe('Test', () => {
  it('should render', () => {
    const { getByText } = render(<Test />)
    expect(getByText('Test')).toBeInTheDocument()
  })
})
