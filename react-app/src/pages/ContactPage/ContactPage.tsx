import React, { FC } from 'react';
import './ContactPage.scss';

interface ContactPageProps {}

const ContactPage: FC<ContactPageProps> = () => (
  <div className="ContactPage" data-testid="ContactPage">
    ContactPage Component
  </div>
);

export default ContactPage;
