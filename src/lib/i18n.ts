export type Locale = 'zh' | 'en';

export const locales: Locale[] = ['zh', 'en'];

const translations = {
  zh: {
    // Site
    siteTitle: '程序员老孙',
    siteDescription: '探索技术之美，记录编程之旅',
    // Nav
    navHome: '首页',
    navArchive: '归档',
    navSearch: '搜索',
    navAbout: '关于',
    // Home
    searchPlaceholder: '搜索文章...',
    latestPosts: '最新文章',
    // Search
    searchTitle: '搜索文章',
    searchPlaceholderFull: '搜索文章标题、描述、分类或标签...',
    foundPosts: (n: number) => `找到 ${n} 篇文章`,
    noResults: '没有找到相关文章',
    totalPosts: (n: number) => `共 ${n} 篇文章`,
    // Archive
    archiveTitle: '归档',
    archiveDescription: '所有文章按时间归档',
    noPosts: '暂时没有文章',
    postsCount: (n: number) => `${n} 篇`,
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    // Post
    relatedPosts: '相关文章',
    backToHome: '返回首页',
    // Categories / Tags
    categoryPrefix: '分类:',
    tagPrefix: '标签:',
    articlesCount: (n: number) => `${n} 篇文章`,
    // Category section
    viewAll: '查看全部',
    // 404
    notFoundTitle: '页面未找到',
    notFoundDesc: '你访问的页面可能已被移动或删除',
    searchArticles: '搜索文章',
    // Footer
    allRightsReserved: '保留所有权利',
    // About
    aboutTitle: '关于',
    aboutDescription: '关于本站和作者',
    aboutIntro: (author: string) => `你好，我是 ${author}。`,
    aboutWelcome: '欢迎来到我的个人博客',
    aboutContent: '这里是我记录技术探索、编程心得和思考的地方。我热衷于探索新技术，分享知识，并通过写作来整理自己的理解。',
    techStack: '技术栈',
    contactInfo: '联系方式',
    phone: '电话',
    wechat: '微信',
    email: '邮箱',
    aboutSite: '关于本站',
    aboutSiteDesc: '本博客基于 Next.js 16 静态导出构建，部署在 EdgeOne Pages 上。所有页面在构建时预渲染为静态 HTML，无需服务器端运行。如果你有任何问题或建议，欢迎通过评论区留言。',
    // Author bio
    authorBio: '博主',
    // Mobile nav
    openMenu: '打开菜单',
    // Giscus
    giscusConfig: '评论系统配置中。请在',
    giscusGetConfig: '获取配置并填写',
    giscusFillConfig: '中的 giscus 配置。',
  },
  en: {
    // Site
    siteTitle: 'MrSun',
    siteDescription: 'Exploring the beauty of technology, documenting the programming journey',
    // Nav
    navHome: 'Home',
    navArchive: 'Archive',
    navSearch: 'Search',
    navAbout: 'About',
    // Home
    searchPlaceholder: 'Search articles...',
    latestPosts: 'Latest Posts',
    // Search
    searchTitle: 'Search Articles',
    searchPlaceholderFull: 'Search by title, description, category or tags...',
    foundPosts: (n: number) => `Found ${n} articles`,
    noResults: 'No articles found',
    totalPosts: (n: number) => `${n} articles in total`,
    // Archive
    archiveTitle: 'Archive',
    archiveDescription: 'All articles by date',
    noPosts: 'No articles yet',
    postsCount: (n: number) => `${n} posts`,
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // Post
    relatedPosts: 'Related Posts',
    backToHome: 'Back to Home',
    // Categories / Tags
    categoryPrefix: 'Category:',
    tagPrefix: 'Tag:',
    articlesCount: (n: number) => `${n} articles`,
    // Category section
    viewAll: 'View All',
    // 404
    notFoundTitle: 'Page Not Found',
    notFoundDesc: 'The page you visited may have been moved or deleted',
    searchArticles: 'Search Articles',
    // Footer
    allRightsReserved: 'All rights reserved',
    // About
    aboutTitle: 'About',
    aboutDescription: 'About this site and the author',
    aboutIntro: (author: string) => `Hi, I'm ${author}.`,
    aboutWelcome: 'Welcome to my personal blog',
    aboutContent: 'This is where I document my tech explorations, programming insights, and reflections. I am passionate about exploring new technologies, sharing knowledge, and organizing my understanding through writing.',
    techStack: 'Tech Stack',
    contactInfo: 'Contact',
    phone: 'Phone',
    wechat: 'WeChat',
    email: 'Email',
    aboutSite: 'About This Site',
    aboutSiteDesc: 'This blog is built with Next.js 16 static export and deployed on EdgeOne Pages. All pages are pre-rendered as static HTML at build time. If you have any questions or suggestions, feel free to leave a comment.',
    // Author bio
    authorBio: 'Blogger',
    // Mobile nav
    openMenu: 'Open menu',
    // Giscus
    giscusConfig: 'Comment system is being configured. Please visit',
    giscusGetConfig: 'to get the config and fill in',
    giscusFillConfig: 'giscus configuration.',
  },
} as const;

export type TranslationKeys = keyof typeof translations.zh;

export function t(locale: Locale, key: TranslationKeys): string {
  const val = translations[locale][key];
  if (typeof val === 'function') {
    // This shouldn't happen for non-function keys, but TypeScript needs this
    return key;
  }
  return val as string;
}

export function getMonthNames(locale: Locale): string[] {
  return [...translations[locale].monthNames];
}

export function tFn(locale: Locale, key: TranslationKeys): (...args: any[]) => string {
  const val = translations[locale][key];
  if (typeof val === 'function') {
    return val as (...args: any[]) => string;
  }
  return () => val as string;
}

export function getNavItems(locale: Locale) {
  return [
    { title: t(locale, 'navHome'), href: '/' },
    { title: t(locale, 'navArchive'), href: '/archive' },
    { title: t(locale, 'navSearch'), href: '/search' },
    { title: t(locale, 'navAbout'), href: '/about' },
  ];
}
