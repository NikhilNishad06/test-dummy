import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDoAllocations } from '@/data/doAllocations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Box, AlertTriangle, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function AllocationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allocation = dummyDoAllocations.find(d => d.id === id) || dummyDoAllocations[0];
  
  const dispProgress = (allocation.dispatchedQuantity / allocation.allocatedQuantity) * 100;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/sales/allocations')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">DO Allocation Details</h2>
            <p className="text-muted-foreground">{allocation.id} | DO: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/delivery/orders/${allocation.doNumber}`)}>{allocation.doNumber}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Linkage Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Customer</span>
                <p className="font-bold text-lg">{allocation.customer}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Deal Ref</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/deals/${allocation.dealId}/360`)}>{allocation.dealId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Allocation Date</span>
                <p className="font-medium">{new Date(allocation.date).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Current Status</span>
                <div><Badge variant="outline">{allocation.status}</Badge></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Physical Dispatch Progress (Against Allocation)</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="font-medium">Dispatched</span>
                     <span className="text-sky-600 font-bold">{allocation.dispatchedQuantity} / {allocation.allocatedQuantity} MT ({dispProgress.toFixed(1)}%)</span>
                   </div>
                   <Progress value={dispProgress} className="h-4 bg-sky-100" indicatorClassName="bg-sky-500" />
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-center">
                     <div>
                       <div className="text-xs text-muted-foreground">Total Customer Order</div>
                       <div className="text-xl font-bold">{allocation.orderedQuantity} MT</div>
                     </div>
                     <div>
                       <div className="text-xs text-muted-foreground">This Allocation</div>
                       <div className="text-xl font-bold">{allocation.allocatedQuantity} MT</div>
                     </div>
                     <div>
                       <div className="text-xs text-amber-600">Pending Dispatch</div>
                       <div className="text-xl font-bold text-amber-600">{allocation.pendingQuantity} MT</div>
                     </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card className={allocation.pendingQuantity > 0 ? "bg-amber-50/50 border-amber-100" : "bg-emerald-50/50 border-emerald-100"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-muted-foreground flex items-center gap-2">
                {allocation.pendingQuantity > 0 ? <AlertTriangle className="h-4 w-4 text-amber-500"/> : <CheckCircle2 className="h-4 w-4 text-emerald-500"/>} 
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
               {allocation.pendingQuantity > 0 ? (
                 <p className="text-sm">There are still {allocation.pendingQuantity} MT pending to be dispatched against this allocation. Ensure logistics has assigned enough trucks.</p>
               ) : (
                 <p className="text-sm">This allocation has been fully dispatched.</p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
