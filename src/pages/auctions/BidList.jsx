import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyBids } from '@/data/bids';
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

export default function BidList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyBids);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Bid No",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
    },
    {
      accessorKey: "auctionNo",
      header: "Auction No",
      cell: ({ row }) => <span className="cursor-pointer text-sky-600 hover:underline" onClick={() => navigate(`/auctions/${row.getValue("auctionNo")}`)}>{row.getValue("auctionNo")}</span>
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
    },
    {
      accessorKey: "bidRate",
      header: "Bid Rate",
      cell: ({ row }) => `₹${row.getValue("bidRate").toLocaleString()}`
    },
    {
      accessorKey: "expectedMargin",
      header: "Exp. Margin",
      cell: ({ row }) => `₹${row.getValue("expectedMargin").toLocaleString()}`
    },
    {
      accessorKey: "result",
      header: "Result",
      cell: ({ row }) => {
        const result = row.getValue("result");
        let variant = "outline";
        if (result === 'Won') variant = "default";
        else if (result === 'Lost') variant = "destructive";
        else if (result === 'Pending') variant = "secondary";
        
        return <Badge variant={variant}>{result}</Badge>;
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
              <DropdownMenuItem onClick={() => alert("View Details for Bid " + record.id)}>
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
      title="Bid Management"
      description="Track submitted bids, results, and expected profitability."
      onAdd={() => navigate('/auctions/bids/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Bids</div>
          <div className="text-2xl font-bold">{dummyBids.length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Won Bids</div>
          <div className="text-2xl font-bold text-emerald-600">{dummyBids.filter(e => e.result === 'Won').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Lost Bids</div>
          <div className="text-2xl font-bold text-destructive">{dummyBids.filter(e => e.result === 'Lost').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Pending Results</div>
          <div className="text-2xl font-bold text-amber-500">{dummyBids.filter(e => e.result === 'Pending').length}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Bids..." />
    </MasterPageLayout>
  );
}
