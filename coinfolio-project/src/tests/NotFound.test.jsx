import { render, screen } from '@testing-library/react'
import NotFound from '../components/NotFound'

test('NotFound Component: Renders the heading with \'404: Not Found\'', () => {
    render(<NotFound />);
    // Search for an h1 element that contains the specific text
    expect(screen.getByRole('heading', { name: '404: Not Found' })).toBeInTheDocument();
});