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
