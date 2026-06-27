import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dummyAuctions } from '@/data/auctions';
import { dummyEmds } from '@/data/emds';

const localizer = momentLocalizer(moment);

export default function AuctionCalendar() {
  const auctionEvents = dummyAuctions.map((auction) => ({
    id: auction.id + '_bid',
    title: `Bid Date: ${auction.id}`,
    start: new Date(auction.bidDate),
    end: new Date(auction.bidDate),
    allDay: true,
    resource: auction,
    type: 'Bid'
  }));

  const emdEvents = dummyEmds.map((emd) => ({
    id: emd.id + '_emd',
    title: `EMD Paid: ${emd.auctionNo}`,
    start: new Date(emd.paymentDate),
    end: new Date(emd.paymentDate),
    allDay: true,
    resource: emd,
    type: 'EMD'
  }));

  const events = [...auctionEvents, ...emdEvents];

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.type === 'EMD') {
      backgroundColor = '#10b981'; // Emerald for EMD
    } else if (event.type === 'Bid') {
      backgroundColor = '#f59e0b'; // Amber for Bid
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <h2 className="text-3xl font-bold tracking-tight">Auction Calendar</h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Auction Milestones</CardTitle>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> EMD Dates</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Bid Dates</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={event => alert(`${event.title}\nDate: ${event.start.toLocaleDateString()}`)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
