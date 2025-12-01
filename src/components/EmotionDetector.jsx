import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useMood } from '../context/MoodContext';
import { motion } from 'framer-motion';

export default function EmotionDetector() {
  const webcamRef = useRef(null);
  const { updateEmotion, theme, settings } = useMood();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const detectionIntervalRef = useRef(null);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Failed to load AI models. Using fallback detection.');
        setIsLoading(false);
        setModelsLoaded(false);
      }
    };

    loadModels();
  }, []);

  // Detect emotions from webcam
  useEffect(() => {
    if (!settings.cameraEnabled || !modelsLoaded) return;

    const detectEmotion = async () => {
      if (webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;
        
        try {
          const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (detections) {
            const expressions = detections.expressions;
            const dominantEmotion = getDominantEmotion(expressions);
            updateEmotion(dominantEmotion);
          }
        } catch (err) {
          console.error('Detection error:', err);
        }
      }
    };

    detectionIntervalRef.current = setInterval(detectEmotion, 2000);

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [settings.cameraEnabled, modelsLoaded, updateEmotion]);

  // Map face-api emotions to our emotion themes
  const getDominantEmotion = (expressions) => {
    const emotionMap = {
      happy: 'happy',
      sad: 'sad',
      angry: 'angry',
      neutral: 'neutral',
      surprised: 'surprised',
      fearful: 'surprised',
      disgusted: 'angry'
    };

    let maxEmotion = 'neutral';
    let maxValue = 0;

    Object.entries(expressions).forEach(([emotion, value]) => {
      if (value > maxValue && value > settings.sensitivity) {
        maxValue = value;
        maxEmotion = emotionMap[emotion] || 'neutral';
      }
    });

    return maxEmotion;
  };

  if (!settings.cameraEnabled) {
    return (
      <motion.div
        className="glass rounded-3xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-600">Camera disabled</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass-strong rounded-3xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: `0 12px 40px ${theme.colors.glow}`
      }}
    >
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          onUserMediaError={(err) => setError(err.message)}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-white font-medium">Loading camera...</div>
          </div>
        )}

        <div
          className="absolute top-6 left-6 glass-strong px-5 py-3 rounded-full flex items-center gap-3 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            border: '2px solid rgba(255, 255, 255, 0.5)'
          }}
        >
          <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{theme.emoji}</span>
          <span className="font-semibold text-white text-lg">{theme.name}</span>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          Camera error: {error}
        </div>
      )}
    </motion.div>
  );
}
