import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dummyNotifications } from '@/data/notifications';
import { Bell, AlertTriangle, Info, CheckCircle2, Trash2 } from 'lucide-react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const getIcon = (category, priority) => {
    if (priority === 'High') return <AlertTriangle className="h-5 w-5 text-rose-500" />;
    if (category.includes('Payment') || category.includes('Collection')) return <IndianRupee className="h-5 w-5 text-emerald-500" />;
    return <Info className="h-5 w-5 text-sky-500" />;
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Center</h2>
          <p className="text-muted-foreground">Stay updated on alerts, deadlines, and system events.</p>
        </div>
        <div className="space-x-2">
           <Button variant="outline" onClick={markAllRead}><CheckCircle2 className="mr-2 h-4 w-4" /> Mark all as read</Button>
           <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-muted text-foreground cursor-pointer hover:bg-muted/80">All</Badge>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-sky-100 text-sky-700 cursor-pointer hover:bg-sky-200">Unread ({unreadCount})</Badge>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-rose-100 text-rose-700 cursor-pointer hover:bg-rose-200">High Priority</Badge>
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {notifications.map(notif => (
            <div key={notif.id} className={`p-4 flex gap-4 transition-colors hover:bg-muted/30 ${notif.read ? 'opacity-70' : 'bg-sky-50/20'}`}>
               <div className="mt-1 shrink-0">
                 {notif.priority === 'High' ? <AlertTriangle className="h-5 w-5 text-rose-500" /> : <Info className="h-5 w-5 text-sky-500" />}
               </div>
               <div className="flex-1 space-y-1">
                 <div className="flex items-center justify-between">
                   <p className={`text-sm font-medium ${notif.read ? 'text-foreground' : 'text-foreground font-bold'}`}>
                     {notif.category}
                   </p>
                   <span className="text-xs text-muted-foreground">
                     {new Date(notif.time).toLocaleString()}
                   </span>
                 </div>
                 <p className="text-sm text-muted-foreground">{notif.message}</p>
                 {notif.priority === 'High' && <Badge variant="destructive" className="mt-2 text-[10px]">High Priority</Badge>}
               </div>
               {!notif.read && (
                 <div className="shrink-0 flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                 </div>
               )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
