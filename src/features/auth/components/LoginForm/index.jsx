import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import useMediaQuery from 'hooks/useMediaQuery';
import PropTypes from 'prop-types';
import React from 'react';
import './LoginForm.scss';
import RULES from './validation';

const { Title, Text } = Typography;

const propTypes = {
  handleLoginSuccess: PropTypes.func.isRequired,
  handleLoginFailed: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  openRegistrationForm: PropTypes.func.isRequired,
};

function LoginForm({
  handleLoginSuccess,
  handleLoginFailed,
  submitting,
  openRegistrationForm,
}) {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');

  return (
    <div className="login__container">
      <div className="login__form">
        <Title>Đăng nhập</Title>
        <Text type="secondary" style={{ marginBottom: '3rem' }}>
          Đăng nhập vào tài khoản của bạn
        </Text>

        <Form
          name="login"
          onFinish={handleLoginSuccess}
          onFinishFailed={handleLoginFailed}
        >
          <Form.Item name="username" rules={RULES.username}>
            <Input
              prefix={<UserOutlined style={{ marginRight: '0.5rem' }} />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item name="password" rules={RULES.password}>
            <Input.Password
              prefix={<LockOutlined style={{ marginRight: '0.5rem' }} />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block={!isDesktopMode}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {!isDesktopMode && (
          <>
            <div className="login_reg_separator">
              <span>hoặc</span>
            </div>
            <Button
              onClick={openRegistrationForm}
              style={{ alignSelf: 'center' }}
            >
              Tạo tài khoản mới
            </Button>
          </>
        )}
      </div>

      {isDesktopMode && (
        <div className="login__right-panel">
          <Title level={2}>Tạo tài khoản mới</Title>
          <Text>Chưa có tài khoản ?</Text>
          <Button shape="round" onClick={openRegistrationForm}>
            Đăng ký ngay
          </Button>
        </div>
      )}
    </div>
  );
}

LoginForm.propTypes = propTypes;

export default LoginForm;
