import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCustomerOrders } from '@/data/customerOrders';
import { dummyDoAllocations } from '@/data/doAllocations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Box, Link, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SalesTimeline from './SalesTimeline';
import { Progress } from '@/components/ui/progress';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = dummyCustomerOrders.find(d => d.id === id) || dummyCustomerOrders[0];
  const allocations = dummyDoAllocations.filter(a => a.customer === order.customerName);
  
  const totalAllocated = allocations.reduce((a, b) => a + b.allocatedQuantity, 0);
  const totalDispatched = allocations.reduce((a, b) => a + b.dispatchedQuantity, 0);

  const allocProgress = (totalAllocated / order.orderedQuantity) * 100;
  const dispProgress = (totalDispatched / order.orderedQuantity) * 100;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/sales/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Customer Order Details</h2>
            <p className="text-muted-foreground">{order.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${order.dealId}/360`)}>{order.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button onClick={() => navigate(`/sales/allocations/create?order=${order.id}`)}>
            <Link className="mr-2 h-4 w-4" /> Allocate DO
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commercial Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Customer Name</span>
                <p className="font-bold text-lg">{order.customerName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Firm</span>
                <p className="font-medium">{order.firm}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Order Date</span>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Current Status</span>
                <div><Badge variant="outline">{order.status}</Badge></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Fulfillment Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="font-medium">DO Allocation Progress</span>
                     <span className="text-muted-foreground">{totalAllocated} / {order.orderedQuantity} MT ({allocProgress.toFixed(1)}%)</span>
                   </div>
                   <Progress value={allocProgress} className="h-2 bg-muted" />
                </div>
                <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="font-medium">Dispatch Progress</span>
                     <span className="text-sky-600 font-bold">{totalDispatched} / {order.orderedQuantity} MT ({dispProgress.toFixed(1)}%)</span>
                   </div>
                   <Progress value={dispProgress} className="h-2 bg-sky-100" />
                </div>
             </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Order Valuation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                   <div className="text-xs text-muted-foreground">Rate</div>
                   <div className="font-medium">₹{order.rate} / MT</div>
                 </div>
                 <div className="pt-2 border-t">
                   <div className="text-xs text-muted-foreground">Total Expected Value (Exc. Tax)</div>
                   <div className="font-bold text-xl text-emerald-600">₹{(order.orderedQuantity * order.rate).toLocaleString()}</div>
                 </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Logistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                   <div className="text-xs text-muted-foreground">Delivery Location</div>
                   <div className="font-medium">{order.deliveryLocation}</div>
                 </div>
                 <div>
                   <div className="text-xs text-muted-foreground">Target Date</div>
                   <div className="font-medium text-amber-600">{new Date(order.deliveryDate).toLocaleDateString()}</div>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Timeline</CardTitle>
            </CardHeader>
            <CardContent>
               <SalesTimeline compact currentStage={order.status} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-red-500" />
                   <span className="text-sm font-medium">Purchase_Order.pdf</span>
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
