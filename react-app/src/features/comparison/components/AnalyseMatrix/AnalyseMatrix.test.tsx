import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AnalyseMatrix from './AnalyseMatrix';

describe('<AnalyseMatrix />', () => {
  test('it should mount', () => {
    render(<AnalyseMatrix urls={[]}/>);
    
    const comparisonList = screen.getByTestId('AnalyseMatrix');

    expect(comparisonList).toBeInTheDocument();
  });
});