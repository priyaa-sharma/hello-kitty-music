import React from 'react';
import './AnimatedCharacter.css';

import characterImage from './icons/hellokitty-gif.gif';

export default function AnimatedCharacter() {
  return (
    <div className="animated-character-container">
      <img
        src={characterImage}
        alt="Cute Animated Character"
        className="character-image"
      />
    </div>
  );
}