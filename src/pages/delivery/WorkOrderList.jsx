import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyWorkOrders } from '@/data/workOrders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function WorkOrderList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyWorkOrders);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "WO Number",
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
      accessorKey: "mine",
      header: "Mine",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => `${row.getValue("quantity")} MT`
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Completed') variant = "default";
        else if (status === 'Active') variant = "secondary";
        else if (status === 'Cancelled') variant = "destructive";
        
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
              <DropdownMenuItem onClick={() => alert("View Details for WO " + record.id)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
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
      title="Work Orders"
      description="Manage work orders generated for assigned lifters."
      onAdd={() => navigate('/delivery/work-orders/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Work Orders</div>
          <div className="text-2xl font-bold">{dummyWorkOrders.length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <div className="text-2xl font-bold text-sky-600">{dummyWorkOrders.filter(e => e.status === 'Active').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Draft</div>
          <div className="text-2xl font-bold text-amber-500">{dummyWorkOrders.filter(e => e.status === 'Draft').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Completed</div>
          <div className="text-2xl font-bold text-emerald-600">{dummyWorkOrders.filter(e => e.status === 'Completed').length}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Work Orders..." />
    </MasterPageLayout>
  );
}
