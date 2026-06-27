import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDeals } from '@/data/deals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Circle, Clock } from 'lucide-react';

const STAGES = [
  "Deal Created", "Auction", "EMD", "Bid", "Sale Letter", 
  "Payment Advice", "Government Payment", "Application", 
  "Delivery Order", "Lifter", "Dispatch", "Customer Order", 
  "Invoice", "Collection", "Transport", "Commission", 
  "Refund", "Completed"
];

export default function DealTimeline() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const deal = dummyDeals.find(d => d.id === id) || dummyDeals[0];
  const currentStageIndex = STAGES.indexOf(deal.currentStage);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Deal Timeline</h2>
          <p className="text-muted-foreground">{deal.id} - {deal.dealName}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-muted ml-4 space-y-6 pb-4">
            {STAGES.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isCurrent = index === currentStageIndex;
              
              return (
                <div key={stage} className="relative pl-8">
                  <div className="absolute -left-[11px] top-1 bg-background">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 bg-background" />
                    ) : isCurrent ? (
                      <Clock className="h-5 w-5 text-sky-500 bg-background animate-pulse" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground bg-background" />
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className={`text-sm font-semibold ${isCompleted ? 'text-foreground' : isCurrent ? 'text-sky-500' : 'text-muted-foreground'}`}>
                      {stage}
                    </h4>
                    {isCompleted && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Completed on {new Date(new Date(deal.createdDate).getTime() + (index * 86400000)).toLocaleDateString()}
                      </p>
                    )}
                    {isCurrent && (
                      <p className="text-xs text-sky-500 mt-1">
                        Pending Action Required
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
