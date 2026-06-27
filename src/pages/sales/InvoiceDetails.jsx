import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyInvoices } from '@/data/invoices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, FileText, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = dummyInvoices.find(d => d.id === id) || dummyInvoices[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/sales/invoices')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Invoice Details</h2>
            <p className="text-muted-foreground">{invoice.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${invoice.dealId}/360`)}>{invoice.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button>Record Payment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Customer & Context</CardTitle>
              <Badge variant={invoice.status === 'Paid' ? 'default' : 'outline'}>{invoice.status}</Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Billed To</span>
                <p className="font-bold text-lg">{invoice.customer}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Invoice Date</span>
                <p className="font-medium">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Dispatch Ref</span>
                <p className="font-medium text-sky-600 hover:underline cursor-pointer" onClick={() => navigate(`/sales/dispatches/${invoice.dispatchId}`)}>{invoice.dispatchId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Due Date</span>
                <p className="font-medium text-amber-600">{new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
               <CardTitle>Amount Summary</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Quantity Delivered</div>
                   <div className="font-medium">{invoice.quantity} MT</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">Taxable Amount</div>
                   <div className="font-medium">₹{invoice.taxableAmount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <div className="text-muted-foreground">GST (5%)</div>
                   <div className="font-medium">₹{invoice.gst.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center pt-4">
                   <div className="text-lg font-bold">Total Invoice Amount</div>
                   <div className="text-2xl font-bold text-emerald-600">₹{invoice.totalAmount.toLocaleString()}</div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 space-y-4">
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center space-y-4">
               <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                 <IndianRupee className="h-8 w-8" />
               </div>
               <div>
                 <h3 className="text-2xl font-bold">₹{invoice.totalAmount.toLocaleString()}</h3>
                 <p className="text-sm text-muted-foreground">Total Due</p>
               </div>
               {invoice.status === 'Overdue' && (
                 <Badge variant="destructive" className="mt-2">Payment Overdue</Badge>
               )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-red-500" />
                   <span className="text-sm font-medium">{invoice.id}_Copy.pdf</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
