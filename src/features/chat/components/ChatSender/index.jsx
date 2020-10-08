import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Popover } from 'antd';
import { NimblePicker } from 'emoji-mart';
import data from 'emoji-mart/data/facebook.json';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
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

  const renderPicker = useCallback(() => {
    return (
      <NimblePicker
        set="facebook"
        data={data}
        title=""
        emoji=""
        include={['search', 'recent', 'people']}
        color="var(--primary)"
        showPreview={false}
        showSkinTones={false}
        perLine={6}
        sheetSize={16}
        onSelect={(emoji) => chooseEmoji(emoji.native)}
      />
    );
  }, []);

  return (
    <div className="chat__sender">
      <form className="chat-form" onSubmit={sendMessage}>
        <div className="chat-form__input">
          <Input
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={changeMessage}
            ref={inputRef}
            autoComplete="off"
          />
          <Popover
            content={renderPicker}
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
