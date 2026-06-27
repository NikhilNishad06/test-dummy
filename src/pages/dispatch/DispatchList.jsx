import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyDispatches } from '@/data/dispatches';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Truck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function DispatchList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyDispatches);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Dispatch ID",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/dispatch/trucks/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "truckNumber",
      header: "Truck No",
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
      accessorKey: "transporter",
      header: "Transporter",
    },
    {
      accessorKey: "loadingDate",
      header: "Loading Date",
      cell: ({ row }) => new Date(row.getValue("loadingDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Closed' || status === 'Unloaded') variant = "default";
        else if (status === 'Planned') variant = "secondary";
        else if (status === 'Loading' || status === 'Loaded') variant = "destructive";
        else if (status === 'In Transit' || status === 'Dispatched') variant = "outline";
        
        return <Badge variant={variant} className={status === 'In Transit' || status === 'Dispatched' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/dispatch/trucks/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/dispatch/weighbridge/create?dispatch=${record.id}`)}>
                <Truck className="mr-2 h-4 w-4" /> Add Weighbridge
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
      title="Truck Dispatches"
      description="Manage individual truck dispatches, loading status, and destination tracking."
      onAdd={() => navigate('/dispatch/trucks/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Trucks..." />
    </MasterPageLayout>
  );
}
