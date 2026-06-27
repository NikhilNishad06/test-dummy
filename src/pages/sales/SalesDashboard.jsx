import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyCustomerOrders } from '@/data/customerOrders';
import { dummyInvoices } from '@/data/invoices';
import { ShoppingCart, FileText, IndianRupee, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function SalesDashboard() {
  const totalOrders = dummyCustomerOrders.length;
  const pendingOrders = dummyCustomerOrders.filter(d => d.status === 'Order Received' || d.status === 'Allocation Pending').length;
  
  const totalInvoices = dummyInvoices.length;
  const totalSalesValue = dummyInvoices.reduce((a, b) => a + b.totalAmount, 0);

  const pieData = [
    { name: 'Completed', value: dummyCustomerOrders.filter(d => d.status === 'Completed').length, color: '#10b981' },
    { name: 'In Progress', value: dummyCustomerOrders.filter(d => d.status === 'Dispatch Started' || d.status === 'Partially Delivered' || d.status === 'Allocated').length, color: '#3b82f6' },
    { name: 'Pending', value: pendingOrders, color: '#f59e0b' },
  ];

  const monthlySales = Array.from({length: 6}, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    sales: Math.floor(Math.random() * 5000000 + 1000000)
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Sales & Billing Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customer Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending: {pendingOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales Value</CardTitle>
            <IndianRupee className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalSalesValue / 10000000).toFixed(2)} Cr</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Trend (Last 6 Months)</CardTitle>
            <CardDescription>Value in ₹</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                  <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Order Fulfillment Status</CardTitle>
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
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Orders</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyCustomerOrders.slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded border bg-muted/10 hover:bg-muted/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{d.customerName}</span>
                      <span className="text-xs text-muted-foreground">{d.id} • {d.orderedQuantity} MT</span>
                    </div>
                    <Badge variant="outline">{d.status}</Badge>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Invoices</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {dummyInvoices.filter(d => d.status === 'Draft' || d.status === 'Generated').slice(0, 4).map((d, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded bg-amber-50 border border-amber-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-amber-900">{d.id}</span>
                      <span className="text-xs text-amber-700">{d.customer}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-amber-900 block">₹{d.totalAmount.toLocaleString()}</span>
                      <span className="text-[10px] text-amber-700">{d.status}</span>
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
