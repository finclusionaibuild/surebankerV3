import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { AccountSwitcher } from "../../components/ui/account-switcher";
import { AccountTypeSwitcher } from "../../components/ui/account-type-switcher";
import { ProfileDropdown } from "../../components/ui/profile-dropdown";
import { BusinessTourGuide, businessDashboardTourSteps } from "../../components/ui/business-tour-guide";
import { KYBTier3Verification } from "../../components/ui/kyb-tier3-verification";
import { KYBVerification } from "../../components/ui/kyb-verification";
import { KYBVerificationSystem } from "../../components/ui/kyb-verification-system";
import { BankStatementGenerator } from "../../components/ui/bank-statement-generator";
import { Sidebar } from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  PlusIcon, 
  ArrowRightIcon, 
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  CreditCardIcon,
  DollarSignIcon,
  BarChart3Icon,
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  MoreHorizontalIcon,
  ShieldIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingIcon,
  WalletIcon,
  UserIcon,
  PhoneIcon,
  ZapIcon,
  TvIcon,
  GraduationCapIcon,
  FileTextIcon,
  CopyIcon,
  RefreshCwIcon,
  SettingsIcon,
  HelpCircleIcon,
  PlayIcon,
  HomeIcon,
  ReceiptIcon,
  HandshakeIcon,
  InboxIcon,
  StarIcon
} from "lucide-react";

