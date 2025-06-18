import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerByAuth } from '../../services/auth';
import { toast } from 'react-toastify';
import { setCurrentUser } from '@app/store/reducers/auth';
import { useAppDispatch } from '../../store/store';


export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const handleRegister = async () => {
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  try {
    const res = await registerByAuth(fullName, email, password);
    dispatch(setCurrentUser(res.data.user));
    toast.success('Registered successfully!');
    navigate('/login');
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Registration failed');
  }
};


  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="register-box">
      <div className="register-logo">
        <b>Admin</b>LTE
      </div>
      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new membership</p>

          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Retype password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </form>

          <a href="/login" className="text-center">
            I already have a membership
          </a>
        </div>
      </div>
    </div>
  </div>
);

}
