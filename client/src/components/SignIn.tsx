export function SignInComponent() {
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
          <h3 className="font-bold text-lg">Sign In To Your Account</h3>
          <label className="text-anti-flash-white">
            User Name:{' '}
            <input
              type="text"
              name="userName"
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <br />
          <label className="text-anti-flash-white">
            Password:{' '}
            <input
              type="text"
              name="hashedPassword"
              className="input input-ghost w-full max-w-xs"
            />
          </label>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Sign In</button>
            </form>
          </div>
          <p>
            If you do not have an account, click <a>Sign Up</a>
          </p>
        </div>
      </dialog>
    </div>
  );
}
