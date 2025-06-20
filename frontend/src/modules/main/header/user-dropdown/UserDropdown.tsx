import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledBigUserImage, StyledSmallUserImage } from '@app/styles/common';
import {
  UserBody,
  UserFooter,
  UserHeader,
  UserMenuDropdown,
} from '@app/styles/dropdown-menus';

import { useAppSelector } from '@app/store/store';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = async (event: any) => {
    event.preventDefault();
    localStorage.removeItem('token'); // ✅ Your token-based logout
    setDropdownOpen(false);
    navigate('/login');
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        src="/img/default-profile.png" // No photoURL from Firebase
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="body">
        <UserHeader className="bg-primary">
          <StyledBigUserImage
            src="/img/default-profile.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>
            {currentUser?.email || 'user@example.com'}
            <small>
              <span>Logged in user</span>
            </small>
          </p>
        </UserHeader>
        <UserBody>
          <div className="row">
            <div className="col-4 text-center">
              <Link to="/">{t('header.user.followers')}</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">{t('header.user.sales')}</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">{t('header.user.friends')}</Link>
            </div>
          </div>
        </UserBody>
        <UserFooter>
          <button
            type="button"
            className="btn btn-default btn-flat"
            onClick={navigateToProfile}
          >
            {t('header.user.profile')}
          </button>
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
            onClick={logOut}
          >
            {t('login.button.signOut')}
          </button>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  );
};

export default UserDropdown;
