import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateBid() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auctionId = searchParams.get("auctionId") || "";

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = () => {
    toast.success("Bid submitted successfully!");
    navigate('/auctions/bids');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Bid</h2>
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
            {step === 2 && "Bid Pricing"}
            {step === 3 && "Profit Calculator (Simulation)"}
            {step === 4 && "Review & Submit"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Link to Deal ID</Label>
                <Input placeholder="Select Deal" />
              </div>
              <div className="space-y-2">
                <Label>Auction Number</Label>
                <Input defaultValue={auctionId} placeholder="Select Auction" />
              </div>
              <div className="space-y-2">
                <Label>Firm</Label>
                <Input placeholder="Select Firm" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity (MT)</Label>
                <Input type="number" defaultValue="5000" />
              </div>
              <div className="space-y-2">
                <Label>Bid Rate (₹/MT)</Label>
                <Input type="number" defaultValue="5600" />
              </div>
              <div className="space-y-2">
                <Label>Expected Sale Rate (₹/MT)</Label>
                <Input type="number" defaultValue="6500" />
              </div>
              <div className="space-y-2">
                <Label>Est. Transport Cost (₹)</Label>
                <Input type="number" defaultValue="500000" />
              </div>
              <div className="space-y-2">
                <Label>Est. Commission (₹)</Label>
                <Input type="number" defaultValue="250000" />
              </div>
              <div className="space-y-2">
                <Label>Other Charges (₹)</Label>
                <Input type="number" defaultValue="100000" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="border p-4 rounded bg-red-50/50">
                    <h4 className="font-semibold text-red-800 mb-4">Total Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Purchase (5000 * 5600)</span> <span>₹2,80,00,000</span></div>
                      <div className="flex justify-between"><span>Transport</span> <span>₹5,00,000</span></div>
                      <div className="flex justify-between"><span>Commission</span> <span>₹2,50,000</span></div>
                      <div className="flex justify-between"><span>Other</span> <span>₹1,00,000</span></div>
                      <div className="flex justify-between font-bold pt-2 border-t"><span>Total Cost</span> <span>₹2,88,50,000</span></div>
                    </div>
                 </div>
                 <div className="border p-4 rounded bg-emerald-50/50 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-emerald-800 mb-4">Expected Revenue</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Sales (5000 * 6500)</span> <span>₹3,25,00,000</span></div>
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-bold text-lg text-emerald-700">
                         <span>Exp. Profit</span> <span>₹36,50,000</span>
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600 mt-1">
                         <span>Profit per MT</span> <span>₹730</span>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">Review the entered bid parameters.</p>
              <div className="rounded border p-4 bg-muted/20">
                <h4 className="font-semibold mb-2">Bid Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>Auction No: <span className="font-medium text-foreground">{auctionId || 'AUC-2026-0001'}</span></div>
                  <div>Quantity: <span className="font-medium text-foreground">5000 MT</span></div>
                  <div>Bid Rate: <span className="font-medium text-foreground">₹ 5600 / MT</span></div>
                  <div>Exp. Profit: <span className="font-medium text-emerald-600">₹ 36,50,000</span></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={step === 1 ? () => navigate('/auctions/bids') : handlePrev}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <div className="space-x-2">
            {step === 4 && <Button variant="secondary" onClick={() => toast.success("Draft saved!")}>Save Draft</Button>}
            {step < 4 ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Bid</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
