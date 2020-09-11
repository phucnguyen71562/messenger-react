import { List } from 'antd'
import React from 'react'
import SidebarChatItem from '../SidebarChatItem'
import './SidebarChat.scss'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
]

function SidebarChat() {
  return (
    <List
      className="sidebar__chats"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => <SidebarChatItem item={item} />}
    />
  )
}

export default SidebarChat
