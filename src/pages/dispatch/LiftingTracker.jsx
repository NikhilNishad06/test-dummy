import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDispatches } from '@/data/dispatches';
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
import { Progress } from "@/components/ui/progress";
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';

export default function LiftingTracker() {
  const totalDO = dummyDeliveryOrders.reduce((a, b) => a + b.totalQuantity, 0);
  const totalLifted = dummyDispatches.reduce((a, b) => a + b.quantity, 0);
  const pending = totalDO - totalLifted;
  const progress = (totalLifted / totalDO) * 100;

  const mineData = [
    { mine: 'Gevra', total: 50000, lifted: 20000 },
    { mine: 'Dipka', total: 30000, lifted: 15000 },
    { mine: 'Kusmunda', total: 45000, lifted: 40000 },
  ];

  const dailyData = Array.from({length: 7}, (_, i) => ({
    day: `Day ${i+1}`,
    lifted: Math.floor(Math.random() * 500 + 100)
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "Dispatch ID",
    },
    {
      accessorKey: "truckNumber",
      header: "Truck",
    },
    {
      accessorKey: "mine",
      header: "Mine",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("quantity")} MT</span>
    },
    {
      accessorKey: "loadingDate",
      header: "Loading Date",
      cell: ({ row }) => new Date(row.getValue("loadingDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue("status")}</Badge>;
      }
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lifting Tracker</h2>
          <p className="text-muted-foreground">Real-time tracking of coal lifted against total orders.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-4 bg-emerald-50/30 border-emerald-100">
           <CardContent className="pt-6">
             <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-lg">Aggregate Lifting Progress</span>
                  <span className="text-lg">{progress.toFixed(1)}% Lifted</span>
                </div>
                <Progress value={progress} className="h-4 bg-emerald-100" />
                <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Allowed (All DOs)</div>
                    <div className="text-2xl font-bold">{totalDO.toLocaleString()} MT</div>
                  </div>
                  <div>
                    <div className="text-sm text-emerald-600">Total Lifted</div>
                    <div className="text-2xl font-bold text-emerald-600">{totalLifted.toLocaleString()} MT</div>
                  </div>
                  <div>
                    <div className="text-sm text-amber-600">Total Pending</div>
                    <div className="text-2xl font-bold text-amber-600">{pending.toLocaleString()} MT</div>
                  </div>
                </div>
             </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Lifting Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="lifted" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mine-wise Lifting Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mine" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="total" fill="#94a3b8" name="Total Allowed" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="lifted" fill="#10b981" name="Lifted" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Liftings Log</CardTitle>
        </CardHeader>
        <CardContent>
           <DataTable columns={columns} data={dummyDispatches.filter(d => d.status !== 'Planned').slice(0, 10)} searchPlaceholder="Search recent lifts..." />
        </CardContent>
      </Card>
    </div>
  );
}
