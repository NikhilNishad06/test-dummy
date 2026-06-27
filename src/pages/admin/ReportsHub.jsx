import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Printer, Filter } from 'lucide-react';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function ReportsHub() {
  const [reportType, setReportType] = useState('profitability');

  const reportOptions = [
    { value: 'dashboard', label: 'Dashboard Summary Report' },
    { value: 'deal', label: 'Deal Report' },
    { value: 'auction', label: 'Auction & EMD Report' },
    { value: 'govt', label: 'Government Payment Report' },
    { value: 'delivery', label: 'Delivery Order (DO) Report' },
    { value: 'dispatch', label: 'Dispatch & Logistics Report' },
    { value: 'sales', label: 'Sales & Invoice Report' },
    { value: 'finance', label: 'Collection & Outstanding Report' },
    { value: 'vendor', label: 'Vendor & Transport Payment Report' },
    { value: 'commission', label: 'Broker Commission Report' },
    { value: 'stock', label: 'Inventory & Stock Report' },
    { value: 'profitability', label: 'Profitability Report' },
    { value: 'master', label: 'Master Data (Firms, Mines, Customers) Report' },
  ];

  // Dummy Chart for the report
  const dummyChartData = Array.from({length: 8}, (_, i) => ({
    name: `Category ${i+1}`,
    value: Math.floor(Math.random() * 1000) + 100
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2 mb-2 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports Hub</h2>
          <p className="text-muted-foreground">Unified reporting center for all ERP modules.</p>
        </div>
      </div>

      <Card className="shrink-0 mb-4 bg-muted/30">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1 w-[300px]">
              <label className="text-xs font-medium">Select Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a report..." />
                </SelectTrigger>
                <SelectContent>
                  {reportOptions.map(opt => (
                     <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">From Date</label>
              <Input type="date" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">To Date</label>
              <Input type="date" />
            </div>
            <div className="space-y-1 flex-1">
              <label className="text-xs font-medium">Search</label>
              <Input placeholder="Search within report..." />
            </div>
            <Button><Filter className="mr-2 h-4 w-4" /> Generate</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col min-h-[400px]">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4 shrink-0">
          <div>
            <CardTitle>{reportOptions.find(o => o.value === reportType)?.label || 'Report'}</CardTitle>
            <CardDescription>Generated on {new Date().toLocaleDateString()}</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm"><Printer className="mr-2 h-4 w-4"/> Print Preview</Button>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Export PDF</Button>
            <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"><FileText className="mr-2 h-4 w-4"/> Export Excel</Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-6 space-y-8 bg-slate-50/50">
           
           <div className="grid grid-cols-4 gap-4">
             <div className="bg-white p-4 rounded border text-center shadow-sm">
                <div className="text-xs text-muted-foreground mb-1">Total Records</div>
                <div className="text-xl font-bold">1,245</div>
             </div>
             <div className="bg-white p-4 rounded border text-center shadow-sm">
                <div className="text-xs text-muted-foreground mb-1">Total Value</div>
                <div className="text-xl font-bold text-emerald-600">₹45.2 Cr</div>
             </div>
             <div className="bg-white p-4 rounded border text-center shadow-sm">
                <div className="text-xs text-muted-foreground mb-1">Filtered Items</div>
                <div className="text-xl font-bold">84</div>
             </div>
             <div className="bg-white p-4 rounded border text-center shadow-sm">
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="text-xl font-bold text-sky-600">Active</div>
             </div>
           </div>

           <div className="bg-white p-6 rounded border shadow-sm h-[300px]">
             <h3 className="font-semibold mb-4 text-sm text-muted-foreground">Graphical Analysis</h3>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>

           <div className="bg-white rounded border shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                 <thead className="bg-muted/50 border-b">
                   <tr>
                     <th className="p-3 font-medium">Record ID</th>
                     <th className="p-3 font-medium">Date</th>
                     <th className="p-3 font-medium">Description</th>
                     <th className="p-3 font-medium">Category</th>
                     <th className="p-3 font-medium text-right">Amount</th>
                     <th className="p-3 font-medium">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {Array.from({length: 10}).map((_, i) => (
                     <tr key={i} className="border-b hover:bg-muted/30">
                       <td className="p-3 font-medium text-sky-600">REC-2026-00{i+1}</td>
                       <td className="p-3 text-muted-foreground">01/06/2026</td>
                       <td className="p-3">Generated dummy row for report view</td>
                       <td className="p-3">Category {i%4 + 1}</td>
                       <td className="p-3 text-right">₹{(Math.random() * 100000).toFixed(2)}</td>
                       <td className="p-3"><Badge variant="outline">Completed</Badge></td>
                     </tr>
                   ))}
                 </tbody>
              </table>
           </div>

        </CardContent>
      </Card>
    </div>
  );
}
