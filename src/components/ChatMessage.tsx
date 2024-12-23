import React from 'react';
import { Message } from '../types/chat';
import { DoorzIcon } from './icons';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#D3A74F] flex items-center justify-center mr-2">
          <DoorzIcon />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? 'bg-white text-black'
            : 'bg-[#D3A74F] text-white'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};