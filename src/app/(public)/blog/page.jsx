'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery } from '@/hooks/use-api';
import { blogApi } from '@/lib/api/blog';
import { formatDate, truncate } from '@/lib/utils';
import { Search, Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useApiQuery(['blog', { search, category }], 
    () => blogApi.getPosts({ search, category })
  );

  const posts = data?.data?.data || [];
  const categories = ['all', 'Japanese Learning', 'JLPT Tips', 'Study Abroad', 'Student Life', 'Culture'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-extrabold mb-2">Blog & News</h1>
            <p className="text-white/80">Latest articles, tips, and guides</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-12 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Badge
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setCategory(cat)}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {posts[0] && (
          <Link href={`/blog/${posts[0].slug}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-gradient-to-br from-primary-400 to-secondary-300 flex items-center justify-center text-6xl">
                    📰
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="mb-3 w-fit">{posts[0].category}</Badge>
                    <h2 className="text-2xl font-extrabold mb-3 hover:text-primary-600 transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-gray-500 mb-4">{truncate(posts[0].excerpt, 200)}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" /> {posts[0].author?.first_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {formatDate(posts[0].published_at)}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </Link>
        )}

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all group">
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                      📄
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                        {truncate(post.excerpt, 120)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.author?.first_name} {post.author?.last_name}</span>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
