export function SignUpComponent() {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* This Button code is for the sign in link in the header. */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById('my_modal_5').showModal()}>
        Sign In / Sign Up
      </button> */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign Up For An Account</h3>
          <label className="text-anti-flash-white">
            Create a user name:{' '}
            <input
              type="text"
              name="userName"
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Create a password:{' '}
            <input
              type="text"
              name="hashedPassword"
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Create Account</button>
            </form>
          </div>
          <p>
            If you already have an account, click <a>Sign In</a>
          </p>
        </div>
      </dialog>
    </div>
  );
}
