import React, { lazy, Suspense } from 'react';

const LazyCompareLinkPage = lazy(() => import('./CompareLinkPage'));

const CompareLinkPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCompareLinkPage {...props} />
  </Suspense>
);

export default CompareLinkPage;
