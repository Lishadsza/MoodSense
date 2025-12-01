# 🎭 MoodSense - AI-Powered Emotion Adaptive Website

A beautiful, modern web app that uses webcam to detect facial emotions in real-time and adapts the entire experience - theme, animations, colors, and content - to match your mood.

## ✨ Features

- **Real-time Emotion Detection** - Uses webcam to detect happy, sad, angry, neutral, and surprised emotions
- **Dynamic Theme Engine** - Entire UI adapts instantly based on detected emotion
- **Ambient Animations** - Mood-specific particle effects (confetti, rain, sparkles, breathing circles)
- **Mood Dashboard** - Track emotion trends with beautiful charts
- **Mood Journal** - Write and save mood reflections
- **Settings Panel** - Toggle camera, music, and adjust sensitivity

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Download AI Models
```bash
npm run download-models
```

This downloads the face-api.js models needed for real-time emotion detection.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Grant Camera Access
Allow camera permissions when prompted to enable emotion detection.

### Build for Production
```bash
npm run build
```

## 🎨 Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- **face-api.js** - Real-time face detection & emotion recognition
- TensorFlow.js - ML backend
- Recharts - Mood analytics
- React Webcam - Camera access

## 🧠 AI Emotion Detection

Uses **face-api.js** with TensorFlow.js for real-time facial emotion recognition:
- **TinyFaceDetector** - Fast face detection optimized for real-time
- **FaceExpressionNet** - Recognizes 7 emotions (happy, sad, angry, neutral, surprised, fearful, disgusted)
- Detection runs every 2 seconds for smooth performance
- Adjustable sensitivity threshold in settings

## 🎭 Emotion Themes

- **Happy** 🙂 - Sunshine yellow, floating confetti
- **Sad** 😢 - Calming blue, rain animation
- **Angry** 😡 - Warm earth tones, breathing circle
- **Neutral** 😐 - Clean minimal, subtle gradients
- **Surprised** 😮 - Electric purple, sparkle particles

Enjoy your emotionally adaptive experience! ✨
