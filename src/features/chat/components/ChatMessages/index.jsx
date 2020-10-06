import { Tooltip } from 'antd';
import { selectCurrent } from 'app/authSlice';
import LoadMoreSpin from 'components/LoadMoreSpin';
import { selectMessages, selectTheme } from 'features/chat/chatSlice';
import PropTypes from 'prop-types';
import React from 'react';
import ChatView from 'react-chatview';
import { useSelector } from 'react-redux';
import { getTime } from 'services/helpers';
import './ChatMessages.scss';

function ChatMessages({ handleLoadMoreMessages, hasMore, loading }) {
  const { username } = useSelector(selectCurrent);
  const messages = useSelector(selectMessages);
  const theme = useSelector(selectTheme);

  return (
    <ChatView
      className="chat__messages"
      flipped
      reversed
      shouldTriggerLoad={() => hasMore}
      scrollLoadThreshold={0}
      onInfiniteLoad={handleLoadMoreMessages}
    >
      {loading && (
        <div className="chat__loading">
          <LoadMoreSpin />
        </div>
      )}

      {messages.map((message) => {
        return (
          <Tooltip
            key={message?.id}
            title={getTime(message?.timestamp)}
            placement="right"
          >
            <div
              className={`chat__message ${
                username === message?.username
                  ? 'chat__message-sender'
                  : 'chat__message-receiver'
              }`}
              style={
                username === message?.username
                  ? { backgroundAttachment: 'fixed', ...theme.value }
                  : {}
              }
            >
              <div className="chat__messageText">
                <span>{message?.message}</span>
              </div>
            </div>
          </Tooltip>
        );
      })}
    </ChatView>
  );
}

ChatMessages.propTypes = {
  handleLoadMoreMessages: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChatMessages;
