import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyVendorPayments } from '@/data/vendorPayments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function VendorPaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const payment = dummyVendorPayments.find(d => d.id === id) || dummyVendorPayments[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/finance/vendors')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Vendor Payment Details</h2>
            <p className="text-muted-foreground">{payment.id} | Vendor: <span className="text-rose-600 font-medium">{payment.vendor}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Linkage Context</CardTitle>
              <Badge variant={payment.status === 'Paid' ? 'default' : payment.status === 'Pending' ? 'destructive' : 'outline'}>{payment.status}</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Deal Reference</span>
                <p className="font-bold text-lg text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/deals/${payment.dealId}/360`)}>{payment.dealId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Vendor Invoice</span>
                <p className="font-medium">{payment.invoiceReference}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Due Date</span>
                <p className="font-medium text-amber-600">{new Date(payment.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Payment Date</span>
                <p className="font-medium">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'Pending'}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Financial Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Base Invoice Amount</div>
                   <div className="font-medium text-lg">₹{payment.amount.toLocaleString()}</div>
                </div>
                {payment.interestAmount > 0 && (
                  <div className="flex justify-between items-center py-2 border-b">
                     <div className="text-rose-700 font-medium flex items-center gap-2"><Clock className="h-4 w-4"/> Interest ({payment.interestDays} Days)</div>
                     <div className="font-bold text-rose-600">₹{payment.interestAmount.toLocaleString()}</div>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-emerald-700 font-medium">Amount Paid</div>
                   <div className="font-bold text-emerald-600 text-lg">- ₹{payment.paidAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <div className="font-bold text-lg">Outstanding Balance</div>
                   <div className={`text-2xl font-bold ${payment.balance > 0 ? 'text-rose-600' : 'text-slate-800'}`}>₹{payment.balance.toLocaleString()}</div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card className={payment.balance > 0 ? "bg-rose-50/50 border-rose-100" : "bg-emerald-50/50 border-emerald-100"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground flex items-center gap-2">
                {payment.balance > 0 ? <AlertTriangle className="h-4 w-4 text-rose-500"/> : <CheckCircle2 className="h-4 w-4 text-emerald-500"/>} 
                Payable Status
              </CardTitle>
            </CardHeader>
            <CardContent>
               {payment.balance > 0 ? (
                 <div className="space-y-2">
                   <p className="text-sm">There is an outstanding payable of <strong>₹{payment.balance.toLocaleString()}</strong> to {payment.vendor}.</p>
                   {payment.interestDays > 0 && <p className="text-xs text-rose-600">Note: Delayed by {payment.interestDays} days. Penalty active.</p>}
                 </div>
               ) : (
                 <p className="text-sm">Vendor has been fully paid for this invoice.</p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
