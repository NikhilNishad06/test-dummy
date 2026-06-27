import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyRefunds } from '@/data/refunds';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RefundLapse() {
  const { data, refresh } = useDummyCRUD(dummyRefunds);

  const pendingCount = data.filter(d => d.status === 'Pending').length;
  const approvedCount = data.filter(d => d.status === 'Approved').length;
  const refundedCount = data.filter(d => d.status === 'Refunded').length;
  const lapsedCount = data.filter(d => d.status === 'Lapsed').length;

  const columns = [
    {
      accessorKey: "id",
      header: "Refund No",
      cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>
    },
    {
      accessorKey: "dealId",
      header: "Deal ID",
      cell: ({ row }) => <span className="text-sky-600">{row.getValue("dealId")}</span>
    },
    {
      accessorKey: "refundType",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount (₹)",
      cell: ({ row }) => <span className="font-bold">₹{row.getValue("amount").toLocaleString()}</span>
    },
    {
      accessorKey: "paymentDate",
      header: "Payment Date",
      cell: ({ row }) => row.getValue("paymentDate") ? new Date(row.getValue("paymentDate")).toLocaleDateString() : "-"
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'Refunded') variant = "default";
        else if (status === 'Lapsed') variant = "destructive";
        else if (status === 'Pending') variant = "secondary";
        
        return <Badge variant={variant} className={status === 'Approved' ? 'border-sky-500 text-sky-700 bg-sky-50' : ''}>{status}</Badge>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
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
              <DropdownMenuItem onClick={() => alert("View Details")}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Process Refund")}>
                <Edit className="mr-2 h-4 w-4" /> Process
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Refund & Lapse Management</h2>
          <p className="text-muted-foreground">Manage EMD Refunds, Government adjustments, and Lapsed quantities.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <Card className="border-l-4 border-l-slate-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-sky-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-sky-700">Approved for Refund</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Successfully Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{refundedCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-rose-500 bg-rose-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-rose-800">Lapsed Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">{lapsedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchPlaceholder="Search Refunds/Lapses..." />
        </CardContent>
      </Card>
    </div>
  );
}
