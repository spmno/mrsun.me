import Link from 'next/link';
import { Search } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { getFeaturedPosts, getPostsByCategoryGrouped } from '@/lib/posts';
import { HomeFeaturedCard } from '@/components/home-featured-card';
import { CategorySection } from '@/components/category-section';
import { HomeLocaleWrapper } from '@/components/home-locale-wrapper';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(5);
  const categoryGroups = getPostsByCategoryGrouped();

  return (
    <HomeLocaleWrapper featuredPosts={featuredPosts} categoryGroups={categoryGroups} />
  );
}
