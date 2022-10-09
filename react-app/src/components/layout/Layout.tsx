import React, { FC } from 'react';
import { Outlet } from "react-router-dom";
import './Layout.scss';
import Header from './Header/Header';

interface LayoutProps { }

const Layout: FC<LayoutProps> = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
