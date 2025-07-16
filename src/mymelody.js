import React from 'react';
import './mymelody.css';
import topLeftCharacterImage from './icons/mymelody.gif';

export default function TopLeftCharacter() {
  return (
    <div className="top-left-character-container">
      <img
        src={topLeftCharacterImage}
        alt="Top Left Animated Character"
        className="top-left-character-image"
      />
    </div>
  );
}