import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { dummyStock } from '@/data/stock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Printer, Download, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function StockManagement() {
  const { data, refresh } = useDummyCRUD(dummyStock);
  const navigate = useNavigate();

  const totalOpening = data.reduce((a, b) => a + b.openingStock, 0);
  const totalReceived = data.reduce((a, b) => a + b.received, 0);
  const totalDispatched = data.reduce((a, b) => a + b.dispatched, 0);
  const totalClosing = data.reduce((a, b) => a + b.closingStock, 0);
  const lowStockCount = data.filter(d => d.status === 'Low Stock' || d.status === 'Out of Stock').length;

  const columns = [
    {
      accessorKey: "id",
      header: "Stock ID",
      cell: ({ row }) => <span className="font-medium text-sky-600">{row.getValue("id")}</span>
    },
    {
      accessorKey: "dealId",
      header: "Deal Ref",
      cell: ({ row }) => <span className="text-muted-foreground hover:underline cursor-pointer" onClick={() => navigate(`/deals/${row.getValue("dealId")}/360`)}>{row.getValue("dealId")}</span>
    },
    {
      accessorKey: "mine",
      header: "Mine",
      cell: ({ row }) => <span className="font-semibold">{row.getValue("mine")}</span>
    },
    {
      accessorKey: "coalGrade",
      header: "Grade",
    },
    {
      accessorKey: "openingStock",
      header: "Opening",
      cell: ({ row }) => `${row.getValue("openingStock")} MT`
    },
    {
      accessorKey: "received",
      header: "Received",
      cell: ({ row }) => <span className="text-emerald-600 font-medium">+${row.getValue("received")} MT</span>
    },
    {
      accessorKey: "dispatched",
      header: "Dispatched",
      cell: ({ row }) => <span className="text-rose-600 font-medium">-${row.getValue("dispatched")} MT</span>
    },
    {
      accessorKey: "closingStock",
      header: "Closing",
      cell: ({ row }) => <span className="font-bold text-lg">{row.getValue("closingStock")} MT</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        let variant = "outline";
        if (status === 'In Stock') variant = "default";
        else if (status === 'Out of Stock') variant = "destructive";
        else if (status === 'Low Stock') variant = "secondary";
        
        return <Badge variant={variant} className={status === 'Low Stock' ? 'border-amber-500 text-amber-700 bg-amber-50' : ''}>{status}</Badge>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="sm" onClick={() => alert("View Timeline for " + row.original.id)}>
            <Eye className="h-4 w-4 mr-2" /> Timeline
          </Button>
        );
      },
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
          <p className="text-muted-foreground">Monitor inventory levels, receivals, and dispatches across all deals.</p>
        </div>
        <div className="space-x-2">
           <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
           <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
           <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Opening Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpening.toLocaleString()} MT</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+{totalReceived.toLocaleString()} MT</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-rose-700">Total Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">-{totalDispatched.toLocaleString()} MT</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Closing Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-sky-400">{totalClosing.toLocaleString()} MT</div>
          </CardContent>
        </Card>
        <Card className={lowStockCount > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lowStockCount} Records</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchPlaceholder="Search Stock Records..." />
        </CardContent>
      </Card>
    </div>
  );
}
