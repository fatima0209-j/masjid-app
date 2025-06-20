import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginByAuth } from '../../services/auth';
import { useAppDispatch } from '@app/store/store';
import { setCurrentUser } from '@app/store/reducers/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 

  const handleLogin = async () => {
    try {
      const res = await loginByAuth(email, password); // must return { token, user }

      // Set user and token in app state
      dispatch(setCurrentUser(res.user));
      localStorage.setItem('token', res.token);

      toast.success('Login successful!');
      navigate('/');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Admin</b>LTE</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

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

            <div className="row">
              <div className="col-12">
                <button onClick={handleLogin} className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
