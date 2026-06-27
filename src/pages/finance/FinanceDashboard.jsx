import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyCollections } from '@/data/collections';
import { dummyVendorPayments } from '@/data/vendorPayments';
import { dummyTransportSettlements } from '@/data/transportSettlements';
import { dummyCommissions } from '@/data/commissions';
import { Wallet, IndianRupee, CreditCard, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function FinanceDashboard() {
  const totalCollections = dummyCollections.reduce((a, b) => a + b.receivedAmount, 0);
  const pendingCollections = dummyCollections.reduce((a, b) => a + b.balanceAmount, 0);
  
  const totalVendorPayments = dummyVendorPayments.reduce((a, b) => a + b.paidAmount, 0);
  const pendingVendorPayments = dummyVendorPayments.reduce((a, b) => a + b.balance, 0);
  
  const totalTransportPayments = dummyTransportSettlements.reduce((a, b) => a + b.paidAmount, 0);
  const pendingTransportPayments = dummyTransportSettlements.reduce((a, b) => a + b.balance, 0);

  const totalCommissionPayments = dummyCommissions.reduce((a, b) => a + b.paidAmount, 0);
  const pendingCommissionPayments = dummyCommissions.reduce((a, b) => a + b.balance, 0);

  const totalPayments = totalVendorPayments + totalTransportPayments + totalCommissionPayments;
  const totalPayables = pendingVendorPayments + pendingTransportPayments + pendingCommissionPayments;

  const cashflowData = Array.from({length: 7}, (_, i) => ({
    day: `Day ${i+1}`,
    inflow: Math.floor(Math.random() * 5000000 + 1000000),
    outflow: Math.floor(Math.random() * 4000000 + 500000)
  }));

  const payablesPie = [
    { name: 'Vendor', value: pendingVendorPayments, color: '#f43f5e' },
    { name: 'Transport', value: pendingTransportPayments, color: '#eab308' },
    { name: 'Commission', value: pendingCommissionPayments, color: '#8b5cf6' },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Finance Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-emerald-50/50 border-emerald-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Total Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">₹{(totalCollections / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-emerald-600 mt-1">Pending: ₹{(pendingCollections / 100000).toFixed(1)}L</p>
          </CardContent>
        </Card>
        <Card className="bg-rose-50/50 border-rose-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rose-800">Total Payments Made</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">₹{(totalPayments / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-rose-600 mt-1">Total Payables: ₹{(totalPayables / 100000).toFixed(1)}L</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Collections</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {dummyCollections.filter(c => c.status === 'Overdue').length} Invoices
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Position</CardTitle>
            <Wallet className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700">₹{((totalCollections - totalPayments) / 10000000).toFixed(2)} Cr</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cashflow Trend (Last 7 Days)</CardTitle>
            <CardDescription>Inflow vs Outflow in ₹</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashflowData}>
                  <defs>
                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                  <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="inflow" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" name="Collections" />
                  <Area type="monotone" dataKey="outflow" stroke="#f43f5e" fillOpacity={1} fill="url(#colorOut)" name="Payments" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Outstanding Payables Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={payablesPie} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {payablesPie.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-sm mt-2">
              {payablesPie.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                    <span>{d.name}</span>
                  </div>
                  <span className="font-medium">₹{(d.value/100000).toFixed(1)}L</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Collections</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyCollections.filter(c => c.status === 'Received' || c.status === 'Partial').slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded border border-emerald-100 bg-emerald-50/30">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-emerald-900">{d.customer}</span>
                      <span className="text-xs text-emerald-700">Inv: {d.invoiceNumber}</span>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-emerald-700">+ ₹{d.receivedAmount.toLocaleString()}</div>
                       <div className="text-[10px] text-emerald-600">UTR: {d.utrNumber}</div>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments Due</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyVendorPayments.filter(d => d.status === 'Pending').slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded border border-rose-100 bg-rose-50/30">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-rose-900">{d.vendor}</span>
                      <span className="text-xs text-rose-700">Due: {new Date(d.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-rose-700">₹{d.balance.toLocaleString()}</div>
                       {d.interestAmount > 0 && <div className="text-[10px] text-rose-600 font-bold">Includes Interest</div>}
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
