import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDispatches } from '@/data/dispatches';
import { Truck, MapPin, PackageCheck, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function DispatchDashboard() {
  const total = dummyDispatches.length;
  const inTransit = dummyDispatches.filter(d => d.status === 'In Transit' || d.status === 'Dispatched').length;
  const loaded = dummyDispatches.filter(d => d.status === 'Loaded' || d.status === 'Loading').length;
  const completed = dummyDispatches.filter(d => d.status === 'Unloaded' || d.status === 'Closed' || d.status === 'Reached').length;
  
  const totalQty = dummyDispatches.reduce((a, b) => a + b.quantity, 0);
  const completedQty = dummyDispatches.filter(d => d.status === 'Unloaded' || d.status === 'Closed').reduce((a, b) => a + b.quantity, 0);

  const pieData = [
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'In Transit', value: inTransit, color: '#3b82f6' },
    { name: 'Loading', value: loaded, color: '#f59e0b' },
    { name: 'Planned', value: total - completed - inTransit - loaded, color: '#94a3b8' },
  ];

  const barData = [
    { mine: 'Gevra', dispatched: 15 },
    { mine: 'Dipka', dispatched: 10 },
    { mine: 'Kusmunda', dispatched: 15 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Dispatch & Logistics Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dispatches</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trucks In Transit</CardTitle>
            <MapPin className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
            <PackageCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity Moved</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQty.toLocaleString()} MT</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Current Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Mine-wise Dispatch Volume (Trucks)</CardTitle>
            <CardDescription>Activity across different loading points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
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
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Trucks (In Transit)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyDispatches.filter(d => d.status === 'In Transit' || d.status === 'Dispatched').slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-sky-50 border border-sky-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-sky-900">{d.truckNumber}</span>
                      <span className="text-xs text-sky-700">{d.driverName} - {d.driverMobile}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-sm font-semibold text-sky-900">{d.destinationParty}</span>
                      <Badge variant="outline" className="border-sky-500 text-sky-700">{d.status}</Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Loading Activities</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyDispatches.filter(d => d.status === 'Loaded' || d.status === 'Loading').slice(0, 4).map((wo, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-amber-50 border border-amber-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-amber-900">{wo.truckNumber}</span>
                      <span className="text-xs text-amber-700">{wo.mine}</span>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-700">{wo.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
