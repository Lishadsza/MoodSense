import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';

const Confetti = () => (
  <>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: ['#FFD93D', '#FFB84D', '#FF6B9D'][i % 3],
          left: `${Math.random() * 100}%`,
          top: `-10%`
        }}
        animate={{
          y: ['0vh', '110vh'],
          rotate: [0, 360],
          opacity: [1, 0]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </>
);

const Rain = () => (
  <>
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-8 bg-blue-300 opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `-10%`
        }}
        animate={{
          y: ['0vh', '110vh']
        }}
        transition={{
          duration: 1 + Math.random(),
          repeat: Infinity,
          delay: Math.random()
        }}
      />
    ))}
  </>
);

const Sparkles = () => (
  <>
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-purple-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </>
);

const BreathingCircle = () => {
  const { theme } = useMood();
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="w-32 h-32 rounded-full border-4" 
        style={{ borderColor: theme.colors.primary }}
      />
    </motion.div>
  );
};

export default function MoodBackground() {
  const { theme } = useMood();

  return (
    <motion.div
      className="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ background: theme.colors.bg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      key={theme.name}
    >
      {theme.particles === 'confetti' && <Confetti />}
      {theme.particles === 'rain' && <Rain />}
      {theme.particles === 'sparkles' && <Sparkles />}
      {theme.particles === 'breathing' && <BreathingCircle />}
    </motion.div>
  );
}
