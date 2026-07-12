import { siteConfig } from './site';

interface ArticleLD {
  type: 'Article' | 'BlogPosting';
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    type: 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    type: 'Organization';
    name: string;
    logo?: {
      type: 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    type: 'WebPage';
    '@id': string;
  };
}

interface BreadcrumbLD {
  type: 'BreadcrumbList';
  itemListElement: Array<{
    type: 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

interface WebsiteLD {
  type: 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: {
    type: 'Organization';
    name: string;
  };
  potentialAction: {
    type: 'SearchAction';
    target: {
      type: 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

interface PersonLD {
  type: 'Person';
  name: string;
  url?: string;
  sameAs?: string[];
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}): ArticleLD {
  return {
    type: 'BlogPosting',
    title,
    description,
    url,
    ...(image && { image }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      type: 'Person',
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      type: 'Organization',
      name: siteConfig.title,
      logo: {
        type: 'ImageObject',
        url: `${siteConfig.url}/og-default.png`,
      },
    },
    mainEntityOfPage: {
      type: 'WebPage',
      '@id': url,
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbLD {
  return {
    type: 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      type: 'ListItem' as const,
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function generateWebsiteSchema(): WebsiteLD {
  return {
    type: 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      type: 'Organization',
      name: siteConfig.title,
    },
    potentialAction: {
      type: 'SearchAction',
      target: {
        type: 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonSchema(): PersonLD {
  return {
    type: 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: siteConfig.social.github ? [siteConfig.social.github] : undefined,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