export const BusinessDashboard = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const navigate = useNavigate();

  // Multiple business accounts data - moved before useState hooks
  const businessAccounts = [
    {
      id: 'main',
      name: 'Atinse Enterprises',
      type: 'Main Business',
      balance: 2500000,
      employees: 247,
      status: 'Active',
      kybTier: 3,
      avatar: 'AE'
    },
    {
      id: 'subsidiary1',
      name: 'Atinse Tech Solutions',
      type: 'Subsidiary',
      balance: 850000,
      employees: 45,
      status: 'Active',
      kybTier: 2,
      avatar: 'AT'
    },
    {
      id: 'subsidiary2',
      name: 'Atinse Logistics',
      type: 'Subsidiary',
      balance: 420000,
      employees: 28,
      status: 'Active',
      kybTier: 2,
      avatar: 'AL'
    },
    {
      id: 'branch1',
      name: 'Atinse Ghana Branch',
      type: 'Branch Office',
      balance: 650000,
      employees: 67,
      status: 'Active',
      kybTier: 3,
      avatar: 'AG'
    },
    {
      id: 'branch2',
      name: 'Atinse Kenya Branch',
      type: 'Branch Office',
      balance: 380000,
      employees: 34,
      status: 'Pending Setup',
      kybTier: 1,
      avatar: 'AK'
    }
  ];

  const [showTour, setShowTour] = useState(false);
  const [showKYBTier3Modal, setShowKYBTier3Modal] = useState(false);
  const [showKYBModal, setShowKYBModal] = useState(false);
  const [showKYBSystem, setShowKYBSystem] = useState(false);
  const [showBankStatement, setShowBankStatement] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('main');
  const [selectedBusinessAccount, setSelectedBusinessAccount] = useState('main');

  const currentBusinessAccount = businessAccounts.find(acc => acc.id === selectedBusinessAccount) || businessAccounts[0];
  const [kybTier, setKybTier] = useState(currentBusinessAccount?.kybTier || 1);

  // Redirect individual accounts to individual dashboard
  useEffect(() => {
    const accountType = localStorage.getItem('accountType');
    if (accountType !== 'business') {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Check if this is first time user to show tour guide
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('businessTourCompleted');
    const businessOnboardingComplete = localStorage.getItem('businessOnboardingComplete');
    const isFirstTime = businessOnboardingComplete && !hasSeenTour;
    
    if (isFirstTime) {
      setShowTour(true);
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('businessTourCompleted', 'true');
  };

  const handleTourSkip = () => {
    setShowTour(false);
    localStorage.setItem('businessTourCompleted', 'true');
  };

  // Multi-tier wallet data
  const wallets = [
    {
      id: 'main',
      name: 'Main Wallet',
      balance: 2500000,
      type: 'Primary',
      color: 'bg-[#5B52FF]',
      icon: <WalletIcon className="w-6 h-6" />
    },
    {
      id: 'staff',
      name: 'Staff Wallet',
      balance: 800000,
      type: 'Department',
      color: 'bg-green-500',
      icon: <UsersIcon className="w-6 h-6" />
    },
    {
      id: 'ops',
      name: 'Operations Wallet',
      balance: 450000,
      type: 'Department',
      color: 'bg-orange-500',
      icon: <SettingsIcon className="w-6 h-6" />
    }
  ];

  const currentWallet = wallets.find(w => w.id === selectedWallet) || wallets[0];

  // Business metrics
  const businessMetrics = [
    {
      title: "Monthly Revenue",
      value: "₦12,500,000",
      change: "+15.3%",
      trend: "up",
      icon: <TrendingUpIcon className="w-6 h-6" />,
      color: "text-green-600"
    },
    {
      title: "Active Employees",
      value: "247",
      change: "+12",
      trend: "up",
      icon: <UsersIcon className="w-6 h-6" />,
      color: "text-blue-600"
    },
    {
      title: "Monthly Expenses",
      value: "₦8,200,000",
      change: "-5.2%",
      trend: "down",
      icon: <TrendingDownIcon className="w-6 h-6" />,
      color: "text-red-600"
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "+8",
      trend: "up",
      icon: <ClockIcon className="w-6 h-6" />,
      color: "text-yellow-600"
    }
  ];

  // Business Quick Actions - Enhanced
  const businessQuickActions = [
    {
      title: "Payroll",
      description: "Process salary payments",
      icon: <UsersIcon className="w-6 h-6" />,
      color: "bg-blue-500",
      action: () => navigate("/payroll"),
      kybRequired: 3
    },
    {
      title: "Bulk Transfer",
      description: "Upload CSV for payments",
      icon: <FileTextIcon className="w-6 h-6" />,
      color: "bg-green-500",
      action: () => navigate("/bulk-transfer"),
      kybRequired: 2
    }
    // ... other actions
  ];

  // Quick actions for business
  const quickActions = [
    {
      title: "Payroll",
      description: "Process salary payments",
      icon: <UsersIcon className="w-6 h-6" />,
      color: "bg-blue-500",
      action: () => navigate("/payroll"),
      kybRequired: 3
    },
    {
      title: "Bulk Transfer",
      description: "Upload CSV for payments",
      icon: <FileTextIcon className="w-6 h-6" />,
      color: "bg-green-500",
      action: () => navigate("/bulk-transfer"),
      kybRequired: 2
    },
    {
      title: "Approval Workflow",
      description: "Manage approval processes",
      icon: <CheckCircleIcon className="w-6 h-6" />,
      color: "bg-indigo-500",
      action: () => navigate("/approval-workflow"),
      kybRequired: 2
    },
    {
      title: "Vendor Payment",
      description: "Pay suppliers & vendors",
      icon: <BuildingIcon className="w-6 h-6" />,
      color: "bg-purple-500",
      action: () => navigate("/vendors"),
      kybRequired: 2
    },
    {
      title: "POS Dashboard",
      description: "View merchant transactions",
      icon: <CreditCardIcon className="w-6 h-6" />,
      color: "bg-orange-500",
      action: () => navigate("/pos"),
      kybRequired: 3
    },
    {
      title: "Business Loan",
      description: "Apply for capital",
      icon: <DollarSignIcon className="w-6 h-6" />,
      color: "bg-indigo-500",
      action: () => navigate("/loans"),
      kybRequired: 3
    },
    {
      title: "Reports",
      description: "Generate statements",
      icon: <BarChart3Icon className="w-6 h-6" />,
      color: "bg-teal-500",
      action: () => navigate("/reports"),
      kybRequired: 1
    }
  ];

  // Bill payment categories for business
  const billCategories = [
    { title: "Airtime/Data", icon: <PhoneIcon className="w-5 h-5" />, color: "bg-blue-500" },
    { title: "Electricity", icon: <ZapIcon className="w-5 h-5" />, color: "bg-yellow-500" },
    { title: "Cable TV", icon: <TvIcon className="w-5 h-5" />, color: "bg-purple-500" },
    { title: "Education", icon: <GraduationCapIcon className="w-5 h-5" />, color: "bg-green-500" }
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: "1",
      type: "Payroll",
      description: "Monthly salary disbursement",
      amount: "-₦2,450,000",
      status: "Completed",
      date: "Today, 2:30 PM",
      category: "Staff Payment"
    },
    {
      id: "2",
      type: "Vendor Payment",
      description: "Office supplies - ABC Ltd",
      amount: "-₦125,000",
      status: "Pending Approval",
      date: "Today, 11:15 AM",
      category: "Operations"
    },
    {
      id: "3",
      type: "Revenue",
      description: "Client payment - XYZ Corp",
      amount: "+₦850,000",
      status: "Completed",
      date: "Yesterday, 4:45 PM",
      category: "Income"
    },
    {
      id: "4",
      type: "Utility",
      description: "Electricity bill payment",
      amount: "-₦45,000",
      status: "Completed",
      date: "Yesterday, 10:20 AM",
      category: "Bills"
    }
  ];

  // Pending approvals
  const pendingApprovals = [
    {
      id: "1",
      type: "Large Transfer",
      description: "Vendor payment to Tech Solutions Ltd",
      amount: "₦500,000",
      requestedBy: "John Manager",
      date: "2 hours ago"
    },
    {
      id: "2",
      type: "Bulk Payment",
      description: "Contractor payments (15 recipients)",
      amount: "₦1,200,000",
      requestedBy: "Sarah Admin",
      date: "4 hours ago"
    },
    {
      id: "3",
      type: "New Employee",
      description: "Add new employee to payroll",
      amount: "₦180,000/month",
      requestedBy: "HR Department",
      date: "1 day ago"
    }
  ];

  const handleQuickActionClick = (action: any) => {
    if (action.kybRequired && kybTier < action.kybRequired) {
      setShowKYBTier3Modal(true);
    } else {
      action.action();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tour Guide */}
      <BusinessTourGuide
        steps={businessDashboardTourSteps}
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />

      {/* KYB Tier 3 Verification Modal */}
      <KYBTier3Verification
        isOpen={showKYBTier3Modal}
        onClose={() => setShowKYBTier3Modal(false)}
        currentTier={kybTier}
        onUpgrade={(tier) => setKybTier(tier)}
      />

      {/* KYB Verification Modal */}
      <KYBVerification
        isOpen={showKYBModal}
        onClose={() => setShowKYBModal(false)}
        currentTier={kybTier}
        onUpgrade={(tier) => setKybTier(tier)}
      />

      {/* Comprehensive KYB Verification System */}
      <KYBVerificationSystem
        isOpen={showKYBSystem}
        onClose={() => setShowKYBSystem(false)}
        currentTier={kybTier}
        onTierUpgrade={(tier) => setKybTier(tier)}
      />

      {/* Bank Statement Generator */}
      <BankStatementGenerator
        isOpen={showBankStatement}
        onClose={() => setShowBankStatement(false)}
        accountType="business"
        accountData={currentAccount}
      />

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Business Sidebar - Completely Separate */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Business Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                BUSINESS MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
                  active: true,
                  onClick: () => navigate("/business-dashboard")
                },
                { 
                  name: "Payroll", 
                  icon: <UsersIcon className="w-5 h-5" />,
                  onClick: () => navigate("/payroll")
                },
                { 
                  name: "Bulk Transfer", 
                  icon: <FileTextIcon className="w-5 h-5" />,
                  onClick: () => navigate("/bulk-transfer")
                },
                { 
                  name: "Approval Workflow", 
                  icon: <CheckCircleIcon className="w-5 h-5" />,
                  onClick: () => navigate("/approval-workflow")
                },
                { 
                  name: "POS Dashboard", 
                  icon: <CreditCardIcon className="w-5 h-5" />,
                  onClick: () => navigate("/pos")
                },
                { 
                  name: "Business Loans", 
                  icon: <DollarSignIcon className="w-5 h-5" />,
                  onClick: () => navigate("/loans")
                },
                { 
                  name: "Reports", 
                  icon: <BarChart3Icon className="w-5 h-5" />,
                  onClick: () => navigate("/reports")
                },
                { 
                  name: "Inbox", 
                  icon: <InboxIcon className="w-5 h-5" />, 
                  notifications: 99,
                  onClick: () => navigate("/business-inbox")
                },
                { 
                  name: "Rate Us", 
                  icon: <StarIcon className="w-5 h-5" />,
                  onClick: () => navigate("/business-ratings")
                }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    item.active
                      ? "bg-[#5B52FF] text-white shadow-lg"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#5B52FF]"
                  }`}
                >
                  <div className={`${item.active ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {item.notifications && (
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto animate-pulse">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Business Refer & Earn Card */}
          <div className="p-4">
            <Card className="bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#1E293B] text-white overflow-hidden relative card-no-shadow">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#5B52FF]/20 to-transparent rounded-full -mr-10 -mt-10"></div>
              <CardContent className="p-4 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5B52FF] to-[#7C3AED] rounded-full flex items-center justify-center">
                    <BuildingIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Account</p>
                    <p className="text-sm text-gray-300">Premium Features</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white shadow-lg btn-primary">
                  Refer & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40" data-tour="dashboard-header">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B]">
                  Good day, {currentAccount?.name?.split(' ')[0] || 'Business Owner'}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2"
                  onClick={() => setShowTour(true)}
                >
                  <PlayIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    onClick={() => navigate("/business-inbox")}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'Business Admin'}</div>
                    <div className="text-xs text-[#64748B]">Business Account</div>
                  </div>
                  <ProfileDropdown
                    userName={currentAccount?.name || 'Business Admin'}
                    userRole="Business Account"
                    avatar={currentAccount?.avatar || 'BA'}
                    profileRoute="/business-profile"
                    accountType="business"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            {/* Business Account Selector */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                      <BuildingIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Business Account Selector</h3>
                      <p className="text-sm text-blue-700">Switch between your linked business accounts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select 
                      value={selectedBusinessAccount}
                      onChange={(e) => setSelectedBusinessAccount(e.target.value)}
                      className="px-4 py-2 border border-blue-300 rounded-lg bg-white text-sm min-w-[200px]"
                    >
                      {businessAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} ({account.type})
                        </option>
                      ))}
                    </select>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Link Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Business Account Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-[#5B52FF] text-white text-xl">
                        {currentBusinessAccount.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-[#1E293B]">{currentBusinessAccount.name}</h2>
                      <p className="text-[#64748B]">{currentBusinessAccount.type}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={
                          currentBusinessAccount.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }>
                          {currentBusinessAccount.status}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          KYB Tier {currentBusinessAccount.kybTier}
                        </Badge>
                        <Badge variant="outline">
                          {currentBusinessAccount.employees} Employees
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#64748B]">Account Balance</p>
                    <p className="text-2xl font-bold text-[#1E293B]">₦{currentBusinessAccount.balance.toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3Icon className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* KYB Status Banner */}
            {kybTier < 3 && (
              <Card className="mb-6 bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangleIcon className="w-6 h-6 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-yellow-900">
                        Upgrade Your KYB Verification
                      </h3>
                      <p className="text-sm text-yellow-700">
                        Unlock all business features with Tier 3 verification
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowKYBSystem(true)}
                    className="bg-yellow-600 text-white hover:bg-yellow-700"
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Business Metrics */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {businessMetrics.map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        metric.color.includes('green') ? 'bg-green-100' :
                        metric.color.includes('blue') ? 'bg-blue-100' :
                        metric.color.includes('red') ? 'bg-red-100' :
                        'bg-yellow-100'
                      }`}>
                        <div className={metric.color}>
                          {metric.icon}
                        </div>
                      </div>
                      <Badge className={`${
                        metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {metric.change}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-[#64748B] mb-1">{metric.title}</h3>
                    <p className="text-2xl font-bold text-[#1E293B]">{metric.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-8">
                {/* Multi-tier Wallets */}
                <div data-tour="wallet-section">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#1E293B]">Business Wallets</h2>
                    <Button variant="outline" size="sm">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Wallet
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {wallets.map((wallet) => (
                      <Card 
                        key={wallet.id}
                        className={`cursor-pointer transition-all ${
                          selectedWallet === wallet.id ? 'ring-2 ring-[#5B52FF]' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedWallet(wallet.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-white`}>
                              {wallet.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-[#1E293B]">{wallet.name}</h3>
                              <p className="text-xs text-[#64748B]">{wallet.type}</p>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-[#1E293B]">
                            ₦{wallet.balance.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Selected Wallet Details */}
                  <Card className="bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{currentWallet.name}</h3>
                          <p className="text-white/80">Available Balance</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                            <ArrowRightIcon className="w-4 h-4 mr-2" />
                            Transfer
                          </Button>
                          <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                            <DownloadIcon className="w-4 h-4 mr-2" />
                            Statement
                          </Button>
                        </div>
                      </div>
                      <p className="text-3xl font-bold mb-4">
                        ₦{currentWallet.balance.toLocaleString()}
                      </p>
                      <p className="text-white/80 text-sm">
                        Last updated: Today at 2:30 PM
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div data-tour="quick-actions">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => handleQuickActionClick(action)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 text-white relative`}>
                            {action.icon}
                            {action.kybRequired && kybTier < action.kybRequired && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">!</span>
                              </div>
                            )}
                          </div>
                          <h4 className="font-medium text-[#1E293B] mb-1">{action.title}</h4>
                          <p className="text-xs text-[#64748B]">{action.description}</p>
                          {action.kybRequired && kybTier < action.kybRequired && (
                            <p className="text-xs text-red-600 mt-1">Requires KYB Tier {action.kybRequired}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Bill Payments */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Bill Payments</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {billCategories.map((category, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white`}>
                            {category.icon}
                          </div>
                          <p className="text-sm font-medium text-[#1E293B]">{category.title}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Pending Approvals */}
                <Card data-tour="approvals-section">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Pending Approvals</h3>
                      <Badge className="bg-red-100 text-red-800">
                        {pendingApprovals.length}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-[#1E293B] text-sm">{approval.type}</h4>
                            <span className="text-sm font-semibold text-[#1E293B]">{approval.amount}</span>
                          </div>
                          <p className="text-xs text-[#64748B] mb-1">{approval.description}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-[#64748B]">By {approval.requestedBy}</p>
                            <p className="text-xs text-[#64748B]">{approval.date}</p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 h-6 px-2 text-xs">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Recent Transactions</h3>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.amount.startsWith('+') ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.amount.startsWith('+') ? 
                                <TrendingUpIcon className="w-4 h-4 text-green-600" /> :
                                <TrendingDownIcon className="w-4 h-4 text-red-600" />
                              }
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#1E293B]">{transaction.type}</p>
                              <p className="text-xs text-[#64748B]">{transaction.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-semibold ${
                              transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-[#64748B]">{transaction.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Flow Summary */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Cash Flow Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#64748B]">Total Inflow (This Month)</span>
                        <span className="font-semibold text-green-600">+₦12,500,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#64748B]">Total Outflow (This Month)</span>
                        <span className="font-semibold text-red-600">-₦8,200,000</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#1E293B]">Net Cash Flow</span>
                          <span className="font-bold text-green-600">+₦4,300,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-white">
        {/* Mobile Header */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={selectedBusinessAccount}
                onChange={(e) => setSelectedBusinessAccount(e.target.value)}
                className="appearance-none bg-transparent border-none text-transparent cursor-pointer absolute inset-0 w-full h-full z-10"
              >
                {businessAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
              <Avatar className="w-10 h-10 pointer-events-none">
                <AvatarFallback className="bg-[#5B52FF] text-white">
                  {currentBusinessAccount.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">{currentBusinessAccount.name}</h1>
              <p className="text-xs text-[#64748B]">{currentBusinessAccount.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                {pendingApprovals.length}
              </Badge>
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4 pb-20">
          {/* Mobile Account Type Switcher */}
          <div className="mb-6">
            <AccountTypeSwitcher variant="mobile" />
          </div>

          {/* Mobile Business Account Selector */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <BuildingIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Switch Business Account</h3>
              </div>
              <select 
                value={selectedBusinessAccount}
                onChange={(e) => setSelectedBusinessAccount(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white text-sm"
              >
                {businessAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.type}) - ₦{account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Badge className={
                    currentBusinessAccount.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }>
                    {currentBusinessAccount.status}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    KYB Tier {currentBusinessAccount.kybTier}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Link
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* KYB Banner */}
          {kybTier < 3 && (
            <Card className="mb-6 bg-yellow-50 border-yellow-200" data-tour="kyb-banner">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangleIcon className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-900">Upgrade to KYB Tier 3</h3>
                </div>
                <p className="text-sm text-yellow-700 mb-3">
                  You're currently on Tier {kybTier}. Upgrade to Tier 3 to unlock all business features including payroll, POS integration, and business loans.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => setShowKYBSystem(true)}
                  className="bg-yellow-600 text-white"
                >
                  Upgrade to Tier 3
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Mobile Wallet Selector */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#1E293B]">{currentWallet.name} - {currentBusinessAccount.name}</h3>
                <select 
                  value={selectedWallet}
                  onChange={(e) => setSelectedWallet(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  {wallets.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                  ))}
                </select>
              </div>
              <p className="text-2xl font-bold text-[#1E293B] mb-2">
                ₦{(currentWallet.balance * (currentBusinessAccount.id === 'main' ? 1 : 0.6)).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#5B52FF] text-white flex-1">
                  Transfer
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Statement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {quickActions.slice(0, 4).map((action, index) => (
              <Card key={index} className="cursor-pointer" onClick={() => handleQuickActionClick(action)}>
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white relative`}>
                    {action.icon}
                    {action.kybRequired && kybTier < action.kybRequired && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">!</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#1E293B]">{action.title}</p>
                  {action.kybRequired && kybTier < action.kybRequired && (
                    <p className="text-xs text-red-600">Tier {action.kybRequired} required</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {businessMetrics.slice(0, 4).map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={metric.color}>{metric.icon}</div>
                    <Badge className={`text-xs ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {metric.change}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B] mb-1">{metric.title}</p>
                  <p className="text-lg font-bold text-[#1E293B]">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Pending Approvals */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1E293B]">Pending Approvals</h3>
                <Badge className="bg-red-100 text-red-800">{pendingApprovals.length}</Badge>
              </div>
              <div className="space-y-3">
                {pendingApprovals.slice(0, 2).map((approval) => (
                  <div key={approval.id} className="border-l-4 border-yellow-400 pl-3 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-[#1E293B] text-sm">{approval.type}</h4>
                      <span className="text-sm font-semibold text-[#1E293B]">{approval.amount}</span>
                    </div>
                    <p className="text-xs text-[#64748B] mb-2">{approval.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 text-white h-6 px-2 text-xs">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Home", icon: <BuildingIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/business-dashboard") },
              { name: "Payroll", icon: <UsersIcon className="w-6 h-6" />, onClick: () => navigate("/payroll") },
              { name: "Reports", icon: <BarChart3Icon className="w-6 h-6" />, onClick: () => navigate("/reports") },
              { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center py-2 cursor-pointer" onClick={item.onClick}>
                <div className={`${item.active ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};