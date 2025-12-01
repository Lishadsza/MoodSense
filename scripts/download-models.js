import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
const OUTPUT_DIR = path.join(__dirname, '../public/models');

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1'
];

// Create models directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('📦 Downloading face-api.js models...\n');

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const downloadModels = async () => {
  for (const model of models) {
    const url = `${MODEL_URL}/${model}`;
    const dest = path.join(OUTPUT_DIR, model);
    
    try {
      console.log(`⬇️  Downloading ${model}...`);
      await downloadFile(url, dest);
      console.log(`✅ ${model} downloaded\n`);
    } catch (err) {
      console.error(`❌ Failed to download ${model}:`, err.message);
    }
  }
  
  console.log('🎉 All models downloaded successfully!');
};

downloadModels();
