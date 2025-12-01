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

3. **Theme Adaptation** - The entire UI instantly adapts based on detected emotion

## ⚙️ Settings

- **Sensitivity Slider** - Adjust emotion detection threshold (0-100%)
  - Lower = more stable, less reactive
  - Higher = more responsive, may switch frequently

- **Camera Toggle** - Enable/disable emotion detection
- **Music Toggle** - Enable/disable ambient background music

## 🔧 Troubleshooting

### Models Not Loading
If you see "Failed to load AI models":
1. Make sure you ran `npm run download-models`
2. Check that `public/models/` contains the model files
3. Clear browser cache and reload

### Camera Not Working
- Ensure you granted camera permissions
- Check if another app is using the camera
- Try a different browser (Chrome/Edge recommended)

### Slow Performance
- The app uses TinyFaceDetector for speed
- Detection runs every 2 seconds (configurable)
- Close other tabs/apps using the camera

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🎨 Customization

Edit `src/utils/emotionConfig.js` to customize:
- Theme colors
- Messages and quotes
- Particle effects
- Music files

Enjoy your emotionally adaptive experience! ✨
