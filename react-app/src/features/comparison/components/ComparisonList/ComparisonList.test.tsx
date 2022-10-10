import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ComparisonList from './ComparisonList';

describe('<ComparisonList />', () => {
  test('it should mount', () => {
    render(<ComparisonList />);
    
    const comparisonList = screen.getByTestId('ComparisonList');

    expect(comparisonList).toBeInTheDocument();
  });
});