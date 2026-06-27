import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, PanelLeftClose, PanelLeftOpen, Database, ChevronDown, ChevronRight, Briefcase, Gavel, Landmark, Truck, Navigation, Receipt, Wallet, Shield, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar({ collapsed, setCollapsed, isMobile = false }) {
  const [mastersOpen, setMastersOpen] = useState(false);
  const [dealsOpen, setDealsOpen] = useState(false);
  const [auctionsOpen, setAuctionsOpen] = useState(false);
  const [govtOpen, setGovtOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();
  const { user, currentRole, logout } = useAuth();

  const masterLinks = [
    { name: 'Firms', path: '/masters/firms' },
    { name: 'Coal Companies', path: '/masters/coal-companies' },
    { name: 'Mines', path: '/masters/mines' },
    { name: 'Coal Grades', path: '/masters/coal-grades' },
    { name: 'Customers', path: '/masters/customers' },
    { name: 'Vendors', path: '/masters/vendors' },
    { name: 'Transports', path: '/masters/transports' },
    { name: 'Vehicles', path: '/masters/vehicles' },
    { name: 'Lifters', path: '/masters/lifters' },
    { name: 'Brokers', path: '/masters/brokers' },
    { name: 'Users', path: '/masters/users' }
  ];

  const dealLinks = [
    { name: 'Deal Dashboard', path: '/deals/dashboard' },
    { name: 'Deal List', path: '/deals/list' },
    { name: 'Create Deal', path: '/deals/create' },
    { name: 'Deal Calendar', path: '/deals/calendar' }
  ];

  const auctionLinks = [
    { name: 'Auction Dashboard', path: '/auctions/dashboard' },
    { name: 'Auction Notification', path: '/auctions/list' },
    { name: 'EMD Management', path: '/auctions/emd' },
    { name: 'Bid Management', path: '/auctions/bids' },
    { name: 'Auction Calendar', path: '/auctions/calendar' },
    { name: 'Auction Reports', path: '/auctions/reports' }
  ];

  const govtLinks = [
    { name: 'Process Dashboard', path: '/government/dashboard' },
    { name: 'Sale Letter', path: '/government/sale-letters' },
    { name: 'Payment Advice', path: '/government/payment-advice' },
    { name: 'Government Payment', path: '/government/payments' },
    { name: 'Application Submission', path: '/government/applications' },
    { name: 'Government Timeline', path: '/government/timeline' },
    { name: 'Process Reports', path: '/government/reports' }
  ];

  const deliveryLinks = [
    { name: 'DO Dashboard', path: '/delivery/dashboard' },
    { name: 'Delivery Order (DO)', path: '/delivery/orders' },
    { name: 'DO Balance', path: '/delivery/balance' },
    { name: 'Lifter Management', path: '/delivery/lifters' },
    { name: 'Work Orders', path: '/delivery/work-orders' },
    { name: 'Delivery Timeline', path: '/delivery/timeline' },
    { name: 'DO Reports', path: '/delivery/reports' }
  ];

  const dispatchLinks = [
    { name: 'Dispatch Dashboard', path: '/dispatch/dashboard' },
    { name: 'Truck Dispatch', path: '/dispatch/trucks' },
    { name: 'Lifting Tracker', path: '/dispatch/lifting-tracker' },
    { name: 'Vehicle Tracking', path: '/dispatch/vehicle-tracking' },
    { name: 'Weighbridge Records', path: '/dispatch/weighbridge' },
    { name: 'Dispatch Timeline', path: '/dispatch/timeline' },
    { name: 'Dispatch Reports', path: '/dispatch/reports' }
  ];

  const salesLinks = [
    { name: 'Sales Dashboard', path: '/sales/dashboard' },
    { name: 'Customer Orders', path: '/sales/orders' },
    { name: 'DO Allocation', path: '/sales/allocations' },
    { name: 'Sales Dispatch', path: '/sales/dispatches' },
    { name: 'Invoice Management', path: '/sales/invoices' },
    { name: 'Sales Timeline', path: '/sales/timeline' },
    { name: 'Sales Reports', path: '/sales/reports' }
  ];

  const financeLinks = [
    { name: 'Finance Dashboard', path: '/finance/dashboard' },
    { name: 'Collection Management', path: '/finance/collections' },
    { name: 'Vendor Payment', path: '/finance/vendors' },
    { name: 'Transport Settlement', path: '/finance/transports' },
    { name: 'Commission Management', path: '/finance/commissions' },
    { name: 'Finance Timeline', path: '/finance/timeline' },
    { name: 'Finance Reports', path: '/finance/reports' }
  ];

  const adminLinks = [
    { name: 'Stock Management', path: '/admin/stock' },
    { name: 'Refund & Lapse', path: '/admin/refunds' },
    { name: 'Profitability Analysis', path: '/admin/profitability' },
    { name: 'Reports Hub', path: '/admin/reports' },
    { name: 'Document Vault', path: '/admin/vault' },
    { name: 'Task Management', path: '/admin/tasks' },
    { name: 'Notification Center', path: '/admin/notifications' },
    { name: 'Audit Trail', path: '/admin/audit' },
    { name: 'Global Settings', path: '/admin/settings' },
    { name: 'User Profile', path: '/admin/profile' }
  ];

  return (
    <div className={cn(
      "flex flex-col border-r bg-muted/10 transition-all duration-300 h-full",
      collapsed ? "w-[80px]" : "w-[250px]"
    )}>
      <div className="flex h-14 items-center justify-between px-4 border-b">
        {!collapsed && <span className="font-semibold tracking-tight truncate">Coal ERP</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => isMobile ? setCollapsed(false) : setCollapsed(!collapsed)} 
          className={cn(collapsed && "mx-auto")}
        >
          {isMobile ? <PanelLeftClose className="h-4 w-4" /> : (collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />)}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <NavLink
            to="/"
            className={({ isActive }) => cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive && location.pathname === '/' ? "bg-muted text-primary font-medium" : "text-muted-foreground",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Executive Dashboard" : undefined}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Executive Dashboard</span>}
          </NavLink>

          {/* Deal Management Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setDealsOpen(!dealsOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/deals') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Coal Deal Management" : undefined}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Deal Management</span>}
              </div>
              {!collapsed && (
                dealsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && dealsOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {dealLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Auction Management Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setAuctionsOpen(!auctionsOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/auctions') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Auction Management" : undefined}
            >
              <div className="flex items-center gap-3">
                <Gavel className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Auction Mgmt</span>}
              </div>
              {!collapsed && (
                auctionsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && auctionsOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {auctionLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Government Process Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setGovtOpen(!govtOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/government') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Government Process" : undefined}
            >
              <div className="flex items-center gap-3">
                <Landmark className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Govt Process</span>}
              </div>
              {!collapsed && (
                govtOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && govtOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {govtLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Operations Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setDeliveryOpen(!deliveryOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/delivery') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Delivery Operations" : undefined}
            >
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Delivery Ops</span>}
              </div>
              {!collapsed && (
                deliveryOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && deliveryOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {deliveryLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          
          {/* Dispatch & Logistics Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setDispatchOpen(!dispatchOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/dispatch') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Dispatch & Logistics" : undefined}
            >
              <div className="flex items-center gap-3">
                <Navigation className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Dispatch & Logistics</span>}
              </div>
              {!collapsed && (
                dispatchOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && dispatchOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {dispatchLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Sales & Billing Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setSalesOpen(!salesOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/sales') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Sales & Billing" : undefined}
            >
              <div className="flex items-center gap-3">
                <Receipt className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Sales & Billing</span>}
              </div>
              {!collapsed && (
                salesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && salesOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {salesLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Finance Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setFinanceOpen(!financeOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/finance') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Finance" : undefined}
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Finance</span>}
              </div>
              {!collapsed && (
                financeOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && financeOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {financeLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Administration Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setAdminOpen(!adminOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                location.pathname.startsWith('/admin') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Administration" : undefined}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Administration</span>}
              </div>
              {!collapsed && (
                adminOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && adminOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {adminLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Masters Section */}
          <div className="pt-2">
            <button
              onClick={() => {
                if(collapsed) setCollapsed(false);
                setMastersOpen(!mastersOpen);
              }}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted text-muted-foreground",
                location.pathname.startsWith('/masters') ? "text-primary font-medium" : "text-muted-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? "Masters" : undefined}
            >
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 shrink-0" />
                {!collapsed && <span>Masters</span>}
              </div>
              {!collapsed && (
                mastersOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!collapsed && mastersOpen && (
              <div className="mt-1 ml-4 border-l pl-2 space-y-1">
                {masterLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:bg-muted",
                      isActive ? "text-primary font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col truncate pr-2">
              <span className="text-sm font-medium truncate">{user?.name || 'Admin User'}</span>
              <span className="text-xs text-muted-foreground truncate">{currentRole?.name || 'Administrator'}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout" className="shrink-0">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="w-full mx-auto" onClick={logout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
