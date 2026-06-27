import React, { useState } from 'react';
import { dummyTasks } from '@/data/tasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TaskManagement() {
  const [tasks, setTasks] = useState(dummyTasks);
  
  const columns = ["To Do", "In Progress", "Review", "Completed"];

  const pendingCount = tasks.filter(t => t.status !== 'Completed').length;
  const overdueCount = tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date()).length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2 mb-2 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
          <p className="text-muted-foreground">Manage ERP workflow tasks and assigned actions.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Create Task</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4 shrink-0">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
              <h3 className="text-2xl font-bold">{pendingCount}</h3>
            </div>
            <Clock className="h-8 w-8 text-sky-500 opacity-20" />
          </CardContent>
        </Card>
        <Card className="bg-rose-50 border-rose-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-700">Overdue Tasks</p>
              <h3 className="text-2xl font-bold text-rose-700">{overdueCount}</h3>
            </div>
            <AlertCircle className="h-8 w-8 text-rose-500 opacity-20" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Completed</p>
              <h3 className="text-2xl font-bold text-emerald-600">{completedCount}</h3>
            </div>
            <CheckCircle2 className="h-8 w-8 text-emerald-500 opacity-20" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700">Today's Tasks</p>
              <h3 className="text-2xl font-bold text-indigo-600">4</h3>
            </div>
            <Calendar className="h-8 w-8 text-indigo-500 opacity-20" />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex gap-4 min-h-0 overflow-x-auto pb-4">
        {columns.map(col => (
          <Card key={col} className="w-80 shrink-0 flex flex-col bg-slate-50/50">
            <CardHeader className="py-3 border-b bg-muted/30">
               <CardTitle className="text-sm font-semibold flex items-center justify-between">
                 {col}
                 <Badge variant="secondary">{tasks.filter(t => t.status === col).length}</Badge>
               </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-3 overflow-auto space-y-3">
              {tasks.filter(t => t.status === col).map(task => {
                const isOverdue = new Date(task.dueDate) < new Date() && col !== 'Completed';
                return (
                  <div key={task.id} className="bg-white p-3 rounded-md border shadow-sm cursor-pointer hover:border-sky-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                       <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'} className="text-[10px]">
                         {task.priority}
                       </Badge>
                       <span className="text-[10px] text-muted-foreground font-medium">{task.id}</span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1 leading-tight">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center justify-between text-[11px] border-t pt-2 mt-2">
                       <span className="font-medium text-sky-600">{task.dealId}</span>
                       <span className={`flex items-center gap-1 ${isOverdue ? 'text-rose-600 font-bold' : 'text-muted-foreground'}`}>
                         <Calendar className="h-3 w-3" />
                         {new Date(task.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                       </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
