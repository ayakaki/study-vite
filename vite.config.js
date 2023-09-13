import fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const fileNameList = fs.readdirSync(resolve(__dirname, './src/'));
const htmlFileList = fileNameList.filter((file) => /.html$/.test(file));
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0, -5)] = resolve(__dirname, './src/' + file);
}

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
      input: inputFiles,
    },
  },
});
