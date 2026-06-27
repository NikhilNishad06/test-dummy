import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyBids } from '@/data/bids';
import { dummyAuctions } from '@/data/auctions';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuctionReports() {
  const asakWon = dummyBids.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.' && b.result === 'Won').length;
  const asakTotal = dummyBids.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.').length;
  const jaiWon = dummyBids.filter(b => b.firm === 'Jai Bhole Enterprises' && b.result === 'Won').length;
  const jaiTotal = dummyBids.filter(b => b.firm === 'Jai Bhole Enterprises').length;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Auction Reports</h2>
          <p className="text-muted-foreground">Comprehensive analytics for the auction module.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Master Report</Button>
      </div>

      <Tabs defaultValue="firm" className="space-y-4">
        <TabsList>
          <TabsTrigger value="firm">Firm-wise Performance</TabsTrigger>
          <TabsTrigger value="profitability">Bid Profitability</TabsTrigger>
          <TabsTrigger value="mines">Mine-wise Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="firm" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ASAK Coal Pvt. Ltd.</CardTitle>
                <CardDescription>Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Bids Participated</span> <span className="font-bold">{asakTotal}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Bids Won</span> <span className="font-bold text-emerald-600">{asakWon}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Win Rate</span> <span className="font-bold">{Math.round((asakWon / (asakTotal || 1)) * 100)}%</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jai Bhole Enterprises</CardTitle>
                <CardDescription>Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Bids Participated</span> <span className="font-bold">{jaiTotal}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Bids Won</span> <span className="font-bold text-emerald-600">{jaiWon}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Win Rate</span> <span className="font-bold">{Math.round((jaiWon / (jaiTotal || 1)) * 100)}%</span></div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Detailed Output (Placeholder)</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="h-48 flex items-center justify-center border-2 border-dashed rounded bg-muted/10 text-muted-foreground text-sm">
                 Full data table of firm-wise bids would render here.
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profitability">
          <Card>
            <CardHeader>
              <CardTitle>Expected Profitability from Won Bids</CardTitle>
              <CardDescription>Aggregated margins from all winning bids across all firms.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded bg-emerald-50/20 text-emerald-700">
                 <div className="text-4xl font-bold mb-2">
                    ₹{dummyBids.filter(b => b.result === 'Won').reduce((sum, b) => sum + b.expectedMargin, 0).toLocaleString()}
                 </div>
                 <div className="text-sm">Total Projected Margin (Won Bids)</div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mines">
           <Card>
             <CardHeader>
               <CardTitle>Mines Activity Summary</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="h-48 flex items-center justify-center border-2 border-dashed rounded bg-muted/10 text-muted-foreground text-sm">
                 Aggregated view of how many auctions and total MT offered per mine.
               </div>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
