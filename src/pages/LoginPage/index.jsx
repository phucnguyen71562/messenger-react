import { message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authApi from '../../apis/authApi'
import { loginUser } from '../../app/authSlice'
import LoginForm from '../../components/LoginForm'
import RegistrationForm from '../../components/RegistrationForm'

function LoginPage() {
  const [visible, setVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const dispatch = useDispatch()

  const handleLoginSuccess = async (values) => {
    setSubmitting(true)

    try {
      await dispatch(loginUser(values))
      setSubmitting(false)
    } catch (e) {
      setSubmitting(false)
      message.error(e?.response?.data?.message)
    }
  }

  const handleLoginFailed = () => {
    setSubmitting(false)
  }

  const onSignup = async (values) => {
    try {
      const { message: responseMessage } = await authApi.signup(values)
      setVisible(false)
      message.success(responseMessage)
    } catch (e) {
      message.error(e?.response?.data?.message)
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
