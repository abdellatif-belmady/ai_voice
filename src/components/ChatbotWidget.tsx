import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { ChatbotButton } from './ChatbotButton';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="absolute bottom-0 right-0 w-[400px] h-[600px] rounded-lg shadow-2xl transition-all duration-300 ease-in-out transform translate-y-0">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <ChatbotButton onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
};