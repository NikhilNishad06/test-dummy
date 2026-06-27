import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

const STAGES = [
  "Work Order",
  "Truck Assigned",
  "Loading Started",
  "Truck Loaded",
  "Dispatch Started",
  "In Transit",
  "Reached Customer",
  "Unloading",
  "Completed",
  "Closed"
];

// Mapping dummy status values to the timeline stages
const statusMap = {
  "Planned": "Truck Assigned",
  "Loading": "Loading Started",
  "Loaded": "Truck Loaded",
  "Dispatched": "Dispatch Started",
  "In Transit": "In Transit",
  "Reached": "Reached Customer",
  "Unloaded": "Unloading",
  "Closed": "Closed"
};

export default function DispatchTimeline({ compact = false, currentStage = "Planned", dealDate }) {
  const mappedStage = statusMap[currentStage] || "Truck Assigned";
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
              {isCompleted && !compact && dealDate && (
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
          <h2 className="text-3xl font-bold tracking-tight">Dispatch Timeline</h2>
          <p className="text-muted-foreground">Standardized visualization of truck movement.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workflow Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
}
