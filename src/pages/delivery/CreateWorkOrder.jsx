import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateWorkOrder() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignment") || "";
  
  // State for quantity validation demo
  const [qty, setQty] = useState("");

  const handleNext = () => {
    // Simple frontend validation for quantity
    if (step === 2 && Number(qty) > 4000) {
       toast.error("Quantity exceeds remaining DO balance of 4000 MT.");
       return;
    }
    setStep(s => Math.min(4, s + 1));
  };
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = () => {
    toast.success("Work Order Generated successfully!");
    navigate('/delivery/work-orders');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Work Order</h2>
        <div className="text-sm text-muted-foreground">Step {step} of 4</div>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-2 w-full mx-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-muted'}`}></div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Details"}
            {step === 2 && "Quantity & Grade"}
            {step === 3 && "Schedule & Terms"}
            {step === 4 && "Review & Generate"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Link to Deal ID</Label>
                <Input placeholder="Select Deal" />
              </div>
              <div className="space-y-2">
                <Label>Lifter Assignment Ref</Label>
                <Input defaultValue={assignmentId} placeholder="e.g. LA-2026-001" />
              </div>
              <div className="space-y-2">
                <Label>DO Number</Label>
                <Input placeholder="e.g. DO-2026-9999" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
              <div className="space-y-2">
                <Label>Mine</Label>
                <Input placeholder="Select Mine" />
              </div>
              <div className="space-y-2">
                <Label>Lifter</Label>
                <Input placeholder="Select Lifter" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 p-4 bg-muted/20 border rounded">
                 <p className="text-sm font-medium">DO Pending Quantity Balance: <span className="text-sky-600 font-bold">4,000 MT</span></p>
                 <p className="text-xs text-muted-foreground mt-1">Work order quantity cannot exceed the remaining DO balance.</p>
              </div>
              <div className="space-y-2">
                <Label>Work Order Quantity (MT)</Label>
                <Input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Grade</Label>
                <Input placeholder="e.g. G11" />
              </div>
              <div className="space-y-2">
                <Label>Rate (Optional ₹/MT)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Target Completion Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Terms & Conditions</Label>
                <Input placeholder="Payment terms, lifting conditions..." />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Remarks</Label>
                <Input placeholder="Any additional notes..." />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">Review the work order parameters.</p>
              <div className="rounded border p-4 bg-muted/20">
                <h4 className="font-semibold mb-4">Work Order Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Assignment Ref: <span className="font-medium text-foreground">{assignmentId || 'LA-2026-0001'}</span></div>
                  <div>Quantity: <span className="font-medium text-foreground">{qty || '0'} MT</span></div>
                  <div>Lifter: <span className="font-medium text-foreground">Selected Lifter</span></div>
                  <div>Status: <span className="font-medium text-sky-600">Ready to Generate</span></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={step === 1 ? () => navigate('/delivery/work-orders') : handlePrev}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="space-x-2">
            {step === 4 && <Button variant="secondary" onClick={() => toast.success("Draft saved!")}>Save Draft</Button>}
            {step < 4 ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button onClick={handleSubmit}>Generate Work Order</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
