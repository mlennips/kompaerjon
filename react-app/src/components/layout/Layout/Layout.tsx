import React, { FC } from 'react';
import { Outlet } from "react-router-dom";
import Header from '../Header/Header';
import './Layout.scss';

interface LayoutProps { }

const Layout: FC<LayoutProps> = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
