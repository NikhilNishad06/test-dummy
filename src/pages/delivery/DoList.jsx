import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyDeliveryOrders } from '@/data/deliveryOrders';
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

export default function DoList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyDeliveryOrders);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "DO Number",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/delivery/orders/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "mine",
      header: "Mine",
    },
    {
      accessorKey: "totalQuantity",
      header: "Total Qty",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("totalQuantity")} MT</span>
    },
    {
      accessorKey: "liftedQuantity",
      header: "Lifted Qty",
      cell: ({ row }) => <span className="text-emerald-600">{row.getValue("liftedQuantity")} MT</span>
    },
    {
      accessorKey: "pendingQuantity",
      header: "Pending Qty",
      cell: ({ row }) => <span className="text-amber-600">{row.getValue("pendingQuantity")} MT</span>
    },
    {
      accessorKey: "validTill",
      header: "Valid Till",
      cell: ({ row }) => new Date(row.getValue("validTill")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Completed') variant = "default";
        else if (status === 'Expired' || status === 'Extension Required') variant = "destructive";
        else if (status === 'Active' || status === 'Lifting Started') variant = "secondary";
        
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
              <DropdownMenuItem onClick={() => navigate(`/delivery/orders/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/delivery/lifters/assign?do=${record.id}`)}>
                <Truck className="mr-2 h-4 w-4" /> Assign Lifter
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
      title="Delivery Orders (DO)"
      description="Manage received Delivery Orders, validity periods, and quantity balances."
      onAdd={() => navigate('/delivery/orders/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search DOs..." />
    </MasterPageLayout>
  );
}
