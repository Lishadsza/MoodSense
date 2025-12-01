import { createContext, useContext, useState, useEffect } from 'react';
import { emotionThemes } from '../utils/emotionConfig';

const MoodContext = createContext();

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error('useMood must be used within MoodProvider');
  return context;
};

export const MoodProvider = ({ children }) => {
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [moodHistory, setMoodHistory] = useState([]);
  const [settings, setSettings] = useState({
    cameraEnabled: true,
    musicEnabled: false,
    sensitivity: 0.5
  });

  useEffect(() => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) setMoodHistory(JSON.parse(saved));
  }, []);

  const updateEmotion = (emotion) => {
    if (emotion !== currentEmotion) {
      setCurrentEmotion(emotion);
      
      const entry = {
        emotion,
        timestamp: Date.now(),
        date: new Date().toISOString()
      };
      
      const updated = [...moodHistory, entry].slice(-100);
      setMoodHistory(updated);
      localStorage.setItem('moodHistory', JSON.stringify(updated));
    }
  };

  const addJournalEntry = (entry) => {
    const journals = JSON.parse(localStorage.getItem('journals') || '[]');
    journals.push({ ...entry, timestamp: Date.now() });
    localStorage.setItem('journals', JSON.stringify(journals));
  };

  const getJournals = () => {
    return JSON.parse(localStorage.getItem('journals') || '[]');
  };

  const theme = emotionThemes[currentEmotion];

  return (
    <MoodContext.Provider value={{
      currentEmotion,
      updateEmotion,
      theme,
      moodHistory,
      settings,
      setSettings,
      addJournalEntry,
      getJournals
    }}>
      {children}
    </MoodContext.Provider>
  );
};
