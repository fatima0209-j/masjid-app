import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from '@modules/login/Login';
import Register from '@modules/register/Register';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import Main from '@modules/main/Main';

import Dashboard from '@pages/Dashboard';
import Masjid from '@app/pages/Masjid';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import { useWindowSize } from '@app/hooks/useWindowSize';
import { calculateWindowSize } from '@app/utils/helpers';
import { setWindowSize } from '@app/store/reducers/ui';
import { setCurrentUser } from './store/reducers/auth';

import axios from 'axios';
import { useAppDispatch, useAppSelector } from './store/store';
import { Loading } from './components/Loading';

import ReactGA from 'react-ga4';

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const windowSize = useWindowSize();
  const screenSize = useAppSelector((state) => state.ui.screenSize);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setCurrentUser(res.data.user));
        })
        .catch(() => {
          dispatch(setCurrentUser(null));
        })
        .finally(() => {
          setIsAppLoading(false);
        });
    } else {
      dispatch(setCurrentUser(null));
      setIsAppLoading(false);
    }
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  useEffect(() => {
    if (location?.pathname && VITE_NODE_ENV === 'production') {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname,
      });
    }
  }, [location]);

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>

        {/* Private Routes (with AdminLTE layout) */}
        <Route element={<PrivateRoute />}>
          <Route element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/sub-menu-2" element={<Masjid />} />
            <Route path="/masjid" element={<Masjid />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
