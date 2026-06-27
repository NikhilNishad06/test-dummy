import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateSaleLetter() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Sale Letter Created!");
    navigate('/government/sale-letters');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Register Sale Letter</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sale Letter Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Link to Deal ID</Label>
              <Input placeholder="Select Deal" />
            </div>
            <div className="space-y-2">
              <Label>Firm</Label>
              <Input placeholder="Select Firm" />
            </div>
            <div className="space-y-2">
              <Label>Sale Letter Number</Label>
              <Input placeholder="e.g. SL-2026-9999" />
            </div>
            <div className="space-y-2">
              <Label>Sale Letter Date</Label>
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
            <div className="space-y-2">
              <Label>Quantity (MT)</Label>
              <Input type="number" placeholder="0" />
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Rate (₹/MT)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Total Amount (₹)</Label>
              <Input type="number" placeholder="Auto Calc" disabled />
            </div>
            <div className="space-y-2">
              <Label>Payment Due Date</Label>
              <Input type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Add any special conditions..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/government/sale-letters')}>Cancel</Button>
          <Button onClick={handleSave}>Save Sale Letter</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
