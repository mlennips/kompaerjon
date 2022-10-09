import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.scss';
import Layout from './components/layout/Layout';
import CompareSetPage from './views/CompareSets/CompareSetPage/CompareSetPage';
import ContactPage from './views/ContactPage/ContactPage';
import HomePage from './views/HomePage/HomePage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/comparesets" element={<CompareSetPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
