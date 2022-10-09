import React, { FC } from 'react';
import './NotFoundPage.scss';

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = () => (
  <div className="NotFoundPage" data-testid="NotFoundPage">
    NotFoundPage Component
  </div>
);

export default NotFoundPage;
