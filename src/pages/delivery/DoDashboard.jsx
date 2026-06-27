import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
import { dummyWorkOrders } from '@/data/workOrders';
import { Truck, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function DoDashboard() {
  const totalDO = dummyDeliveryOrders.length;
  const activeDO = dummyDeliveryOrders.filter(d => d.status === 'Active' || d.status === 'Lifting Started').length;
  const expiredDO = dummyDeliveryOrders.filter(d => d.status === 'Expired').length;
  
  const totalQty = dummyDeliveryOrders.reduce((a, b) => a + b.totalQuantity, 0);
  const liftedQty = dummyDeliveryOrders.reduce((a, b) => a + b.liftedQuantity, 0);

  const pieData = [
    { name: 'Lifted', value: liftedQty, color: '#10b981' },
    { name: 'Pending', value: totalQty - liftedQty, color: '#f59e0b' },
  ];

  const barData = [
    { mine: 'Gevra', total: 50000, lifted: 20000 },
    { mine: 'Dipka', total: 30000, lifted: 15000 },
    { mine: 'Kusmunda', total: 45000, lifted: 40000 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Operations Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Delivery Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDO}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active DOs</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDO}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired DOs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredDO}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lifted Qty</CardTitle>
            <Clock className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liftedQty.toLocaleString()} MT</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Overall Quantity Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `${value.toLocaleString()} MT`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                  {d.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Mine-wise Quantity Performance</CardTitle>
            <CardDescription>Total vs Lifted Quantity per Mine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
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
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>DOs Expiring Soon (Next 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyDeliveryOrders.filter(d => d.status === 'Active' || d.status === 'Lifting Started').slice(0, 3).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-amber-50 border border-amber-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-amber-900">{d.id}</span>
                      <span className="text-xs text-amber-700">{d.mine}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-sm font-semibold text-amber-900">{new Date(d.validTill).toLocaleDateString()}</span>
                      <Badge variant="outline" className="border-amber-500 text-amber-700">Expiring</Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyWorkOrders.slice(0, 3).map((wo, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{wo.id}</span>
                      <span className="text-xs text-muted-foreground">{wo.lifter}</span>
                    </div>
                    <Badge variant={wo.status === 'Active' ? 'default' : 'secondary'}>{wo.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
