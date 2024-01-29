import './App.css';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { NewReviewPage } from './pages/NewReview';
import { ReviewPage } from './pages/Reviews';
import { Post } from './pages/Post';
import { Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { About } from './pages/About';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="reviews" element={<ReviewPage />} />
          <Route path="newReviews" element={<NewReviewPage />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="about" element={<About />} />
          <Route path="reviews/:id" element={<NewReviewPage />} />
        </Route>
      </Routes>
    </div>
  );
}
