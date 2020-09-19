import { SearchOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSearchFriendResults,
  toggleSearchFriends,
} from '../../../slices/searchSlice'
import './SidebarSearch.scss'

function SidebarSearch() {
  const friends = useSelector((state) => state.friend.friends)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const value = e.target.value

    if (value !== '') {
      dispatch(toggleSearchFriends(true))

      const data = friends.filter((friend) => friend.username.includes(value))
      dispatch(fetchSearchFriendResults(data))
    } else {
      dispatch(toggleSearchFriends(false))
    }
  }

  return (
    <Form name="search" className="sidebar__search">
      <Form.Item name="search">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm trên Messenger"
          onChange={handleChange}
          onFocus={() => dispatch(toggleSearchFriends(true))}
          onBlur={(e) =>
            e.target.value === '' && dispatch(toggleSearchFriends(false))
          }
          autoComplete="off"
        />
      </Form.Item>
    </Form>
  )
}

export default SidebarSearch
