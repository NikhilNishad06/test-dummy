import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyCollections } from '@/data/collections';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FinanceTimeline from './FinanceTimeline';

export default function CollectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const collection = dummyCollections.find(d => d.id === id) || dummyCollections[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/finance/collections')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Collection Details</h2>
            <p className="text-muted-foreground">{collection.id} | Invoice: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/sales/invoices/${collection.invoiceNumber}`)}>{collection.invoiceNumber}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customer Summary</CardTitle>
              <Badge variant={collection.status === 'Received' ? 'default' : collection.status === 'Overdue' ? 'destructive' : 'outline'}>{collection.status}</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Customer Name</span>
                <p className="font-bold text-lg">{collection.customer}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Deal Ref</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/deals/${collection.dealId}/360`)}>{collection.dealId}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Financial Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Invoice Amount</div>
                   <div className="font-medium text-lg">₹{collection.invoiceAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-emerald-700 font-medium">Amount Received</div>
                   <div className="font-bold text-emerald-600 text-lg">+ ₹{collection.receivedAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">TDS / Deductions</div>
                   <div className="font-medium">₹0</div>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <div className="font-bold text-lg">Outstanding Balance</div>
                   <div className={`text-2xl font-bold ${collection.balanceAmount > 0 ? 'text-amber-600' : 'text-slate-800'}`}>₹{collection.balanceAmount.toLocaleString()}</div>
                </div>
             </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Payment Date</span>
                <p className="font-medium">{collection.paymentDate ? new Date(collection.paymentDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Due Date</span>
                <p className="font-medium text-amber-600">{new Date(collection.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Bank</span>
                <p className="font-medium">{collection.bank}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">UTR Number</span>
                <p className="font-medium">{collection.utrNumber}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Finance Workflow</CardTitle>
            </CardHeader>
            <CardContent>
               <FinanceTimeline compact currentStage={collection.status === 'Received' ? 'Collection Received' : 'Collection Pending'} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {collection.status === 'Received' || collection.status === 'Partial' ? (
                <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                   <div className="flex items-center gap-2">
                     <FileText className="h-5 w-5 text-blue-500" />
                     <span className="text-sm font-medium">Payment_Receipt.pdf</span>
                   </div>
                   <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-4">No payment receipts attached.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
