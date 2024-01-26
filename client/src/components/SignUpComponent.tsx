export function SignUpComponent() {
  return (
    <div className="flex flex-col p-10">
      <h3 className="font-bold text-3xl text-fire-engine-red p-8">
        Sign Up For An Account
      </h3>
      <label className="text-anti-flash-white font-bold">
        Create a user name:{' '}
        <input
          type="text"
          className="form-input px-4 py-3 rounded-full text-space-cadet"></input>
      </label>
      <br />
      <label className="text-anti-flash-white font-bold">
        Create a password:{' '}
        <input
          type="password"
          name="hashedPassword"
          className="form-input px-4 py-3 rounded-full text-space-cadet"
        />
      </label>
      <br />
      <div className="flex justify-center">
        <button className="btn bg-fire-engine-red text-anti-flash-white font-bold">
          Create Account
        </button>
        <br />
      </div>
      <p className="text-cool-gray p-5">
        If you already have an account, click{' '}
        <a className="link text-fire-engine-red">Sign In</a>
      </p>
    </div>
  );
}
