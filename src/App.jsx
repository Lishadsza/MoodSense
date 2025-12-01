import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMood } from './context/MoodContext';
import MoodBackground from './components/MoodBackground';
import EmotionDetector from './components/EmotionDetector';
import MoodDashboard from './components/MoodDashboard';
import MoodJournal from './components/MoodJournal';
import Settings from './components/Settings';
import MusicPlayer from './components/MusicPlayer';
import { Home, BarChart3, BookOpen, Settings as SettingsIcon } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: SettingsIcon }
];

function App() {
  const [activeView, setActiveView] = useState('home');
  const { theme } = useMood();

  return (
    <div className="min-h-screen relative">
      <MoodBackground />
      <MusicPlayer />
      
      {/* Full-width sticky header */}
      <motion.header
        className="sticky top-0 z-50 glass-strong border-b border-white/30 relative"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          boxShadow: `0 8px 32px ${theme.colors.glow}, 0 20px 60px rgba(255, 255, 255, 0.3)`
        }}
      >
        {/* Foggy gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />
        <div 
          className="absolute -bottom-12 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)`,
            filter: 'blur(10px)'
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="text-center mb-6">
            <h1 
              className="text-6xl font-display font-bold mb-2 text-gray-600"
              style={{
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
                opacity: 0.85
              }}
            >
              MoodSense
            </h1>
            <p className="text-gray-700 text-lg font-light">
              AI-Powered Emotion Adaptive Experience
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveView(id)}
                className={`px-7 py-4 rounded-2xl font-semibold transition-all flex items-center gap-3 relative overflow-hidden ${
                  activeView === id
                    ? 'text-white shadow-2xl'
                    : 'glass text-gray-800 hover:text-gray-900 hover:bg-white/40'
                }`}
                style={activeView === id ? { 
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  boxShadow: `0 12px 32px ${theme.colors.glow}, 0 4px 12px rgba(0,0,0,0.15)`,
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(10px)'
                } : {
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)'
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >

                <Icon className="w-5 h-5 relative z-10" style={activeView === id ? { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' } : {}} />
                <span className="relative z-10" style={activeView === id ? { 
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  fontWeight: '700'
                } : {}}>{label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'home' && <HomePage />}
            {activeView === 'dashboard' && <MoodDashboard />}
            {activeView === 'journal' && <MoodJournal />}
            {activeView === 'settings' && <Settings />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomePage() {
  const { theme } = useMood();

  return (
    <div className="space-y-8">
      <EmotionDetector />
      
      <motion.div
        className="glass-strong rounded-3xl p-10 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          boxShadow: `0 12px 40px ${theme.colors.glow}`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
        <div
          className="text-7xl mb-6 relative z-10"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {theme.emoji}
        </div>
        <h2 className="text-4xl font-display font-bold mb-4 text-gray-900 relative z-10 text-shadow">
          {theme.message}
        </h2>
        <p className="text-xl text-gray-700 italic font-light relative z-10 max-w-2xl mx-auto">
          "{theme.quote}"
        </p>
      </motion.div>
    </div>
  );
}

export default App;
