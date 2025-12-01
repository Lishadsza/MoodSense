import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';
import { Camera, Music, Sliders } from 'lucide-react';

export default function Settings() {
  const { settings, setSettings, theme } = useMood();

  const toggleCamera = () => {
    setSettings({ ...settings, cameraEnabled: !settings.cameraEnabled });
  };

  const toggleMusic = () => {
    setSettings({ ...settings, musicEnabled: !settings.musicEnabled });
  };

  const updateSensitivity = (e) => {
    setSettings({ ...settings, sensitivity: parseFloat(e.target.value) });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl font-display font-bold text-gray-900 text-shadow">Settings</h2>

      <motion.div
        className="glass-strong rounded-3xl p-8 space-y-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          boxShadow: `0 12px 40px ${theme.colors.glow}`
        }}
      >
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: theme.colors.primary }}>
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Camera</div>
              <div className="text-sm text-gray-600">Enable emotion detection</div>
            </div>
          </div>
          <button
            onClick={toggleCamera}
            className={`w-16 h-9 rounded-full transition-all shadow-lg ${
              settings.cameraEnabled ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-300'
            }`}
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow-lg"
              animate={{ x: settings.cameraEnabled ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: theme.colors.primary }}>
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Background Music</div>
              <div className="text-sm text-gray-600">Ambient mood sounds</div>
            </div>
          </div>
          <button
            onClick={toggleMusic}
            className={`w-16 h-9 rounded-full transition-all shadow-lg ${
              settings.musicEnabled ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-300'
            }`}
          >
            <motion.div
              className="w-7 h-7 bg-white rounded-full shadow-lg"
              animate={{ x: settings.musicEnabled ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white/40 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl" style={{ background: theme.colors.primary }}>
              <Sliders className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Sensitivity</div>
              <div className="text-sm text-gray-600">Emotion detection threshold</div>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.sensitivity}
            onChange={updateSensitivity}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${theme.colors.primary} 0%, ${theme.colors.primary} ${settings.sensitivity * 100}%, #E5E7EB ${settings.sensitivity * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="text-center text-lg font-semibold text-gray-900 mt-3">
            {(settings.sensitivity * 100).toFixed(0)}%
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
