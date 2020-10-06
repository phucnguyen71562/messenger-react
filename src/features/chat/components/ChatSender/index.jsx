import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Popover } from 'antd';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import './ChatSender.scss';

function ChatSender({ handleSendMessage }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    handleSendMessage(message);

    setMessage('');
    inputRef.current.focus();
  };

  const chooseEmoji = (value) => {
    setMessage((preMessage) => preMessage + value);

    setVisible(false);
  };

  const handleVisibleChange = (value) => {
    setVisible(value);
  };

  return (
    <div className="chat__sender">
      <form className="chat-form" onSubmit={sendMessage}>
        <div className="chat-form__input">
          <Input
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={changeMessage}
            ref={inputRef}
            autoFocus
            autoComplete="off"
          />
          <Popover
            content={
              <Picker
                set="facebook"
                title=""
                emoji=""
                color="var(--primary)"
                showPreview={false}
                showSkinTones={false}
                perLine={6}
                sheetSize={20}
                onSelect={(emoji) => chooseEmoji(emoji.native)}
              />
            }
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
          >
            <Button shape="circle" icon={<SmileOutlined />} type="ghost" />
          </Popover>
        </div>
        <Button
          htmlType="submit"
          shape="circle"
          icon={<SendOutlined />}
          className="chat-form__button"
        />
      </form>
    </div>
  );
}

ChatSender.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
};

export default ChatSender;
