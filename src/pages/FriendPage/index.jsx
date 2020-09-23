import { Divider, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import friendApi from '../../apis/friendApi'
import userApi from '../../apis/userApi'
import FriendHeader from '../../components/FriendHeader'
import FriendList from '../../components/FriendList'
import FriendOnline from '../../components/FriendOnline'
import FriendRequest from '../../components/FriendRequest'
import FriendSearch from '../../components/FriendSearch'
import { useSocket } from '../../contexts/SocketProvider'
import { addFriend } from '../../slices/friendSlice'
import './FriendPage.scss'

const { TabPane } = Tabs

function FriendPage() {
  const [searchData, setSearchData] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [deleteFriends, setDeleteFriends] = useState([])
  const [createRequests, setCreateRequests] = useState([])
  const [acceptRequests, setAcceptRequests] = useState([])
  const [refuseRequests, setRefuseRequests] = useState([])

  const dispatch = useDispatch()
  const socket = useSocket()

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const data = await friendApi.fetchFriendRequests()
        setFriendRequests(data)
      } catch (e) {
        console.log(e)
      }
    }

    getFriendRequests()
  }, [dispatch])

  useEffect(() => {
    if (socket == null) return

    socket.on('new-friend-request', (request) => {
      if (request) {
        setFriendRequests([...friendRequests, request])
      }
    })
  }, [dispatch, friendRequests, socket])

  const handleSearch = async (params) => {
    const result = await userApi.fetchUsers(params)
    setSearchData(result)
  }

  const handleAddFriend = async (id) => {
    const data = await friendApi.addFriend(id)
    dispatch(addFriend(data))
    setAcceptRequests([...acceptRequests, id])
  }

  const handleDeleteFriend = async (id) => {
    await friendApi.deleteFriend(id)
    setDeleteFriends([...deleteFriends, id])
  }

  const handleCreateFriendRequest = (id) => {
    if (socket == null) return

    if (id) {
      socket.emit('add-friend', id)
      setCreateRequests([...createRequests, id])
    }
  }

  const handleDeleteFriendRequest = async (id) => {
    await friendApi.deleteFriendRequest(id)
    setRefuseRequests([...acceptRequests, id])
  }

  return (
    <div className="friends">
      <div className="friends-container">
        <FriendHeader />

        <div className="friends__content">
          <div className="friends__body">
            <Tabs defaultActiveKey="1" centered animated>
              <TabPane tab="Danh sách bạn bè" key="1">
                <FriendList
                  deleteFriends={deleteFriends}
                  handleDeleteFriend={handleDeleteFriend}
                />
              </TabPane>
              <TabPane tab="Tìm kiếm bạn bè" key="2">
                <FriendSearch
                  searchData={searchData}
                  handleSearch={handleSearch}
                  createRequests={createRequests}
                  handleCreateFriendRequest={handleCreateFriendRequest}
                />
              </TabPane>
            </Tabs>
          </div>
          <div className="friends__sidebar">
            <FriendRequest
              friendRequests={friendRequests}
              acceptRequests={acceptRequests}
              refuseRequests={refuseRequests}
              handleAddFriend={handleAddFriend}
              handleDeleteFriendRequest={handleDeleteFriendRequest}
            />
            <Divider />
            <FriendOnline />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendPage
