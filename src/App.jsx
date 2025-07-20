import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ClothListPage from './pages/ClothListPage';
import AddClothPage from './pages/AddClothPage';
import ClothDetailPage from './pages/ClothDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clothes" element={<ClothListPage />} />
            <Route path="/add-cloth" element={<AddClothPage />} />
            <Route path="/clothes/:id" element={<ClothDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;