import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, RefreshCw } from 'lucide-react';

export default function MasterPageLayout({ 
  title, 
  description, 
  onAdd, 
  onRefresh, 
  onExport, 
  onImport, 
  children 
}) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-sm md:text-base text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh} title="Refresh Data" className="shrink-0">
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          {onExport && (
            <Button variant="outline" onClick={onExport} className="shrink-0">
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
          {onImport && (
            <Button variant="outline" onClick={onImport} className="shrink-0">
              <Upload className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
          )}
          {onAdd && (
            <Button onClick={onAdd} className="shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Record</span>
              <span className="inline sm:hidden">Add</span>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
