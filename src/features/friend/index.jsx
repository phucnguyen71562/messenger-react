import { Divider, Tabs } from 'antd';
import useMediaQuery from 'hooks/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import friendApi from '../../apis/friendApi';
import uploadApi from '../../apis/uploadApi';
import userApi from '../../apis/userApi';
import { updatePhotoUrl } from '../../app/authSlice';
import { useSocket } from '../../contexts/SocketProvider';
import FriendHeader from './components/FriendHeader';
import FriendList from './components/FriendList';
import FriendOnline from './components/FriendOnline';
import FriendRequest from './components/FriendRequest';
import FriendSearch from './components/FriendSearch';
import './Friend.scss';
import { addFriend } from './friendSlice';

const { TabPane } = Tabs;

function Friend() {
  const isDesktopMode = useMediaQuery('(min-width: 62em)');

  const [searchData, setSearchData] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [deleteFriends, setDeleteFriends] = useState([]);
  const [createRequests, setCreateRequests] = useState([]);
  const [acceptRequests, setAcceptRequests] = useState([]);
  const [refuseRequests, setRefuseRequests] = useState([]);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);
  const [searchPageNumber, setSearchPageNumber] = useState(2);

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const { data } = await friendApi.fetchFriendRequests();
        setReceivedRequests(data.received);
        setSentRequests(data.sent);
      } catch (e) {
        console.error(e);
      }
    };

    getFriendRequests();
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.on('new-friend-request', (newRequest) => {
      if (newRequest) {
        const index = refuseRequests.findIndex(
          (request) => request === newRequest.id
        );

        if (index > -1) {
          setRefuseRequests((preRefuseRequests) =>
            preRefuseRequests.filter((request) => request !== newRequest.id)
          );
          return;
        }

        setReceivedRequests([...receivedRequests, { sender: newRequest }]);
      }
    });

    return () => socket.off('new-friend-request');
  }, [dispatch, receivedRequests, refuseRequests, socket]);

  const handleUploadPhoto = async (formData) => {
    const { data } = await uploadApi.uploadAvatar(formData);
    dispatch(updatePhotoUrl(data));
  };

  const handleSearch = async (value) => {
    const limit = 20;
    const params = { ...value, page: 1, limit };
    const { data } = await userApi.fetchUsers(params);
    setSearchData(data);
    setHasMoreSearch(true);
    setSearchPageNumber(2);
  };

  const handleLoadMoreSearch = async (value) => {
    const limit = 20;
    const params = { ...value, page: searchPageNumber, limit };

    setLoadingSearch(true);
    const { data } = await userApi.fetchUsers(params);

    if (data.length === 0 || data.length < limit) {
      setHasMoreSearch(false);
      setLoadingSearch(false);
    }

    setSearchData((preSearchData) => preSearchData.concat(data));
    setSearchPageNumber((preSearchPageNumber) => preSearchPageNumber + 1);
    setLoadingSearch(false);
  };

  const handleAddFriend = async (id) => {
    const { data } = await friendApi.addFriend(id);
    dispatch(addFriend(data));
    setAcceptRequests([...acceptRequests, id]);
  };

  const handleDeleteFriend = async (id) => {
    await friendApi.deleteFriend(id);
    setDeleteFriends([...deleteFriends, id]);
  };

  const handleCreateFriendRequest = (id) => {
    if (socket == null) return;

    if (id) {
      socket.emit('add-friend', id);
      setCreateRequests([...createRequests, id]);
    }
  };

  const handleDeleteFriendRequest = async (id) => {
    await friendApi.deleteFriendRequest(id);
    setRefuseRequests([...refuseRequests, id]);
  };

  return (
    <div className="friends">
      <div className="friends-container">
        <FriendHeader handleUploadPhoto={handleUploadPhoto} />

        <div className="friends__content">
          <div className="friends__sidebar">
            <FriendRequest
              receivedRequests={receivedRequests}
              acceptRequests={acceptRequests}
              refuseRequests={refuseRequests}
              handleAddFriend={handleAddFriend}
              handleDeleteFriendRequest={handleDeleteFriendRequest}
            />

            {isDesktopMode && <Divider />}

            <FriendOnline />
          </div>

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
                  sentRequests={sentRequests}
                  createRequests={createRequests}
                  handleCreateFriendRequest={handleCreateFriendRequest}
                  handleLoadMoreSearch={handleLoadMoreSearch}
                  loadingSearch={loadingSearch}
                  hasMoreSearch={hasMoreSearch}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friend;
