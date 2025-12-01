import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Angry, Meh, Zap } from 'lucide-react';

const emotionIcons = {
  happy: Smile,
  sad: Frown,
  angry: Angry,
  neutral: Meh,
  surprised: Zap
};

export default function MoodDashboard() {
  const { moodHistory, theme } = useMood();

  const emotionCounts = moodHistory.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  const chartData = moodHistory.slice(-20).map((entry, i) => ({
    time: i,
    value: ['sad', 'angry', 'neutral', 'happy', 'surprised'].indexOf(entry.emotion)
  }));

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-display font-bold text-gray-900 text-shadow">Mood Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(emotionCounts).map(([emotion, count]) => {
          const Icon = emotionIcons[emotion];
          return (
            <motion.div
              key={emotion}
              className="glass-strong rounded-3xl p-5 text-center relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                boxShadow: `0 8px 32px ${theme.colors.glow}, 0 0 0 1px rgba(255,255,255,0.4)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Icon className="w-10 h-10 mx-auto mb-3 relative z-10" style={{ color: theme.colors.primary, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              <div className="text-3xl font-bold text-gray-900 relative z-10">{count}</div>
              <div className="text-xs font-medium text-gray-600 capitalize relative z-10 mt-1">{emotion}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="glass-strong rounded-3xl p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          boxShadow: `0 12px 40px ${theme.colors.glow}`
        }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Mood Trend</h3>
        <div className="bg-white/60 rounded-3xl p-6 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 12 }}
                label={{ value: 'Recent Activity', position: 'insideBottom', offset: -5, fill: '#6B7280' }}
              />
              <YAxis 
                domain={[0, 4]}
                ticks={[0, 1, 2, 3, 4]}
                tickFormatter={(value) => ['Sad', 'Angry', 'Neutral', 'Happy', 'Surprised'][value] || ''}
                stroke="#9CA3AF"
                tick={{ fill: '#6B7280', fontSize: 11 }}
                width={70}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '8px 12px'
                }}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
                formatter={(value) => [['Sad', 'Angry', 'Neutral', 'Happy', 'Surprised'][value], 'Mood']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.colors.primary}
                strokeWidth={4}
                dot={{ fill: theme.colors.primary, strokeWidth: 2, r: 5, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
