'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select } from '@/components/ui/select';
import { useApiQuery, useApiMutation } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';
import { userApi } from '@/lib/api/user';
import { getInitials, getRoleBadgeColor, formatDate } from '@/lib/utils';
import ConfirmDialog from '@/components/shared/confirm-dialog';
import StatusBadge from '@/components/shared/status-badge';
import LoadingSpinner from '@/components/shared/loading-spinner';
import EmptyState from '@/components/shared/empty-state';
import {
  Search, Plus, Edit, Trash2, UserCheck, UserX, Users,
  Mail, Phone, Shield, Download
} from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const { toast } = useToast();

  // Form state for create/edit
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    role: 'STUDENT',
    status: 'ACTIVE',
  });

  // Fetch users from API
  const { data: usersData, isLoading, isError, refetch } = useApiQuery(
    ['admin-users', { search, role: roleFilter, status: statusFilter }],
    () => userApi.getAll({ search, role: roleFilter, status: statusFilter })
  );

  // Mutations
  const createUserMutation = useApiMutation(
    (data) => userApi.create(data),
    {
      successMessage: 'User created successfully!',
      invalidateQueries: 'admin-users',
      onSuccess: () => { setShowCreateDialog(false); resetForm(); }
    }
  );

  const updateUserMutation = useApiMutation(
    (data) => userApi.update(editingUser?.id, data),
    {
      successMessage: 'User updated successfully!',
      invalidateQueries: 'admin-users',
      onSuccess: () => { setEditingUser(null); resetForm(); }
    }
  );

  const updateStatusMutation = useApiMutation(
    ({ id, status }) => userApi.updateStatus(id, status),
    {
      successMessage: 'Status updated!',
      invalidateQueries: 'admin-users'
    }
  );

  const deleteUserMutation = useApiMutation(
    (id) => userApi.delete(id),
    {
      successMessage: 'User deleted!',
      invalidateQueries: 'admin-users',
      onSuccess: () => setDeleteUserId(null)
    }
  );

  const users = usersData?.data?.data || [];
  const pagination = usersData?.data?.meta?.pagination;

  const resetForm = () => {
    setFormData({
      first_name: '', last_name: '', email: '', password: '',
      phone: '', role: 'STUDENT', status: 'ACTIVE',
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      role: user.role || 'STUDENT',
      status: user.status || 'ACTIVE',
    });
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
            <p className="text-gray-500 mt-1">Manage all platform users</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="gradient" onClick={() => { resetForm(); setShowCreateDialog(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: pagination?.total || users.length, color: 'bg-blue-500' },
          { label: 'Students', value: users.filter(u => u.role === 'STUDENT').length, color: 'bg-green-500' },
          { label: 'Teachers', value: users.filter(u => u.role === 'TEACHER').length, color: 'bg-purple-500' },
          { label: 'Active', value: users.filter(u => u.status === 'ACTIVE').length, color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="border rounded-lg px-3 py-2 text-sm bg-white" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="COUNSELOR">Counselor</option>
              <option value="ACCOUNTANT">Accountant</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {isError ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-4">Failed to load users</p>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          ) : users.length === 0 ? (
            <EmptyState icon={Users} title="No users found" description={search ? "Try different search terms" : "Add your first user"} actionLabel="Add User" onAction={() => setShowCreateDialog(true)} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Joined</th>
                    <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user, i) => (
                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.profile_image_url} />
                            <AvatarFallback className="bg-primary-100 text-primary-700">
                              {getInitials(user.first_name, user.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{user.first_name} {user.last_name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500">{user.email}</td>
                      <td className="p-4"><Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge></td>
                      <td className="p-4"><StatusBadge status={user.status} /></td>
                      <td className="p-4 text-sm text-gray-500">{formatDate(user.created_at)}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(user)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === 'ACTIVE' ? (
                            <Button variant="ghost" size="sm" onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'SUSPENDED' })} title="Suspend">
                              <UserX className="h-4 w-4 text-yellow-600" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" onClick={() => updateStatusMutation.mutate({ id: user.id, status: 'ACTIVE' })} title="Activate">
                              <UserCheck className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => setDeleteUserId(user.id)} title="Delete">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name *</label>
                <Input value={formData.first_name} onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
                <Input value={formData.last_name} onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email *</label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password *</label>
              <Input type="password" value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} required placeholder="Min. 8 characters" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Role *</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="ADMIN">Admin</option>
                  <option value="COUNSELOR">Counselor</option>
                  <option value="ACCOUNTANT">Accountant</option>
                  <option value="CONTENT_MANAGER">Content Manager</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button type="submit" variant="gradient" loading={createUserMutation.isPending}>
                <Plus className="mr-2 h-4 w-4" /> Create User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name</label>
                <Input value={formData.first_name} onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))} required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                <Input value={formData.last_name} onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} required />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">New Password (leave blank to keep current)</label>
              <Input type="password" value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} placeholder="Leave blank to keep current" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Role</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="ADMIN">Admin</option>
                  <option value="COUNSELOR">Counselor</option>
                  <option value="ACCOUNTANT">Accountant</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select className="w-full h-11 rounded-lg border-2 px-4" value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
              <Button type="submit" variant="gradient" loading={updateUserMutation.isPending}>Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteUserId}
        onOpenChange={() => setDeleteUserId(null)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete User"
        onConfirm={() => deleteUserMutation.mutate(deleteUserId)}
        loading={deleteUserMutation.isPending}
      />
    </div>
  );
}
