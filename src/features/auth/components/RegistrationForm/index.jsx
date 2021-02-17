import { Form, Input, Modal, Radio } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from '../../../../components/DatePicker';
import './RegistrationForm.scss';
import RULES, { disabledDate } from './validation';

const propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onSignup: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

function RegistrationForm({ form, visible, onSignup, onCancel }) {
  const handleOk = () => {
    form
      .validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          birthday: fieldsValue.birthday.format('YYYY-MM-DD'),
        };
        onSignup(values);
      })
      .catch((info) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Đăng ký"
      visible={visible}
      okText="Đăng ký"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        layout="vertical"
        form={form}
        name="register"
        scrollToFirstError
        className="registration-form"
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="last_name"
            label="Họ"
            validateFirst
            hasFeedback
            rules={RULES.last_name}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="first_name"
            label="Tên"
            validateFirst
            hasFeedback
            rules={RULES.first_name}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên đăng nhập"
          validateFirst
          hasFeedback
          rules={RULES.username}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          validateFirst
          hasFeedback
          rules={RULES.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          validateFirst
          hasFeedback
          rules={RULES.confirm_password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="birthday" label="Ngày sinh" rules={RULES.birthday}>
          <DatePicker
            disabledDate={disabledDate}
            placeholder="Chọn ngày sinh"
          />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={RULES.gender}>
          <Radio.Group>
            <Radio value>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
