const fs = require('fs');
const path = require('path');

const masters = [
  { name: 'CoalCompanyMaster', title: 'Coal Company Master' },
  { name: 'MineMaster', title: 'Mine Master' },
  { name: 'CoalGradeMaster', title: 'Coal Grade Master' },
  { name: 'CustomerMaster', title: 'Customer Master' },
  { name: 'VendorMaster', title: 'Vendor Master' },
  { name: 'TransportMaster', title: 'Transport Master' },
  { name: 'VehicleMaster', title: 'Vehicle Master' },
  { name: 'LifterMaster', title: 'Lifter Master' },
  { name: 'BrokerMaster', title: 'Broker / Commission Agent Master' },
  { name: 'UserMaster', title: 'User Master' }
];

const pagesDir = path.join(__dirname, '..', 'src', 'pages', 'masters');
const dataDir = path.join(__dirname, '..', 'src', 'lib', 'dummy-data');

masters.forEach(master => {
  const variableName = master.name;
  const dummyVarName = `dummy${variableName}`;
  const dataFile = path.join(dataDir, `${master.name}.js`);
  const pageFile = path.join(pagesDir, `${master.name}.jsx`);

  // Write Dummy Data File
  const dummyContent = `export const ${dummyVarName} = [
  { id: "1", name: "Sample 1", status: "Active" },
  { id: "2", name: "Sample 2", status: "Inactive" }
];`;
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, dummyContent);
  }

  // Write Page File
  const pageContent = `import React from 'react';
import MasterPageLayout from '@/components/common/MasterPageLayout';
import { DataTable } from '@/components/common/DataTable';
import { useDummyCRUD } from '@/hooks/useDummyCRUD';
import { ${dummyVarName} } from '@/lib/dummy-data/${master.name}';
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

export default function ${master.name}() {
  const { data, refresh, toggleStatus, deleteRecord } = useDummyCRUD(${dummyVarName});

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === 'Active' ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => toggleStatus(row.original.id)}>
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
              <DropdownMenuItem onClick={() => alert("View " + record.id)}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Edit " + record.id)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Record
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
      title="${master.title}"
      description="Manage ${master.title.toLowerCase()} records."
      onAdd={() => alert("Open Add Modal")}
      onRefresh={refresh}
      onExport={() => alert("Exported!")}
    >
      <DataTable columns={columns} data={data} searchPlaceholder="Search..." />
    </MasterPageLayout>
  );
}`;
  if (!fs.existsSync(pageFile)) {
    fs.writeFileSync(pageFile, pageContent);
  }
});

console.log('Master pages and data templates generated successfully.');
