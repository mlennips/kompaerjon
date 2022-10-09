import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompareLinkPage from './CompareLinkPage';

describe('<CompareLinkPage />', () => {
  test('it should mount', () => {
    render(<CompareLinkPage />);
    
    const compareLinkPage = screen.getByTestId('CompareLinkPage');

    expect(compareLinkPage).toBeInTheDocument();
  });
});