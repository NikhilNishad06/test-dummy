import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCommissions } from '@/data/commissions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CommissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const commission = dummyCommissions.find(d => d.id === id) || dummyCommissions[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/finance/commissions')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Commission Details</h2>
            <p className="text-muted-foreground">{commission.id} | Broker: <span className="text-purple-600 font-medium">{commission.broker}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Deal Linkage</CardTitle>
              <Badge variant={commission.status === 'Paid' ? 'default' : commission.status === 'Pending' ? 'destructive' : 'outline'}>{commission.status}</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Deal Reference</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/deals/${commission.dealId}/360`)}>{commission.dealId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Commission Basis</span>
                <p className="font-medium">{commission.basis}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Calculation Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {commission.basis === 'Per MT' && (
                  <div className="flex justify-between items-center py-2 border-b">
                     <div className="text-muted-foreground">Rate: ₹{commission.rate}/MT × {commission.quantity} MT</div>
                     <div className="font-medium text-lg">₹{commission.amount.toLocaleString()}</div>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Total Commission Amount</div>
                   <div className="font-medium text-lg">₹{commission.amount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-emerald-700 font-medium">Amount Paid</div>
                   <div className="font-bold text-emerald-600 text-lg">- ₹{commission.paidAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <div className="font-bold text-lg">Balance Due</div>
                   <div className={`text-2xl font-bold ${commission.balance > 0 ? 'text-purple-600' : 'text-slate-800'}`}>₹{commission.balance.toLocaleString()}</div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {commission.balance === 0 ? (
                 <div className="flex items-center gap-2 text-emerald-600 font-medium">
                   <CheckCircle2 className="h-5 w-5" /> Fully Paid
                 </div>
               ) : (
                 <div className="text-amber-600 font-medium">
                   Pending Balance: ₹{commission.balance.toLocaleString()}
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
