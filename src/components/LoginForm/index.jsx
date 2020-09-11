import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Typography } from 'antd'
import React from 'react'
import './LoginForm.scss'

const { Title, Text } = Typography

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
        <Title level={4}>Đăng nhập</Title>
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
  )
}

export default LoginForm
