import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyGovtPayments } from '@/data/govtPayments';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Send } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function GovtPaymentList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyGovtPayments);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Payment No",
      cell: ({ row }) => <span className="font-medium text-sky-600">{row.getValue("id")}</span>
    },
    {
      accessorKey: "saleLetterNo",
      header: "SL Ref",
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "netAmount",
      header: "Net Amount",
      cell: ({ row }) => `₹${row.getValue("netAmount").toLocaleString()}`
    },
    {
      accessorKey: "bank",
      header: "Bank",
    },
    {
      accessorKey: "utrNumber",
      header: "UTR No",
    },
    {
      accessorKey: "paymentDate",
      header: "Date",
      cell: ({ row }) => new Date(row.getValue("paymentDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Confirmed') variant = "default";
        else if (status === 'Paid' || status === 'Submitted') variant = "secondary";
        else if (status === 'Pending') variant = "destructive";
        
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
              <DropdownMenuItem onClick={() => alert("View Details for Payment " + record.id)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/government/applications/create?payment=${record.id}`)}>
                <Send className="mr-2 h-4 w-4" /> Submit Application
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
      title="Government Payments"
      description="Track bank payments made against Payment Advice."
      onAdd={() => navigate('/government/payments/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Payments</div>
          <div className="text-2xl font-bold">{dummyGovtPayments.length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Paid Amount</div>
          <div className="text-2xl font-bold text-emerald-600">₹{dummyGovtPayments.filter(e => e.status !== 'Pending').reduce((a, b) => a + b.netAmount, 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Pending Clearance</div>
          <div className="text-2xl font-bold text-amber-500">{dummyGovtPayments.filter(e => e.status === 'Paid' || e.status === 'Submitted').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Confirmed</div>
          <div className="text-2xl font-bold text-sky-600">{dummyGovtPayments.filter(e => e.status === 'Confirmed').length}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Payments..." />
    </MasterPageLayout>
  );
}
