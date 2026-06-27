import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreatePaymentAdvice() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slId = searchParams.get("sl") || "";
  
  // Dummy auto-calculation logic state
  const [gross, setGross] = useState(5000000);
  const [emd, setEmd] = useState(500000);
  const [taxes, setTaxes] = useState(900000);

  const handleSave = () => {
    toast.success("Payment Advice Generated!");
    navigate('/government/payment-advice');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Payment Advice</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Advice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Link to Deal ID</Label>
                <Input placeholder="Select Deal" />
              </div>
              <div className="space-y-2">
                <Label>Sale Letter No</Label>
                <Input defaultValue={slId} placeholder="e.g. SL-2026-9999" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
              <div className="space-y-2">
                <Label>Advice Number</Label>
                <Input placeholder="e.g. PA-2026-001" />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gross Amount (₹)</Label>
                <Input type="number" value={gross} onChange={e => setGross(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Less EMD / Adjustment (₹)</Label>
                <Input type="number" value={emd} onChange={e => setEmd(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Taxes (₹)</Label>
                <Input type="number" value={taxes} onChange={e => setTaxes(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Other Charges (₹)</Label>
                <Input type="number" defaultValue="0" />
              </div>
            </div>
            
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Advice Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Payment Due Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Remarks</Label>
                <Input placeholder="Add any special conditions..." />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => navigate('/government/payment-advice')}>Cancel</Button>
            <Button onClick={handleSave}>Generate Advice</Button>
          </CardFooter>
        </Card>

        {/* Live Calculation Cards */}
        <div className="space-y-4">
           <Card className="bg-muted/10">
             <CardHeader className="pb-2">
               <CardTitle className="text-base text-muted-foreground">Calculation Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Gross Amount</div>
                  <div className="text-lg font-semibold">₹{gross.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Less EMD</div>
                  <div className="text-lg font-semibold text-destructive">- ₹{emd.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Taxes</div>
                  <div className="text-lg font-semibold text-amber-600">+ ₹{taxes.toLocaleString()}</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-1">Net Payable</div>
                  <div className="text-3xl font-bold text-emerald-600">₹{(gross - emd + taxes).toLocaleString()}</div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
