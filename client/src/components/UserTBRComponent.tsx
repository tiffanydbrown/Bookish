import { useEffect, useState } from 'react';
import { TBR, fetchTBRReview } from '../data';
import { useParams } from 'react-router-dom';

export function UserTBRComponent() {
  const [tbrPosts, setTBRPosts] = useState<TBR[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const userID = useParams();

  useEffect(() => {
    async function loadTBR() {
      try {
        if (!userID) throw new Error('No User ID');
        const tbrPosts = await fetchTBRReview();
        setTBRPosts(tbrPosts);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadTBR();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading TBR Page:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  return (
    <div className="tbr flex flex-wrap m-8">
      {tbrPosts?.map((tbr, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <TBRCard tbr={tbr} />
        </div>
      ))}
    </div>
  );
}

type CardProps = {
  tbr: TBR;
};

function TBRCard({ tbr }: CardProps) {
  const { TBRImage, bookTitleTBR, bookAuthorTBR, releaseDate } = tbr;
  return (
    <>
      <figure className="px-10 pt-10">
        <img src={TBRImage} alt={bookTitleTBR} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{bookTitleTBR}</h2>
        <h3>Author: {bookAuthorTBR}</h3>
        <h4>Release Date: {new Date(releaseDate).toLocaleDateString()}</h4>
      </div>
    </>
  );
}
