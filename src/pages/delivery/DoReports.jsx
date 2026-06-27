import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
import { dummyLifterAssignments } from '@/data/lifterAssignments';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DoReports() {
  const asakDO = dummyDeliveryOrders.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.');
  const jaiDO = dummyDeliveryOrders.filter(b => b.firm === 'Jai Bhole Enterprises');

  const mineData = [
    { mine: 'Gevra', total: 50000, lifted: 20000 },
    { mine: 'Dipka', total: 30000, lifted: 15000 },
    { mine: 'Kusmunda', total: 45000, lifted: 40000 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Delivery Operations Reports</h2>
          <p className="text-muted-foreground">Analytics for lifting operations and delivery orders.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Master Report</Button>
      </div>

      <Tabs defaultValue="firm" className="space-y-4">
        <TabsList>
          <TabsTrigger value="firm">Firm-wise DO Summary</TabsTrigger>
          <TabsTrigger value="mines">Mine-wise DO Balances</TabsTrigger>
          <TabsTrigger value="lifters">Lifter Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="firm" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ASAK Coal Pvt. Ltd.</CardTitle>
                <CardDescription>Delivery Order Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total DOs</span> <span className="font-bold">{asakDO.length}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Lifted</span> <span className="font-bold text-emerald-600">{asakDO.reduce((a,b)=>a+b.liftedQuantity,0).toLocaleString()} MT</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Pending</span> <span className="font-bold text-amber-600">{asakDO.reduce((a,b)=>a+b.pendingQuantity,0).toLocaleString()} MT</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jai Bhole Enterprises</CardTitle>
                <CardDescription>Delivery Order Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total DOs</span> <span className="font-bold">{jaiDO.length}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Lifted</span> <span className="font-bold text-emerald-600">{jaiDO.reduce((a,b)=>a+b.liftedQuantity,0).toLocaleString()} MT</span></div>
                <div className="flex justify-between border-b pb-2"><span>Total Pending</span> <span className="font-bold text-amber-600">{jaiDO.reduce((a,b)=>a+b.pendingQuantity,0).toLocaleString()} MT</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mines">
          <Card>
            <CardHeader>
              <CardTitle>Mine-wise Quantity Aggregation</CardTitle>
              <CardDescription>Visual comparison of allocations across different mines.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mine" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => `${value.toLocaleString()} MT`} />
                      <Bar dataKey="total" fill="#3b82f6" name="Total Qty" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="lifted" fill="#10b981" name="Lifted Qty" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lifters">
           <Card>
             <CardHeader>
               <CardTitle>Lifter Assignment Tracking</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded bg-sky-50/20 text-sky-700">
                 <div className="text-4xl font-bold mb-2">
                    {dummyLifterAssignments.length}
                 </div>
                 <div className="text-sm">Total Active Lifter Assignments</div>
               </div>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
