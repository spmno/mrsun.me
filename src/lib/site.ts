export const siteConfig = {
  title: '程序员老孙',
  description: '探索技术之美，记录编程之旅',
  url: 'https://mrsun.me',
  author: '程序员老孙',
  locale: 'zh-CN',
  nav: [
    { title: '首页', href: '/' },
    { title: '归档', href: '/archive' },
    { title: '搜索', href: '/search' },
    { title: '关于', href: '/about' },
  ],
  social: {
    github: 'https://github.com/spmno',
  },
  giscus: {
    repo: 'spmno/mrsun.me' as `${string}/${string}`,
    repoId: '',
    category: 'Comments',
    categoryId: '',
    mapping: 'pathname' as const,
    reactionsEnabled: '1' as const,
    emitMetadata: '0' as const,
  },
};

export type SiteConfig = typeof siteConfig;
