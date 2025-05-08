import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import { AppRoutes } from '@routes/index';

export function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
