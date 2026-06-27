import React from 'react';

export default function Settings() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="rounded-md border p-8 mt-6">
        <p className="text-muted-foreground text-center">Settings configuration goes here.</p>
      </div>
    </div>
  );
}
