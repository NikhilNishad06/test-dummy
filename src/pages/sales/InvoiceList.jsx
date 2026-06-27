import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyInvoices } from '@/data/invoices';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function InvoiceList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyInvoices);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Invoice Number",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/sales/invoices/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("customer")}</span>
    },
    {
      accessorKey: "dispatchId",
      header: "Dispatch Ref",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => `${row.getValue("quantity")} MT`
    },
    {
      accessorKey: "totalAmount",
      header: "Amount (₹)",
      cell: ({ row }) => <span className="font-bold">₹{row.getValue("totalAmount").toLocaleString()}</span>
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
        if (status === 'Paid') variant = "default";
        else if (status === 'Draft' || status === 'Generated') variant = "secondary";
        else if (status === 'Overdue') variant = "destructive";
        
        return <Badge variant={variant} className={status === 'Sent' || status === 'Partial' ? 'border-amber-500 text-amber-700 bg-amber-50' : ''}>{status}</Badge>;
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
              <DropdownMenuItem onClick={() => navigate(`/sales/invoices/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Download PDF")}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
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
      title="Invoice Management"
      description="Manage sales invoices, track payments, and follow up on overdue bills."
      onAdd={() => navigate('/sales/invoices/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Invoices..." />
    </MasterPageLayout>
  );
}
