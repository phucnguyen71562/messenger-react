import { List } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import SidebarChatItem from '../SidebarChatItem'
import './SidebarChat.scss'

function SidebarChat() {
  const chats = useSelector((state) => state.chat.chats)
  const isSearchFriend = useSelector((state) => state.search.isSearchFriend)
  const searchFriendResults = useSelector(
    (state) => state.search.searchFriendResults
  )

  return (
    <List
      className="sidebar__chats"
      itemLayout="horizontal"
      dataSource={!isSearchFriend ? chats : searchFriendResults}
      renderItem={(item) => <SidebarChatItem item={item} />}
    />
  )
}

export default SidebarChat
