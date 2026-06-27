import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyWeighbridge } from '@/data/weighbridge';
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

export default function WeighbridgeList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyWeighbridge);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Slip Number",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
    },
    {
      accessorKey: "dispatchId",
      header: "Dispatch Ref",
      cell: ({ row }) => <span className="cursor-pointer hover:underline text-sky-600" onClick={() => navigate(`/dispatch/trucks/${row.getValue("dispatchId")}`)}>{row.getValue("dispatchId")}</span>
    },
    {
      accessorKey: "truckNumber",
      header: "Truck",
    },
    {
      accessorKey: "mineWeight",
      header: "Mine Wt.",
      cell: ({ row }) => `${row.getValue("mineWeight")} MT`
    },
    {
      accessorKey: "customerWeight",
      header: "Cust. Wt.",
      cell: ({ row }) => `${row.getValue("customerWeight")} MT`
    },
    {
      accessorKey: "shortage",
      header: "Shortage",
      cell: ({ row }) => {
        const val = row.getValue("shortage");
        return <span className={val > 0 ? "text-destructive font-bold" : "text-emerald-600"}>{val} MT</span>;
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return <Badge variant={status === 'Matched' ? 'default' : 'destructive'}>{status}</Badge>;
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
      title="Weighbridge Records"
      description="Track Mine Weight vs Customer Weight and calculate shortages automatically."
      onAdd={() => navigate('/dispatch/weighbridge/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Records</div>
          <div className="text-2xl font-bold">{dummyWeighbridge.length}</div>
        </div>
        <div className="p-4 rounded border bg-emerald-50/50">
          <div className="text-sm text-emerald-700 mb-1">Matched (No Shortage)</div>
          <div className="text-2xl font-bold text-emerald-700">{dummyWeighbridge.filter(e => e.status === 'Matched').length}</div>
        </div>
        <div className="p-4 rounded border bg-destructive/10">
          <div className="text-sm text-destructive mb-1">Shortage Detected</div>
          <div className="text-2xl font-bold text-destructive">{dummyWeighbridge.filter(e => e.status !== 'Matched').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Shortage Vol.</div>
          <div className="text-2xl font-bold">{dummyWeighbridge.reduce((a, b) => a + b.shortage, 0).toFixed(2)} MT</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Weighbridge records..." />
    </MasterPageLayout>
  );
}
