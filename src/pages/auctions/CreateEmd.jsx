import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function CreateEmd() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auctionId = searchParams.get("auctionId") || "";

  const handleSave = () => {
    toast.success("EMD Record Created!");
    navigate('/auctions/emd');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create EMD Payment</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EMD Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Link to Deal ID</Label>
              <Input placeholder="Select Deal" />
            </div>
            <div className="space-y-2">
              <Label>Auction Number</Label>
              <Input defaultValue={auctionId} placeholder="e.g. AUC-2026-9999" />
            </div>
            <div className="space-y-2">
              <Label>Firm</Label>
              <Input placeholder="Select Firm" />
            </div>
            <div className="space-y-2">
              <Label>EMD Amount (₹)</Label>
              <Input type="number" placeholder="0.00" />
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input placeholder="e.g. HDFC Bank" />
            </div>
            <div className="space-y-2">
              <Label>UTR / Reference Number</Label>
              <Input placeholder="Enter transaction ref..." />
            </div>
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Input placeholder="Any additional notes..." />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
          <Button variant="outline" onClick={() => navigate('/auctions/emd')}>Cancel</Button>
          <Button onClick={handleSave}>Save EMD</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
