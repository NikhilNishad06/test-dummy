import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateCollection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invoiceId = searchParams.get("invoice") || "";

  // Auto-calc state for dummy UI
  const [invAmount] = useState(1575000); 
  const [receivedAmount, setReceivedAmount] = useState(1575000);
  const [tds, setTds] = useState(0);
  const [deduction, setDeduction] = useState(0);

  const balance = invAmount - receivedAmount - tds - deduction;

  const handleSave = () => {
    toast.success("Collection Record Created!");
    navigate('/finance/collections');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Record Customer Collection</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input defaultValue={invoiceId} placeholder="Select Invoice" />
            </div>
            <div className="space-y-2">
              <Label>Link Deal ID</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
            <div className="space-y-2">
              <Label>Total Invoice Amount (₹)</Label>
              <Input type="number" value={invAmount} disabled className="font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 border rounded">
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Bank / Payment Mode</Label>
              <Input placeholder="e.g. HDFC Current A/c" />
            </div>
            <div className="space-y-2">
              <Label>UTR / Reference Number</Label>
              <Input placeholder="Enter UTR" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-4 border rounded bg-sky-50/30">
            <div className="space-y-2">
              <Label className="text-sky-700">Received Amount (₹)</Label>
              <Input type="number" value={receivedAmount} onChange={e => setReceivedAmount(Number(e.target.value))} className="border-sky-200 focus-visible:ring-sky-500 font-bold" />
            </div>
            <div className="space-y-2">
              <Label>TDS Deducted (₹)</Label>
              <Input type="number" value={tds} onChange={e => setTds(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Other Deductions (₹)</Label>
              <Input type="number" value={deduction} onChange={e => setDeduction(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Outstanding Balance (₹)</Label>
              <Input type="number" value={balance} disabled className={balance > 0 ? "font-bold text-amber-600 bg-amber-50" : "font-bold bg-emerald-50 text-emerald-600"} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Notes regarding deduction or partial payment..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/finance/collections')}>Cancel</Button>
          <Button onClick={handleSave}>Save Collection Record</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
