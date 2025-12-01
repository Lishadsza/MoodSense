# 🚀 MoodSense Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Download AI Models
The app uses face-api.js for real-time emotion detection. Download the required models:

```bash
npm run download-models
```

This will download the TensorFlow.js models to `public/models/`:
- `tiny_face_detector` - Fast face detection
- `face_expression` - Emotion recognition

### 3. Start Development Server
```bash
npm run dev
```

### 4. Grant Camera Permissions
When you open the app, your browser will ask for camera access. Click "Allow" to enable emotion detection.

## 🎭 How It Works

1. **Face Detection** - Uses TinyFaceDetector for fast, real-time face detection
2. **Emotion Recognition** - Analyzes facial expressions to detect:
   - Happy 🙂
   - Sad 😢
   - Angry 😡
   - Neutral 😐
   - Surprised 😮
   - Fearful (mapped to surprised)
   - Disgusted (mapped to angry)

## ⚙️ Settings

- **Sensitivity Slider** - Adjust emotion detection threshold (0-100%)
  - Lower = more stable, less reactive
  - Higher = more responsive, may switch frequently

- **Camera Toggle** - Enable/disable emotion detection
- **Music Toggle** - Enable/disable ambient background music


## 📦 Build for Production

```bash
npm run build
```
Enjoy your emotionally adaptive experience! ✨
