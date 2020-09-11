import { message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import userApi from '../../apis/userApi'
import { setUser } from '../../app/userSlice'
import LoginForm from '../../components/LoginForm'
import RegistrationForm from '../../components/RegistrationForm'

function LoginPage() {
  const [visible, setVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleLoginSuccess = async (values) => {
    setSubmitting(true)

    try {
      const user = await userApi.login(values)
      dispatch(setUser(user))

      setSubmitting(false)
      history.push('/message')
    } catch (e) {
      setSubmitting(false)
      message.error('Tên đăng nhập hoặc mật khẩu không chính xác')
    }
  }

  const handleLoginFailed = () => {
    setSubmitting(false)
  }

  const onSignup = async (values) => {
    try {
      const { message } = await userApi.signup(values)
      setVisible(false)
      message.success(message)
    } catch (e) {
      message.error('Có lỗi xảy ra')
    }
  }

  return (
    <>
      <LoginForm
        handleLoginSuccess={handleLoginSuccess}
        handleLoginFailed={handleLoginFailed}
        submitting={submitting}
        openRegistrationForm={() => setVisible(true)}
      />

      <RegistrationForm
        visible={visible}
        onSignup={onSignup}
        onCancel={() => setVisible(false)}
      />
    </>
  )
}

export default LoginPage
