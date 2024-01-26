import { Link } from 'react-router-dom';

export function SignInComponent() {
  return (
    <div className="flex flex-col p-10">
      <h3 className="font-bold text-3xl text-fire-engine-red p-8">
        Sign In To Your Account
      </h3>
      <label className="text-anti-flash-white font-bold">
        user name:{' '}
        <input
          type="text"
          className="form-input px-4 py-3 rounded-full text-space-cadet"></input>
      </label>
      <br />
      <label className="text-anti-flash-white font-bold">
        password:{' '}
        <input
          type="password"
          name="hashedPassword"
          className="form-input px-4 py-3 rounded-full text-space-cadet"
        />
      </label>
      <br />
      <div className="flex justify-center">
        <button className="btn bg-fire-engine-red text-anti-flash-white font-bold">
          Sign In
        </button>
        <br />
      </div>
      <p className="text-cool-gray p-5">
        If you do not already have an account, click{' '}
        <Link to="/signup" className="link text-fire-engine-red">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
