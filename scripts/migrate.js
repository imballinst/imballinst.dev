// This file is used to migrate one blog framework to another.
const path = require('path');
const fs = require('fs-extra');

const PATH_TO_POSTS = path.join(__dirname, '../src/pages/posts');
const PATH_TO_BLOG_ASSETS = path.join(__dirname, '../public/assets/blog');
const DEFAULT_BLOG_FRONTMATTERS = {
  title: '',
  description: '',
  publishDate: '',
  heroImage: '',
  alt: '',
  layout: '../../layouts/BlogPost.astro'
};
const FRONTMATTER_MAP = {
  date: 'publishDate',
  featuredimage: 'heroImage'
};
const IMAGE_EXTENSIONS = ['gif', 'png', 'jpg'](async () => {
  const entries = await fs.readdir(PATH_TO_POSTS, {
    withFileTypes: true,
    encoding: 'utf-8'
  });
  const directories = entries.filter((entry) => entry.isDirectory());

  await Promise.all(
    directories.map(async (directory) => {
      const slug = directory.name;
      const fullPathToPostDir = `${PATH_TO_POSTS}/${slug}`;

      const file = await fs.readFile(`${fullPathToPostDir}/index.md`, 'utf-8');
      const [, frontmatter, content] = file.split('---\n');

      const frontmatterArray = frontmatter.split('\n');
      const newFrontmatters = [];
      // By default, we expect previous blog posts have `images/` folder.
      let hasImagesFolder = true;

      for (const item of frontmatterArray) {
        const [key, value] = item.split(/:\s?/);
        const mappedKey = FRONTMATTER_MAP[key] || key;
        let contentRegex = /\(images\/([\w\d-]+\.(png|jpg|gif))\)/g;

        if (DEFAULT_BLOG_FRONTMATTERS[mappedKey] !== undefined) {
          let pushedValue = DEFAULT_BLOG_FRONTMATTERS[mappedKey] || value;

          if (key === 'featuredimage') {
            hasImagesFolder = value.startsWith('images/');

            if (hasImagesFolder) {
              pushedValue = pushedValue.replace(
                'images/',
                `/assets/blog/${slug}`
              );
            } else {
              contentRegex = /\(([\w\d-]+\.(png|jpg|gif))\)/g;
              pushedValue = `/assets/blog/${pushedValue}`;
            }
          }

          newFrontmatters.push(`${mappedKey}: ${pushedValue}`);
        }
      }

      if (hasImagesFolder) {
        fs.copy(
          `${fullPathToPostDir}/images`,
          `${PATH_TO_BLOG_ASSETS}/${slug}`
        );
      } else {
        const allDirectoryEntries = await fs.readdir(fullPathToPostDir, {
          encoding: 'utf-8',
          withFileTypes: true
        });
        const images = allDirectoryEntries.filter((entry) =>
          IMAGE_EXTENSIONS.includes(entry.name.split('.')[1])
        );

        await fs.mkdirp(`${PATH_TO_BLOG_ASSETS}/${slug}`);
        await Promise.all(
          images.map((image) =>
            fs.copy(
              `${fullPathToPostDir}/${image.name}`,
              `${PATH_TO_BLOG_ASSETS}/${slug}`
            )
          )
        );
      }

      const newMarkdown = [
        '---',
        newFrontmatters.join('\n'),
        '---',
        content.replace(/images\/([\w\d-]+\.(png|jpg|gif))/g, `/assets/blog/$1`)
      ].join('\n');

      return fs.writeFile(`${fullPathToPostDir}.md`, newMarkdown);
    })
  );
})();
