import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

const STAGES = [
  "Invoice Generated",
  "Collection Pending",
  "Collection Received",
  "Vendor Payment",
  "Transport Payment",
  "Commission Payment",
  "Finance Closed"
];

const statusMap = {
  "Invoice Generated": "Invoice Generated",
  "Collection Pending": "Collection Pending",
  "Collection Received": "Collection Received",
  "Vendor Payment": "Vendor Payment",
  "Transport Payment": "Transport Payment",
  "Commission Payment": "Commission Payment",
  "Finance Closed": "Finance Closed"
};

export default function FinanceTimeline({ compact = false, currentStage = "Invoice Generated" }) {
  const mappedStage = statusMap[currentStage] || "Invoice Generated";
  const currentStageIndex = STAGES.indexOf(mappedStage);

  const content = (
    <div className="relative border-l border-muted ml-4 space-y-4 pb-4">
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
              {isCompleted && !compact && (
                <p className="text-xs text-muted-foreground mt-1">
                  Completed
                </p>
              )}
              {isCurrent && !compact && (
                <p className="text-xs text-sky-500 mt-1">
                  Current Status
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance Timeline</h2>
          <p className="text-muted-foreground">Standardized visualization of the complete financial lifecycle.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
}
