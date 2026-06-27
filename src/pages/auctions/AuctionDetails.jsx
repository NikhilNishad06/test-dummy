import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyAuctions } from '@/data/auctions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Upload, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AuctionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auction = dummyAuctions.find(d => d.id === id) || dummyAuctions[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/auctions/list')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Auction Details</h2>
            <p className="text-muted-foreground">{auction.id} | Linked Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${auction.dealId}/360`)}>{auction.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/auctions/emd/create?auctionId=${auction.id}`)}>Add EMD</Button>
          <Button onClick={() => navigate(`/auctions/bids/create?auctionId=${auction.id}`)}>
            <Plus className="mr-2 h-4 w-4" /> Create Bid
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Firm:</span>
              <span className="font-medium">{auction.firm}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Company & Mine:</span>
              <span className="font-medium">{auction.coalCompany} - {auction.mine}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Grade:</span>
              <span className="font-medium">{auction.coalGrade}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="outline">{auction.status}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Financials & Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">{auction.quantity} MT</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Base Price:</span>
              <span className="font-medium">₹{auction.basePrice} / MT</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">EMD Required:</span>
              <span className="font-medium text-amber-600">₹{auction.emdRequired.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-muted-foreground">Bid Schedule:</span>
              <span className="font-medium text-sky-600">{new Date(auction.bidDate).toLocaleDateString()} @ {auction.bidClosingTime}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
          <CardDescription>Auction Notice PDF and Terms & Conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="border rounded p-4 w-64 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <FileText className="h-8 w-8 text-sky-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Auction_Notice.pdf</p>
            </div>
            <div className="border rounded p-4 w-64 text-center cursor-pointer hover:bg-muted/50 border-dashed">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-muted-foreground">Upload T&C</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
