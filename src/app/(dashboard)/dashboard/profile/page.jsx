'use client';

 

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/providers/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { useApiMutation } from '@/hooks/use-api';
import { authApi } from '@/lib/api/auth';
import { getInitials } from '@/lib/utils';
import { User, Mail, Phone, MapPin, Lock, Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || 'Nepal',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const updateProfileMutation = useApiMutation(
    (data) => authApi.updateProfile(data),
    { successMessage: 'Profile updated successfully!' }
  );

  const changePasswordMutation = useApiMutation(
    (data) => authApi.changePassword(data),
    { successMessage: 'Password changed successfully!' }
  );

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData, {
      onSuccess: (data) => updateUser(data.data)
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account information</p>
      </motion.div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className="text-2xl bg-primary-100 text-primary-700">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <Badge className="mt-2">{user?.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      <User className="inline h-4 w-4 mr-1" /> First Name
                    </label>
                    <Input value={profileData.firstName}
                      onChange={e => setProfileData(prev => ({ ...prev, firstName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                    <Input value={profileData.lastName}
                      onChange={e => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <Mail className="inline h-4 w-4 mr-1" /> Email
                  </label>
                  <Input value={user?.email} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <Phone className="inline h-4 w-4 mr-1" /> Phone
                  </label>
                  <Input value={profileData.phone}
                    onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <MapPin className="inline h-4 w-4 mr-1" /> Address
                  </label>
                  <Input value={profileData.address}
                    onChange={e => setProfileData(prev => ({ ...prev, address: e.target.value }))} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">City</label>
                    <Input value={profileData.city}
                      onChange={e => setProfileData(prev => ({ ...prev, city: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Country</label>
                    <Input value={profileData.country}
                      onChange={e => setProfileData(prev => ({ ...prev, country: e.target.value }))} />
                  </div>
                </div>
                <Button type="submit" variant="gradient" loading={updateProfileMutation.isPending}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    <Lock className="inline h-4 w-4 mr-1" /> Current Password
                  </label>
                  <Input type="password" value={passwordData.currentPassword}
                    onChange={e => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">New Password</label>
                  <Input type="password" value={passwordData.newPassword}
                    onChange={e => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
                  <Input type="password" value={passwordData.confirmPassword}
                    onChange={e => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))} />
                </div>
                <Button type="submit" variant="gradient" loading={changePasswordMutation.isPending}>
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', key: 'email' },
                  { label: 'SMS Notifications', key: 'sms' },
                  { label: 'Push Notifications', key: 'push' },
                  { label: 'In-App Notifications', key: 'in_app' },
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between">
                    <span>{pref.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
