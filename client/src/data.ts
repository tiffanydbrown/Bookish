export type UnsavedReview = {
  bookTitle: string;
  bookAuthor: string;
  series: string;
  publisher: string;
  genres: string;
  synopsis: string;
  review: string;
  reviewImage: string;
  rating: number;
};

export type Review = UnsavedReview & {
  bookReviewId: number;
  date: Date;
  reviewAuthor: number;
};

export async function fetchHome(): Promise<Review[]> {
  const res = await fetch('/api/bookReview');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchReview(bookReviewId: number): Promise<Review> {
  const res = await fetch(`/api/bookReview/${bookReviewId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchCreateReview(
  bookReview: UnsavedReview
): Promise<Review> {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bookReview),
  };
  const response = await fetch('/api/bookReview', options);
  if (!response.ok) throw new Error(`Bad Response ${response.status}`);
  return response.json();
}
