import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, message, Typography, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { selectCurrent } from 'app/authSlice';
import LogoutButton from 'components/LogoutButton';
import { AVATAR_DEFAULT } from 'configs/common';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './FriendHeader.scss';

const { Title, Text } = Typography;

const propTypes = {
  handleUploadPhoto: PropTypes.func.isRequired,
};

function FriendHeader({ handleUploadPhoto }) {
  const { first_name, last_name, username, photoUrl } = useSelector(
    selectCurrent
  );

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 1MB!');
    }

    const formData = new FormData();
    formData.append('file', file);
    handleUploadPhoto(formData);

    return false;
  }

  return (
    <div className="friends__header">
      <ImgCrop shape="round" rotate>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="friends__header-upload"
        >
          <Avatar
            size={128}
            icon={AVATAR_DEFAULT}
            src={photoUrl}
            className="friends__header-avatar"
          />
        </Upload>
      </ImgCrop>

      <Title level={4} className="friends__header-name">
        {first_name} {last_name}
      </Title>

      <Text type="secondary">@{username}</Text>

      <Link to="/messages">
        <Button
          shape="circle"
          icon={<MessageOutlined />}
          title="Tin nhắn"
          style={{ position: 'absolute', top: 70, left: 0 }}
        />
      </Link>

      <LogoutButton style={{ position: 'absolute', top: 70, right: 0 }} />
    </div>
  );
}

FriendHeader.propTypes = propTypes;

export default FriendHeader;
