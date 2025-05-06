import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import { Homepage } from '@pages/Homepage';
import { Universities } from '@pages/Universities';
import { UniversityDetail } from '@pages/UniversityDetail';
import { Chatbot } from '@pages/Chatbot';
import { About } from '@pages/About';
import { Login } from '@pages/Login';
import { Register } from '@pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/university/:id" element={<UniversityDetail />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}
