import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';

export function SignInComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      localStorage.setItem('token', token);
      console.log('Signed In', user, '; received token:', token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col p-10">
      <h3 className="font-bold text-3xl text-black p-8">
        Sign In To Your Account
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="text-black font-bold">
          user name:{' '}
          <input
            required
            name="username"
            type="text"
            className="form-input px-4 py-3 mb-4 rounded-full text-black"></input>
        </label>
        <br />
        <label className="text-black font-bold">
          password:{' '}
          <input
            required
            type="password"
            name="password"
            className="form-input px-4 py-3 mb-4 rounded-full text-black"
          />
        </label>
        <br />
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="btn bg-lilac mt-4 text-black font-bold">
            Sign In
          </button>
          <br />
        </div>
        <p className="text-black p-5">
          If you do not already have an account, click{' '}
          <Link to="/signup" className="link text-black">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
