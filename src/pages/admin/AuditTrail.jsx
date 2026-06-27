import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { dummyAudit } from '@/data/audit';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export default function AuditTrail() {
  
  const columns = [
    {
      accessorKey: "id",
      header: "Audit ID",
      cell: ({ row }) => <span className="text-muted-foreground text-xs font-mono">{row.getValue("id")}</span>
    },
    {
      accessorKey: "date",
      header: "Timestamp",
      cell: ({ row }) => <span className="font-medium whitespace-nowrap">{new Date(row.getValue("date")).toLocaleString()}</span>
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <span className="font-semibold text-sky-700">{row.getValue("user")}</span>
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ row }) => <Badge variant="secondary">{row.getValue("module")}</Badge>
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action");
        return <span className={`font-bold ${action === 'Delete' ? 'text-rose-600' : action === 'Create' ? 'text-emerald-600' : 'text-slate-700'}`}>{action}</span>
      }
    },
    {
      accessorKey: "record",
      header: "Affected Record",
    },
    {
      accessorKey: "ipAddress",
      header: "IP Address",
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("ipAddress")}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge variant={status === 'Success' ? 'default' : 'destructive'} className={status === 'Success' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200' : ''}>{status}</Badge>;
      }
    }
  ];

  return (
    <MasterPageLayout
      title="System Audit Trail"
      description="Immutable log of all user activities and system events."
      onRefresh={() => {}}
      onExport={() => alert("Exported Audit Logs")}
    >
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-md mb-4 flex items-center gap-3 text-rose-800">
        <Shield className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">Audit logs are tamper-proof and retained indefinitely for compliance purposes.</p>
      </div>
      {/* Intentionally removing the Add button for Audit Trail */}
      <DataTable columns={columns} data={dummyAudit} searchPlaceholder="Search Audit Logs..." />
    </MasterPageLayout>
  );
}
