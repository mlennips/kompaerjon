import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComparisonPreview from './ComparisonPreview';

describe('<ComparisonList />', () => {
  test('it should mount', () => {
    render(<ComparisonPreview userId="1" />);
    
    const comparisonList = screen.getByTestId('ComparisonPreview');

    expect(comparisonList).toBeInTheDocument();
  });
});