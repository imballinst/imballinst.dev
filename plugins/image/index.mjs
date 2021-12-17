// For testing.
// import { retext } from 'retext';
// import { reporter } from 'vfile-reporter';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

// const buffer = `
//   ![<span>Photo by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/images/things/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>.](/assets/blog/are-arrow-functions-overrated/nick-fewings-zF_pTLx_Dkg-unsplash.jpg)
// `;
// retext()
//   .use(retextSentenceSpacing)
//   .process(buffer)
//   .then((file) => {
//     console.log(file);
//     console.error(reporter(file));
//   });

export default function imageCaptionPlugin() {
  return (tree) => {
    visit(tree, 'ParagraphNode', (node) => {
      if (node.children && node.children.length === 2) {
        const [caption, source] = node.children;

        const captionChildren = caption?.children || [];
        let htmlCaption = '';

        if (
          captionChildren[0]?.value === '!' &&
          captionChildren[1]?.value === '[' &&
          captionChildren[captionChildren.length - 1]?.value === ']'
        ) {
          htmlCaption = toString(captionChildren.slice(2, -1));
        }

        const sourceChildren = source?.children || [];
        let htmlSource = '';

        if (
          sourceChildren[0]?.value === '(' &&
          sourceChildren[sourceChildren.length - 1]?.value === ')'
        ) {
          htmlSource = toString(sourceChildren.slice(1, -1));
        }

        node.type = 'html';
        node.children = undefined;
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
        node.value = `
          <figure class="resp-image-figure">
            <span class="resp-image-wrapper">
              <a class="resp-image-link" href="${htmlSource}" target="_blank" rel="noopener">
                <img class="resp-image-image" alt="${htmlCaption}" src="${htmlSource}" loading="lazy">
              </a>
            </span>
            <figcaption class="resp-image-figcaption"><p class="text-base">${htmlCaption}</p></figcaption>
          </figure>
        `;
      }
    });
  };
}
