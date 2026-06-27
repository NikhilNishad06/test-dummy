import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyApplications } from '@/data/applications';
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

export default function ApplicationList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyApplications);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "App No",
      cell: ({ row }) => <span className="font-medium text-sky-600">{row.getValue("id")}</span>
    },
    {
      accessorKey: "dealId",
      header: "Deal ID",
      cell: ({ row }) => <span className="cursor-pointer hover:underline text-muted-foreground" onClick={() => navigate(`/deals/${row.getValue("dealId")}/360`)}>{row.getValue("dealId")}</span>
    },
    {
      accessorKey: "firm",
      header: "Firm",
    },
    {
      accessorKey: "officeName",
      header: "Office",
    },
    {
      accessorKey: "submittedBy",
      header: "Submitted By",
    },
    {
      accessorKey: "applicationDate",
      header: "Date",
      cell: ({ row }) => new Date(row.getValue("applicationDate")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Approved') variant = "default";
        else if (status === 'Submitted' || status === 'Receipt Received') variant = "secondary";
        else if (status === 'Query Raised') variant = "destructive";
        
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
              <DropdownMenuItem onClick={() => alert("View Details for App " + record.id)}>
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
      title="Application Submissions"
      description="Track the physical/online submission of documents to the government office."
      onAdd={() => navigate('/government/applications/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Total Submissions</div>
          <div className="text-2xl font-bold">{dummyApplications.length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Approved for DO</div>
          <div className="text-2xl font-bold text-emerald-600">{dummyApplications.filter(e => e.status === 'Approved').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Queries Raised</div>
          <div className="text-2xl font-bold text-destructive">{dummyApplications.filter(e => e.status === 'Query Raised').length}</div>
        </div>
        <div className="p-4 rounded border bg-muted/20">
          <div className="text-sm text-muted-foreground mb-1">Processing</div>
          <div className="text-2xl font-bold text-amber-500">{dummyApplications.filter(e => e.status === 'Submitted' || e.status === 'Receipt Received').length}</div>
        </div>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder="Search Applications..." />
    </MasterPageLayout>
  );
}
