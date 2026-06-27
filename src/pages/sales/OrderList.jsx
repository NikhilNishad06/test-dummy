import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyCustomerOrders } from '@/data/customerOrders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Link } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyCustomerOrders);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Order Number",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/sales/orders/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("customerName")}</span>
    },
    {
      accessorKey: "dealId",
      header: "Deal Ref",
    },
    {
      accessorKey: "orderedQuantity",
      header: "Qty (MT)",
    },
    {
      accessorKey: "rate",
      header: "Rate (₹)",
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => new Date(row.getValue("orderDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Completed') variant = "default";
        else if (status === 'Order Received' || status === 'Allocation Pending') variant = "secondary";
        else if (status === 'Cancelled') variant = "destructive";
        
        return <Badge variant={variant} className={status === 'Allocated' || status === 'Dispatch Started' || status === 'Partially Delivered' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/sales/orders/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/sales/allocations/create?order=${record.id}`)}>
                <Link className="mr-2 h-4 w-4" /> Allocate DO
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
      title="Customer Orders"
      description="Manage incoming customer orders, pricing, and fulfillment status."
      onAdd={() => navigate('/sales/orders/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Orders..." />
    </MasterPageLayout>
  );
}
