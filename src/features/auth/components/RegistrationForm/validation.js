import authApi from 'apis/authApi';
import dayjs from 'dayjs';

export function disabledDate(current) {
  return current && current > dayjs().endOf('day');
}

export default {
  last_name: [
    {
      required: true,
      message: 'Vui lòng nhập họ',
    },
    {
      max: 50,
      message: 'Họ tối đa 50 ký tự',
    },
  ],
  first_name: [
    {
      required: true,
      message: 'Vui lòng nhập tên',
    },
    {
      max: 50,
      message: 'Tên tối đa 50 ký tự',
    },
  ],
  username: [
    {
      required: true,
      message: 'Vui lòng nhập tên đăng nhập',
    },
    {
      min: 6,
      message: 'Tên đăng nhập tối thiểu 6 ký tự',
    },
    {
      max: 255,
      message: 'Tên đăng nhập tối đa 255 ký tự',
    },
    () => ({
      async validator(_, value) {
        const { isAvailable } = await authApi.validateUsernameAvailability({
          username: value,
        });

        if (isAvailable) return Promise.resolve();

        return Promise.reject(new Error('Tên đăng nhập đã tồn tại'));
      },
    }),
  ],
  password: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu',
    },
    {
      min: 6,
      message: 'Mật khẩu tối thiểu 6 ký tự',
    },
  ],
  confirm_password: [
    {
      required: true,
      message: 'Vui lòng xác nhận mật khẩu',
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
      },
    }),
  ],
  birthday: [
    {
      type: 'object',
      required: true,
      message: 'Vui lòng chọn ngày sinh',
    },
  ],
  gender: [
    {
      type: 'boolean',
      required: true,
      message: 'Vui lòng chọn giới tính',
    },
  ],
};
