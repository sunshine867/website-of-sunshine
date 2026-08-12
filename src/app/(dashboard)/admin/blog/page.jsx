'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { blogApi } from '@/lib/api/blog';
import { formatDate, truncate } from '@/lib/utils';
import { Search, Plus, Edit, Trash2, Eye, PenLine } from 'lucide-react';
import ConfirmDialog from '@/components/shared/confirm-dialog';

 

export default function AdminBlogPage() {
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const { data: postsData } = useApiQuery(['admin-blog', { search }],
    () => blogApi.getPosts({ search, limit: 50 })
  );

  const deleteMutation = useApiMutation(
    (id) => blogApi.deletePost(id),
    { successMessage: 'Post deleted', invalidateQueries: 'admin-blog' }
  );

  const posts = postsData?.data?.data || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-extrabold">Blog Management</h1><p className="text-gray-500 mt-1">Manage blog posts and content</p></div>
          <Link href="/admin/blog/create"><Button variant="gradient"><Plus className="mr-2 h-4 w-4" /> New Post</Button></Link>
        </div>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search posts..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {posts.map((post, i) => (
              <div key={post.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">📝</div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-sm text-gray-500 truncate">{truncate(post.excerpt, 80)}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                      <Badge variant="outline">{post.category}</Badge>
                      <Badge variant={post.status === 'PUBLISHED' ? 'success' : 'secondary'}>{post.status}</Badge>
                      <span>{post.total_views || 0} views</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Link href={`/blog/${post.slug}`} target="_blank"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></Link>
                  <Link href={`/admin/blog/${post.id}/edit`}><Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button></Link>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(post.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Post" description="This action cannot be undone." confirmLabel="Delete" onConfirm={() => deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} />
    </div>
  );
}