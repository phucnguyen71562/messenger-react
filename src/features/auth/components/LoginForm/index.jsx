import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography } from 'antd';
import LoginImage from 'assets/images/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import './LoginForm.scss';

const { Text } = Typography;

function LoginForm({
  handleLoginSuccess,
  handleLoginFailed,
  submitting,
  openRegistrationForm,
}) {
  return (
    <div className="login-form">
      <Form
        name="login"
        onFinish={handleLoginSuccess}
        onFinishFailed={handleLoginFailed}
      >
        <div className="login-form__logo">
          L<img src={LoginImage} alt="login" />
          gin
        </div>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          className="login-form__button"
          loading={submitting}
        >
          Đăng nhập
        </Button>
        <Divider />
        <Text type="secondary" style={{ textAlign: 'center', marginBottom: 8 }}>
          hoặc
        </Text>
        <Button
          type="default"
          onClick={openRegistrationForm}
          className="login-form__button"
        >
          Đăng ký ngay
        </Button>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired,
  handleLoginFailed: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  openRegistrationForm: PropTypes.func.isRequired,
};

export default LoginForm;
