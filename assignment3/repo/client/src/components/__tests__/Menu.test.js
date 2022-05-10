import { render, screen } from '@testing-library/react';
import Menu from '../Menu';
import { MemoryRouter } from 'react-router-dom'

test('Check Tag exist', async () => {
    const { container } = render(<MemoryRouter><Menu /></MemoryRouter>)
    const tag = screen.getByText("Dashboard");
    expect(tag).toBeInTheDocument();
});