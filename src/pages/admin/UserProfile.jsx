import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Key, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfile() {
  const { user } = useAuth();
  
  const handleUpdate = () => toast.success("Profile updated!");
  const handlePassword = () => toast.success("Password reset link sent to email!");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
          <p className="text-muted-foreground">Manage your personal account settings and security.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Profile Sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-muted">
              <AvatarImage src="" />
              <AvatarFallback className="text-3xl bg-sky-100 text-sky-700 font-bold">{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user?.email?.split('@')[0] || 'Administrator'}</h3>
              <p className="text-sm text-muted-foreground">{user?.email || 'admin@coal-erp.com'}</p>
              <Badge variant="secondary" className="mt-2 bg-sky-100 text-sky-800 hover:bg-sky-100 border-none"><Shield className="h-3 w-3 mr-1"/> Super Admin</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Settings */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Super" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Admin" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Email Address</Label>
                  <Input defaultValue={user?.email || "admin@coal-erp.com"} disabled />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 " />
                </div>
              </div>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-rose-100">
            <CardHeader>
              <CardTitle className="text-rose-700 flex items-center gap-2"><Key className="h-5 w-5"/> Security & Password</CardTitle>
              <CardDescription>Ensure your account uses a strong, unique password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50" onClick={handlePassword}>Update Password</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
// Note: To fix Badge reference error, we add it above or inline. Let's fix it by importing Badge.
