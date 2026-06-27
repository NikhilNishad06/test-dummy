import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummySaleLetters } from '@/data/saleLetters';
import { dummyPaymentAdvice } from '@/data/paymentAdvice';
import { dummyGovtPayments } from '@/data/govtPayments';
import { dummyApplications } from '@/data/applications';
import { Landmark, CheckCircle, FileText, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function ProcessDashboard() {
  const totalSL = dummySaleLetters.length;
  const pendingPA = dummyPaymentAdvice.filter(d => d.status === 'Pending').length;
  const completedGP = dummyGovtPayments.filter(d => d.status === 'Confirmed' || d.status === 'Paid').length;
  const pendingApp = dummyApplications.filter(d => d.status === 'Pending' || d.status === 'Query Raised').length;

  const pieData = [
    { name: 'Completed Payments', value: completedGP, color: '#10b981' },
    { name: 'Pending Payments', value: dummyGovtPayments.length - completedGP, color: '#f59e0b' },
    { name: 'Pending Advice', value: pendingPA, color: '#ef4444' },
  ];

  const barData = [
    { name: 'Jan', sl: 5, gp: 4 },
    { name: 'Feb', sl: 8, gp: 7 },
    { name: 'Mar', sl: 4, gp: 3 },
    { name: 'Apr', sl: 12, gp: 10 },
    { name: 'May', sl: totalSL, gp: completedGP },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Government Process Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sale Letters</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSL}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Govt Payments Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedGP}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Apps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApp}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awaiting Delivery Orders</CardTitle>
            <Landmark className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyApplications.filter(a => a.status === 'Approved').length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Process Status Distribution</CardTitle>
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
            <CardTitle>Monthly Process Activity</CardTitle>
            <CardDescription>Sale Letters vs Completed Government Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="sl" fill="#3b82f6" name="Sale Letters" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="gp" fill="#10b981" name="Govt Payments" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Due Dates</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummySaleLetters.slice(0, 3).map((sl, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{sl.id}</span>
                      <span className="text-xs text-muted-foreground">{sl.firm}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-sm font-semibold">{new Date(sl.dueDate).toLocaleDateString()}</span>
                      <Badge variant="outline">Payment Due</Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyApplications.filter(a => a.status === 'Query Raised' || a.status === 'Pending').slice(0, 3).map((app, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{app.id}</span>
                      <span className="text-xs text-muted-foreground">{app.officeName}</span>
                    </div>
                    <Badge variant="destructive">{app.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
