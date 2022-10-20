import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnalyseMatrix from './AnalyseMatrix';

describe('<AnalyseMatrix />', () => {
  test('it should mount', () => {
    render(<AnalyseMatrix comparisonId='1' />);
    
    const comparisonList = screen.getByTestId('AnalyseMatrix');

    expect(comparisonList).toBeInTheDocument();
  });
});