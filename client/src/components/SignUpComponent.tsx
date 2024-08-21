import { Link, useNavigate } from 'react-router-dom';
import { type FormEvent, useState } from 'react';

export function SignUpComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      navigate('/signin');
      console.log('Registered', user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col p-10">
      <h3 className="font-bold text-3xl text-black p-8">
        Sign Up For An Account
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="text-black font-bold">
          Create a user name:{' '}
          <input
            required
            type="text"
            name="username"
            className="form-input px-4 py-3 mb-4 rounded-full text-black"></input>
        </label>
        <br />
        <label className="text-black font-bold">
          Create a password:{' '}
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
            Create Account
          </button>
          <br />
        </div>
        <p className="text-black p-5">
          If you already have an account, click{' '}
          <Link to="/signin" className="link text-black">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
