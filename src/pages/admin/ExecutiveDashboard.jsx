import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDeals } from '@/data/deals';
import { dummyAuctions } from '@/data/auctions';
import { dummyInvoices } from '@/data/invoices';
import { dummyCollections } from '@/data/collections';
import { dummyStock } from '@/data/stock';
import { Briefcase, Gavel, FileText, Truck, IndianRupee, PieChart, Wallet, Navigation, TrendingUp, TrendingDown, Clock, ShieldAlert, Database } from 'lucide-react';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area, ComposedChart } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ExecutiveDashboard() {
  const navigate = useNavigate();

  // Metrics Calculation
  const totalDeals = dummyDeals.length;
  const activeAuctions = dummyAuctions.filter(a => a.status === 'Active' || a.status === 'Bidding').length;
  const totalRevenue = dummyInvoices.reduce((a, b) => a + b.totalAmount, 0);
  const totalCollections = dummyCollections.reduce((a, b) => a + b.receivedAmount, 0);
  const outstandingAmount = dummyCollections.reduce((a, b) => a + b.balanceAmount, 0);
  const totalStock = dummyStock.reduce((a, b) => a + b.openingStock + b.received, 0);
  const availableStock = dummyStock.reduce((a, b) => a + b.closingStock, 0);

  // Profit approximation for dummy
  const estimatedProfit = totalRevenue * 0.18; // 18% dummy margin

  const monthlyData = Array.from({length: 6}, (_, i) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i];
    const revenue = Math.floor(Math.random() * 5000000 + 2000000);
    const profit = revenue * (0.15 + Math.random() * 0.05);
    return { month, revenue, profit };
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Dashboard</h2>
          <p className="text-muted-foreground">High-level enterprise overview.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-slate-900 text-slate-50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Deals</CardTitle>
            <Briefcase className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-slate-400 mt-1">Active: {dummyDeals.filter(d => d.status === 'Active').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <Gavel className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{activeAuctions}</div>
            <p className="text-xs text-muted-foreground mt-1">Bidding in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Stock</CardTitle>
            <Database className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700">{availableStock.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground mt-1">Across all mines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">₹{(totalRevenue / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-muted-foreground mt-1">Total Billed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Profitability</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">₹{(estimatedProfit / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-muted-foreground mt-1">~18% Blended Margin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Financial Performance (Revenue vs Profit)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                  <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} name="Profit" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline" className="w-full justify-start h-12" onClick={() => navigate('/deals/create')}>
               <Briefcase className="mr-2 h-5 w-5 text-sky-500" /> New Deal
             </Button>
             <Button variant="outline" className="w-full justify-start h-12" onClick={() => navigate('/auctions/list')}>
               <Gavel className="mr-2 h-5 w-5 text-amber-500" /> Auction Notifications
             </Button>
             <Button variant="outline" className="w-full justify-start h-12" onClick={() => navigate('/delivery/orders')}>
               <FileText className="mr-2 h-5 w-5 text-indigo-500" /> Manage DO
             </Button>
             <Button variant="outline" className="w-full justify-start h-12" onClick={() => navigate('/dispatch/trucks')}>
               <Truck className="mr-2 h-5 w-5 text-rose-500" /> Dispatch Trucks
             </Button>
             <Button variant="outline" className="w-full justify-start h-12" onClick={() => navigate('/finance/collections')}>
               <Wallet className="mr-2 h-5 w-5 text-emerald-500" /> Track Collections
             </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 border-rose-100 bg-rose-50/20">
          <CardHeader>
            <CardTitle className="text-rose-800 flex items-center gap-2"><ShieldAlert className="h-5 w-5"/> Outstanding Collections</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold text-rose-600 mb-4">₹{(outstandingAmount / 10000000).toFixed(2)} Cr</div>
             <div className="space-y-3">
               {dummyCollections.filter(c => c.status === 'Overdue' || c.status === 'Partial').slice(0, 3).map((c, i) => (
                 <div key={i} className="flex justify-between items-center text-sm border-b pb-2">
                   <div>
                     <div className="font-medium">{c.customer}</div>
                     <div className="text-xs text-muted-foreground">{c.invoiceNumber}</div>
                   </div>
                   <div className="text-rose-600 font-bold">₹{c.balanceAmount.toLocaleString()}</div>
                 </div>
               ))}
             </div>
             <Button variant="link" className="w-full mt-2 text-rose-700" onClick={() => navigate('/finance/collections')}>View All Outstanding</Button>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
             <CardTitle>Recent Enterprise Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyDeals.slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded border hover:bg-muted/50 cursor-pointer" onClick={() => navigate(`/deals/${d.id}/360`)}>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                        {d.id.split('-')[2]}
                      </div>
                      <div>
                        <div className="font-medium">{d.id} • {d.coalCompany}</div>
                        <div className="text-xs text-muted-foreground">{d.coalGrade} • {d.quantity} MT</div>
                      </div>
                    </div>
                    <Badge variant="outline">{d.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
