const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
  console.log('Created dist directory');
}

// Create dist/public directory if it doesn't exist
const publicDir = path.join(distDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Created dist/public directory');
}

// Copy app.js to dist
fs.copyFileSync(
  path.join(__dirname, 'src', 'app.js'),
  path.join(distDir, 'app.js')
);
console.log('Copied app.js to dist');

// Copy public files to dist/public
const srcPublicDir = path.join(__dirname, 'src', 'public');
const files = fs.readdirSync(srcPublicDir);

files.forEach(file => {
  const srcPath = path.join(srcPublicDir, file);
  const destPath = path.join(publicDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file} to dist/public`);
});

console.log('Build completed successfully!');