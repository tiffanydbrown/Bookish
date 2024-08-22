import { FormEvent, useEffect, useState } from 'react';
import { TBRComponent } from '../components/TBRComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { TBR, fetchCreateTBR, fetchTBR, fetchUpdateTBR } from '../data';

export function NewTBRPage() {
  const TBREdit = useParams();
  const [post, setPost] = useState<TBR>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTBR() {
      try {
        if (!TBREdit.id) throw new Error('No id');
        const post = await fetchTBR(+TBREdit.id);
        setPost(post);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (!TBREdit.id) return;
    setIsLoading(true);
    loadTBR;
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error Loading TBR:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      if (TBREdit.id) {
        await fetchUpdateTBR(formJson as unknown as TBR);
      } else {
        console.log(formJson);
        await fetchCreateTBR(formJson as unknown as TBR);
      }
      navigate('/');
    } catch (err) {
      alert(`Error saving changes: ${error}`);
      console.error(error);
    }
  }
  return (
    <div className="bg-dark-lilac pb-10 pt-10">
      <form onSubmit={handleSubmit}>
        <TBRComponent tbr={post} />
        <div className="save p-10">
          <button className="btn bg-lilac text-black">Save</button>
        </div>
      </form>
    </div>
  );
}
