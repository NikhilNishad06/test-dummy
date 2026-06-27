import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateWeighbridge() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatchId = searchParams.get("dispatch") || "";

  // Auto-calc state
  const [mineWt, setMineWt] = useState(30.00);
  const [custWt, setCustWt] = useState(29.50);
  
  const diff = mineWt - custWt;
  const shortage = diff > 0.3 ? (diff - 0.3) : 0; // 300kg tolerance rule

  const handleSave = () => {
    toast.success("Weighbridge Record Saved!");
    navigate('/dispatch/weighbridge');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Add Weighbridge Record</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Slip Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dispatch Reference</Label>
                <Input defaultValue={dispatchId} placeholder="Select Dispatch ID" />
              </div>
              <div className="space-y-2">
                <Label>Truck Number</Label>
                <Input placeholder="Auto-populated" disabled />
              </div>
              <div className="space-y-2">
                <Label>Slip Number</Label>
                <Input placeholder="e.g. WB-2026-9999" />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mine Weight (MT)</Label>
                <Input type="number" step="0.01" value={mineWt} onChange={e => setMineWt(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Customer Weight (MT)</Label>
                <Input type="number" step="0.01" value={custWt} onChange={e => setCustWt(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Gross Difference (MT)</Label>
                <Input type="number" value={diff.toFixed(2)} disabled />
              </div>
              <div className="space-y-2">
                <Label>Calculated Shortage (MT)</Label>
                <Input type="number" value={shortage.toFixed(2)} disabled className={shortage > 0 ? "bg-destructive/10 text-destructive font-bold" : "bg-emerald-50 text-emerald-700"} />
                <p className="text-xs text-muted-foreground mt-1">Excludes 0.3 MT tolerance.</p>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <Label>Remarks</Label>
              <Input placeholder="Action to be taken regarding shortage..." />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => navigate('/dispatch/weighbridge')}>Cancel</Button>
            <Button onClick={handleSave}>Save Record</Button>
          </CardFooter>
        </Card>

        {/* Live Calculation Cards */}
        <div className="space-y-4">
           <Card className={shortage > 0 ? "bg-destructive/5 border-destructive/20" : "bg-emerald-50/50 border-emerald-100"}>
             <CardHeader className="pb-2">
               <CardTitle className="text-base text-muted-foreground">Shortage Analysis</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className={`text-xl font-bold ${shortage > 0 ? 'text-destructive' : 'text-emerald-600'}`}>
                    {shortage > 0 ? "Shortage Detected" : "Weight Matched"}
                  </div>
                </div>
                {shortage > 0 && (
                  <div className="pt-4 border-t border-destructive/20">
                    <div className="text-sm text-muted-foreground mb-1">Financial Impact</div>
                    <div className="text-sm">This shortage of {shortage.toFixed(2)} MT will be deducted from the Transporter's final freight bill.</div>
                  </div>
                )}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
