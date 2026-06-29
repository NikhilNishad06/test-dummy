import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dummyDocuments } from '@/data/documents';
import { FileText, Folder, Search, Download, Upload, Filter, Tag, Grid, List as ListIcon, MoreVertical, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DocumentVault() {
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  
  const folders = [...new Set(dummyDocuments.map(d => d.category))];
  const [selectedFolder, setSelectedFolder] = useState('All');

  const filteredDocs = dummyDocuments.filter(d => 
    (selectedFolder === 'All' || d.category === selectedFolder) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between space-y-2 mb-2 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Document Vault</h2>
          <p className="text-muted-foreground">Centralized digital archive for all ERP files and attachments.</p>
        </div>
        <Button><Upload className="mr-2 h-4 w-4" /> Upload Document</Button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar Folders */}
        <Card className="w-64 shrink-0 overflow-hidden flex flex-col">
          <CardHeader className="py-4 border-b">
             <CardTitle className="text-base font-semibold">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-2 overflow-auto flex-1">
            <div className="space-y-1">
              <Button 
                variant={selectedFolder === 'All' ? 'secondary' : 'ghost'} 
                className="w-full justify-start h-9 px-2"
                onClick={() => setSelectedFolder('All')}
              >
                <Folder className="mr-2 h-4 w-4 text-sky-500 fill-sky-200" /> All Documents
              </Button>
              {folders.map(folder => (
                <Button 
                  key={folder}
                  variant={selectedFolder === folder ? 'secondary' : 'ghost'} 
                  className="w-full justify-start h-9 px-2 truncate"
                  onClick={() => setSelectedFolder(folder)}
                >
                  <Folder className="mr-2 h-4 w-4 text-slate-400 fill-slate-200 shrink-0" /> <span className="truncate">{folder}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Vault Area */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardHeader className="py-4 border-b bg-muted/10 shrink-0 flex flex-row items-center justify-between">
             <div className="flex items-center space-x-2 flex-1 max-w-md">
               <div className="relative flex-1">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input 
                   placeholder="Search documents by name or Deal ID..." 
                   className="pl-8" 
                   value={search}
                   onChange={e => setSearch(e.target.value)}
                 />
               </div>
               <Button variant="outline" size="icon"><Filter className="h-4 w-4"/></Button>
             </div>
             
             <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
               <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setView('grid')}><Grid className="h-4 w-4" /></Button>
               <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" className="h-7 w-7 p-0" onClick={() => setView('list')}><ListIcon className="h-4 w-4" /></Button>
             </div>
          </CardHeader>
          
          <CardContent className="p-6 overflow-auto flex-1 bg-slate-50/50">
            {filteredDocs.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                 <Folder className="h-16 w-16 mb-4 text-slate-300" />
                 <p>No documents found.</p>
               </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredDocs.map(doc => (
                  <div key={doc.id} className="group relative bg-white border rounded-lg p-4 hover:border-sky-300 hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer">
                    <FileText className={`h-12 w-12 mb-3 ${doc.name.endsWith('.pdf') ? 'text-red-500' : 'text-emerald-500'}`} />
                    <p className="text-sm font-medium truncate w-full" title={doc.name}>{doc.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate w-full">{doc.dealId}</p>
                    <Badge variant="secondary" className="mt-2 text-[10px]">{doc.size}</Badge>
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => alert(`Preview ${doc.id}`)}>
                            <Eye className="h-4 w-4 mr-2"/> Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`Download ${doc.id}`)}>
                            <Download className="h-4 w-4 mr-2"/> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`Edit tags for ${doc.id}`)}>
                            <Tag className="h-4 w-4 mr-2"/> Edit Tags
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded border overflow-hidden">
                <table className="w-full text-sm text-left">
                   <thead className="bg-muted/50 border-b">
                     <tr>
                       <th className="p-3 font-medium">Name</th>
                       <th className="p-3 font-medium">Deal Reference</th>
                       <th className="p-3 font-medium">Category</th>
                       <th className="p-3 font-medium">Size</th>
                       <th className="p-3 font-medium">Uploaded Date</th>
                       <th className="p-3 font-medium text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {filteredDocs.map(doc => (
                       <tr key={doc.id} className="border-b hover:bg-muted/30">
                         <td className="p-3">
                           <div className="flex items-center gap-2">
                             <FileText className={`h-4 w-4 ${doc.name.endsWith('.pdf') ? 'text-red-500' : 'text-emerald-500'}`} />
                             <span className="font-medium">{doc.name}</span>
                           </div>
                         </td>
                         <td className="p-3 text-sky-600">{doc.dealId}</td>
                         <td className="p-3"><Badge variant="outline">{doc.category}</Badge></td>
                         <td className="p-3 text-muted-foreground">{doc.size}</td>
                         <td className="p-3 text-muted-foreground">{new Date(doc.uploadDate).toLocaleDateString()}</td>
                         <td className="p-3 text-right space-x-1">
                           <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
