import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "./contexts/AccountContext";
import { LandingPageDesktop } from "./screens/LandingPageDesktop";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { IndividualOnboarding } from "./screens/IndividualOnboarding";
import { Dashboard } from "./screens/Dashboard";
import { Payments } from "./screens/Payments";
import { Transactions } from "./screens/Transactions";
import { Cards } from "./screens/Cards";
import { Profile } from "./screens/Profile";
import { AdminDashboard, AdminProfile } from "./screens/AdminDashboard";
import { SuperAdminDashboard, SuperAdminProfile } from "./screens/SuperAdmin";
import { SupportDashboard, SupportProfile } from "./screens/Support";
import { DemoLogin } from "./screens/DemoLogin";
import { BusinessOnboarding } from "./screens/BusinessOnboarding/BusinessOnboarding";
import { BusinessDashboard } from "./screens/BusinessDashboard/BusinessDashboard";
import { Transfer } from "./screens/Transfer";
import { AddMoney } from "./screens/AddMoney";
import { BillPayment } from "./screens/BillPayment";
import { Inbox } from "./screens/Inbox";
import { Ratings } from "./screens/Ratings";
import { PayrollModule } from "./screens/BusinessDashboard/modules/PayrollModule";
import { BulkTransferModule } from "./screens/BusinessDashboard/modules/BulkTransferModule";
import { POSModule } from "./screens/BusinessDashboard/modules/POSModule";
import { BusinessLoanModule } from "./screens/BusinessDashboard/modules/BusinessLoanModule";
import { ReportsModule } from "./screens/BusinessDashboard/modules/ReportsModule";
import { SureSavings } from "./screens/SureSavings";
import { SureBudget } from "./screens/SureBudget";
import { SureEscrow } from "./screens/SureEscrow";
import { BusinessInbox } from "./screens/BusinessDashboard/modules/BusinessInbox";
import { BusinessRatings } from "./screens/BusinessDashboard/modules/BusinessRatings";
import { BusinessProfile } from "./screens/BusinessDashboard/modules/BusinessProfile";
import { Notifications } from "./screens/Notifications";
import { Chat } from "./screens/Chat";
import { DeveloperDashboard, DeveloperProfile } from "./screens/DeveloperDashboard";
import { ApprovalWorkflow } from "./screens/BusinessDashboard/modules/ApprovalWorkflow";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageDesktop />} />
          <Route path="/demo" element={<DemoLogin />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/individual-onboarding" element={<IndividualOnboarding />} />
          <Route path="/business-onboarding" element={<BusinessOnboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin-profile" element={<SuperAdminProfile />} />
          <Route path="/support" element={<SupportDashboard />} />
          <Route path="/support-profile" element={<SupportProfile />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route path="/bill-payment" element={<BillPayment />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/payroll" element={<PayrollModule />} />
          <Route path="/bulk-transfer" element={<BulkTransferModule />} />
          <Route path="/pos" element={<POSModule />} />
          <Route path="/loans" element={<BusinessLoanModule />} />
          <Route path="/reports" element={<ReportsModule />} />
          <Route path="/sure-savings" element={<SureSavings />} />
          <Route path="/sure-budget" element={<SureBudget />} />
          <Route path="/sure-escrow" element={<SureEscrow />} />
          <Route path="/business-inbox" element={<BusinessInbox />} />
          <Route path="/business-ratings" element={<BusinessRatings />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
          <Route path="/developer-profile" element={<DeveloperProfile />} />
          <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  </StrictMode>,
);