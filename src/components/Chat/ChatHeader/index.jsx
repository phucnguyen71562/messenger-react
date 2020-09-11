import { InfoCircleOutlined } from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import React from 'react'
import './ChatHeader.scss'

const { Title, Text } = Typography

function ChatHeader({ setVisible }) {
  return (
    <div className="chat__header">
      <Avatar
        size="large"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <div className="chat__headerInfo">
        <Title level={4} style={{ marginBottom: 0 }}>
          Example
        </Title>
        <Text type="secondary">Online</Text>
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
