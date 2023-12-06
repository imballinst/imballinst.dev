# imballinst.dev

This is my personal site, mostly for curating blog posts and projects. This project is built using [Astro](https://astro.build) as the static site builder, [tailwindcss](https://tailwindcss.com) for the CSS utility classes, and some sprinkles of scripts for the prebuild and postbuild steps.

## Development

### Prerequisites

1. [Yarn](https://yarnpkg.com/) Modern (v3)
2. [Node.js®](https://nodejs.org/) (at least v18)

After that, on root project, do this to install the dependencies:

```bash
corepack enable
yarn
```

### Running the server

```bash
# Get the list of activities (the JSON file is ignored).
yarn prebuild
# Run the dev server.
yarn dev
```

Then, go to http://localhost:3000 to open the site.

### Remark plugins

This site uses 2 custom remark plugins:

1. [`html-classnames`](plugins/html-classnames): this is the plugin to add utility classes to the resulting HTML tags. It reads the MDAST (Markdown Abstract Syntax Tree), converts it to HAST (Hypertext Abstract Syntax Tree), then converts it to raw HTML string. This **should be** the last plugin in the pipeline, because it will exhaust the MDAST.
2. [`image`](plugins/image): this is the plugin to add utility classes to images (beyond the main image of a blog post), as well as adding captions below them. On top of that, this plugin also adds `srcset` and `sizes` attributes to the `img` tag, hence it will allow for more responsive images and better performance. Although this plugin exhausts the MDAST as well, it will only exhaust the MDAST related to images, so normal paragraphs are ignored.

To test the plugins, do `node plugins/test.mjs` (adjust the contents of the `test.mjs` accordingly).

## Contributing

Feel free to submit pull requests about anything—be it for typo fixes or improvements. If you want to submit improvement pull request, please also describe the parts that are improved (e.g. before and after state). Thank you!

## License

MIT
