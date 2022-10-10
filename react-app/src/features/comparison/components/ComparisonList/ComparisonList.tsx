import React, { FC } from 'react';
import './ComparisonList.scss';

interface ComparisonListProps {}

const ComparisonList: FC<ComparisonListProps> = () => (
  <div className="ComparisonList" data-testid="ComparisonList">
    ComparisonList Component
  </div>
);

export default ComparisonList;
