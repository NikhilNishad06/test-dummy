import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummySalesDispatches } from '@/data/salesDispatches';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function SalesDispatchList() {
  const { data, refresh } = useDummyCRUD(dummySalesDispatches);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Sales Dispatch Ref",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/sales/dispatches/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("customer")}</span>
    },
    {
      accessorKey: "truckDispatchId",
      header: "Truck Ref",
      cell: ({ row }) => <span className="text-muted-foreground hover:underline cursor-pointer" onClick={() => navigate(`/dispatch/trucks/${row.getValue("truckDispatchId")}`)}>{row.getValue("truckDispatchId")}</span>
    },
    {
      accessorKey: "truckNumber",
      header: "Truck No",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => `${row.getValue("quantity")} MT`
    },
    {
      accessorKey: "dispatchDate",
      header: "Dispatch Date",
      cell: ({ row }) => new Date(row.getValue("dispatchDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Delivered' || status === 'Closed') variant = "default";
        else if (status === 'Ready') variant = "secondary";
        else if (status === 'Dispatched' || status === 'In Transit') variant = "outline";
        
        return <Badge variant={variant} className={status === 'Dispatched' || status === 'In Transit' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/sales/dispatches/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/sales/invoices/create?dispatch=${record.id}`)}>
                <FileText className="mr-2 h-4 w-4" /> Generate Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  return (
    <MasterPageLayout
      title="Sales Dispatches"
      description="Bridge logistics truck dispatches with commercial delivery tracking."
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      {/* Create button hidden as Sales Dispatch is typically auto-generated upon Truck Dispatch completion in a real ERP */}
      <DataTable columns={columns} data={data} searchPlaceholder="Search Sales Dispatches..." />
    </MasterPageLayout>
  );
}
