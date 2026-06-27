import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, Upload, Plus, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DeliveryTimeline from './DeliveryTimeline';

export default function DoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dOrder = dummyDeliveryOrders.find(d => d.id === id) || dummyDeliveryOrders[0];
  const progress = (dOrder.liftedQuantity / dOrder.totalQuantity) * 100;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/delivery/orders')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Delivery Order Details</h2>
            <p className="text-muted-foreground">{dOrder.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${dOrder.dealId}/360`)}>{dOrder.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button onClick={() => navigate(`/delivery/lifters/assign?do=${dOrder.id}`)}>
            <Truck className="mr-2 h-4 w-4" /> Assign Lifter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Firm</span>
                <p className="font-medium">{dOrder.firm}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Company & Mine</span>
                <p className="font-medium">{dOrder.coalCompany} - {dOrder.mine}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">DO Date</span>
                <p className="font-medium">{new Date(dOrder.doDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">{dOrder.status}</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Validity</span>
                <p className="font-medium">{new Date(dOrder.validFrom).toLocaleDateString()} to {new Date(dOrder.validTill).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Quantity Balance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-3 gap-4 text-center">
                 <div className="p-4 bg-muted/20 rounded border">
                   <div className="text-sm text-muted-foreground mb-1">Total Quantity</div>
                   <div className="text-2xl font-bold">{dOrder.totalQuantity} MT</div>
                 </div>
                 <div className="p-4 bg-emerald-50/50 border-emerald-100 rounded border">
                   <div className="text-sm text-emerald-700 mb-1">Lifted Quantity</div>
                   <div className="text-2xl font-bold text-emerald-700">{dOrder.liftedQuantity} MT</div>
                 </div>
                 <div className="p-4 bg-amber-50/50 border-amber-100 rounded border">
                   <div className="text-sm text-amber-700 mb-1">Pending Quantity</div>
                   <div className="text-2xl font-bold text-amber-700">{dOrder.pendingQuantity} MT</div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-medium">
                   <span>Lifting Progress</span>
                   <span>{progress.toFixed(1)}%</span>
                 </div>
                 <Progress value={progress} className="h-3" />
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Context</CardTitle>
            </CardHeader>
            <CardContent>
               <DeliveryTimeline compact currentStage="Delivery Order" dealDate={dOrder.doDate} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-red-500" />
                   <span className="text-sm font-medium">DO_Copy.pdf</span>
                 </div>
              </div>
              <div className="border border-dashed rounded p-4 text-center cursor-pointer hover:bg-muted/50 text-muted-foreground transition-colors">
                <Upload className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Upload Signed DO</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
