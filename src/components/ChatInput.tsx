import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { VoiceIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-[#1A1A1A] border-t border-[#2A2A2A]">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] text-white p-3 focus:outline-none focus:ring-2 focus:ring-[#D3A74F] min-h-[44px] placeholder-[#A9A7A7]"
        rows={1}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={`p-3 rounded-lg ${
          isRecording ? 'bg-red-500' : 'bg-[#2A2A2A]'
        } text-[#A9A7A7] hover:text-white transition-colors`}
        disabled={disabled}
      >
        <VoiceIcon />
      </button>
      <button
        type="submit"
        className="p-3 rounded-lg bg-[#D3A74F] text-white hover:bg-[#c49a47] transition-colors disabled:opacity-50"
        disabled={!message.trim() || disabled}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};