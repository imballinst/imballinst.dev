import cheerio from 'cheerio';

const TEXT_COLOR = 'text-gray-600 dark:text-gray-400';

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

          // Previous Gatsby output:
          //
          //   <figure class="gatsby-resp-image-figure" style="">
          //     <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 2048px; ">
          //       <a class="gatsby-resp-image-link" href="/static/8856679454fc6f00e35c4312f8fb00d1/7baff/npm-package.jpg" style="display: block" target="_blank" rel="noopener">
          //     <span class="gatsby-resp-image-background-image" style="padding-bottom: 47.4609%; position: relative; bottom: 0px; left: 0px; background-image: url(&quot;data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFA//EABUBAQEAAAAAAAAAAAAAAAAAAAIB/9oADAMBAAIQAxAAAAFSlGpFMmgb/8QAGhAAAgIDAAAAAAAAAAAAAAAAAAIBAwQQEv/aAAgBAQABBQLFRWjlSIKyvX//xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAwEBPwEn/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAGBAAAgMAAAAAAAAAAAAAAAAAAAERIEH/2gAIAQEABj8Ccoyv/8QAGxABAAICAwAAAAAAAAAAAAAAAQAxEBEhQXH/2gAIAQEAAT8hUSUe5roHk4MhU//aAAwDAQACAAMAAAAQgz//xAAWEQADAAAAAAAAAAAAAAAAAAAQETH/2gAIAQMBAT8QhD//xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAgEBPxBn/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAERMVFh/9oACAEBAAE/EF0eThQaEheaRGjCMj//2Q==&quot;); background-size: cover; display: block; transition: opacity 0.5s ease 0.5s; opacity: 0;"></span>
          //   <img class="gatsby-resp-image-image" alt="A cardboard with the npm logo. Also, yes, hopefully, I don't hurt your eyes with my photo editing skills." title="A cardboard with the npm logo. Also, yes, hopefully, I don't hurt your eyes with my photo editing skills." src="/static/8856679454fc6f00e35c4312f8fb00d1/e1596/npm-package.jpg" srcset="/static/8856679454fc6f00e35c4312f8fb00d1/36dd4/npm-package.jpg 512w,
          // /static/8856679454fc6f00e35c4312f8fb00d1/72e01/npm-package.jpg 1024w,
          // /static/8856679454fc6f00e35c4312f8fb00d1/e1596/npm-package.jpg 2048w,
          // /static/8856679454fc6f00e35c4312f8fb00d1/67226/npm-package.jpg 3072w,
          // /static/8856679454fc6f00e35c4312f8fb00d1/a0850/npm-package.jpg 4096w,
          // /static/8856679454fc6f00e35c4312f8fb00d1/7baff/npm-package.jpg 4560w" sizes="(max-width: 2048px) 100vw, 2048px" style="width: 100%; height: 100%; margin: 0px; vertical-align: middle; position: absolute; top: 0px; left: 0px; opacity: 1; transition: opacity 0.5s ease 0s; color: inherit; box-shadow: white 0px 0px 0px 400px inset;" loading="lazy">
          //   </a>
          //     </span>
          //     <figcaption class="gatsby-resp-image-figcaption"><p class="text-base">A cardboard with the npm logo. Also, yes, hopefully, I don't hurt your eyes with my photo editing skills.</p></figcaption>
          //   </figure>
          //
          // The current one is good enough. Later we will think about viewports stuff.
          // Another good reference: https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/.
          firstChild.value = `
            <figure class="flex flex-col items-center justify-center mt-3 mb-4">
              <div class="border border-gray-200">
                <a href="${url}" target="_blank" rel="noopener">
                  <img alt="${altString}" src="${url}" loading="lazy">
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

function generateAnchorTag({ href, text }) {
  let icon = '';

  if (href.includes('https://')) {
    icon = `
<svg
  viewBox="0 0 24 24"
  class="ml-0.25 mb-2 h-3 w-3 inline-block"
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
