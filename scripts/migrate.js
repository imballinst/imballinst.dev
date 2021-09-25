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
  publishDate: 'date',
  heroImage: 'featuredimage'
};
const IMAGE_EXTENSIONS = ['gif', 'png', 'jpg'];

async function main() {
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

      const previousFrontmatter = Object.fromEntries(
        frontmatter
          .split('\n')
          .map((item) => item.split(': '))
          .filter((arr) => arr.length === 2)
      );
      const newFrontmatters = [];
      // By default, we expect previous blog posts have `images/` folder.
      let hasImagesFolder = true;
      let contentRegex = /\(images\/([\w\d-]+\.(png|jpg|gif))\)/g;

      for (const key in DEFAULT_BLOG_FRONTMATTERS) {
        const previousFrontmatterValue = previousFrontmatter[key];
        const portedKey = FRONTMATTER_MAP[key];
        let pushedFrontmatter;

        if (portedKey !== undefined) {
          pushedFrontmatter = previousFrontmatter[portedKey];

          if (portedKey === 'featuredimage') {
            hasImagesFolder = pushedFrontmatter.startsWith('images/');

            if (hasImagesFolder) {
              pushedFrontmatter = pushedFrontmatter.replace(
                'images/',
                `/assets/blog/${slug}/`
              );
            } else {
              contentRegex = /\(([\w\d-]+\.(png|jpg|gif))\)/g;
              pushedFrontmatter = `/assets/blog/${slug}/${pushedFrontmatter}`;
            }
          }
        } else {
          pushedFrontmatter =
            previousFrontmatterValue || DEFAULT_BLOG_FRONTMATTERS[key];
        }

        if (pushedFrontmatter !== undefined) {
          newFrontmatters.push(`${key}: ${pushedFrontmatter}`);
        }
      }

      if (hasImagesFolder) {
        await fs.copy(
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
              `${PATH_TO_BLOG_ASSETS}/${slug}/${image.name}`
            )
          )
        );
      }

      const newMarkdown = [
        '---',
        newFrontmatters.join('\n'),
        '---',
        content.replace(contentRegex, `(/assets/blog/${slug}/$1)`)
      ].join('\n');

      return await Promise.all([
        fs.writeFile(`${fullPathToPostDir}.md`, newMarkdown),
        fs.rm(fullPathToPostDir, { recursive: true })
      ]);
    })
  );
}

(async () => await main())();
