import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dummyDispatches } from '@/data/dispatches';
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';

// KanBan Board Columns based on Status
const COLUMNS = [
  { id: "Waiting", label: "Waiting / Planned", statuses: ["Planned"] },
  { id: "Loading", label: "At Mine / Loading", statuses: ["Loading", "Loaded"] },
  { id: "Transit", label: "In Transit", statuses: ["Dispatched", "In Transit"] },
  { id: "Unloading", label: "Reached / Unloading", statuses: ["Reached", "Unloaded"] },
];

export default function VehicleTracking() {
  const [data] = useState(dummyDispatches.filter(d => d.status !== 'Closed'));

  const getCardsForColumn = (statuses) => {
    return data.filter(d => statuses.includes(d.status));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehicle Tracking Board</h2>
          <p className="text-muted-foreground">Kanban-style manual tracking for active dispatches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
        {COLUMNS.map(col => {
          const cards = getCardsForColumn(col.statuses);
          return (
            <div key={col.id} className="flex flex-col bg-muted/20 rounded-lg p-4 border h-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{col.label}</h3>
                <Badge variant="secondary">{cards.length}</Badge>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {cards.map(card => (
                  <Card key={card.id} className="cursor-pointer hover:shadow-md transition-shadow border-l-4" style={{borderLeftColor: col.id === 'Transit' ? '#3b82f6' : col.id === 'Loading' ? '#f59e0b' : col.id === 'Unloading' ? '#10b981' : '#94a3b8'}}>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sky-700">{card.truckNumber}</span>
                        <span className="text-xs text-muted-foreground">{card.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="h-4 w-4" /> {card.transporter}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs pt-2 border-t">
                        <div>
                          <span className="text-muted-foreground block">Mine</span>
                          <span className="font-medium">{card.mine}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-muted-foreground block">Dest.</span>
                          <span className="font-medium">{card.destinationParty}</span>
                        </div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <Badge variant="outline">{card.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {cards.length === 0 && (
                  <div className="h-24 flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed rounded">
                    No trucks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
