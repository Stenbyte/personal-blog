import "./Login.css";

export function LoginModal({ setOpenModal }: { setOpenModal: (state: boolean) => void }) {


  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type='email'
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-login">
              Login
            </button>
            <button type="button" className="btn-close" onClick={() => setOpenModal(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


