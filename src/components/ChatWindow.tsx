import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LanguageSelector } from './LanguageSelector';
import { AudioToggle } from './AudioToggle';
import { useChat } from '../hooks/useChat';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { stopAudio } from '../utils/audio';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { state, sendMessage, setLanguage, toggleAudio } = useChat();
  const { startRecording } = useVoiceRecording(state.selectedLanguage, sendMessage);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleStartRecording = async () => {
    stopAudio();
    mediaRecorderRef.current = await startRecording();
    if (mediaRecorderRef.current) {
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] rounded-lg overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black">
        <div className="flex items-center space-x-2">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4445 7.93833C13.9455 7.00499 13.2735 6.23409 12.4465 5.63244V4.82768C12.4465 2.16565 10.3138 0 7.69231 0C5.07078 0 2.93809 2.16565 2.93809 4.82797V5.70498C2.10188 6.32199 1.42954 7.10797 0.938462 8.05524C0.315716 9.25541 0 10.6669 0 12.2508C0 13.7107 0.301709 15.0417 0.896722 16.2072C1.49622 17.3818 2.37865 18.3179 3.51993 18.9899C4.65785 19.6601 6.007 20 7.52955 20C9.0521 20 10.4424 19.6609 11.6263 18.9924C12.8152 18.3211 13.7497 17.3613 14.4039 16.1398C15.0549 14.9243 15.3849 13.5187 15.3849 11.9615C15.3849 10.4044 15.0686 9.10578 14.4448 7.93861L14.4445 7.93833ZM9.33168 15.3828H6.04986L6.82248 12.0113C6.33784 11.7123 6.01316 11.1727 6.01316 10.5549C6.01316 9.61327 6.76505 8.84976 7.69231 8.84976C8.61957 8.84976 9.37146 9.61327 9.37146 10.5549C9.37146 11.173 9.0465 11.7126 8.56158 12.0116L9.33168 15.3825V15.3828ZM7.8349 4.23286C6.73872 4.23286 5.73106 4.39273 4.8251 4.70935C4.88673 3.15701 6.14875 1.91332 7.69231 1.91332C9.23587 1.91332 10.4699 3.12913 10.5573 4.657C9.72359 4.37567 8.81286 4.23286 7.8349 4.23286Z" fill="white"/>
          </svg>
          <span className="text-white font-bold">THEDOORZ AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <AudioToggle isEnabled={state.isAudioEnabled} onToggle={toggleAudio} />
          <LanguageSelector selectedLanguage={state.selectedLanguage} onLanguageChange={setLanguage} />
          <button onClick={onClose} className="text-[#A9A7A7] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1A1A1A]">
        {state.messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        isRecording={isRecording}
        disabled={state.isLoading}
      />
    </div>
  );
};

export default ChatWindow;