import path from 'path';
import { getAllFileSizes } from './file-size.mjs';

main();

const PATH_TO_PUBLIC_ASSETS = path.join(
  process.cwd(),
  '../../',
  'public/assets'
);

async function main() {
  const files = await getAllFileSizes(PATH_TO_PUBLIC_ASSETS);
  console.table(files);
}
