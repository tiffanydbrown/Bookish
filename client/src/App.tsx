import './App.css';
import { Home } from './pages/Home';
import { Header } from './components/Header';

import { Review } from './pages/Review';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="reviews" element={<Review />} />
        </Route>
      </Routes>
    </div>
  );
}
