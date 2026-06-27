import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyDeals } from '@/data/deals';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Upload, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deal = dummyDeals.find(d => d.id === id) || dummyDeals[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/deals/list')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Deal Details</h2>
            <p className="text-muted-foreground">{deal.id} - {deal.dealName}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/deals/${deal.id}/360`)}>Go to 360° View</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Firm:</span>
                  <span className="font-medium">{deal.firm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source:</span>
                  <span className="font-medium">{deal.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction:</span>
                  <span className="font-medium">{deal.transactionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mine:</span>
                  <span className="font-medium">{deal.mine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grade:</span>
                  <span className="font-medium">{deal.coalGrade}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quantity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Expected:</span>
                  <span className="font-medium">{deal.quantity} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Purchased:</span>
                  <span className="font-medium">{deal.purchasedQty} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending:</span>
                  <span className="font-medium">{deal.pendingQty} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lifted:</span>
                  <span className="font-medium">{deal.liftedQty} MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sold:</span>
                  <span className="font-medium">{deal.soldQty} MT</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Purchase Rate:</span>
                  <span className="font-medium">₹{deal.purchaseRate} / MT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sale Rate:</span>
                  <span className="font-medium">₹{deal.expectedSaleRate} / MT</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t">
                  <span className="text-muted-foreground">Expected Profit:</span>
                  <span className="font-bold text-emerald-600">₹{deal.expectedProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Margin:</span>
                  <span className="font-medium">₹{deal.expectedMargin.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assigned Teams</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
              <div className="bg-muted/50 p-4 rounded border">
                <p className="text-muted-foreground mb-1">Deal Owner</p>
                <p className="font-medium">{deal.dealOwner}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded border">
                <p className="text-muted-foreground mb-1">Operations</p>
                <p className="font-medium">{deal.operationsTeam}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded border">
                <p className="text-muted-foreground mb-1">Billing</p>
                <p className="font-medium">{deal.billingTeam}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded border">
                <p className="text-muted-foreground mb-1">Collection</p>
                <p className="font-medium">{deal.collectionTeam}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
              <CardDescription>Add remarks and comments to this deal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => toast.success("Added new note")}>Add Note</Button>
              <div className="border rounded p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm">System Generated</span>
                  <span className="text-xs text-muted-foreground">{new Date(deal.createdDate).toLocaleDateString()}</span>
                </div>
                <p className="text-sm">Deal initialized and assigned to {deal.dealOwner}.</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2"><Edit className="w-3 h-3 mr-1"/> Edit</Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-destructive"><Trash2 className="w-3 h-3 mr-1"/> Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments">
          <Card>
            <CardHeader>
              <CardTitle>Document Uploads</CardTitle>
              <CardDescription>Upload purchase and financial documents here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Click to Upload</h3>
                <p className="text-sm text-muted-foreground">or drag and drop your files here.</p>
                <Button className="mt-4" onClick={() => toast.success("File uploaded!")}>Browse Files</Button>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between p-3 border rounded bg-muted/20">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-sky-500" />
                    <span className="text-sm font-medium">Purchase_Order.pdf</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
