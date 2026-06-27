import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateDeal() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(s => Math.min(5, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleCreate = () => {
    toast.success("Deal created successfully!");
    navigate('/deals/list');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create New Deal</h2>
        <div className="text-sm text-muted-foreground">Step {step} of 5</div>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-2 w-full mx-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-muted'}`}></div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Quantity Details"}
            {step === 3 && "Pricing & Margins"}
            {step === 4 && "Responsibility & Team"}
            {step === 5 && "Review & Submit"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deal ID (Auto Generated)</Label>
                <Input disabled value="DL-2026-0021" />
              </div>
              <div className="space-y-2">
                <Label>Deal Title</Label>
                <Input placeholder="Enter title" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Input placeholder="Market Coal / Own Coal" />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Input placeholder="Auction / 3rd Party" />
              </div>
              <div className="space-y-2">
                <Label>Coal Company</Label>
                <Input placeholder="Select Company" />
              </div>
              <div className="space-y-2">
                <Label>Mine</Label>
                <Input placeholder="Select Mine" />
              </div>
              <div className="space-y-2">
                <Label>Coal Grade</Label>
                <Input placeholder="Select Grade" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Quantity (MT)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Expected Lifting Quantity (MT)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Base Purchase Rate (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Expected Sale Rate (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Expected Transport Cost (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Expected Commission (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Other Charges (₹)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Expected Margin (Auto Calc)</Label>
                <Input disabled placeholder="₹ 0.00" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deal Owner</Label>
                <Input placeholder="Select User" />
              </div>
              <div className="space-y-2">
                <Label>Operations Team</Label>
                <Input placeholder="Select Team/User" />
              </div>
              <div className="space-y-2">
                <Label>Billing Team</Label>
                <Input placeholder="Select Team/User" />
              </div>
              <div className="space-y-2">
                <Label>Collection Team</Label>
                <Input placeholder="Select Team/User" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Remarks</Label>
                <Input placeholder="Any additional notes..." />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">Review the entered information before generating the deal record.</p>
              <div className="rounded border p-4 bg-muted/20">
                <h4 className="font-semibold mb-2">Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>Deal Title: <span className="font-medium text-foreground">Draft Deal</span></div>
                  <div>Quantity: <span className="font-medium text-foreground">5000 MT</span></div>
                  <div>Mine: <span className="font-medium text-foreground">WCL Mine 1</span></div>
                  <div>Expected Margin: <span className="font-medium text-foreground">₹ 2,00,000</span></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={step === 1 ? () => navigate('/deals/list') : handlePrev}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="space-x-2">
            {step === 5 && <Button variant="secondary" onClick={() => toast.success("Draft saved!")}>Save Draft</Button>}
            {step < 5 ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button onClick={handleCreate}>Create Deal</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
