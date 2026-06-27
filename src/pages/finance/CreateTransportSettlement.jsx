import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateTransportSettlement() {
  const navigate = useNavigate();

  // Auto-calc state for dummy UI
  const [freightRate, setFreightRate] = useState(1200); 
  const [qty, setQty] = useState(30);
  const freightAmount = freightRate * qty;
  
  const [advancePaid, setAdvancePaid] = useState(25200); // 70% of 36000
  const balance = freightAmount - advancePaid;

  const handleSave = () => {
    toast.success("Transport Settlement Recorded!");
    navigate('/finance/transports');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Transport Settlement</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Freight Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
            <div className="space-y-2">
              <Label>Link Dispatch Ref</Label>
              <Input placeholder="Select Dispatch ID" />
            </div>
            <div className="space-y-2">
              <Label>Transporter Name</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
            <div className="space-y-2">
              <Label>Truck Number</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
            <div className="space-y-2">
              <Label>Link Deal ID</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 p-4 border rounded">
            <div className="space-y-2">
              <Label>Freight Rate (₹/MT)</Label>
              <Input type="number" value={freightRate} onChange={e => setFreightRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Quantity (MT)</Label>
              <Input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Total Freight (₹)</Label>
              <Input type="number" value={freightAmount} disabled className="font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 border rounded bg-amber-50/30">
            <div className="space-y-2">
              <Label className="text-amber-700">Advance Paid (₹)</Label>
              <Input type="number" value={advancePaid} onChange={e => setAdvancePaid(Number(e.target.value))} className="border-amber-200 focus-visible:ring-amber-500" />
            </div>
            <div className="space-y-2">
              <Label>Balance Payable (₹)</Label>
              <Input type="number" value={balance} disabled className="text-xl font-bold bg-amber-100 text-amber-800 h-10" />
            </div>
            <div className="space-y-2 col-span-2 pt-2 border-t border-amber-200">
              <Label>Settlement Date</Label>
              <Input type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks / Deductions</Label>
            <Input placeholder="Notes regarding shortage deductions etc..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/finance/transports')}>Cancel</Button>
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">Process Settlement</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
