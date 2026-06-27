import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDeals } from '@/data/deals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Activity, FileText, CheckCircle2 } from 'lucide-react';

export default function Deal360View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deal = dummyDeals.find(d => d.id === id) || dummyDeals[0];

  const modules = [
    { title: "Auction", desc: "View auction bids & approvals" },
    { title: "EMD", desc: "Earnest money deposits" },
    { title: "Bid", desc: "Bidding history & details" },
    { title: "Sale Letter", desc: "Generated sale letters" },
    { title: "Govt. Payment", desc: "Payments to government" },
    { title: "Delivery Order", desc: "DO tracking & expiry" },
    { title: "Dispatch", desc: "Loading & dispatch details" },
    { title: "Invoice", desc: "Generated invoices" },
    { title: "Collection", desc: "Customer payments" },
    { title: "Transport", desc: "Transporter assignment" },
    { title: "Commission", desc: "Broker commissions" },
    { title: "Refund", desc: "EMD Refunds" },
    { title: "Profitability", desc: "P&L Analysis" }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/deals/list')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">360° Deal View</h2>
          <p className="text-muted-foreground">{deal.id} - {deal.dealName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Core Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Deal Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Stage Progress</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Stage</span>
                <span className="font-semibold text-sky-600">{deal.currentStage}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded bg-amber-50 text-amber-800 text-sm border border-amber-200">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>DO Expiry approaching in 3 days.</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded bg-sky-50 text-sky-800 text-sm border border-sky-200">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Payment Advice received.</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Future Modules Grid */}
        <div className="lg:col-span-3">
          <Card className="h-full bg-muted/10 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Lifecycle Modules
              </CardTitle>
              <CardDescription>
                These modules are interconnected via this Deal ID. Click to navigate (future implementation).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {modules.map(mod => (
                  <Card key={mod.title} className="hover:border-primary/50 cursor-pointer transition-colors shadow-sm group">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                      <FileText className="h-6 w-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                      <h4 className="font-medium text-sm leading-tight">{mod.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 hidden md:block">{mod.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
