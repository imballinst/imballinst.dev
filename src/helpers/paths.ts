export interface Page {
  href: string;
  title: string;
}

// Static paths.
const HOME_BREADCRUMB: Page = { title: 'Home', href: '/' };
const BLOG_BREADCRUMB: Page = {
  title: 'Blog',
  href: '/blog'
};
const ABOUT_BREADCRUMB: Page = {
  title: 'About',
  href: '/about'
};

export const HOME_BREADCRUMBS: Page[] = [HOME_BREADCRUMB];
export const ABOUT_BREADCRUMBS: Page[] = [ABOUT_BREADCRUMB];
export const BLOG_BREADCRUMBS: Page[] = [BLOG_BREADCRUMB];

export function appendBreadcrumbs(pages: Page[], added: Page | Page[]) {
  const newPages = [...pages];
  const maxIdx = newPages.length - 1;

  if (Array.isArray(added)) {
    for (let i = 0; i < added.length; i++) {
      const reference = newPages[maxIdx + i];

      newPages.push({
        title: added[i].title,
        href: `${reference.href}${added[i].href}`
      });
    }
  } else {
    newPages.push({
      title: added.title,
      href: `${newPages[maxIdx].href}${added.href}`
    });
  }

  return newPages;
}
