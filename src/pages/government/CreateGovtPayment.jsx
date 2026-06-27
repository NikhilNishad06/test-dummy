import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GovtTimeline from './GovtTimeline';

export default function CreateGovtPayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const adviceId = searchParams.get("advice") || "";

  const handleSave = () => {
    toast.success("Government Payment Logged!");
    navigate('/government/payments');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Log Government Payment</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Link to Deal ID</Label>
                <Input placeholder="Select Deal" />
              </div>
              <div className="space-y-2">
                <Label>Payment Advice Ref</Label>
                <Input defaultValue={adviceId} placeholder="e.g. PA-2026-9999" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
              <div className="space-y-2">
                <Label>Sale Letter Ref</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gross Amount (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Less EMD (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Net Paid Amount (₹)</Label>
                <Input type="number" placeholder="0.00" className="bg-emerald-50/50" />
              </div>
              <div className="space-y-2">
                <Label>Payment Date</Label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input placeholder="e.g. HDFC Bank" />
              </div>
              <div className="space-y-2">
                <Label>UTR Number</Label>
                <Input placeholder="Transaction Ref" />
              </div>
              <div className="space-y-2">
                <Label>Sent to Office</Label>
                <Input placeholder="e.g. WCL HQ Nagpur" />
              </div>
              <div className="space-y-2">
                <Label>Responsible Person</Label>
                <Input placeholder="e.g. Rajesh Kumar" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Remarks</Label>
                <Input placeholder="Add any notes..." />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => navigate('/government/payments')}>Cancel</Button>
            <Button onClick={handleSave}>Submit Payment Log</Button>
          </CardFooter>
        </Card>

        {/* Timeline Context */}
        <div className="space-y-4">
           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-base">Workflow Context</CardTitle>
             </CardHeader>
             <CardContent>
                <GovtTimeline compact currentStage="Government Payment" />
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
