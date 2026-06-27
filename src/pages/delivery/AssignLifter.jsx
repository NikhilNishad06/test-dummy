import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DeliveryTimeline from './DeliveryTimeline';

export default function AssignLifter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doId = searchParams.get("do") || "";

  const handleSave = () => {
    toast.success("Lifter Assigned Successfully!");
    navigate('/delivery/lifters');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Assign Lifter to DO</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Link to Deal ID</Label>
                <Input placeholder="Select Deal" />
              </div>
              <div className="space-y-2">
                <Label>Delivery Order Number</Label>
                <Input defaultValue={doId} placeholder="e.g. DO-2026-9999" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
              <div className="space-y-2">
                <Label>Mine</Label>
                <Input placeholder="Select Mine" />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Lifter</Label>
                <Input placeholder="Lifter Name..." />
              </div>
              <div className="space-y-2">
                <Label>Assigned Quantity (MT)</Label>
                <Input type="number" placeholder="0" />
                <p className="text-xs text-muted-foreground">Available DO Pending Qty: 4,000 MT</p>
              </div>
              <div className="space-y-2">
                <Label>Work Order Reference Number</Label>
                <Input placeholder="e.g. WO-2026-001 (Optional if generating later)" />
              </div>
              <div className="space-y-2">
                <Label>Assignment Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Remarks</Label>
                <Input placeholder="Any instructions for lifter..." />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => navigate('/delivery/lifters')}>Cancel</Button>
            <Button onClick={handleSave}>Assign Lifter</Button>
          </CardFooter>
        </Card>

        {/* Timeline Context */}
        <div className="space-y-4">
           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-base">Workflow Context</CardTitle>
             </CardHeader>
             <CardContent>
                <DeliveryTimeline compact currentStage="Lifter Assigned" />
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
