import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Homepage } from './pages/Homepage';
import { Universities } from './pages/Universities';
import { UniversityDetail } from './pages/UniversityDetail';
import { Chatbot } from './pages/Chatbot';
import { About } from './pages/About';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/university/:id" element={<UniversityDetail />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}