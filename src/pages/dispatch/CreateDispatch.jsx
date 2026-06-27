import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateDispatch() {
  const navigate = useNavigate();

  // Demo auto-calc
  const [rate, setRate] = useState(1200);
  const [qty, setQty] = useState(30);

  const handleSave = () => {
    toast.success("Truck Dispatch Registered!");
    navigate('/dispatch/trucks');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Truck Dispatch</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Context Section */}
            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Linkage Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Link to Work Order</Label>
                  <Input placeholder="Select WO" />
                </div>
                <div className="space-y-2">
                  <Label>DO Number</Label>
                  <Input placeholder="Auto-populated" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Firm</Label>
                  <Input placeholder="Auto-populated" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Mine</Label>
                  <Input placeholder="Auto-populated" disabled />
                </div>
              </div>
            </div>

            {/* Truck Section */}
            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Truck Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Truck Number</Label>
                  <Input placeholder="e.g. CG-04-MT-1234" />
                </div>
                <div className="space-y-2">
                  <Label>Transporter</Label>
                  <Input placeholder="Select Transporter" />
                </div>
                <div className="space-y-2">
                  <Label>Driver Name</Label>
                  <Input placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <Label>Driver Mobile</Label>
                  <Input placeholder="10-digit number" />
                </div>
              </div>
            </div>

            {/* Loading Section */}
            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Loading & Destination</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Loading Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Loading Time</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Destination Party</Label>
                  <Input placeholder="Select Customer/Party" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Destination Address</Label>
                  <Input placeholder="Delivery Location" />
                </div>
              </div>
            </div>

            {/* Freight Section */}
            <div className="space-y-4 p-4 border rounded bg-muted/10">
              <h3 className="font-semibold border-b pb-2">Freight & Quantity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Assumed Quantity (MT)</Label>
                  <Input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Input placeholder="e.g. G11" />
                </div>
                <div className="space-y-2">
                  <Label>Freight Rate (₹/MT)</Label>
                  <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Total Freight (₹)</Label>
                  <Input type="number" value={rate * qty} disabled className="bg-sky-50 font-bold" />
                </div>
              </div>
            </div>

          </div>
          
          <div className="space-y-2 pt-4">
            <Label>Remarks</Label>
            <Input placeholder="Add any special conditions or notes..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => navigate('/dispatch/trucks')}>Cancel</Button>
          <Button onClick={handleSave}>Generate Dispatch Entry</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
