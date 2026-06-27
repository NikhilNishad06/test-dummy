import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import GovtTimeline from './GovtTimeline';

export default function CreateApplication() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment") || "";
  
  // Checklist State
  const [checklist, setChecklist] = useState({
    sl: false,
    proof: false,
    appForm: false,
    authLetter: false,
    firmDocs: false
  });

  const allChecked = Object.values(checklist).every(Boolean);

  const handleSave = () => {
    if (!allChecked) {
      toast.error("Please complete the Document Checklist before submitting.");
      return;
    }
    toast.success("Application Submitted successfully!");
    navigate('/government/applications');
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Application Submission</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Link to Deal ID</Label>
                  <Input placeholder="Select Deal" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Ref No</Label>
                  <Input defaultValue={paymentId} placeholder="e.g. GP-2026-9999" />
                </div>
                <div className="space-y-2">
                  <Label>Firm</Label>
                  <Input placeholder="Select Firm" />
                </div>
                <div className="space-y-2">
                  <Label>Office Name</Label>
                  <Input placeholder="e.g. WCL HQ Nagpur" />
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Application Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Submitted By (Person Name)</Label>
                  <Input placeholder="Name of submitter" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
               <CardTitle>Submission Status Details</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Receipt Number (If received)</Label>
                    <Input placeholder="e.g. REC-5849" />
                  </div>
                  <div className="space-y-2">
                    <Label>Receipt Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Remarks / Query Details</Label>
                    <Input placeholder="Any queries raised by office..." />
                  </div>
                </div>
             </CardContent>
             <CardFooter className="flex justify-between border-t p-6 mt-4">
                <Button variant="outline" onClick={() => navigate('/government/applications')}>Cancel</Button>
                <Button onClick={handleSave} disabled={!allChecked} className={!allChecked ? "opacity-50" : ""}>
                  Submit Application
                </Button>
             </CardFooter>
          </Card>
        </div>

        {/* Checklist & Timeline Context */}
        <div className="space-y-4">
           <Card className="border-sky-200 shadow-sm">
             <CardHeader className="pb-4 bg-sky-50/50">
               <CardTitle className="text-base text-sky-800">Document Checklist</CardTitle>
               <CardDescription>All documents are mandatory for submission.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sl" checked={checklist.sl} onCheckedChange={(c) => setChecklist(prev => ({...prev, sl: c}))} />
                  <label htmlFor="sl" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Original Sale Letter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="proof" checked={checklist.proof} onCheckedChange={(c) => setChecklist(prev => ({...prev, proof: c}))} />
                  <label htmlFor="proof" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Payment Proof (Bank Advice)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="appForm" checked={checklist.appForm} onCheckedChange={(c) => setChecklist(prev => ({...prev, appForm: c}))} />
                  <label htmlFor="appForm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Filled Application Form
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="authLetter" checked={checklist.authLetter} onCheckedChange={(c) => setChecklist(prev => ({...prev, authLetter: c}))} />
                  <label htmlFor="authLetter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Authorization Letter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="firmDocs" checked={checklist.firmDocs} onCheckedChange={(c) => setChecklist(prev => ({...prev, firmDocs: c}))} />
                  <label htmlFor="firmDocs" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Firm Documents (PAN, GST)
                  </label>
                </div>
             </CardContent>
           </Card>

           <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-base">Workflow Context</CardTitle>
             </CardHeader>
             <CardContent>
                <GovtTimeline compact currentStage="Application Submitted" />
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
