import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyEmds } from '@/data/emds';
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

export default function EmdList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyEmds);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "EMD No",
      cell: ({ row }) => <span className="font-medium text-sky-600">{row.getValue("id")}</span>
    },
    {
      accessorKey: "auctionNo",
      header: "Auction No",
      cell: ({ row }) => <span className="cursor-pointer hover:underline" onClick={() => navigate(`/auctions/${row.getValue("auctionNo")}`)}>{row.getValue("auctionNo")}</span>
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `₹${row.getValue("amount").toLocaleString()}`
    },
    {
      accessorKey: "bank",
      header: "Bank",
    },
    {
      accessorKey: "paymentDate",
      header: "Payment Date",
      cell: ({ row }) => new Date(row.getValue("paymentDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Paid' || status === 'Adjusted') variant = "default";
        else if (status === 'Refund Pending') variant = "destructive";
        else if (status === 'Pending') variant = "secondary";
        
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
              <DropdownMenuItem onClick={() => alert("View Details for EMD " + record.id)}>
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
      title="EMD Management"
      description="Track and manage Earnest Money Deposits for Auctions."
      onAdd={() => navigate('/auctions/emd/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
          <div className="text-2xl font-bold text-emerald-600">₹{dummyEmds.filter(e => e.status === 'Paid').reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <div className="text-2xl font-bold text-amber-500">₹{dummyEmds.filter(e => e.status === 'Pending').reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Adjusted</div>
          <div className="text-2xl font-bold text-sky-600">₹{dummyEmds.filter(e => e.status === 'Adjusted').reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Refund Pending</div>
          <div className="text-2xl font-bold text-destructive">₹{dummyEmds.filter(e => e.status === 'Refund Pending').reduce((a, b) => a + b.amount, 0).toLocaleString()}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search EMDs..." />
    </MasterPageLayout>
  );
}
