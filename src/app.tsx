import { Route, Routes } from 'react-router-dom';

import Footer from './components/footer';
import Navbar from './components/navbar';
import FuelPage from './pages/fuel-page';
import HistoryPage from './pages/history-page';
import HomePage from './pages/home-page';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fuel" element={<FuelPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

