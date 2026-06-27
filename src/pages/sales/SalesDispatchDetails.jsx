import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummySalesDispatches } from '@/data/salesDispatches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SalesDispatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = dummySalesDispatches.find(d => d.id === id) || dummySalesDispatches[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/sales/dispatches')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sales Dispatch Details</h2>
            <p className="text-muted-foreground">{dispatch.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${dispatch.dealId}/360`)}>{dispatch.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button onClick={() => navigate(`/sales/invoices/create?dispatch=${dispatch.id}`)}>
            <FileText className="mr-2 h-4 w-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Commercial Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Customer</span>
                  <p className="font-bold text-lg">{dispatch.customer}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Quantity Delivered</span>
                  <p className="font-bold text-lg text-emerald-600">{dispatch.quantity} MT</p>
                </div>
              </div>
              <div className="pt-4 border-t grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-muted-foreground">DO Reference</span>
                  <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/delivery/orders/${dispatch.doNumber}`)}>{dispatch.doNumber}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Current Status</span>
                  <div><Badge variant="outline">{dispatch.status}</Badge></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logistics Linkage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Truck Dispatch Ref</span>
                  <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/dispatch/trucks/${dispatch.truckDispatchId}`)}>{dispatch.truckDispatchId}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Truck Number</span>
                  <p className="font-bold">{dispatch.truckNumber}</p>
                </div>
              </div>
              <div className="pt-4 border-t grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Dispatch Date</span>
                  <p className="font-medium">{new Date(dispatch.dispatchDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Est. Delivery Date</span>
                  <p className="font-medium text-amber-600">{new Date(dispatch.deliveryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Delivery Proof Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="flex items-center gap-2 p-3 border rounded w-64 hover:bg-muted cursor-pointer transition-colors">
                 <FileText className="h-5 w-5 text-blue-500" />
                 <span className="text-sm font-medium flex-1">Customer_Challan.pdf</span>
                 <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 p-3 border rounded w-64 hover:bg-muted cursor-pointer transition-colors text-muted-foreground border-dashed">
                 <FileText className="h-5 w-5" />
                 <span className="text-sm font-medium flex-1 text-center">Upload E-Way Bill</span>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
