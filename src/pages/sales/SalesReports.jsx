import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyCustomerOrders } from '@/data/customerOrders';
import { dummyInvoices } from '@/data/invoices';
import { Download, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';

export default function SalesReports() {
  const totalSalesValue = dummyInvoices.reduce((a, b) => a + b.totalAmount, 0);

  const customerData = [
    { name: 'Jindal Steel', sales: 4500000 },
    { name: 'Ambuja Cements', sales: 3800000 },
    { name: 'Birla Gold', sales: 2900000 },
    { name: 'Balco Industries', sales: 5200000 },
  ];

  const monthlySalesData = Array.from({length: 6}, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    value: Math.floor(Math.random() * 5000000 + 1000000)
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales & Billing Reports</h2>
          <p className="text-muted-foreground">Financial and operational performance analytics.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Financials</Button>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Growth</TabsTrigger>
          <TabsTrigger value="customers">Customer Performance</TabsTrigger>
          <TabsTrigger value="summary">Financial Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>6-Month Revenue Trend</CardTitle>
              <CardDescription>Total invoiced value (inclusive of GST)</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlySalesData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                      <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
           <Card>
             <CardHeader>
               <CardTitle>Top Customers by Revenue</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Bar dataKey="sales" fill="#3b82f6" name="Total Revenue" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Gross Revenue (YTD)</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 rounded bg-emerald-50 text-emerald-700">
                   <div className="flex items-center gap-2 mb-2">
                     <IndianRupee className="h-8 w-8" />
                     <span className="text-4xl font-bold">{(totalSalesValue / 10000000).toFixed(2)} Cr</span>
                   </div>
                   <div className="text-sm">Total Billed Value (All Invoices)</div>
                 </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Fulfillment Rate</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-sky-200 rounded bg-sky-50 text-sky-700">
                   <div className="text-4xl font-bold mb-2">
                     {((dummyCustomerOrders.filter(o => o.status === 'Completed').length / dummyCustomerOrders.length) * 100).toFixed(1)}%
                   </div>
                   <div className="text-sm">Orders successfully completed and billed</div>
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
