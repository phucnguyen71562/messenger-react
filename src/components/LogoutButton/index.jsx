import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import authApi from 'apis/authApi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../app/authSlice';

function LogoutButton(props) {
  const { id } = useSelector((state) => state.auth.current);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    const params = {
      id,
    };

    await authApi.logout(params);

    dispatch(logoutUser(params));

    history.push('/');
  };

  return (
    <Button
      shape="circle"
      icon={<LogoutOutlined />}
      title="Đăng xuất"
      onClick={handleLogout}
      {...props}
    />
  );
}

export default LogoutButton;
