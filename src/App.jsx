import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Products from "./pages/masters/Products";
import Suppliers from "./pages/masters/Suppliers";
import Customers from "./pages/masters/Customers";
import Employees from "./pages/masters/Employees";
import Warehouses from "./pages/masters/Warehouses";
import Machines from "./pages/masters/Machines";
import PurchaseRequest from "./pages/purchase/PurchaseRequest";
import PurchaseOrder from "./pages/purchase/PurchaseOrder";
import GoodsReceipt from "./pages/purchase/GoodsReceipt";
import SupplierPayments from "./pages/purchase/SupplierPayments";
import StockOverview from "./pages/inventory/StockOverview";
import StockMovement from "./pages/inventory/StockMovement";
import WarehouseTransfer from "./pages/inventory/WarehouseTransfer";
import BOM from "./pages/production/BOM";
import ProductionOrder from "./pages/production/ProductionOrder";
import ProductionTracking from "./pages/production/ProductionTracking";
import QualityCheck from "./pages/quality/QualityCheck";
import RejectedQuarantine from "./pages/quality/RejectedQuarantine";
import CustomerOrders from "./pages/sales/CustomerOrders";
import Dispatch from "./pages/sales/Dispatch";
import SalesInvoice from "./pages/sales/SalesInvoice";
import CustomerPayments from "./pages/sales/CustomerPayments";
import Attendance from "./pages/hr/Attendance";
import SalaryWages from "./pages/hr/SalaryWages";
import Payroll from "./pages/hr/Payroll";
import Reports from "./pages/reports/Reports";
import PurchaseReport from "./pages/reports/PurchaseReport";
import StockReport from "./pages/reports/StockReport";
import ProductionReport from "./pages/reports/ProductionReport";
import SalesReport from "./pages/reports/SalesReport";
import PaymentsReport from "./pages/reports/PaymentsReport";
import HRReport from "./pages/reports/HRReport";
import PayrollReport from "./pages/reports/PayrollReport";
import QualityReport from "./pages/reports/QualityReport";
import MaintenanceReport from "./pages/reports/MaintenanceReport";
import MaintenanceRecords from "./pages/maintenance/MaintenanceRecords";
import Users from "./pages/settings/Users";
import Roles from "./pages/settings/Roles";
import CompanySettings from "./pages/settings/CompanySettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/masters/products" element={<Products />} />
            <Route path="/masters/suppliers" element={<Suppliers />} />
            <Route path="/masters/customers" element={<Customers />} />
            <Route path="/masters/employees" element={<Employees />} />
            <Route path="/masters/warehouses" element={<Warehouses />} />
            <Route path="/masters/machines" element={<Machines />} />
            <Route path="/purchase/request" element={<PurchaseRequest />} />
            <Route path="/purchase/order" element={<PurchaseOrder />} />
            <Route path="/purchase/goods-receipt" element={<GoodsReceipt />} />
            <Route path="/purchase/supplier-payments" element={<SupplierPayments />}/>  
            <Route path="/inventory/stock-overview" element={<StockOverview />}/>
            <Route path="/inventory/stock-movement" element={<StockMovement />}/>    
            <Route path="/inventory/warehouse-transfer" element={<WarehouseTransfer />}/>   
            <Route path="/production/bom" element={<BOM />}/>    
            <Route path="/production/order" element={<ProductionOrder />}/>  
            <Route path="/production/tracking" element={<ProductionTracking />}/>   
            <Route path="/quality/check" element={<QualityCheck />}/>    
            <Route path="/quality/rejected" element={<RejectedQuarantine />}/>
            <Route path="/sales/customer-orders" element={<CustomerOrders />}/>
            <Route path="/sales/dispatch" element={<Dispatch />} />
            <Route path="/sales/invoice" element={<SalesInvoice />} />
            <Route path="/sales/customer-payments" element={<CustomerPayments />} />
            <Route path="/hr/attendance" element={<Attendance />} />
            <Route path="/hr/salary-wages" element={<SalaryWages />} />
            <Route path="/hr/payroll" element={<Payroll />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/purchase" element={<PurchaseReport />} />
            <Route path="/reports/stock" element={<StockReport />} />
            <Route path="/reports/production" element={<ProductionReport />}/>
            <Route path="/reports/sales" element={<SalesReport />} />
            <Route path="/reports/payments" element={<PaymentsReport />} />
            <Route path="/reports/hr" element={<HRReport />} />
            <Route path="/reports/quality" element={<QualityReport />} />
            <Route path="/reports/maintenance" element={<MaintenanceReport />}/>
            <Route path="/maintenance/records" element={<MaintenanceRecords />}/>
            <Route path="/settings/users" element={<Users />} />
            <Route path="/settings/roles" element={<Roles />} />
            <Route path="/reports/payroll" element={<PayrollReport />} />
            <Route path="/settings/company" element={<CompanySettings />} />
          </Route>

          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;