'use client';

 

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Bell, Shield, Palette, Globe, Mail, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved!', description: 'System settings updated successfully.' });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-extrabold">System Settings</h1>
        <p className="text-gray-500 mt-1">Configure platform settings</p>
      </motion.div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general"><Settings className="h-4 w-4 mr-2" /> General</TabsTrigger>
          <TabsTrigger value="email"><Mail className="h-4 w-4 mr-2" /> Email</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" /> Security</TabsTrigger>
          <TabsTrigger value="maintenance"><Database className="h-4 w-4 mr-2" /> Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Platform Name</label>
                <Input defaultValue="Japanese Education Platform" />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Email</label>
                <Input defaultValue="info@japaneseedu.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Phone</label>
                <Input defaultValue="+977-1-4XXXXXX" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Registration Open</label>
                  <p className="text-sm text-gray-500">Allow new user registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Email Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">SMTP Host</label>
                <Input defaultValue="smtp.sendgrid.net" />
              </div>
              <div>
                <label className="text-sm font-medium">SMTP Port</label>
                <Input defaultValue="587" />
              </div>
              <div>
                <label className="text-sm font-medium">From Email</label>
                <Input defaultValue="noreply@japaneseedu.com" />
              </div>
              <Button onClick={handleSave}>Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><label className="font-medium">Email Notifications</label></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><label className="font-medium">SMS Notifications</label></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><label className="font-medium">Push Notifications</label></div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">JWT Secret</label>
                <Input type="password" defaultValue="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div><label className="font-medium">Two-Factor Authentication</label></div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div><label className="font-medium">IP Whitelisting</label></div>
                <Switch />
              </div>
              <Button onClick={handleSave}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Maintenance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Maintenance Mode</label>
                  <p className="text-sm text-gray-500">Put the platform in maintenance mode</p>
                </div>
                <Switch />
              </div>
              <div>
                <label className="text-sm font-medium">Maintenance Message</label>
                <Input defaultValue="We are currently performing maintenance. Please check back soon." />
              </div>
              <Button onClick={handleSave}>Save Maintenance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
