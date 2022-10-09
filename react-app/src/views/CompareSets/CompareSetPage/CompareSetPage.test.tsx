import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompareSetPage from './CompareSetPage';

describe('<CompareSetPage />', () => {
  test('it should mount', () => {
    render(<CompareSetPage />);
    
    const compareSetPage = screen.getByTestId('CompareSetPage');

    expect(compareSetPage).toBeInTheDocument();
  });
});