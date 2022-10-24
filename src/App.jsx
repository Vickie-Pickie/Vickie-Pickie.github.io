import React from 'react';
import './App.css';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Index from './pages/Index';
import SearchResults from './pages/SearchResults';
import CoachSelect from './pages/CoachSelect';
import Passengers from './pages/Passengers';
import MainLayout from './pages/layouts/MainLayout';
import FinalPage from './pages/FinalPage';
import useScrollToTop from './hooks/useScrollTop';

function App() {
  useScrollToTop();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<MainLayout />} >
          <Route path="search-results" element={<SearchResults />} />
          <Route path="select-seats" element={<CoachSelect />} />
          <Route path="passengers" element={<Passengers />} />
        </Route>
        <Route path="final" element={<FinalPage />} />
      </Routes>
    </div>
  );
}

export default App;
