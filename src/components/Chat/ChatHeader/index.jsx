import { InfoCircleOutlined } from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { getRelativeTime } from '../../../services/helpers'
import './ChatHeader.scss'

const { Title, Text } = Typography

function ChatHeader({ setVisible }) {
  const onlineFriends = useSelector((state) => state.user.onlineFriends)
  const receiver = useSelector((state) => state.chat.receiver)

  const isOnline = onlineFriends.find((friend) => friend === receiver?._id)

  return (
    <div className="chat__header">
      <Avatar
        size="large"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <div className="chat__headerInfo">
        <Title level={4} style={{ marginBottom: 0 }}>
          {receiver?.username}
        </Title>
        <Text type="secondary">
          {isOnline
            ? 'Đang hoạt động'
            : receiver && getRelativeTime(receiver.lastLogin)}
        </Text>
      </div>
      <div className="chat__headerActions">
        <Button
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setVisible(true)}
        ></Button>
      </div>
    </div>
  )
}

export default ChatHeader
