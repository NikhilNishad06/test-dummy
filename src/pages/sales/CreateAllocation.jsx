import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

export default function CreateAllocation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order") || "";

  // Auto-calc state for dummy UI validation
  const [availableQty] = useState(15000); 
  const [orderedQty] = useState(5000);
  const [allocQty, setAllocQty] = useState(2000);

  const isExceeding = allocQty > availableQty || allocQty > orderedQty;

  const handleSave = () => {
    if (isExceeding) {
      toast.error("Allocation quantity cannot exceed available DO balance or Ordered quantity.");
      return;
    }
    toast.success("DO Successfully Allocated to Customer Order!");
    navigate('/sales/allocations');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create DO Allocation</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Allocation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer Order Ref</Label>
                <Input defaultValue={orderId} placeholder="Select Customer Order" />
              </div>
              <div className="space-y-2">
                <Label>Delivery Order (DO)</Label>
                <Input placeholder="Select Active DO" />
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
              <div className="space-y-2">
                <Label>Target Dispatch Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Ordered Quantity (MT)</Label>
                <Input type="number" value={orderedQty} disabled />
              </div>
              <div className="space-y-2">
                <Label>Available DO Balance (MT)</Label>
                <Input type="number" value={availableQty} disabled className="bg-sky-50 font-bold" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Allocate Quantity (MT)</Label>
                <Input 
                  type="number" 
                  value={allocQty} 
                  onChange={e => setAllocQty(Number(e.target.value))} 
                  className={isExceeding ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {isExceeding && (
                  <p className="text-sm text-destructive mt-1">Allocation exceeds limits!</p>
                )}
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <Label>Remarks</Label>
              <Input placeholder="Priority notes or special instructions..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => navigate('/sales/allocations')}>Cancel</Button>
            <Button onClick={handleSave}>Confirm Allocation</Button>
          </CardFooter>
        </Card>

        {/* Live Validation Cards */}
        <div className="space-y-4">
           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-base text-muted-foreground">Order Fulfillment Impact</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium">Total Requirement</span>
                     <span>{orderedQty} MT</span>
                   </div>
                   <div className="flex justify-between text-sm text-emerald-600 mb-2">
                     <span className="font-medium">New Allocation</span>
                     <span>+{allocQty} MT</span>
                   </div>
                   <Progress value={(allocQty / orderedQty) * 100} className={`h-2 ${isExceeding ? 'bg-destructive/20' : 'bg-emerald-100'}`} indicatorClassName={isExceeding ? 'bg-destructive' : 'bg-emerald-500'} />
                   <div className="text-xs text-muted-foreground mt-2 text-right">
                     Remaining: {orderedQty - allocQty} MT
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
