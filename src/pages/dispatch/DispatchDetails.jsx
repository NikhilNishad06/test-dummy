import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDispatches } from '@/data/dispatches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Upload, Plus, Truck, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DispatchTimeline from './DispatchTimeline';

export default function DispatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = dummyDispatches.find(d => d.id === id) || dummyDispatches[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dispatch/trucks')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Truck Dispatch Details</h2>
            <p className="text-muted-foreground">{dispatch.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${dispatch.dealId}/360`)}>{dispatch.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button onClick={() => navigate(`/dispatch/weighbridge/create?dispatch=${dispatch.id}`)}>
            <Plus className="mr-2 h-4 w-4" /> Add Weighbridge
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logistics Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Truck Number</span>
                <p className="font-bold text-lg">{dispatch.truckNumber}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Transporter</span>
                <p className="font-medium">{dispatch.transporter}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Driver Details</span>
                <p className="font-medium">{dispatch.driverName} ({dispatch.driverMobile})</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Current Status</span>
                <div>
                   <Badge variant="outline" className={dispatch.status === 'In Transit' || dispatch.status === 'Dispatched' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{dispatch.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4"/> Route</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                   <div className="text-xs text-muted-foreground">Loading Point (Mine)</div>
                   <div className="font-medium">{dispatch.mine}</div>
                 </div>
                 <div className="border-l-2 border-dashed ml-2 pl-4 py-2 border-muted-foreground/30"></div>
                 <div>
                   <div className="text-xs text-muted-foreground">Destination</div>
                   <div className="font-medium">{dispatch.destinationParty}</div>
                   <div className="text-sm text-muted-foreground">{dispatch.destinationAddress}</div>
                 </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quantity & Financials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                   <div className="text-xs text-muted-foreground">Est. Quantity</div>
                   <div className="font-medium text-lg">{dispatch.quantity} MT</div>
                   <div className="text-xs text-muted-foreground">Grade: {dispatch.grade}</div>
                 </div>
                 <div className="pt-2 border-t">
                   <div className="text-xs text-muted-foreground">Freight Rate</div>
                   <div className="font-medium">₹{dispatch.freightRate} / MT</div>
                 </div>
                 <div className="pt-2 border-t">
                   <div className="text-xs text-muted-foreground">Estimated Freight Total</div>
                   <div className="font-medium text-xl text-sky-600">₹{dispatch.estimatedFreight.toLocaleString()}</div>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Context</CardTitle>
            </CardHeader>
            <CardContent>
               <DispatchTimeline compact currentStage={dispatch.status} dealDate={dispatch.loadingDate} />
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
                   <span className="text-sm font-medium">Loading_Slip.pdf</span>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-blue-500" />
                   <span className="text-sm font-medium">LR_Copy.jpg</span>
                 </div>
              </div>
              <div className="border border-dashed rounded p-4 text-center cursor-pointer hover:bg-muted/50 text-muted-foreground transition-colors">
                <Upload className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Upload Document</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
