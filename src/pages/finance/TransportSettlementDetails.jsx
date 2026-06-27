import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyTransportSettlements } from '@/data/transportSettlements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Truck, CheckCircle2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TransportSettlementDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const settlement = dummyTransportSettlements.find(d => d.id === id) || dummyTransportSettlements[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/finance/transports')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Transport Settlement Details</h2>
            <p className="text-muted-foreground">{settlement.id} | Transporter: <span className="text-amber-600 font-medium">{settlement.transporter}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Logistics Linkage</CardTitle>
              <Badge variant={settlement.status === 'Paid' ? 'default' : settlement.status === 'Pending' ? 'destructive' : 'outline'}>{settlement.status}</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Truck Number</span>
                <p className="font-bold text-lg">{settlement.truckNumber}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Dispatch Ref</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/dispatch/trucks/${settlement.dispatchId}`)}>{settlement.dispatchId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Deal Reference</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/deals/${settlement.dealId}/360`)}>{settlement.dealId}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Freight Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Freight Rate</div>
                   <div className="font-medium">₹{settlement.freightRate.toLocaleString()} / MT</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Total Freight Amount</div>
                   <div className="font-medium text-lg">₹{settlement.freightAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-amber-700 font-medium">Advance Paid</div>
                   <div className="font-bold text-amber-600 text-lg">- ₹{settlement.advance.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <div className="font-bold text-lg">Balance Due</div>
                   <div className={`text-2xl font-bold ${settlement.balance > 0 ? 'text-rose-600' : 'text-slate-800'}`}>₹{settlement.balance.toLocaleString()}</div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-blue-500" />
                   <span className="text-sm font-medium flex-1">Transport_Bilty.pdf</span>
                 </div>
                 <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-emerald-500" />
                   <span className="text-sm font-medium flex-1">Weighbridge_Slip.pdf</span>
                 </div>
                 <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
