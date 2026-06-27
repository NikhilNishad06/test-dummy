import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyAuctions } from '@/data/auctions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function AuctionList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyAuctions);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Auction No",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/auctions/${row.getValue("id")}`)}>{row.getValue("id")}</span>
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
      accessorKey: "coalGrade",
      header: "Grade",
    },
    {
      accessorKey: "quantity",
      header: "Qty (MT)",
    },
    {
      accessorKey: "bidDate",
      header: "Bid Date",
      cell: ({ row }) => new Date(row.getValue("bidDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Won') variant = "default";
        else if (status === 'Lost' || status === 'Cancelled') variant = "destructive";
        else if (status === 'EMD Pending') variant = "secondary";
        
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
              <DropdownMenuItem onClick={() => navigate(`/auctions/${record.id}`)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Edit " + record.id)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/auctions/bids/create?auctionId=${record.id}`)}>
                <Plus className="mr-2 h-4 w-4" /> Create Bid
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
      title="Auction Notifications"
      description="Manage all incoming auction notifications and their statuses."
      onAdd={() => navigate('/auctions/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Auctions..." />
    </MasterPageLayout>
  );
}
