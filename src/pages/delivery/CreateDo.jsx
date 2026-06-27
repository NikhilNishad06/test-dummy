import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateDo() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Delivery Order Registered!");
    navigate('/delivery/orders');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Register Delivery Order (DO)</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>DO Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Link to Deal ID</Label>
              <Input placeholder="Select Deal" />
            </div>
            <div className="space-y-2">
              <Label>Firm</Label>
              <Input placeholder="Select Firm" />
            </div>
            <div className="space-y-2">
              <Label>DO Number</Label>
              <Input placeholder="e.g. DO-2026-9999" />
            </div>
            <div className="space-y-2">
              <Label>DO Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Coal Company</Label>
              <Input placeholder="WCL / SECL" />
            </div>
            <div className="space-y-2">
              <Label>Mine</Label>
              <Input placeholder="Select Mine" />
            </div>
            <div className="space-y-2">
              <Label>Coal Grade</Label>
              <Input placeholder="Select Grade" />
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Total Quantity (MT)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Valid From</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Valid Till</Label>
              <Input type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Add any special conditions..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/delivery/orders')}>Cancel</Button>
          <Button onClick={handleSave}>Save Delivery Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
