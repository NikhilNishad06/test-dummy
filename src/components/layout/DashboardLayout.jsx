import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isMobile={false} />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        <TopNav onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[250px] border-r-0" hideClose>
          <Sidebar collapsed={false} setCollapsed={() => setMobileMenuOpen(false)} isMobile={true} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
