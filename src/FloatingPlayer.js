import React, { useRef, useState, useEffect, useCallback } from 'react'; 
import './FloatingPlayer.css';

import songCover1 from './icons/firstsongimage.jpeg';
import songCover2 from './icons/secondimage.jpeg';
import songCover3 from './icons/songcover3.jpeg';
import songCover4 from './icons/songcover4.jpeg';
import songCover5 from './icons/songcover5.jpeg';
import songCover6 from './icons/songcover6.jpeg';
import songCover7 from './icons/songcover7.jpeg';
import songCover8 from './icons/songcover8.jpeg';
import songCover9 from './icons/songcover9.jpeg'; 
import songCover10 from './icons/songcover10.jpeg';
import songCover11 from './icons/songcover11.jpeg';
import songCover12 from './icons/songcover12.jpeg';

export default function FloatingPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const songs = [
    {
      title: "Kya Tujhe Ab Yeh Dil",
      cover: songCover1,
      source: "/music/mysong1.mp3",
    },
    {
      title: "TV",
      cover: songCover2,
      source: "/music/mysong2.mp3",
    },
    {
      title: "Haareya",
      cover: songCover3,
      source: "/music/mysong3.mp3",
    },
    {
      title: "Sajde",
      cover: songCover4,
      source: "/music/mysong4.mp3", 
    },
    {
      title: "Back To Friends",
      cover: songCover5,
      source: "/music/mysong5.mp3",
    },
    {
      title: "Someone Out of Town",
      cover: songCover6,
      source: "/music/mysong6.mp3",
    },
    {
      title: "Heavy",
      cover: songCover7,
      source: "/music/mysong7.mp3",
    },
    {
      title: "He's My Man",
      cover: songCover8,
      source: "/music/mysong8.mp3",
    },
     {
      title: "It's been so hard",
      cover: songCover9,
      source: "/music/mysong9.mp3",
    },

     {
      title: "My Love's Mine All Mine",
      cover: songCover10,
      source: "/music/mysong10.mp3",
    },

     {
      title: "The Cut That Always Bleeds",
      cover: songCover11,
      source: "/music/mysong11.mp3",
    },

     {
      title: "The Night We Met",
      cover: songCover12,
      source: "/music/mysong12.mp3",
    },

  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const currentSong = songs[currentSongIndex];
  const songTitle = currentSong.title;
  const songCover = currentSong.cover;
  const songSource = currentSong.source;

  const formatTime = (timeInSeconds) => {
    let totalSeconds = Math.floor(Number(timeInSeconds) || 0);

    if (totalSeconds < 0) {
      totalSeconds = 0;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
  };

  
  const handleNext = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % songs.length;
      return newIndex;
    });
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  }, [songs.length]); 

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.warn("Audio element not available for event listeners.");
      return;
    }

    audio.load();
    if (isPlaying) {
      audio.play().catch(error => { console.error("Error playing audio after load:", error); });
    }

    const setAudioData = () => {
      setDuration(isNaN(audio.duration) ? 0 : Math.floor(audio.duration));
      setCurrentTime(isNaN(audio.currentTime) ? 0 : Math.floor(audio.currentTime));
    };

    const updateProgress = () => {
      setCurrentTime(Math.floor(audio.currentTime));
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleSongEnded = () => {
      setIsPlaying(false);
      setProgress(100);
      setCurrentTime(duration);
      handleNext(); 
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleSongEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleSongEnded);
    };
  }, [currentSongIndex, isPlaying, duration, handleNext]); 
  
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element is not available. Cannot play/pause.");
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]); // Dependency on isPlaying


  const handlePrev = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + songs.length) % songs.length;
      return newIndex;
    });
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);
  }, [songs.length]); // Dependency on songs.length

  const handleSeek = (e) => {
    const seekValue = Number(e.target.value);
    const seekTime = (seekValue / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setProgress(seekValue);
    setCurrentTime(Math.floor(seekTime));
  };

  return (
    <div
      className="player-card-content"

    >
      <div className="song-title">{songTitle}</div>

      <div className="song-cover-container">
        <img src={songCover} alt="Song Cover" className="song-cover-image" />
      </div>

      <audio ref={audioRef} src={songSource} />

      <div className="playback-section">
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="total-time">{formatTime(duration)}</span>
        </div>
        <div className="progress-bar-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="progress-bar-input"
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #ff69b4 ${progress}%, #fff ${progress}%)`
            }}
          />
        </div>
      </div>

      <div className="player-controls">
        <div className="control-button-wrapper">
          <button className="control-button" onClick={handlePrev}>
            <img src="/icons/previous.jpeg" alt="Previous" className="control-icon" />
          </button>
          <span className="custom-tooltip">Previous</span>
        </div>

        <div className="control-button-wrapper">
          <button className="control-button play-pause-button" onClick={handlePlayPause}>
            <img
              src={isPlaying ? "/icons/pause.jpeg" : "/icons/play.jpeg"}
              alt={isPlaying ? "Pause" : "Play"}
              className="control-icon play-pause-icon"
            />
          </button>
          <span className="custom-tooltip">{isPlaying ? "Pause" : "Play"}</span>
        </div>

        <div className="control-button-wrapper">
          <button className="control-button" onClick={handleNext}>
            <img src="/icons/next.jpeg" alt="Next" className="control-icon" />
          </button>
          <span className="custom-tooltip">Next</span>
        </div>
      </div>
    </div>
  );
}