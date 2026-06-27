import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DoBalance() {
  const totalQty = dummyDeliveryOrders.reduce((a, b) => a + b.totalQuantity, 0);
  const liftedQty = dummyDeliveryOrders.reduce((a, b) => a + b.liftedQuantity, 0);
  const pendingQty = totalQty - liftedQty;
  const progress = (liftedQty / totalQty) * 100;

  const mineData = [
    { mine: 'Gevra', total: 50000, lifted: 20000 },
    { mine: 'Dipka', total: 30000, lifted: 15000 },
    { mine: 'Kusmunda', total: 45000, lifted: 40000 },
  ];

  const firmData = [
    { name: 'ASAK', value: dummyDeliveryOrders.filter(d => d.firm === 'ASAK Coal Pvt. Ltd.').reduce((a, b) => a + b.pendingQuantity, 0), color: '#3b82f6' },
    { name: 'Jai Bhole', value: dummyDeliveryOrders.filter(d => d.firm === 'Jai Bhole Enterprises').reduce((a, b) => a + b.pendingQuantity, 0), color: '#f59e0b' },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Delivery Balance (DO)</h2>
          <p className="text-muted-foreground">Aggregated view of remaining liftable coal.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-4 bg-muted/10">
           <CardContent className="pt-6">
             <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-lg">Overall Lifting Progress</span>
                  <span className="text-lg">{progress.toFixed(1)}% Completed</span>
                </div>
                <Progress value={progress} className="h-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Allowed</div>
                    <div className="text-2xl font-bold">{totalQty.toLocaleString()} MT</div>
                  </div>
                  <div>
                    <div className="text-sm text-emerald-600">Total Lifted</div>
                    <div className="text-2xl font-bold text-emerald-600">{liftedQty.toLocaleString()} MT</div>
                  </div>
                  <div>
                    <div className="text-sm text-amber-600">Total Remaining</div>
                    <div className="text-2xl font-bold text-amber-600">{pendingQty.toLocaleString()} MT</div>
                  </div>
                </div>
             </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Mine-wise Quantity Balances</CardTitle>
            <CardDescription>Lifted vs Total limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Firm-wise Pending Quantity</CardTitle>
            <CardDescription>Remaining quantity to be lifted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={firmData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {firmData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `${value.toLocaleString()} MT`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              {firmData.map(d => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
