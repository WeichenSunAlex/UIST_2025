import React, { useState } from 'react';
import { Input, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const ChatSetter = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: '你好！我是 AI 助手，有什么可以帮你的吗？',
      role: 'assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      content: inputValue,
      role: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ 
      padding: '16px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <List
        style={{ flex: 1, overflow: 'auto' }}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item style={{ 
            justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start',
            padding: '8px 0'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: item.role === 'user' ? '#1677ff' : '#f0f0f0',
              color: item.role === 'user' ? '#fff' : '#000'
            }}>
              {item.content}
            </div>
          </List.Item>
        )}
      />
      <div style={{ 
        display: 'flex',
        gap: '8px',
        padding: '8px 0'
      }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
        />
        <SendOutlined 
          onClick={handleSend}
          style={{ 
            fontSize: '20px',
            cursor: 'pointer',
            color: '#1677ff'
          }}
        />
      </div>
    </div>
  );
};

export default ChatSetter; 