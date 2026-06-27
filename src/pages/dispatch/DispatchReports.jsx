import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyDispatches } from '@/data/dispatches';
import { dummyWeighbridge } from '@/data/weighbridge';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

export default function DispatchReports() {
  const asakDO = dummyDispatches.filter(b => b.firm === 'ASAK Coal Pvt. Ltd.');
  const jaiDO = dummyDispatches.filter(b => b.firm === 'Jai Bhole Enterprises');

  const mineData = [
    { mine: 'Gevra', dispatched: 15 },
    { mine: 'Dipka', dispatched: 10 },
    { mine: 'Kusmunda', dispatched: 15 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dispatch & Logistics Reports</h2>
          <p className="text-muted-foreground">Comprehensive analytics for truck movements and lifting.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Master Report</Button>
      </div>

      <Tabs defaultValue="transporter" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transporter">Transporter Performance</TabsTrigger>
          <TabsTrigger value="weighbridge">Weighbridge Shortages</TabsTrigger>
          <TabsTrigger value="mines">Mine-wise Dispatch</TabsTrigger>
        </TabsList>

        <TabsContent value="transporter" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Navkar Lifters</CardTitle>
                <CardDescription>Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Trucks Dispatched</span> <span className="font-bold">{dummyDispatches.filter(d => d.transporter === 'Navkar Lifters').length}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Avg. Transit Time</span> <span className="font-bold text-sky-600">2.5 Days</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balaji Transport</CardTitle>
                <CardDescription>Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b pb-2"><span>Total Trucks Dispatched</span> <span className="font-bold">{dummyDispatches.filter(d => d.transporter === 'Balaji Transport').length}</span></div>
                <div className="flex justify-between border-b pb-2"><span>Avg. Transit Time</span> <span className="font-bold text-sky-600">3.1 Days</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weighbridge">
          <Card>
            <CardHeader>
              <CardTitle>Total Coal Shortage</CardTitle>
              <CardDescription>Aggregated from all weighbridge differences exceeding tolerance.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-destructive/20 rounded bg-destructive/5 text-destructive">
                 <div className="text-4xl font-bold mb-2">
                    {dummyWeighbridge.reduce((sum, b) => sum + b.shortage, 0).toFixed(2)} MT
                 </div>
                 <div className="text-sm text-destructive/80">Total Shortage Volume Deductible</div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mines">
           <Card>
             <CardHeader>
               <CardTitle>Mine-wise Activity</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mineData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="mine" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="dispatched" fill="#3b82f6" name="Trucks Dispatched" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
