import cheerio from 'cheerio';
import path from 'path';

const TEXT_COLOR = 'text-gray-600 dark:text-gray-400';
const COMPRESSED_EXTS = ['.jpeg', '.jpg', '.png'];
const IMAGE_WIDTHS = [512, 1024, 2048];

export default function imageCaptionPlugin() {
  return (tree) => {
    for (const firstChild of tree.children) {
      if (firstChild.type !== 'paragraph') {
        continue;
      }

      for (const child of firstChild.children) {
        if (child.type === 'image') {
          const { url, alt } = child;
          const $ = cheerio.load(alt);
          // Need to strip the quotes otherwise it will break the anchor tag.
          const altString = $('body').text().replace(/['"]+/g, '');
          let htmlString = '';

          $('body').each((_i, el) => {
            for (const altChild of el.children) {
              if (altChild.type === 'tag' && altChild.name === 'a') {
                htmlString += generateAnchorTag({
                  href: altChild.attribs.href,
                  text: $(altChild).text()
                });
              } else {
                htmlString += altChild.data;
              }
            }
          });

          const imgProps = {
            alt: altString,
            loading: 'lazy',
            src: url,
            sizes:
              '(max-width: 768px) 736px, (max-width: 960px) 928px, (max-width: 1152px) 1120px, 2048px'
          };

          if (process.env.PUBLIC_ASTRO_ENV === 'production') {
            const ext = path.extname(url);

            if (COMPRESSED_EXTS.includes(ext)) {
              const withoutExt = url.slice(0, -ext.length);

              imgProps.srcset = IMAGE_WIDTHS.map(
                (width) => `${withoutExt}--${width}w${ext} ${width}w`
              ).join(', ');
              // Set the effective URL to the biggest image.
              imgProps.src = `${withoutExt}--${IMAGE_WIDTHS[2]}w${ext}`;
            }
          }

          const imgTag = generateImageTag(imgProps);

          firstChild.value = `
            <figure class="flex flex-col items-center justify-center mt-3 mb-4">
              <div class="border border-gray-200 dark:border-gray-600">
                <a href="${imgProps.src}" target="_blank" rel="noopener">
                  ${imgTag}
                </a>
              </div>
              <figcaption class="text-sm text-center mt-1 ${TEXT_COLOR}">${htmlString}</figcaption>
            </figure>
          `.trim();
          firstChild.type = 'html';
          firstChild.children = undefined;

          break;
        }
      }
    }
  };
}

function generateImageTag(props) {
  let attrs = '';

  for (const prop in props) {
    attrs += `${prop}="${props[prop]}" `;
  }

  return `<img ${attrs}/>`;
}

function generateAnchorTag({ href, text }) {
  let icon = '';

  if (href.includes('https://')) {
    icon = `
<svg
  viewBox="0 0 24 24"
  class="ml-1 mb-2 h-3 w-3 inline-block"
  focusable="false"
  aria-hidden="true"
>
  <g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="2"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <path d="M15 3h6v6"></path>
    <path d="M10 14L21 3"></path>
  </g>
</svg>
    `.trim();
  }

  return `
<a class="text-teal-600 dark:text-teal-300 hover:underline break-all inline-block" target="_blank" rel="noopener" href="${href}">
  ${text} ${icon}
</a>
  `.trim();
}
