import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function GlobalSettings() {
  
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Settings</h2>
          <p className="text-muted-foreground">Manage ERP-wide configurations, sequences, and preferences.</p>
        </div>
        <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="bg-muted/50 border">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="sequences">Number Sequences</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="system">System & Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Primary operating entity details used in headers and invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Coal ERP Enterprises Ltd." />
                </div>
                <div className="space-y-2">
                  <Label>Registration Number (CIN)</Label>
                  <Input defaultValue="U12345MH2026PTC123456" />
                </div>
                <div className="space-y-2">
                  <Label>GSTIN</Label>
                  <Input defaultValue="27AADCC1234E1Z5" />
                </div>
                <div className="space-y-2">
                  <Label>PAN</Label>
                  <Input defaultValue="AADCC1234E" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Registered Address</Label>
                  <Input defaultValue="123, Business Park, Andheri East, Mumbai, Maharashtra 400069" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequences">
          <Card>
            <CardHeader>
              <CardTitle>Numbering Sequences</CardTitle>
              <CardDescription>Configure prefixes and starting numbers for auto-generated IDs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label className="font-medium">Deal ID</Label>
                <Input defaultValue="DL" placeholder="Prefix" />
                <Input defaultValue="2026-0001" placeholder="Next Number" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label className="font-medium">Delivery Order (DO)</Label>
                <Input defaultValue="DO" placeholder="Prefix" />
                <Input defaultValue="26-27-0150" placeholder="Next Number" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label className="font-medium">Sales Invoice</Label>
                <Input defaultValue="INV" placeholder="Prefix" />
                <Input defaultValue="2026-450" placeholder="Next Number" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <Label className="font-medium">Vendor Payment</Label>
                <Input defaultValue="VP" placeholder="Prefix" />
                <Input defaultValue="2026-001" placeholder="Next Number" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial & Tax Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default GST Rate (%)</Label>
                  <Input type="number" defaultValue={5} />
                </div>
                <div className="space-y-2">
                  <Label>Default TCS Rate (%)</Label>
                  <Input type="number" defaultValue={1} />
                </div>
                <div className="space-y-2">
                  <Label>Financial Year Start</Label>
                  <Input type="date" defaultValue="2026-04-01" />
                </div>
                <div className="space-y-2">
                  <Label>Financial Year End</Label>
                  <Input type="date" defaultValue="2027-03-31" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch ERP theme to dark mode (coming soon).</p>
                </div>
                <Switch disabled />
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send daily summary emails to admin.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between pb-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all users.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
