import { Carousel } from '../components/Carousel';
import { ReviewSnippet } from '../components/ReviewSnippet';

export function Home() {
  return (
    <div className="bg-space-cadet">
      <Carousel />
      <ReviewSnippet />
    </div>
  );
}
