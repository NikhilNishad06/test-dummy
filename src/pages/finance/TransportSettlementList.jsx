import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyTransportSettlements } from '@/data/transportSettlements';
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

export default function TransportSettlementList() {
  const { data, refresh, deleteRecord } = useDummyCRUD(dummyTransportSettlements);
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "id",
      header: "Settlement ID",
      cell: ({ row }) => <span className="font-medium text-sky-600 cursor-pointer" onClick={() => navigate(`/finance/transports/${row.getValue("id")}`)}>{row.getValue("id")}</span>
    },
    {
      accessorKey: "transporter",
      header: "Transporter",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("transporter")}</span>
    },
    {
      accessorKey: "dispatchId",
      header: "Dispatch Ref",
      cell: ({ row }) => <span className="text-muted-foreground hover:underline cursor-pointer" onClick={() => navigate(`/dispatch/trucks/${row.getValue("dispatchId")}`)}>{row.getValue("dispatchId")}</span>
    },
    {
      accessorKey: "truckNumber",
      header: "Truck No",
    },
    {
      accessorKey: "freightAmount",
      header: "Total Freight",
      cell: ({ row }) => `₹${row.getValue("freightAmount").toLocaleString()}`
    },
    {
      accessorKey: "advance",
      header: "Advance",
      cell: ({ row }) => <span className="text-amber-600">₹{row.getValue("advance").toLocaleString()}</span>
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => {
        const bal = row.getValue("balance");
        return <span className={bal > 0 ? "text-rose-600 font-bold" : "text-muted-foreground"}>₹{bal.toLocaleString()}</span>
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Paid') variant = "default";
        else if (status === 'Pending') variant = "destructive";
        
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
              <DropdownMenuItem onClick={() => navigate(`/finance/transports/${record.id}`)}>
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
      title="Transport Settlements"
      description="Manage freight payments, advances, and final settlements for transporters."
      onAdd={() => navigate('/finance/transports/create')}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search Settlements..." />
    </MasterPageLayout>
  );
}
