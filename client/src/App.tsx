import './App.css';

import { Header } from './components/Header';

import { Review } from './pages/Review';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="reviews" element={<Review />} />
        </Route>
      </Routes>
    </div>
  );
}
