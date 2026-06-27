import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

// Master Pages
import FirmMaster from './pages/masters/FirmMaster';
import CoalCompanyMaster from './pages/masters/CoalCompanyMaster';
import MineMaster from './pages/masters/MineMaster';
import CoalGradeMaster from './pages/masters/CoalGradeMaster';
import CustomerMaster from './pages/masters/CustomerMaster';
import VendorMaster from './pages/masters/VendorMaster';
import TransportMaster from './pages/masters/TransportMaster';
import VehicleMaster from './pages/masters/VehicleMaster';
import LifterMaster from './pages/masters/LifterMaster';
import BrokerMaster from './pages/masters/BrokerMaster';
import UserMaster from './pages/masters/UserMaster';

// Deal Pages
import DealDashboard from './pages/deals/DealDashboard';
import DealList from './pages/deals/DealList';
import CreateDeal from './pages/deals/CreateDeal';
import DealDetails from './pages/deals/DealDetails';
import DealTimeline from './pages/deals/DealTimeline';
import DealCalendar from './pages/deals/DealCalendar';
import Deal360View from './pages/deals/Deal360View';

// Auction Pages
import AuctionDashboard from './pages/auctions/AuctionDashboard';
import AuctionList from './pages/auctions/AuctionList';
import CreateAuction from './pages/auctions/CreateAuction';
import AuctionDetails from './pages/auctions/AuctionDetails';
import EmdList from './pages/auctions/EmdList';
import CreateEmd from './pages/auctions/CreateEmd';
import BidList from './pages/auctions/BidList';
import CreateBid from './pages/auctions/CreateBid';
import AuctionCalendar from './pages/auctions/AuctionCalendar';
import AuctionReports from './pages/auctions/AuctionReports';

// Government Pages
import ProcessDashboard from './pages/government/ProcessDashboard';
import SaleLetterList from './pages/government/SaleLetterList';
import CreateSaleLetter from './pages/government/CreateSaleLetter';
import SaleLetterDetails from './pages/government/SaleLetterDetails';
import PaymentAdviceList from './pages/government/PaymentAdviceList';
import CreatePaymentAdvice from './pages/government/CreatePaymentAdvice';
import GovtPaymentList from './pages/government/GovtPaymentList';
import CreateGovtPayment from './pages/government/CreateGovtPayment';
import ApplicationList from './pages/government/ApplicationList';
import CreateApplication from './pages/government/CreateApplication';
import GovtTimeline from './pages/government/GovtTimeline';
import ProcessReports from './pages/government/ProcessReports';

// Delivery Pages
import DoDashboard from './pages/delivery/DoDashboard';
import DoList from './pages/delivery/DoList';
import CreateDo from './pages/delivery/CreateDo';
import DoDetails from './pages/delivery/DoDetails';
import DoBalance from './pages/delivery/DoBalance';
import LifterList from './pages/delivery/LifterList';
import AssignLifter from './pages/delivery/AssignLifter';
import WorkOrderList from './pages/delivery/WorkOrderList';
import CreateWorkOrder from './pages/delivery/CreateWorkOrder';
import DeliveryTimeline from './pages/delivery/DeliveryTimeline';
import DoReports from './pages/delivery/DoReports';

// Dispatch Pages
import DispatchDashboard from './pages/dispatch/DispatchDashboard';
import DispatchList from './pages/dispatch/DispatchList';
import CreateDispatch from './pages/dispatch/CreateDispatch';
import DispatchDetails from './pages/dispatch/DispatchDetails';
import LiftingTracker from './pages/dispatch/LiftingTracker';
import VehicleTracking from './pages/dispatch/VehicleTracking';
import WeighbridgeList from './pages/dispatch/WeighbridgeList';
import CreateWeighbridge from './pages/dispatch/CreateWeighbridge';
import DispatchTimeline from './pages/dispatch/DispatchTimeline';
import DispatchReports from './pages/dispatch/DispatchReports';

