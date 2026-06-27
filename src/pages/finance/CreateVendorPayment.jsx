import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateVendorPayment() {
  const navigate = useNavigate();

  // Auto-calc state for dummy UI
  const [baseAmount] = useState(1500000); 
  const [interestDays, setInterestDays] = useState(5);
  const interestRatePerDay = 500; // Mock rate
  const interestAmount = interestDays * interestRatePerDay;
  
  const finalAmount = baseAmount + interestAmount;

  const handleSave = () => {
    toast.success("Vendor Payment Processed!");
    navigate('/finance/vendors');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Process Vendor Payment</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
            <div className="space-y-2">
              <Label>Link Deal ID</Label>
              <Input placeholder="Select Deal ID" />
            </div>
            <div className="space-y-2">
              <Label>Vendor Name</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
            <div className="space-y-2">
              <Label>Vendor Invoice Ref</Label>
              <Input placeholder="Enter Vendor Invoice No" />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded">
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Base Amount Payable (₹)</Label>
              <Input type="number" value={baseAmount} disabled className="font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-rose-50/30">
            <div className="space-y-2">
              <Label className="text-rose-700">Delayed Days (Interest Calc)</Label>
              <Input type="number" value={interestDays} onChange={e => setInterestDays(Number(e.target.value))} className="border-rose-200 focus-visible:ring-rose-500" />
              <p className="text-xs text-muted-foreground mt-1">@ ₹{interestRatePerDay} per day</p>
            </div>
            <div className="space-y-2">
              <Label className="text-rose-700">Interest Penalty (₹)</Label>
              <Input type="number" value={interestAmount} disabled className="text-rose-700 font-bold bg-white" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label className="text-lg">Total Final Payment (₹)</Label>
              <Input type="number" value={finalAmount} disabled className="text-xl font-bold bg-rose-600 text-white h-12" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Bank payment reference or notes..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/finance/vendors')}>Cancel</Button>
          <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">Process Payment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
