export const siteConfig = {
  title: 'MrSun',
  description: 'Exploring the beauty of technology, documenting the programming journey',
  url: 'https://mrsun.me',
  author: 'MrSun',
  locale: 'en',
  nav: [
    { title: 'Home', href: '/' },
    { title: 'Archive', href: '/archive' },
    { title: 'Search', href: '/search' },
    { title: 'About', href: '/about' },
  ],
  social: {
    github: 'https://github.com/spmno',
  },
  giscus: {
    repo: 'spmno/mrsun.me' as `${string}/${string}`,
    repoId: 'R_kgDOTDpWAg',
    category: 'General',
    categoryId: 'DIC_kwDOTDpWAs4C_yJB',
    mapping: 'pathname' as const,
    reactionsEnabled: '1' as const,
    emitMetadata: '0' as const,
  },
};

export const siteConfigZh = {
  ...siteConfig,
  title: '程序员老孙',
  description: '探索技术之美，记录编程之旅',
  author: '程序员老孙',
  locale: 'zh-CN',
  nav: [
    { title: '首页', href: '/' },
    { title: '归档', href: '/archive' },
    { title: '搜索', href: '/search' },
    { title: '关于', href: '/about' },
  ],
};

export type SiteConfig = typeof siteConfig;
