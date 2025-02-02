// /* eslint-disable @typescript-eslint/no-require-imports */
// const fs = require('fs');
// const path = require('path');

// // Create extension directory if it doesn't exist
// const extensionDir = path.join(process.cwd(), 'extension');
// if (!fs.existsSync(extensionDir)) {
//     fs.mkdirSync(extensionDir);
// }

// // Copy manifest.json
// fs.copyFileSync(
//     path.join(process.cwd(), 'public', 'manifest.json'),
//     path.join(extensionDir, 'manifest.json')
// );

// // Copy icon
// fs.copyFileSync(
//     path.join(process.cwd(), 'public', 'icon.png'),
//     path.join(extensionDir, 'icon.png')
   
// );

// // Copy the built Next.js files
// function copyDir(src, dest) {
//     if (!fs.existsSync(dest)) {
//         fs.mkdirSync(dest);
//     }

//     const files = fs.readdirSync(src);
//     for (const file of files) {
//         if (file.startsWith('_next')) continue; // Skip _next directory
        
//         const srcPath = path.join(src, file);
//         const destPath = path.join(dest, file);

//         if (fs.lstatSync(srcPath).isDirectory()) {
//             copyDir(srcPath, destPath);
//         } else {
//             fs.copyFileSync(srcPath, destPath);
//         }
//     }
// }

// // Copy from out directory to extension directory
// copyDir(path.join(process.cwd(), 'out'), extensionDir);

// console.log('Extension build complete!');
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create extension directory if it doesn't exist
const extensionDir = path.join(process.cwd(), 'extension');
if (!fs.existsSync(extensionDir)) {
    fs.mkdirSync(extensionDir);
}

// Copy manifest.json
fs.copyFileSync(
    path.join(process.cwd(), 'public', 'manifest.json'),
    path.join(extensionDir, 'manifest.json')
);

// Copy icon
fs.copyFileSync(
    path.join(process.cwd(), 'public', 'icon.png'),
    path.join(extensionDir, 'icon.png')
);

// Copy content.js
fs.copyFileSync(
    path.join(process.cwd(), 'public', 'content.js'),
    path.join(extensionDir, 'content.js')
);

// Copy background.js
fs.copyFileSync(
    path.join(process.cwd(), 'public', 'background.js'),
    path.join(extensionDir, 'background.js')
);

// Replace API key in content.js
const contentJsPath = path.join(extensionDir, 'content.js');
let contentJs = fs.readFileSync(contentJsPath, 'utf8');
contentJs = contentJs.replace(
    'YOUR_HUGGING_FACE_API_KEY',
    process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY || ''
);
fs.writeFileSync(contentJsPath, contentJs);

// Copy the built Next.js files
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    const files = fs.readdirSync(src);
    for (const file of files) {
        if (file.startsWith('_next')) continue; // Skip _next directory
        
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy from out directory to extension directory
copyDir(path.join(process.cwd(), 'out'), extensionDir);

console.log('Extension build complete!');