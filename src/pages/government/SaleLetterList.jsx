import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummySaleLetters } from '@/data/saleLetters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function SaleLetterList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummySaleLetters);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "SL No",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/government/sale-letters/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "mine",
      header: "Mine",
    },
    {
      accessorKey: "quantity",
      header: "Qty (MT)",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amt",
      cell: ({ row }) => `₹${row.getValue("totalAmount").toLocaleString()}`
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => new Date(row.getValue("dueDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Closed' || status === 'Payment Completed') variant = "default";
        else if (status === 'Payment Pending') variant = "destructive";
        
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
              <DropdownMenuItem onClick={() => navigate(`/government/sale-letters/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/government/payment-advice/create?sl=${record.id}`)}>
                <FileText className="mr-2 h-4 w-4" /> Generate Advice
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
      title="Sale Letters"
      description="Manage received Sale Letters from Coal Companies."
      onAdd={() => navigate('/government/sale-letters/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Sale Letters..." />
    </MasterPageLayout>
  );
}
