import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactPage from './ContactPage';

describe('<ContactPage />', () => {
  test('it should mount', () => {
    render(<ContactPage />);
    
    const contactPage = screen.getByTestId('ContactPage');

    expect(contactPage).toBeInTheDocument();
  });
});