#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/bg-images');
const outputDir = path.join(__dirname, '../public/bg-images-optimized');

// Output dizinini oluştur
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  
  try {
    // WebP formatında optimize et
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(path.join(outputDir, `${baseName}.webp`));

    // AVIF formatında optimize et (daha iyi sıkıştırma)
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .avif({ 
        quality: 80,
        effort: 9
      })
      .toFile(path.join(outputDir, `${baseName}.avif`));

    // Fallback için optimize edilmiş JPEG
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85,
        progressive: true
      })
      .toFile(path.join(outputDir, `${baseName}.jpg`));

    console.log(`✅ Optimized: ${filename}`);
    
    // Boyut karşılaştırması
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(path.join(outputDir, `${baseName}.webp`)).size;
    const avifSize = fs.statSync(path.join(outputDir, `${baseName}.avif`)).size;
    const jpgSize = fs.statSync(path.join(outputDir, `${baseName}.jpg`)).size;
    
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
    console.log(`   AVIF: ${(avifSize / 1024).toFixed(1)} KB (${((1 - avifSize/originalSize) * 100).toFixed(1)}% smaller)`);
    console.log(`   JPEG: ${(jpgSize / 1024).toFixed(1)} KB (${((1 - jpgSize/originalSize) * 100).toFixed(1)}% smaller)`);
    console.log('');
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir).filter(file => 
    file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
  );

  console.log(`🚀 Starting optimization of ${files.length} images...\n`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    await optimizeImage(inputPath, file);
  }

  console.log('🎉 Image optimization completed!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

// Sharp paketini kontrol et
try {
  require.resolve('sharp');
  optimizeAllImages();
} catch (error) {
  console.log('❌ Sharp package not found. Installing...');
  const { execSync } = require('child_process');
  execSync('npm install sharp', { stdio: 'inherit' });
  console.log('✅ Sharp installed. Running optimization...');
  optimizeAllImages();
}
