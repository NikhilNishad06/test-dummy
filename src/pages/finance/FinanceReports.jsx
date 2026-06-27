import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyCollections } from '@/data/collections';
import { dummyVendorPayments } from '@/data/vendorPayments';

export default function FinanceReports() {
  
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2 mb-2 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance Reports</h2>
          <p className="text-muted-foreground">Ledgers and financial statements.</p>
        </div>
      </div>

      <Tabs defaultValue="customer" className="flex-1 flex flex-col min-h-0">
        <TabsList className="bg-muted/50 border shrink-0">
          <TabsTrigger value="customer">Customer Ledger</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Ledger</TabsTrigger>
          <TabsTrigger value="broker">Broker Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="flex-1 flex flex-col min-h-0 pt-4">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="shrink-0 pb-4">
              <CardTitle>Customer Outstandings</CardTitle>
              <CardDescription>Consolidated customer collection report.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 border-b sticky top-0">
                   <tr>
                     <th className="p-4 font-medium">Customer</th>
                     <th className="p-4 font-medium text-right">Total Invoiced</th>
                     <th className="p-4 font-medium text-right text-emerald-600">Total Received</th>
                     <th className="p-4 font-medium text-right text-rose-600">Total Outstanding</th>
                   </tr>
                 </thead>
                 <tbody>
                   {Array.from(new Set(dummyCollections.map(c => c.customer))).map(customer => {
                      const customerRecords = dummyCollections.filter(c => c.customer === customer);
                      const inv = customerRecords.reduce((a, b) => a + b.invoiceAmount, 0);
                      const rec = customerRecords.reduce((a, b) => a + b.receivedAmount, 0);
                      const bal = customerRecords.reduce((a, b) => a + b.balanceAmount, 0);
                      
                      return (
                       <tr key={customer} className="border-b hover:bg-muted/30">
                         <td className="p-4 font-semibold">{customer}</td>
                         <td className="p-4 text-right">₹{inv.toLocaleString()}</td>
                         <td className="p-4 text-right text-emerald-600 font-medium">₹{rec.toLocaleString()}</td>
                         <td className="p-4 text-right text-rose-600 font-bold">₹{bal.toLocaleString()}</td>
                       </tr>
                      );
                   })}
                 </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor" className="flex-1 flex flex-col min-h-0 pt-4">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="shrink-0 pb-4">
              <CardTitle>Vendor Payables</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 border-b sticky top-0">
                   <tr>
                     <th className="p-4 font-medium">Vendor</th>
                     <th className="p-4 font-medium text-right">Total Payable</th>
                     <th className="p-4 font-medium text-right text-emerald-600">Paid</th>
                     <th className="p-4 font-medium text-right text-rose-600">Outstanding Due</th>
                   </tr>
                 </thead>
                 <tbody>
                   {Array.from(new Set(dummyVendorPayments.map(c => c.vendor))).map(vendor => {
                      const records = dummyVendorPayments.filter(c => c.vendor === vendor);
                      const inv = records.reduce((a, b) => a + b.amount, 0);
                      const rec = records.reduce((a, b) => a + b.paidAmount, 0);
                      const bal = records.reduce((a, b) => a + b.balance, 0);
                      
                      return (
                       <tr key={vendor} className="border-b hover:bg-muted/30">
                         <td className="p-4 font-semibold">{vendor}</td>
                         <td className="p-4 text-right">₹{inv.toLocaleString()}</td>
                         <td className="p-4 text-right text-emerald-600 font-medium">₹{rec.toLocaleString()}</td>
                         <td className="p-4 text-right text-rose-600 font-bold">₹{bal.toLocaleString()}</td>
                       </tr>
                      );
                   })}
                 </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broker" className="flex-1 pt-4 text-muted-foreground p-4">
           Broker ledger data goes here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
