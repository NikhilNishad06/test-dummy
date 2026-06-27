import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatchId = searchParams.get("dispatch") || "";

  // Multi-step State
  const [step, setStep] = useState(1);

  // Auto-calc state for Step 2
  const [qty, setQty] = useState(30);
  const [rate, setRate] = useState(4500);
  const taxable = qty * rate;
  const gst = taxable * 0.05;
  const total = taxable + gst;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleGenerate = () => {
    toast.success("Invoice Generated Successfully!");
    navigate('/sales/invoices');
  };
  const handleDraft = () => {
    toast.success("Invoice Saved as Draft.");
    navigate('/sales/invoices');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Sales Invoice</h2>
        <div className="text-sm font-medium text-muted-foreground">Step {step} of 3</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Step 1: Context & Linkage"}
            {step === 2 && "Step 2: Commercial Details"}
            {step === 3 && "Step 3: Review & Finalize"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Link Sales Dispatch Ref</Label>
                <Input defaultValue={dispatchId} placeholder="Select Dispatch ID" />
              </div>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
              <div className="space-y-2">
                <Label>Link Deal ID</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
              <div className="space-y-2">
                <Label>DO Number</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
              <div className="space-y-2">
                <Label>Invoice Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
                <div className="space-y-2">
                  <Label>Invoiced Quantity (MT)</Label>
                  <Input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Agreed Rate (₹/MT)</Label>
                  <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded bg-muted/10">
                <div className="space-y-2">
                  <Label>Taxable Amount (₹)</Label>
                  <Input type="number" value={taxable} disabled />
                </div>
                <div className="space-y-2">
                  <Label>GST @ 5% (₹)</Label>
                  <Input type="number" value={gst} disabled />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-lg">Total Invoice Amount (₹)</Label>
                  <Input type="number" value={total} disabled className="text-xl font-bold bg-emerald-50 text-emerald-700 h-12" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-slate-50 flex flex-col items-center justify-center text-center space-y-4">
                 <h3 className="text-2xl font-bold">₹{total.toLocaleString()}</h3>
                 <p className="text-sm text-muted-foreground">Ready to generate invoice for <strong>{qty} MT</strong>.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm text-left pt-4 border-t w-full max-w-md">
                   <div className="text-muted-foreground">Taxable:</div>
                   <div className="font-medium text-right">₹{taxable.toLocaleString()}</div>
                   <div className="text-muted-foreground">GST (5%):</div>
                   <div className="font-medium text-right">₹{gst.toLocaleString()}</div>
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Input placeholder="Payment instructions..." />
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>Back</Button>
          ) : (
            <Button variant="outline" onClick={() => navigate('/sales/invoices')}>Cancel</Button>
          )}
          
          {step < 3 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="secondary" onClick={handleDraft}>Save Draft</Button>
              <Button onClick={handleGenerate}>Generate Invoice</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
