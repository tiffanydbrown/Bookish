import { useEffect, useState } from 'react';
import { PostInfo } from '../components/PostInfo';
import { fetchReview, type Review } from '../data';
import { useParams } from 'react-router-dom';
import { PostReview } from '../components/PostReview';
import { ReviewRating } from '../components/ReviewRating';

export function Post() {
  const [post, setPost] = useState<Review>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const bookPost = useParams();

  //make fetch as in ReviewSnippet
  //API to single post
  useEffect(() => {
    async function loadReview() {
      try {
        if (!bookPost.id) throw new Error('No id');
        const post = await fetchReview(+bookPost.id);
        setPost(post);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadReview();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error || !post)
    return (
      <div>
        Error Loading Review:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  return (
    <div className="bg-space-cadet">
      <PostInfo review={post} />
      <PostReview bookReview={post} />
      <br />
      <ReviewRating review={post} />
    </div>
  );
}