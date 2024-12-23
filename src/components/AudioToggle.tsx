import React from 'react';
import { VoiceIcon, VoiceDisabledIcon } from './icons';

interface AudioToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="text-[#A9A7A7] hover:text-white transition-colors"
      title={isEnabled ? 'Disable voice response' : 'Enable voice response'}
    >
      {isEnabled ? <VoiceIcon /> : <VoiceDisabledIcon />}
    </button>
  );
};