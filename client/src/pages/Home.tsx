import { Carousel } from '../components/Carousel';
import { ReviewSnippet } from '../components/ReviewSnippet';

export function Home() {
  return (
    <div className="bg-blue pb-10">
      <Carousel />
      <ReviewSnippet />
    </div>
  );
}
