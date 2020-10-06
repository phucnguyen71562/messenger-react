import { Form, message } from 'antd';
import authApi from 'apis/authApi';
import { loginUser } from 'app/authSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';

function Login() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleLoginSuccess = async (values) => {
    setSubmitting(true);

    try {
      const { data } = await authApi.login(values);
      dispatch(loginUser(data));
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      message.error(e?.response?.data?.message);
    }
  };

  const handleLoginFailed = () => {
    setSubmitting(false);
  };

  const onSignup = async (values) => {
    try {
      const { data } = await authApi.signup(values);
      setVisible(false);
      form.resetFields();
      message.success(data);
    } catch (e) {
      message.error(e?.response?.data?.message);
    }
  };

  return (
    <>
      <LoginForm
        handleLoginSuccess={handleLoginSuccess}
        handleLoginFailed={handleLoginFailed}
        submitting={submitting}
        openRegistrationForm={() => setVisible(true)}
      />

      <RegistrationForm
        form={form}
        visible={visible}
        onSignup={onSignup}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default Login;
