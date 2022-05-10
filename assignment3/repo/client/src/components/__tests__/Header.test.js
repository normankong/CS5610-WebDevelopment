import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom'

test('Check Tag exist', async () => {
    const { container } = render(<MemoryRouter><Header /></MemoryRouter>)
    const tag = screen.getByText("Investment Portfolio Tracker");
});