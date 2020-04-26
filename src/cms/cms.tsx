import CMS from 'netlify-cms-app';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

CMS.registerPreviewTemplate('index', IndexPagePreview as any);
CMS.registerPreviewTemplate('about', AboutPagePreview as any);
CMS.registerPreviewTemplate('blog', BlogPostPreview as any);
