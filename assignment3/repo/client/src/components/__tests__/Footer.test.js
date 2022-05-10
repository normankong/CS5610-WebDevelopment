import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('Check Tag exist', async () => {
    const { container } = render(<Footer />)
    const h1Tag = container.querySelector('h1')
    expect(h1Tag).toBeInTheDocument();
    expect(h1Tag.textContent).toBe('Investment Portfolio Tracker');
});