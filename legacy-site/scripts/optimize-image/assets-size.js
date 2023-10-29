const path = require('path');
const { getAllFileSizes } = require('./file-size');

main();

const PATH_TO_PUBLIC_ASSETS = path.join(__dirname, '../../', 'public/assets');

async function main() {
  const files = await getAllFileSizes(PATH_TO_PUBLIC_ASSETS);
  console.table(files);
}
