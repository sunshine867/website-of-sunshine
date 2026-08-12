'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useApiQuery } from '@/hooks/use-api';
import { blogApi } from '@/lib/api/blog';
import { formatDate, getInitials } from '@/lib/utils';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, MessageSquare, Share2, Bookmark } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: postData, isLoading } = useApiQuery(['blog-post', slug], () => blogApi.getPostBySlug(slug));

  const post = postData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-500">Post not found</h1>
          <Link href="/blog"><Button variant="gradient" className="mt-4">Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-primary-400 to-secondary-300 flex items-center justify-center text-6xl">📰</div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{post.category}</Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {formatDate(post.published_at)}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 5 min read
                </span>
              </div>
              <h1 className="text-3xl font-extrabold mb-6">{post.title}</h1>
              <div className="flex items-center gap-3 mb-8 pb-8 border-b">
                <Avatar>
                  <AvatarImage src={post.author?.profile_image_url} />
                  <AvatarFallback>{getInitials(post.author?.first_name, post.author?.last_name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author?.first_name} {post.author?.last_name}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
                <div className="flex-1" />
                <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Bookmark className="h-4 w-4" /></Button>
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </motion.article>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Comments
          </h2>
          <Card>
            <CardContent className="p-6">
              <Textarea placeholder="Write a comment..." className="mb-3" />
              <Button variant="gradient" size="sm">Post Comment</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}