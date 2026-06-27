import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyCollections } from '@/data/collections';
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

export default function CollectionList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyCollections);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Collection ID",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/finance/collections/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("customer")}</span>
    },
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Ref",
      cell: ({ row }) => <span className="text-muted-foreground hover:underline cursor-pointer" onClick={() => navigate(`/sales/invoices/${row.getValue("invoiceNumber")}`)}>{row.getValue("invoiceNumber")}</span>
    },
    {
      accessorKey: "invoiceAmount",
      header: "Inv Amount",
      cell: ({ row }) => `₹${row.getValue("invoiceAmount").toLocaleString()}`
    },
    {
      accessorKey: "receivedAmount",
      header: "Received",
      cell: ({ row }) => <span className="text-emerald-600 font-bold">₹{row.getValue("receivedAmount").toLocaleString()}</span>
    },
    {
      accessorKey: "balanceAmount",
      header: "Balance",
      cell: ({ row }) => {
        const bal = row.getValue("balanceAmount");
        return <span className={bal > 0 ? "text-amber-600 font-medium" : "text-muted-foreground"}>₹{bal.toLocaleString()}</span>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Received') variant = "default";
        else if (status === 'Pending') variant = "secondary";
        else if (status === 'Overdue') variant = "destructive";
        
        return <Badge variant={variant} className={status === 'Partial' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/finance/collections/${record.id}`)}>
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
      title="Collection Management"
      description="Track inward cash flows against sales invoices."
      onAdd={() => navigate('/finance/collections/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Collections..." />
    </MasterPageLayout>
  );
}
