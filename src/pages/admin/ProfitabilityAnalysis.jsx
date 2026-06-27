import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, ArrowRight } from 'lucide-react';

export default function ProfitabilityAnalysis() {
  
  // Dummy Analytics Data
  const purchaseCost = 15000000;
  const transportCost = 2500000;
  const commission = 500000;
  const govtCharges = 1200000;
  const otherExpenses = 300000;
  
  const totalCost = purchaseCost + transportCost + commission + govtCharges + otherExpenses;
  const salesRevenue = 24000000;
  
  const grossProfit = salesRevenue - purchaseCost;
  const netProfit = salesRevenue - totalCost;
  
  const qty = 5000; // MT
  const profitPerMT = netProfit / qty;
  const marginPercent = (netProfit / salesRevenue) * 100;

  const costBreakdown = [
    { name: 'Purchase (Mine)', value: purchaseCost, color: '#94a3b8' },
    { name: 'Transport', value: transportCost, color: '#38bdf8' },
    { name: 'Govt Charges', value: govtCharges, color: '#fbbf24' },
    { name: 'Commission', value: commission, color: '#c084fc' },
    { name: 'Others', value: otherExpenses, color: '#f43f5e' },
  ];

  const monthlyProfit = Array.from({length: 6}, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
    profit: Math.floor(Math.random() * 1500000 + 500000)
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profitability Analysis</h2>
          <p className="text-muted-foreground">Comprehensive P&L analytics down to per-MT margins.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 mb-4">
        <Card className="lg:col-span-2 bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Sales Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">₹{(salesRevenue / 10000000).toFixed(2)} Cr</div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 border-slate-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Costs & Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-600">₹{(totalCost / 10000000).toFixed(2)} Cr</div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">₹{(netProfit / 10000000).toFixed(2)} Cr</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
         <Card>
           <CardContent className="p-6 flex flex-col items-center justify-center text-center">
             <div className="text-sm text-muted-foreground mb-1">Gross Profit</div>
             <div className="text-2xl font-bold">₹{(grossProfit / 10000000).toFixed(2)} Cr</div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6 flex flex-col items-center justify-center text-center">
             <div className="text-sm text-muted-foreground mb-1">Total Quantity (MT)</div>
             <div className="text-2xl font-bold">{qty.toLocaleString()} MT</div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6 flex flex-col items-center justify-center text-center bg-indigo-50 border-indigo-100">
             <div className="text-sm text-indigo-700 mb-1">Net Margin %</div>
             <div className="text-2xl font-bold text-indigo-700">{marginPercent.toFixed(1)}%</div>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6 flex flex-col items-center justify-center text-center bg-sky-50 border-sky-100">
             <div className="text-sm text-sky-700 mb-1">Net Profit Per MT</div>
             <div className="text-2xl font-bold text-sky-700">₹{profitPerMT.toFixed(0)}</div>
           </CardContent>
         </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cost Waterfall / Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center text-sm font-medium">
                  <div className="w-32 text-right mr-4 text-emerald-600 font-bold">Sales Revenue</div>
                  <div className="flex-1 h-8 bg-emerald-100 relative rounded-r overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-emerald-500" style={{width: '100%'}}></div>
                    <div className="absolute inset-y-0 left-2 flex items-center text-white text-xs font-bold shadow-sm">100%</div>
                  </div>
                  <div className="w-24 text-right ml-4 font-bold">₹{(salesRevenue/100000).toFixed(0)}L</div>
                </div>

                {costBreakdown.map((cost, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-32 text-right mr-4 text-muted-foreground">{cost.name}</div>
                    <div className="flex-1 h-6 bg-slate-100 relative rounded-r overflow-hidden">
                      <div className="absolute inset-y-0 left-0" style={{width: `${(cost.value/salesRevenue)*100}%`, backgroundColor: cost.color}}></div>
                    </div>
                    <div className="w-24 text-right ml-4 text-rose-600">- ₹{(cost.value/100000).toFixed(0)}L</div>
                  </div>
                ))}
                
                <div className="border-t my-2 pt-4">
                  <div className="flex items-center text-sm font-bold text-emerald-700">
                    <div className="w-32 text-right mr-4">Net Profit</div>
                    <div className="flex-1 h-8 bg-emerald-100 relative rounded-r overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-emerald-600" style={{width: `${marginPercent}%`}}></div>
                      <div className="absolute inset-y-0 left-2 flex items-center text-white text-xs font-bold">{marginPercent.toFixed(1)}% Margin</div>
                    </div>
                    <div className="w-24 text-right ml-4">₹{(netProfit/100000).toFixed(0)}L</div>
                  </div>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Monthly Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProfit}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                  <RechartsTooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
