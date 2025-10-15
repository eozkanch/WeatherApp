#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');

async function createIcons() {
  try {
    // 192x192 PNG
    await sharp('public/icon-192.svg')
      .resize(192, 192)
      .png()
      .toFile('public/icon-192.png');
    
    console.log('✅ Created icon-192.png');
    
    // 512x512 PNG
    await sharp('public/icon-512.svg')
      .resize(512, 512)
      .png()
      .toFile('public/icon-512.png');
    
    console.log('✅ Created icon-512.png');
    
    // Favicon (32x32)
    await sharp('public/icon-192.svg')
      .resize(32, 32)
      .png()
      .toFile('public/favicon-32x32.png');
    
    console.log('✅ Created favicon-32x32.png');
    
    // Apple touch icon (180x180)
    await sharp('public/icon-192.svg')
      .resize(180, 180)
      .png()
      .toFile('public/apple-touch-icon.png');
    
    console.log('✅ Created apple-touch-icon.png');
    
    console.log('🎉 All icons created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating icons:', error);
  }
}

createIcons();
