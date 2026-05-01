import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the login screen first', async () => {
    render(<App />);
    const loginHeading = await screen.findByRole('heading', { name: /Welcome to JanMitra/i });
    expect(loginHeading).toBeInTheDocument();
  });

  it('allows user to login and see the app', async () => {
    render(<App />);
    const input = await screen.findByLabelText(/Please enter your name/i);
    const startBtn = await screen.findByRole('button', { name: /Start Learning/i });
    
    fireEvent.change(input, { target: { value: 'Test User' } });
    fireEvent.click(startBtn);

    const headingElement = await screen.findByRole('heading', { name: /जनमित्र गाइड/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('clicks next button and updates step', async () => {
    render(<App />);
    const input = await screen.findByLabelText(/Please enter your name/i);
    const startBtn = await screen.findByRole('button', { name: /Start Learning/i });
    fireEvent.change(input, { target: { value: 'Test User' } });
    fireEvent.click(startBtn);

    const nextBtn = await screen.findByRole('button', { name: /आगे/i });
    fireEvent.click(nextBtn);
    const newStepTitle = await screen.findByRole('heading', { name: /वोटर आईडी/i });
    expect(newStepTitle).toBeInTheDocument();
  });
});
