import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateOrder() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Customer Order Created!");
    navigate('/sales/orders');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Customer Order</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Deal Context</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Link Deal ID</Label>
                  <Input placeholder="Select Deal" />
                </div>
                <div className="space-y-2">
                  <Label>Firm</Label>
                  <Input placeholder="Auto-populated" disabled />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Customer</Label>
                  <Input placeholder="Select Customer" />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Order Specifics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Order Number</Label>
                  <Input placeholder="e.g. SO-2026-0001" />
                </div>
                <div className="space-y-2">
                  <Label>Order Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Delivery Target Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Input placeholder="e.g. 100% Advance" />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded bg-muted/10 md:col-span-2">
              <h3 className="font-semibold border-b pb-2">Material & Logistics</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Coal Grade</Label>
                  <Input placeholder="Auto-populated" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Ordered Quantity (MT)</Label>
                  <Input type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Rate (₹/MT)</Label>
                  <Input type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Delivery Location</Label>
                  <Input placeholder="Customer Plant Address" />
                </div>
              </div>
            </div>

          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Remarks</Label>
            <Input placeholder="Any special delivery instructions..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/sales/orders')}>Cancel</Button>
          <Button onClick={handleSave}>Create Customer Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
