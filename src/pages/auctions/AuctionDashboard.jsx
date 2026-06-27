import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyAuctions } from '@/data/auctions';
import { dummyBids } from '@/data/bids';
import { dummyEmds } from '@/data/emds';
import { Gavel, CheckCircle, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function AuctionDashboard() {
  const totalAuctions = dummyAuctions.length;
  const wonBids = dummyBids.filter(b => b.result === 'Won').length;
  const lostBids = dummyBids.filter(b => b.result === 'Lost').length;
  const pendingEmd = dummyEmds.filter(e => e.status === 'Pending').length;
  
  const pieData = [
    { name: 'Won', value: wonBids, color: '#10b981' },
    { name: 'Lost', value: lostBids, color: '#ef4444' },
    { name: 'Pending', value: dummyBids.length - wonBids - lostBids, color: '#f59e0b' },
  ];

  const barData = [
    { firm: 'ASAK', won: wonBids / 2, lost: lostBids / 2 },
    { firm: 'Jai Bhole', won: wonBids / 2, lost: lostBids / 2 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Auction Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auctions</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAuctions}</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Won Auctions</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wonBids}</div>
            <p className="text-xs text-emerald-500">Target: 20/month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((wonBids / (wonBids + lostBids || 1)) * 100)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EMD Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEmd}</div>
            <p className="text-xs text-amber-500">Requires action today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Bid Results Overview</CardTitle>
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
            <CardTitle>Firm-wise Performance</CardTitle>
            <CardDescription>Winning vs Losing bids per firm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="firm" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="won" fill="#10b981" name="Won" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="lost" fill="#ef4444" name="Lost" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bids</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyAuctions.slice(0, 3).map((a, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{a.id}</span>
                      <span className="text-xs text-muted-foreground">{a.firm}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-sm font-semibold">{new Date(a.bidDate).toLocaleDateString()}</span>
                      <Badge variant="outline">{a.coalGrade}</Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent EMD Status</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyEmds.slice(0, 3).map((e, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{e.auctionNo}</span>
                      <span className="text-xs text-muted-foreground">₹{e.amount.toLocaleString()}</span>
                    </div>
                    <Badge variant={e.status === 'Paid' ? 'default' : 'destructive'}>{e.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
