import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummySaleLetters } from '@/data/saleLetters';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Upload, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GovtTimeline from './GovtTimeline';

export default function SaleLetterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sl = dummySaleLetters.find(d => d.id === id) || dummySaleLetters[0];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/government/sale-letters')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sale Letter Details</h2>
            <p className="text-muted-foreground">{sl.id} | Deal: <span className="text-sky-600 cursor-pointer hover:underline" onClick={() => navigate(`/deals/${sl.dealId}/360`)}>{sl.dealId}</span></p>
          </div>
        </div>
        <div className="space-x-2">
          <Button onClick={() => navigate(`/government/payment-advice/create?sl=${sl.id}`)}>
            <Plus className="mr-2 h-4 w-4" /> Gen. Payment Advice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Firm</span>
                <p className="font-medium">{sl.firm}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Company & Mine</span>
                <p className="font-medium">{sl.coalCompany} - {sl.mine}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Issue Date</span>
                <p className="font-medium">{new Date(sl.issueDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">{sl.status}</Badge>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{sl.quantity} <span className="text-sm font-normal text-muted-foreground">MT</span></div>
                <p className="text-sm text-muted-foreground mt-1">Grade: {sl.coalGrade}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Financials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-sky-600">₹{sl.totalAmount.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">Rate: ₹{sl.rate} / MT</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Context</CardTitle>
            </CardHeader>
            <CardContent>
               <GovtTimeline compact currentStage="Sale Letter" dealDate={sl.issueDate} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded hover:bg-muted cursor-pointer transition-colors">
                 <div className="flex items-center gap-2">
                   <FileText className="h-5 w-5 text-red-500" />
                   <span className="text-sm font-medium">Sale_Letter_Original.pdf</span>
                 </div>
              </div>
              <div className="border border-dashed rounded p-4 text-center cursor-pointer hover:bg-muted/50 text-muted-foreground transition-colors">
                <Upload className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs">Upload Supporting Doc</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
