import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyDeals } from '@/data/deals';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Trash2, Copy, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

export default function DealList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyDeals);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Deal ID",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
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
      accessorKey: "expectedProfit",
      header: "Exp. Profit",
      cell: ({ row }) => `₹${row.getValue("expectedProfit").toLocaleString()}`
    },
    {
      accessorKey: "currentStage",
      header: "Stage",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("currentStage")}</Badge>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === 'Closed' ? 'default' : (status === 'Active' ? 'secondary' : 'destructive')}>
            {status}
          </Badge>
        );
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
              <DropdownMenuItem onClick={() => navigate(`/deals/${record.id}/360`)}>
                <Eye className="mr-2 h-4 w-4" /> 360 View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/deals/${record.id}`)}>
                <Edit className="mr-2 h-4 w-4" /> Deal Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Duplicate Deal ID: " + record.id)}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
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
      title="Deal List"
      description="Manage and track all coal deals."
      onAdd={() => navigate('/deals/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Deals..." />
    </MasterPageLayout>
  );
}
