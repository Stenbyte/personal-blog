import { useState } from "react";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function LoginModal({ setOpenModal }: { setOpenModal: (state: boolean) => void }) {
  const [signUp, setSignUp] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(false);


  const mutattion = useMutation({
    mutationFn: (user: { email: string, password: string }) => {
      return axios.post('http://localhost:4000/create-user', user)
    },
    onSuccess: (data) => {
      if (data) {
        setLoading(false);
      }
    },
    onError: (error) => {
      if (error) {
        setLoading(false);
      }
    }
  })

  const handleSubmit = () => {
    const user = {
      email: emailValue,
      password: passwordValue
    }
    setLoading(true);
    mutattion.mutate(user)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {loading ? 'Loading' :
          <>
            <h2>{signUp ? "Sign up" : "Login"}</h2>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type='email'
                  id="email"
                  placeholder="Enter your email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                {emailValue.includes('@') ? '' : < p >Email is required</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                {passwordValue.length < 6 ? <p>Password is required</p> : ''}
              </div>
              <div className="modal-actions">
                <button type='button' className="btn-login" onClick={() => handleSubmit()}>
                  {signUp ? 'Create user' : 'Login'}
                </button>
                <div style={{ fontSize: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setSignUp(true)}>Click here to create a user account</div>
                <button type="button" className="btn-close" onClick={() => setOpenModal(false)}>
                  Close
                </button>
              </div>
            </form>
          </>
        }
      </div >
    </div >
  );
}