// Sales Pages
import SalesDashboard from './pages/sales/SalesDashboard';
import OrderList from './pages/sales/OrderList';
import CreateOrder from './pages/sales/CreateOrder';
import OrderDetails from './pages/sales/OrderDetails';
import DoAllocationList from './pages/sales/DoAllocationList';
import CreateAllocation from './pages/sales/CreateAllocation';
import AllocationDetails from './pages/sales/AllocationDetails';
import SalesDispatchList from './pages/sales/SalesDispatchList';
import SalesDispatchDetails from './pages/sales/SalesDispatchDetails';
import InvoiceList from './pages/sales/InvoiceList';
import CreateInvoice from './pages/sales/CreateInvoice';
import InvoiceDetails from './pages/sales/InvoiceDetails';
import SalesTimeline from './pages/sales/SalesTimeline';
import SalesReports from './pages/sales/SalesReports';

// Finance Pages
import FinanceDashboard from './pages/finance/FinanceDashboard';
import CollectionList from './pages/finance/CollectionList';
import CreateCollection from './pages/finance/CreateCollection';
import CollectionDetails from './pages/finance/CollectionDetails';
import VendorPaymentList from './pages/finance/VendorPaymentList';
import CreateVendorPayment from './pages/finance/CreateVendorPayment';
import VendorPaymentDetails from './pages/finance/VendorPaymentDetails';
import TransportSettlementList from './pages/finance/TransportSettlementList';
import CreateTransportSettlement from './pages/finance/CreateTransportSettlement';
import TransportSettlementDetails from './pages/finance/TransportSettlementDetails';
import CommissionList from './pages/finance/CommissionList';
import CreateCommission from './pages/finance/CreateCommission';
import CommissionDetails from './pages/finance/CommissionDetails';
import FinanceTimeline from './pages/finance/FinanceTimeline';
import FinanceReports from './pages/finance/FinanceReports';

