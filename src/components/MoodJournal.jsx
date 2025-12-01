import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';
import { BookOpen, Send } from 'lucide-react';

export default function MoodJournal() {
  const { addJournalEntry, getJournals, theme } = useMood();
  const [note, setNote] = useState('');
  const [journals] = useState(getJournals());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    addJournalEntry({ note, emotion: theme.name });
    setNote('');
    alert('Journal entry saved! 💫');
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl glass" style={{ background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}>
          <BookOpen className="w-8 h-8 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
        </div>
        <h2 className="text-4xl font-display font-bold text-gray-900 text-shadow">Mood Journal</h2>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="glass-strong rounded-3xl p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          boxShadow: `0 12px 40px ${theme.colors.glow}`
        }}
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How are you feeling today? Write your thoughts..."
          className="w-full h-40 bg-white/70 rounded-3xl p-6 resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm text-gray-800 placeholder-gray-400 font-light"
          style={{ '--tw-ring-color': theme.colors.primary }}
        />
        <button
          type="submit"
          className="mt-4 px-8 py-4 rounded-full font-semibold text-white flex items-center gap-2 transition-all hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
        >
          <Send className="w-5 h-5" />
          Save Entry
        </button>
      </motion.form>

      <div className="space-y-4">
        {journals.slice(-5).reverse().map((entry, i) => (
          <motion.div
            key={i}
            className="glass rounded-3xl p-6 relative overflow-hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            <div className="flex justify-between items-start mb-3 relative z-10">
              <span className="text-sm font-semibold capitalize px-3 py-1 rounded-full glass" style={{ background: theme.colors.secondary }}>
                {entry.emotion}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {new Date(entry.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed relative z-10">{entry.note}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
