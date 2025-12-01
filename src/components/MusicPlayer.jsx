import { useEffect, useRef } from 'react';
import { useMood } from '../context/MoodContext';

export default function MusicPlayer() {
  const { theme, settings } = useMood();
  const audioRef = useRef(null);
  const currentTrackRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    const audio = audioRef.current;

    if (settings.musicEnabled && theme.music !== currentTrackRef.current) {
      // Fade out current track
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          
          // Switch track
          audio.pause();
          audio.src = getMusicUrl(theme.name);
          currentTrackRef.current = theme.music;
          audio.volume = 0;
          
          // Play and fade in
          audio.play().catch(err => console.log('Audio play failed:', err));
          const fadeIn = setInterval(() => {
            if (audio.volume < 0.25) {
              audio.volume = Math.min(0.3, audio.volume + 0.05);
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        }
      }, 100);
    } else if (!settings.musicEnabled) {
      // Fade out and stop
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          currentTrackRef.current = null;
        }
      }, 100);
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [theme.name, settings.musicEnabled]);

  // Generate music URL based on emotion
  const getMusicUrl = (emotion) => {
    // Using royalty-free ambient music URLs
    const musicMap = {
      Happy: 'https://assets.mixkit.co/music/preview/mixkit-happy-and-joyful-children-14.mp3',
      Sad: 'https://assets.mixkit.co/music/preview/mixkit-sad-piano-116.mp3',
      Angry: 'https://assets.mixkit.co/music/preview/mixkit-deep-meditation-192.mp3',
      Neutral: 'https://assets.mixkit.co/music/preview/mixkit-ambient-piano-amp-strings-10.mp3',
      Surprised: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3'
    };

    return musicMap[emotion] || musicMap.Neutral;
  };

  return null; // This component doesn't render anything
}
