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
import { Transfer } from "./screens/Transfer";
import { AddMoney } from "./screens/AddMoney";
import { BillPayment } from "./screens/BillPayment";
import { Inbox } from "./screens/Inbox";
import { Ratings } from "./screens/Ratings";
import { SureSavings } from "./screens/SureSavings";
import { SureBudget } from "./screens/SureBudget";
import { SureEscrow } from "./screens/SureEscrow";
import { Notifications } from "./screens/Notifications";
import { Chat } from "./screens/Chat";

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
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="/sure-savings" element={<SureSavings />} />
          <Route path="/sure-budget" element={<SureBudget />} />
          <Route path="/sure-escrow" element={<SureEscrow />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  </StrictMode>,
);