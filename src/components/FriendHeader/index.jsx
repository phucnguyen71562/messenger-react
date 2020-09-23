import { MessageOutlined } from '@ant-design/icons'
import { Avatar, Button, message, Typography, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import userApi from '../../apis/userApi'
import { updatePhotoUrl } from '../../app/authSlice'
import { AVATAR_DEFAULT } from '../../app/config'
import LogoutButton from '../LogoutButton'
import './FriendHeader.scss'

const { Title } = Typography

function FriendHeader() {
  const { username, photoUrl } = useSelector((state) => state.auth.current)
  const dispatch = useDispatch()

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }

    const formData = new FormData()
    formData.append('file', file)
    userApi
      .uploadAvatar(formData)
      .then((data) => dispatch(updatePhotoUrl(data)))

    return false
  }

  return (
    <div className="friends__header">
      <ImgCrop aspect shape="round" rotate>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="friends__headerUpload"
        >
          <Avatar
            size={128}
            icon={AVATAR_DEFAULT}
            src={photoUrl}
            className="friends__headerAvatar"
          />
        </Upload>
      </ImgCrop>

      <Title level={4} className="friends__headerName">
        {username}
      </Title>
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
  )
}

export default FriendHeader
