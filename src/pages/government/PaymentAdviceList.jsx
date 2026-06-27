import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyPaymentAdvice } from '@/data/paymentAdvice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Landmark } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function PaymentAdviceList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyPaymentAdvice);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Advice No",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
    },
    {
      accessorKey: "saleLetterNo",
      header: "Sale Letter No",
      cell: ({ row }) => <span className="cursor-pointer text-sky-600 hover:underline" onClick={() => navigate(`/government/sale-letters/${row.getValue("saleLetterNo")}`)}>{row.getValue("saleLetterNo")}</span>
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "grossAmount",
      header: "Gross",
      cell: ({ row }) => `₹${row.getValue("grossAmount").toLocaleString()}`
    },
    {
      accessorKey: "netPayable",
      header: "Net Payable",
      cell: ({ row }) => <span className="font-semibold text-emerald-600">₹{row.getValue("netPayable").toLocaleString()}</span>
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
        if (status === 'Completed') variant = "default";
        else if (status === 'Payment Pending') variant = "destructive";
        else if (status === 'Received') variant = "secondary";
        
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
              <DropdownMenuItem onClick={() => navigate(`/government/payments/create?advice=${record.id}`)}>
                <Landmark className="mr-2 h-4 w-4" /> Make Govt Payment
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
      title="Payment Advice"
      description="Manage calculations and payment advice generated from Sale Letters."
      onAdd={() => navigate('/government/payment-advice/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Payment Advice..." />
    </MasterPageLayout>
  );
}