// Administration Pages
import StockManagement from './pages/admin/StockManagement';
import RefundLapse from './pages/admin/RefundLapse';
import ProfitabilityAnalysis from './pages/admin/ProfitabilityAnalysis';
import ReportsHub from './pages/admin/ReportsHub';
import DocumentVault from './pages/admin/DocumentVault';
import TaskManagement from './pages/admin/TaskManagement';
import NotificationCenter from './pages/admin/NotificationCenter';
import AuditTrail from './pages/admin/AuditTrail';
import GlobalSettings from './pages/admin/GlobalSettings';
import UserProfile from './pages/admin/UserProfile';
import ExecutiveDashboard from './pages/admin/ExecutiveDashboard';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<ExecutiveDashboard />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Masters Routes */}
          <Route path="masters">
            <Route path="firms" element={<FirmMaster />} />
            <Route path="coal-companies" element={<CoalCompanyMaster />} />
            <Route path="mines" element={<MineMaster />} />
            <Route path="coal-grades" element={<CoalGradeMaster />} />
            <Route path="customers" element={<CustomerMaster />} />
            <Route path="vendors" element={<VendorMaster />} />
            <Route path="transports" element={<TransportMaster />} />
            <Route path="vehicles" element={<VehicleMaster />} />
            <Route path="lifters" element={<LifterMaster />} />
            <Route path="brokers" element={<BrokerMaster />} />
            <Route path="users" element={<UserMaster />} />
          </Route>

          {/* Deals Routes */}
          <Route path="deals">
            <Route path="dashboard" element={<DealDashboard />} />
            <Route path="list" element={<DealList />} />
            <Route path="create" element={<CreateDeal />} />
            <Route path="calendar" element={<DealCalendar />} />
            <Route path=":id" element={<DealDetails />} />
            <Route path=":id/timeline" element={<DealTimeline />} />
            <Route path=":id/360" element={<Deal360View />} />
          </Route>

          {/* Auctions Routes */}
          <Route path="auctions">
            <Route path="dashboard" element={<AuctionDashboard />} />
            <Route path="list" element={<AuctionList />} />
            <Route path="create" element={<CreateAuction />} />
            <Route path="emd" element={<EmdList />} />
            <Route path="emd/create" element={<CreateEmd />} />
            <Route path="bids" element={<BidList />} />
            <Route path="bids/create" element={<CreateBid />} />
            <Route path="calendar" element={<AuctionCalendar />} />
            <Route path="reports" element={<AuctionReports />} />
            <Route path=":id" element={<AuctionDetails />} />
          </Route>

          {/* Government Routes */}
          <Route path="government">
            <Route path="dashboard" element={<ProcessDashboard />} />
            <Route path="sale-letters" element={<SaleLetterList />} />
            <Route path="sale-letters/create" element={<CreateSaleLetter />} />
            <Route path="sale-letters/:id" element={<SaleLetterDetails />} />
            <Route path="payment-advice" element={<PaymentAdviceList />} />
            <Route path="payment-advice/create" element={<CreatePaymentAdvice />} />
            <Route path="payments" element={<GovtPaymentList />} />
            <Route path="payments/create" element={<CreateGovtPayment />} />
            <Route path="applications" element={<ApplicationList />} />
            <Route path="applications/create" element={<CreateApplication />} />
            <Route path="timeline" element={<GovtTimeline />} />
            <Route path="reports" element={<ProcessReports />} />
          </Route>

          {/* Delivery Routes */}
          <Route path="delivery">
            <Route path="dashboard" element={<DoDashboard />} />
            <Route path="orders" element={<DoList />} />
            <Route path="orders/create" element={<CreateDo />} />
            <Route path="orders/:id" element={<DoDetails />} />
            <Route path="balance" element={<DoBalance />} />
            <Route path="lifters" element={<LifterList />} />
            <Route path="lifters/assign" element={<AssignLifter />} />
            <Route path="work-orders" element={<WorkOrderList />} />
            <Route path="work-orders/create" element={<CreateWorkOrder />} />
            <Route path="timeline" element={<DeliveryTimeline />} />
            <Route path="reports" element={<DoReports />} />
          </Route>

          {/* Dispatch Routes */}
          <Route path="dispatch">
            <Route path="dashboard" element={<DispatchDashboard />} />
            <Route path="trucks" element={<DispatchList />} />
            <Route path="trucks/create" element={<CreateDispatch />} />
            <Route path="trucks/:id" element={<DispatchDetails />} />
            <Route path="lifting-tracker" element={<LiftingTracker />} />
            <Route path="vehicle-tracking" element={<VehicleTracking />} />
            <Route path="weighbridge" element={<WeighbridgeList />} />
            <Route path="weighbridge/create" element={<CreateWeighbridge />} />
            <Route path="timeline" element={<DispatchTimeline />} />
            <Route path="reports" element={<DispatchReports />} />
          </Route>

          {/* Sales Routes */}
          <Route path="sales">
            <Route path="dashboard" element={<SalesDashboard />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/create" element={<CreateOrder />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="allocations" element={<DoAllocationList />} />
            <Route path="allocations/create" element={<CreateAllocation />} />
            <Route path="allocations/:id" element={<AllocationDetails />} />
            <Route path="dispatches" element={<SalesDispatchList />} />
            <Route path="dispatches/:id" element={<SalesDispatchDetails />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="invoices/create" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetails />} />
            <Route path="timeline" element={<SalesTimeline />} />
            <Route path="reports" element={<SalesReports />} />
          </Route>

          {/* Finance Routes */}
          <Route path="finance">
            <Route path="dashboard" element={<FinanceDashboard />} />
            <Route path="collections" element={<CollectionList />} />
            <Route path="collections/create" element={<CreateCollection />} />
            <Route path="collections/:id" element={<CollectionDetails />} />
            <Route path="vendors" element={<VendorPaymentList />} />
            <Route path="vendors/create" element={<CreateVendorPayment />} />
            <Route path="vendors/:id" element={<VendorPaymentDetails />} />
            <Route path="transports" element={<TransportSettlementList />} />
            <Route path="transports/create" element={<CreateTransportSettlement />} />
            <Route path="transports/:id" element={<TransportSettlementDetails />} />
            <Route path="commissions" element={<CommissionList />} />
            <Route path="commissions/create" element={<CreateCommission />} />
            <Route path="commissions/:id" element={<CommissionDetails />} />
            <Route path="timeline" element={<FinanceTimeline />} />
            <Route path="reports" element={<FinanceReports />} />
          </Route>

          {/* Administration Routes */}
          <Route path="admin">
            <Route path="stock" element={<StockManagement />} />
            <Route path="refunds" element={<RefundLapse />} />
            <Route path="profitability" element={<ProfitabilityAnalysis />} />
            <Route path="reports" element={<ReportsHub />} />
            <Route path="vault" element={<DocumentVault />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="notifications" element={<NotificationCenter />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
