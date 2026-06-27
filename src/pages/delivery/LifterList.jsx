import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyLifterAssignments } from '@/data/lifterAssignments';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, ClipboardList } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function LifterList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyLifterAssignments);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Assignment No",
      cell: ({ row }) => <span className="font-medium text-sky-600">{row.getValue("id")}</span>
    },
    {
      accessorKey: "doNumber",
      header: "DO Number",
      cell: ({ row }) => <span className="cursor-pointer hover:underline text-muted-foreground" onClick={() => navigate(`/delivery/orders/${row.getValue("doNumber")}`)}>{row.getValue("doNumber")}</span>
    },
    {
      accessorKey: "lifter",
      header: "Lifter",
    },
    {
      accessorKey: "assignedQuantity",
      header: "Assigned Qty",
      cell: ({ row }) => `${row.getValue("assignedQuantity")} MT`
    },
    {
      accessorKey: "pendingQuantity",
      header: "Pending Qty",
      cell: ({ row }) => <span className="text-amber-600 font-medium">{row.getValue("pendingQuantity")} MT</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Completed') variant = "default";
        else if (status === 'Active' || status === 'Assigned') variant = "secondary";
        else if (status === 'Pending') variant = "destructive";
        
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => alert("View Details for " + record.id)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/delivery/work-orders/create?assignment=${record.id}`)}>
                <ClipboardList className="mr-2 h-4 w-4" /> Create Work Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Edit " + record.id)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteRecord(record.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  return (
    <MasterPageLayout
      title="Lifter Management"
      description="Track lifters assigned to specific Delivery Orders and their performance."
      onAdd={() => navigate('/delivery/lifters/assign')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Assignments</div>
          <div className="text-2xl font-bold">{dummyLifterAssignments.length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Active Lifters</div>
          <div className="text-2xl font-bold text-sky-600">{dummyLifterAssignments.filter(e => e.status === 'Active').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Assigned Qty</div>
          <div className="text-2xl font-bold">{dummyLifterAssignments.reduce((a, b) => a + b.assignedQuantity, 0).toLocaleString()} MT</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Completed Assignments</div>
          <div className="text-2xl font-bold text-emerald-600">{dummyLifterAssignments.filter(e => e.status === 'Completed').length}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Assignments..." />
    </MasterPageLayout>
  );
}
