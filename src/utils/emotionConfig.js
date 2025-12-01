export const emotionThemes = {
  happy: {
    name: 'Happy',
    emoji: '🙂',
    colors: {
      primary: '#FFD9A0',
      secondary: '#FFF6C2',
      accent: '#FFEAA7',
      bg: 'linear-gradient(135deg, #FFF9E6 0%, #FFF6C2 30%, #FFD9A0 100%)',
      glow: 'rgba(255, 217, 160, 0.4)'
    },
    message: 'You look cheerful today 🌞',
    quote: 'Happiness is not by chance, but by choice.',
    music: '/music/happy.mp3',
    particles: 'confetti'
  },
  sad: {
    name: 'Sad',
    emoji: '😢',
    colors: {
      primary: '#7CB9E8',
      secondary: '#A8D8EA',
      accent: '#C8D5E0',
      bg: 'linear-gradient(135deg, #E8F4F8 0%, #D4E4F7 30%, #B8D4E6 100%)',
      glow: 'rgba(124, 185, 232, 0.4)'
    },
    message: "It's okay to have low days 💙",
    quote: 'Every storm runs out of rain. You are stronger than you think.',
    music: '/music/sad.mp3',
    particles: 'rain'
  },
  angry: {
    name: 'Angry',
    emoji: '😡',
    colors: {
      primary: '#FF9A9A',
      secondary: '#FFD4D4',
      accent: '#FFC9C9',
      bg: 'linear-gradient(135deg, #FFF5F5 0%, #FFD4D4 30%, #FF9A9A 100%)',
      glow: 'rgba(255, 154, 154, 0.4)'
    },
    message: "Let's slow down together ",
    quote: 'Breathe. You are not your anger. Let it pass like clouds.',
    music: '/music/calm.mp3',
    particles: 'breathing'
  },
  neutral: {
    name: 'Neutral',
    emoji: '😐',
    colors: {
      primary: '#9CA3AF',
      secondary: '#D1D5DB',
      accent: '#E5E7EB',
      bg: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 30%, #D1D5DB 100%)',
      glow: 'rgba(156, 163, 175, 0.4)'
    },
    message: "You're feeling calm and centered 🤍",
    quote: 'Balance is not something you find, it is something you create.',
    music: '/music/neutral.mp3',
    particles: 'minimal'
  },
  surprised: {
    name: 'Surprised',
    emoji: '😮',
    colors: {
      primary: '#C77DFF',
      secondary: '#E0AAFF',
      accent: '#F3E8FF',
      bg: 'linear-gradient(135deg, #FAF5FF 0%, #E0AAFF 30%, #C77DFF 100%)',
      glow: 'rgba(199, 125, 255, 0.4)'
    },
    message: 'Wow! Something surprised you ✨',
    quote: 'Life is full of surprises. Embrace the unexpected!',
    music: '/music/surprise.mp3',
    particles: 'sparkles'
  }
};

export const getEmotionFromExpression = (expressions) => {
  if (!expressions) return 'neutral';

  const emotions = Object.entries(expressions);
  const dominant = emotions.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );

  return dominant[0];
};
