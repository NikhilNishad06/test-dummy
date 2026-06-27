import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummySaleLetters } from '@/data/saleLetters';
import { dummyGovtPayments } from '@/data/govtPayments';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProcessReports() {
  const asakSL = dummySaleLetters.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.').length;
  const jaiSL = dummySaleLetters.filter(b => b.firm === 'Jai Bhole Enterprises').length;
  const asakGP = dummyGovtPayments.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.' && b.status === 'Confirmed').reduce((a,b) => a+b.netAmount, 0);
  const jaiGP = dummyGovtPayments.filter(b => b.firm === 'Jai Bhole Enterprises' && b.status === 'Confirmed').reduce((a,b) => a+b.netAmount, 0);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Process Reports</h2>
          <p className="text-muted-foreground">Comprehensive analytics for the Government Process module.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Master Report</Button>
      </div>

      <Tabs defaultValue="firm" className="space-y-4">
        <TabsList>
          <TabsTrigger value="firm">Firm-wise Process Summary</TabsTrigger>
          <TabsTrigger value="payments">Payment Clearance Report</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="firm" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ASAK Coal Pvt. Ltd.</CardTitle>
                <CardDescription>Government Interaction Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Sale Letters Received</span> <span className="font-bold">{asakSL}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Confirmed Govt Payments</span> <span className="font-bold text-sky-600">₹{asakGP.toLocaleString()}</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jai Bhole Enterprises</CardTitle>
                <CardDescription>Government Interaction Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Sale Letters Received</span> <span className="font-bold">{jaiSL}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Confirmed Govt Payments</span> <span className="font-bold text-sky-600">₹{jaiGP.toLocaleString()}</span></div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Detailed Export (Placeholder)</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="h-48 flex items-center justify-center border-2 border-dashed rounded bg-muted/10 text-muted-foreground text-sm">
                 Full data table of firm-wise processing would render here.
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Total Government Payments Cleared</CardTitle>
              <CardDescription>Aggregated net amount of all confirmed bank payments.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded bg-sky-50/20 text-sky-700">
                 <div className="text-4xl font-bold mb-2">
                    ₹{dummyGovtPayments.filter(b => b.status === 'Confirmed').reduce((sum, b) => sum + b.netAmount, 0).toLocaleString()}
                 </div>
                 <div className="text-sm">Total Confirmed Bank Transfers</div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
           <Card>
             <CardHeader>
               <CardTitle>Ageing & Pending Applications</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="h-48 flex items-center justify-center border-2 border-dashed rounded bg-muted/10 text-muted-foreground text-sm">
                 Aggregated view of delayed applications and uncleared payments.
               </div>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
