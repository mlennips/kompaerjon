import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.scss';
import Layout from './components/layout/Layout/Layout';
import ComparisonPage from './features/comparison/pages/ComparisonPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthService from './services/AuthService';

function App() {
  AuthService.checkLogin();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/users/:userId" element={<HomePage />} />
          <Route path="/users/:userId/comparisons" element={<main>Bald verfügbar (Iframe für Ziel-Seite?)</main>} />
          <Route path="/users/:userId/comparisons/:comparisonId" element={<ComparisonPage />} />
          <Route path="/users/:userId/comparisons/:comparisonId/entries/:entryId" element={<main>Bald verfügbar</main>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
