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
}(async () => {
  const entries = await fs.readdir(PATH_TO_POSTS, {
    withFileTypes: true,
    encoding: 'utf-8'
  });
  const directories = entries.filter((entry) => entry.isDirectory());

  const filesAndPaths = directories.map(async (directory) => {
    const slug = directory.name;
    const fullPathToPost = `${PATH_TO_POSTS}/${slug}`;

    await Promise.all([
      async () => {
        const file = await fs.readFile(`${fullPathToPost}/${slug}.md`, 'utf-8');
        const [, frontmatter, content] = file.split('---\n');

        const frontmatterArray = frontmatter.split('\n');
        const newFrontmatters = [];

        for (const item of frontmatterArray) {
          const [key, value] = item.split(/:\s?/);
          const mappedKey = FRONTMATTER_MAP[key] || key;

          if (DEFAULT_BLOG_FRONTMATTERS[mappedKey] !== undefined) {
            const pushedValue = DEFAULT_BLOG_FRONTMATTERS[mappedKey] || value;
            newFrontmatters.push(`${mappedKey}: ${pushedValue}`);
          }
        }

        const newMarkdown = [
          '---',
          frontmatter.join('\n'),
          '---',
          content
        ].join('\n');

        return fs.writeFile(`${fullPathToPost}.md`, newMarkdown);
      },
      fs.copy(`${fullPathToPost}/images`, `${PATH_TO_BLOG_ASSETS}/${slug}`)
    ]);
  });
})();
