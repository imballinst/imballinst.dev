// This file is used to migrate one blog framework to another.
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'yaml';

const url = new URL(import.meta.url);

const PATH_TO_POSTS = path.join(url.pathname, '../../blog-backup');
const PATH_TO_NEW_POSTS = path.join(url.pathname, '../../src/posts');
const PATH_TO_BLOG_ASSETS = path.join(url.pathname, '../../public/assets/blog');

const DEFAULT_BLOG_FRONTMATTERS = {
  title: '',
  description: '',
  publishDate: '',
  image: '',
  imageAlt: '',
  tags: '',
  visibility: '',
  layout: '../../layouts/BlogPost.astro'
};
const FRONTMATTER_MAP = {
  publishDate: 'date',
  image: 'featuredimage'
};
const IMAGE_EXTENSIONS = ['gif', 'png', 'jpg'];

async function main() {
  const entries = await fs.readdir(PATH_TO_POSTS, {
    withFileTypes: true,
    encoding: 'utf-8'
  });
  const directories = entries.filter((entry) => entry.isDirectory());

  await Promise.all(
    directories.map(async (directory) => migratePost(directory))
  );
}

(async () => await main())();

const CONTENT_REGEX = /\((images\/)?([\w\d-]+\.(png|jpg|gif))\)/g;

// Helper functions.
async function migratePost(directory) {
  const slug = directory.name;
  const fullPathToPostDir = `${PATH_TO_POSTS}/${slug}`;

  const file = await fs.readFile(`${fullPathToPostDir}/index.md`, 'utf-8');
  const { frontmatter: previousFrontmatter, content } = parseMarkdown(file);
  const newFrontmatters = {};
  // By default, we expect previous blog posts have `images/` folder.
  let hasImagesFolder = true;

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
          pushedFrontmatter = `/assets/blog/${slug}/${pushedFrontmatter}`;
        }
      }
    } else {
      pushedFrontmatter =
        previousFrontmatterValue || DEFAULT_BLOG_FRONTMATTERS[key];
    }

    if (Array.isArray(pushedFrontmatter)) {
      pushedFrontmatter = pushedFrontmatter.join(', ');
    }

    if (pushedFrontmatter !== undefined) {
      newFrontmatters[key] = pushedFrontmatter;
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
    Object.keys(newFrontmatters)
      .map((k) => `${k}: ${newFrontmatters[k]}`)
      .join('\n'),
    '---\n',
    content.replace(CONTENT_REGEX, `(/assets/blog/${slug}/$1)`)
  ].join('\n');

  await fs.mkdir(PATH_TO_NEW_POSTS, { recursive: true });
  return fs.writeFile(`${PATH_TO_NEW_POSTS}/${slug}.md`, newMarkdown);
}

const HERO_IMAGE_REGEX = /^!\[.+\]\(.+\)$/g;

function parseMarkdown(content) {
  const array = content.split('\n');
  const obj = {
    frontmatter: {},
    content: ''
  };
  let frontmatterStart = 0;
  let parseState = '';

  for (let i = 0; i < array.length; i++) {
    const line = array[i];

    if (line === '---') {
      if (parseState === '') {
        parseState = 'frontmatter';
        frontmatterStart = i + 1;
      } else if (parseState === 'frontmatter') {
        parseState = 'content';

        obj.frontmatter = yaml.parse(
          array.slice(frontmatterStart, i).join('\n')
        );
      }
    } else if (HERO_IMAGE_REGEX.test(line)) {
      if (parseState === 'content') {
        const startIndex = line.indexOf('](');
        const imagePath = line.slice(startIndex + 2, -1);
        const imageAlt = line.slice(2, startIndex);
        const $ = cheerio.load(imageAlt);

        obj.frontmatter.imageAlt = $.text();
        obj.frontmatter.image = imagePath;
        obj.content = array.slice(i).join('\n');

        break;
      }
    }
  }

  return obj;
}
