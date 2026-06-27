import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dummyDeals } from '@/data/deals';

const localizer = momentLocalizer(moment);

export default function DealCalendar() {
  const events = dummyDeals.map((deal, i) => {
    const baseDate = new Date();
    const dayOffset = (i % 15) - 7;
    const start = new Date(baseDate.setDate(baseDate.getDate() + dayOffset));
    const end = new Date(start);
    
    return {
      id: deal.id,
      title: `${deal.id} - ${['DO Expiry', 'Payment Due', 'Delivery', 'Bid Date'][i % 4]}`,
      start,
      end,
      allDay: true,
      resource: deal,
    };
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Deal Calendar</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={event => alert(event.title)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
