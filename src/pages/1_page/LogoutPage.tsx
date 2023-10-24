import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { globalRoutesPrefix } from '../../AppRoutes';
import { userLogoutAction } from '../../store/actions/userActions';

export const LogoutPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLogoutAction() as any);
    setTimeout(() => {
      navigate(`${globalRoutesPrefix}/login`);

      window.location.reload();
    }, 1000);
  });

  return <div>登出...</div>;
};
