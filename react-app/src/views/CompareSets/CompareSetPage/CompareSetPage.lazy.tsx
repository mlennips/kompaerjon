import React, { lazy, Suspense } from 'react';

const LazyCompareSetPage = lazy(() => import('./CompareSetPage'));

const CompareSetPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCompareSetPage {...props} />
  </Suspense>
);

export default CompareSetPage;
