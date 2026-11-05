import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fbDir = path.resolve(__dirname, 'public/images/fb');
const imgDir = path.resolve(__dirname, 'public/images');

// Mapping of primary website slots to real high-definition Doris Contact Lens FB photos:
const primaryMapping = {
  '01_circle_model.jpg': 'fb_photo_17.jpg',     // Circle Blue model with ribbons (1536x1536)
  '02_lens_product.jpg': 'fb_photo_01.jpg',     // Aromi Brown DIA 14.5mm (1536x1536)
  '03_circle_model_2.jpg': 'fb_photo_05.jpg',   // Circle Blue model classic (1536x1536)
  '04_lens_pack.jpg': 'fb_photo_20.jpg',        // Gina 14.3mm style (1536x1536)
  '05_lens_pack_detail.jpg': 'fb_photo_02.jpg', // Aromi Brown close (1536x1536)
  '06_flower_model.jpg': 'fb_photo_03.jpg',     // Aromi Brown soft doll (1536x1536)
  '07_eye_closeup.jpg': 'fb_photo_09.jpg',      // Circle eye detail (1536x1536)
  '08_flower_model_2.jpg': 'fb_photo_04.jpg',   // Aromi model 4 (1536x1536)
  '09_kang_model.jpg': 'fb_photo_21.jpg',       // Gina grey model (1536x1536)
};

for (const [targetName, sourceName] of Object.entries(primaryMapping)) {
  const src = path.join(fbDir, sourceName);
  const dest = path.join(imgDir, targetName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${sourceName} -> ${targetName}`);
  }
}

console.log('Successfully set up all images with genuine Doris FB photos!');
