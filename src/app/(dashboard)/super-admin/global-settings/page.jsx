'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Globe, Shield, Mail, Database, Palette, Bell, Lock } from 'lucide-react';

// Add this to prevent static generation errors with useSearchParams
 

export default function GlobalSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Japanese Education Platform',
    defaultLanguage: 'en',
    timezone: 'Asia/Kathmandu',
    maxOrganizations: 10,
    maxUsersPerOrg: 5000,
    enableRegistration: true,
    enableAI: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast({ title: 'Saved!', description: 'Global settings updated successfully.' });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">Global Settings</h1>
        <p className="text-gray-500 mt-1">Configure system-wide settings</p>
      </motion.div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general"><Globe className="h-4 w-4 mr-2" /> General</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" /> Security</TabsTrigger>
          <TabsTrigger value="limits"><Database className="h-4 w-4 mr-2" /> Limits</TabsTrigger>
          <TabsTrigger value="maintenance"><Lock className="h-4 w-4 mr-2" /> Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><label className="text-sm font-medium">Site Name</label><Input value={settings.siteName} onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Default Language</label><select className="w-full h-11 rounded-lg border-2 px-4" value={settings.defaultLanguage} onChange={(e) => setSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}><option value="en">English</option><option value="ne">Nepali</option><option value="ja">Japanese</option></select></div>
              <div><label className="text-sm font-medium">Timezone</label><select className="w-full h-11 rounded-lg border-2 px-4" value={settings.timezone} onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}><option value="Asia/Kathmandu">Asia/Kathmandu (UTC+5:45)</option><option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option></select></div>
              <Button onClick={handleSave}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><div><label className="font-medium">Enable Registration</label><p className="text-sm text-gray-500">Allow new users to register</p></div><Switch checked={settings.enableRegistration} onCheckedChange={(c) => setSettings(prev => ({ ...prev, enableRegistration: c }))} /></div>
              <div className="flex items-center justify-between"><div><label className="font-medium">Enable AI Features</label><p className="text-sm text-gray-500">Enable AI-powered features globally</p></div><Switch checked={settings.enableAI} onCheckedChange={(c) => setSettings(prev => ({ ...prev, enableAI: c }))} /></div>
              <Button onClick={handleSave}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Platform Limits</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><label className="text-sm font-medium">Max Organizations</label><Input type="number" value={settings.maxOrganizations} onChange={(e) => setSettings(prev => ({ ...prev, maxOrganizations: parseInt(e.target.value) || 0 }))} /></div>
              <div><label className="text-sm font-medium">Max Users Per Organization</label><Input type="number" value={settings.maxUsersPerOrg} onChange={(e) => setSettings(prev => ({ ...prev, maxUsersPerOrg: parseInt(e.target.value) || 0 }))} /></div>
              <Button onClick={handleSave}>Save Limits</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Maintenance Mode</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><div><label className="font-medium">Maintenance Mode</label><p className="text-sm text-gray-500">Put entire platform in maintenance</p></div><Switch checked={settings.maintenanceMode} onCheckedChange={(c) => setSettings(prev => ({ ...prev, maintenanceMode: c }))} /></div>
              <div><label className="text-sm font-medium">Maintenance Message</label><Input placeholder="We'll be back soon..." /></div>
              <Button onClick={handleSave} variant="destructive">{settings.maintenanceMode ? 'Enable Maintenance' : 'Disable Maintenance'}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}