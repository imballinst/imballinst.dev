const path = require('path');
const fs = require('fs/promises');

module.exports = { getAllFileSizes };

async function getAllFileSizes(pathToPublicAssets) {
  const distPublicAssets = pathToPublicAssets.replace(/\/public\//, '/dist/');
  const files = await recursivelyGetAllFileSizes(
    pathToPublicAssets,
    distPublicAssets
  );
  files.sort((a, b) => b.size - a.size);

  return files;
}

async function recursivelyGetAllFileSizes(
  dirPath,
  distPublicAssets,
  entryPath = ''
) {
  const entries = await fs.readdir(dirPath, {
    withFileTypes: true,
    encoding: 'utf-8'
  });
  const files = [];

  for (const entry of entries) {
    const entryFullPath = `${dirPath}/${entry.name}`;

    if (entry.isFile()) {
      const stat = await fs.stat(entryFullPath);
      const ext = path.extname(entry.name);
      const basename = path.basename(entry.name, ext);

      files.push({
        path: entryFullPath,
        distPath: `${distPublicAssets}${entryPath}/${basename}--compressed${ext}`,
        // Convert to KB.
        size: stat.size / 1024
      });
    } else {
      files.push(
        ...(await recursivelyGetAllFileSizes(
          entryFullPath,
          distPublicAssets,
          `${entryPath}/${entry.name}`
        ))
      );
    }
  }

  return files;
}
