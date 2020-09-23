import { DatePicker, Form, Input, Modal, Radio } from 'antd'
import React, { useState } from 'react'
import authApi from '../../apis/authApi'
import './RegistrationForm.scss'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}

const validateUsername = async (value) => {
  const { isAvailable } = await authApi.validateUsernameAvailability(value)

  if (isAvailable) {
    return {
      validateStatus: 'error',
      errorMsg: 'Tên đăng nhập đã tồn tại!',
    }
  }

  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}

function RegistrationForm({ visible, onSignup, onCancel }) {
  const [form] = Form.useForm()
  const [validate, setValidate] = useState({})

  const handleCheckUsername = async (e) => {
    if (e.target.value.length > 5) {
      const value = await validateUsername({ username: e.target.value })
      setValidate(value)
    }
  }

  const handleValidationMessage = () => {
    setValidate({
      ...validate,
      errorMsg: null,
    })
  }

  return (
    <Modal
      title="Đăng ký"
      visible={visible}
      okText="Đăng ký"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            form.resetFields()
            const values = {
              ...fieldsValue,
              birthday: fieldsValue['birthday'].format('YYYY-MM-DD'),
            }
            onSignup(values)
            setValidate({
              validateStatus: '',
              errorMsg: null,
            })
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        scrollToFirstError
        className="registration-form"
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          validateFirst
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập!',
            },
            {
              min: 6,
              message: 'Tên đăng nhập ít nhất 6 ký tự!',
            },
          ]}
          validateStatus={validate.validateStatus}
          help={validate.errorMsg}
        >
          <Input
            onBlur={handleCheckUsername}
            onFocus={handleValidationMessage}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          validateFirst
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
            {
              min: 6,
              message: 'Mật khẩu tối thiểu 6 ký tự!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          validateFirst
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject('Mật khẩu xác nhận không khớp!')
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Vui lòng chọn ngày sinh!',
            },
          ]}
        >
          <DatePicker placeholder="Chọn ngày sinh" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[
            {
              type: 'boolean',
              required: true,
              message: 'Vui lòng chọn giới tính!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RegistrationForm
