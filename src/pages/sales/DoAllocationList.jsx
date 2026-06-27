import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyDoAllocations } from '@/data/doAllocations';
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

export default function DoAllocationList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyDoAllocations);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Allocation ID",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/sales/allocations/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "doNumber",
      header: "DO Number",
    },
    {
      accessorKey: "allocatedQuantity",
      header: "Allocated",
      cell: ({ row }) => `${row.getValue("allocatedQuantity")} MT`
    },
    {
      accessorKey: "dispatchedQuantity",
      header: "Dispatched",
      cell: ({ row }) => <span className="text-sky-600 font-semibold">{row.getValue("dispatchedQuantity")} MT</span>
    },
    {
      accessorKey: "pendingQuantity",
      header: "Pending",
      cell: ({ row }) => <span className="text-amber-600 font-semibold">{row.getValue("pendingQuantity")} MT</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Completed') variant = "default";
        else if (status === 'Pending') variant = "secondary";
        else if (status === 'Partial') variant = "destructive";
        
        return <Badge variant={variant} className={status === 'Allocated' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/sales/allocations/${record.id}`)}>
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
      title="DO Allocations"
      description="Map available DO quantities to customer orders for dispatch."
      onAdd={() => navigate('/sales/allocations/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Allocations..." />
    </MasterPageLayout>
  );
}
