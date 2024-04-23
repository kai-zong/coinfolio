import { render, screen } from '@testing-library/react'
import NotFound from '../components/NotFound'

describe('App', () => {
  it('renders the App component', () => {
    render(<NotFound />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})