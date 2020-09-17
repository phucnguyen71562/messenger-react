import { Avatar, Dropdown, List, Menu, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './SidebarChatItem.scss'

const { Paragraph } = Typography

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)

function SidebarChatItem({ item }) {
  const isSearchFriend = useSelector((state) => state.search.isSearchFriend)

  if (!isSearchFriend) {
    const { receiver, chat } = item

    return (
      <Link to={`/messages/${receiver._id}`}>
        <List.Item
          className="sidebar__chat"
          actions={[
            <Dropdown overlay={menu} trigger={['click']} arrow>
              <span>...</span>
            </Dropdown>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            }
            title={receiver.username}
            description={
              <Paragraph ellipsis>
                {chat.messages[chat.messages.length - 1].message}
              </Paragraph>
            }
          />
        </List.Item>
      </Link>
    )
  }

  return (
    <Link to={`/messages/${item._id}`}>
      <List.Item className="sidebar__chat">
        <List.Item.Meta
          avatar={
            <Avatar
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          }
          title={item.username}
        />
      </List.Item>
    </Link>
  )
}

export default SidebarChatItem
