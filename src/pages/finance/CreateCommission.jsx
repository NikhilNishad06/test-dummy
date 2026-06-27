import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function CreateCommission() {
  const navigate = useNavigate();

  const [basis, setBasis] = useState('Per MT');
  const [rate, setRate] = useState(50);
  const [qty, setQty] = useState(2000);
  const [fixedAmount, setFixedAmount] = useState(100000);
  
  const totalComm = basis === 'Per MT' ? rate * qty : fixedAmount;

  const handleSave = () => {
    toast.success("Commission Record Created!");
    navigate('/finance/commissions');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Record Broker Commission</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
            <div className="space-y-2">
              <Label>Link Deal ID</Label>
              <Input placeholder="Select Deal ID" />
            </div>
            <div className="space-y-2">
              <Label>Broker Name</Label>
              <Input placeholder="Auto-populated" disabled />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded">
            <div className="space-y-2">
              <Label>Commission Basis</Label>
              <Select value={basis} onValueChange={setBasis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select basis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Per MT">Per MT Basis</SelectItem>
                  <SelectItem value="Fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {basis === 'Per MT' ? (
              <>
                <div className="space-y-2">
                  <Label>Rate (₹/MT)</Label>
                  <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Dispatched Quantity (MT)</Label>
                  <Input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Fixed Commission (₹)</Label>
                <Input type="number" value={fixedAmount} onChange={e => setFixedAmount(Number(e.target.value))} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-purple-50/30">
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label className="text-purple-700 font-bold">Total Commission Payable (₹)</Label>
              <Input type="number" value={totalComm} disabled className="text-xl font-bold bg-purple-100 text-purple-900 h-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Payment notes..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/finance/commissions')}>Cancel</Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">Process Commission</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
