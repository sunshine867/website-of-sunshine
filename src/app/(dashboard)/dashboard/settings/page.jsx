'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Bell, Shield, Globe, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved!', description: 'Your preferences have been updated.' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences</p>
      </motion.div>

      <Tabs defaultValue="notifications">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" /> Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                { id: 'sms', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications' },
                { id: 'in_app', label: 'In-App Notifications', desc: 'Receive notifications in the app' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-gray-500">Make your profile visible to others</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Activity Status</Label>
                  <p className="text-sm text-gray-500">Show when you're online</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
