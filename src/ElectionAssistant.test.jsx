import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ElectionAssistant from './ElectionAssistant';

describe('ElectionAssistant Component', () => {
  it('renders the initial step correctly', () => {
    render(<ElectionAssistant />);
    
    // Check if main title exists (Hindi is default)
    expect(screen.getByText('जनमित्र गाइड')).toBeInTheDocument(); 
    
    // Check if intro step (Why Vote) is rendered without the zero
    expect(screen.getByText('वोट क्यों दें?')).toBeInTheDocument();
  });

  it('can navigate to the next step', () => {
    render(<ElectionAssistant />);
    
    // Find Next button
    const nextButton = screen.getByRole('button', { name: /आगे/i });
    fireEvent.click(nextButton);
    
    // Check if it moved to Step 1 (Voter ID) without the number 1
    expect(screen.getByText('वोटर आईडी')).toBeInTheDocument();
  });

  it('can change languages', () => {
    render(<ElectionAssistant />);
    
    // Find Language Selector
    const languageSelect = screen.getByRole('combobox', { name: /Select Language/i });
    
    // Change to English
    fireEvent.change(languageSelect, { target: { value: 'en' } });
    
    // Check if English text is rendered
    expect(screen.getByText('JanMitra Guide')).toBeInTheDocument();
    expect(screen.getByText('Why Vote?')).toBeInTheDocument();
  });
});
