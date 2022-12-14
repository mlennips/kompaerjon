import React from 'react';
import { Routes, Route, BrowserRouter, useParams } from 'react-router-dom';

import './App.scss';
import Layout from './components/layout/Layout/Layout';
import AuthProvider from './context/AuthContextProvider';
import ComparisonPage from './features/comparison/pages/ComparisonPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {    
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
