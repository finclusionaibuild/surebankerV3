import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext"; 
import { useAccountNavigation } from "../../hooks/useAccountData";
import { AccountSwitcher } from "../../components/ui/account-switcher";
import { AccountDetailsPopup } from "../../components/ui/account-details-popup";
import { ProfileDropdown } from "../../components/ui/profile-dropdown";
import { IndividualTourGuide, individualDashboardTourSteps } from "../../components/ui/individual-tour-guide";
import { MultiTierKYC } from "../../components/ui/multi-tier-kyc";
import { MultiTierKYCFlow } from "../../components/ui/multi-tier-kyc-flow";
import { KYCIndividualVerification } from "../../components/ui/kyc-individual-verification";
import { EnhancedKYCSystem } from "../../components/ui/enhanced-kyc-system";
import { QRCodeSystem } from "../../components/ui/qr-code-system";
import { ReferralSystem } from "../../components/ui/referral-system";
import { AdvancedSecurity } from "../../components/ui/advanced-security";
import { BulkScheduleTransfer } from "../../components/ui/bulk-schedule-transfer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  CreditCardIcon,
  HelpCircleIcon,
  LogOutIcon,
  EditIcon,
  HomeIcon,
  ReceiptIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
  CameraIcon,
  UploadIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  KeyIcon,
  SmartphoneIcon,
  BellRingIcon,
  LanguagesIcon,
  PaletteIcon,
  DownloadIcon,
  ShareIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  FileTextIcon,
  AlertCircleIcon,
  InfoIcon,
  TrendingUpIcon,
  DollarSignIcon,
  WalletIcon,
  CopyIcon,
  RefreshCwIcon,
  PlusIcon,
  MinusIcon,
  ScanIcon,
  QrCodeIcon,
  FingerprintIcon,
  ShieldCheckIcon,
  WifiIcon,
  ZapIcon,
  TvIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FilterIcon,
  MoreHorizontalIcon
} from "lucide-react";
import { PlayIcon } from "lucide-react";

export const Dashboard = () => {
  const { currentAccount, isBusinessAccount, accountType } = useAccount();
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showEnhancedKYC, setShowEnhancedKYC] = useState(false);
  const [showMultiTierKYC, setShowMultiTierKYC] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Year');
  const [selectedStatPeriod, setSelectedStatPeriod] = useState('This Month');
  const [showSecurity, setShowSecurity] = useState(false);
  const [showBulkTransfer, setShowBulkTransfer] = useState(false);
  const [kycLevel, setKycLevel] = useState(0);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
  // Redirect business accounts to business dashboard
  useEffect(() => {
    if (isBusinessAccount) {
      navigate('/business-dashboard');
    }
  }, [isBusinessAccount, navigate]);

  // If this is a business account, don't render individual dashboard
  if (isBusinessAccount) {
    return null;
  }

  // Check if this is first time user to show tour guide
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('individualTourCompleted');
    const individualOnboardingComplete = localStorage.getItem('individualOnboardingComplete');
    const isFirstTime = individualOnboardingComplete && !hasSeenTour;
    
    if (isFirstTime) {
      setShowTour(true);
    }
    
    setKycLevel(parseInt(localStorage.getItem('kycLevel') || '0'));
  }, []);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30days");

  // Account details data
  const accountDetailsData = {
    status: "Active",
    accountTier: "Tier 3",
    walletId: "SB075725NG",
    bankAccountNumber: "1002334534",
    bankName: "VFD Microfinance Bank",
    accountName: "SureBanker - Cletus Kayode Rayo"
  };

  // Account cards data matching Figma design exactly
  const accountCards = [
    {
      type: "SureBanker",
      title: "Current Balance",
      amount: "₦120,000.00",
      bgColor: "bg-gradient-to-br from-[#5B52FF] to-[#7C3AED]",
      textColor: "text-white",
      details: "Tap to view Account Details",
      hasDecorations: true
    },
    {
      type: "SureSavings",
      title: "Yesterday interest",
      amount: "₦120,000.00",
      interest: "+₦18,000",
      bgColor: "bg-gradient-to-br from-[#ffbd16] to-[#f59e0b]",
      textColor: "text-white"
    },
    {
      type: "SureBudget",
      amount: "₦120,000.00",
      bgColor: "bg-gradient-to-br from-[#ffbd16] to-[#f59e0b]",
      textColor: "text-white"
    },
    {
      type: "SureEscrow",
      amount: "₦120,000.00",
      bgColor: "bg-gradient-to-br from-[#7007f6] to-[#8b5cf6]",
      textColor: "text-white",
      jobs: "12",
      hasJobsIndicator: true
    }
  ];

  // Quick actions data
  const quickActions = [
    { title: "Airtime", icon: <PhoneIcon className="w-6 h-6" />, color: "bg-blue-100", iconColor: "text-blue-600", action: () => navigate("/bill-payment?type=airtime") },
    { title: "Data", icon: <WifiIcon className="w-6 h-6" />, color: "bg-green-100", iconColor: "text-green-600", action: () => navigate("/bill-payment?type=data") },
    { title: "Bills", icon: <ZapIcon className="w-6 h-6" />, color: "bg-yellow-100", iconColor: "text-yellow-600", action: () => navigate("/bill-payment?type=electricity") }
  ];

  // Tap to send contacts
  const tapToSendContacts = [
    { name: "Tosin", avatar: "T", action: () => navigate("/transfer") },
    { name: "Walmart", avatar: "W", action: () => navigate("/transfer") },
    { name: "Dada", avatar: "D", action: () => navigate("/transfer") },
    { name: "Tosin", avatar: "T", action: () => navigate("/transfer") },
    { name: "Walmart", avatar: "W", action: () => navigate("/transfer") }
  ];

  // Monthly data for cashflow chart
  const monthlyData = [
    { month: "Jan", income: 80000, expense: 45000 },
    { month: "Feb", income: 95000, expense: 52000 },
    { month: "Mar", income: 110000, expense: 48000 },
    { month: "Apr", income: 88000, expense: 55000 },
    { month: "May", income: 120000, expense: 60000 },
    { month: "Jun", income: 135000, expense: 58000 },
    { month: "Jul", income: 98000, expense: 62000 },
    { month: "Aug", income: 115000, expense: 65000 },
    { month: "Sep", income: 125000, expense: 70000 },
    { month: "Oct", income: 140000, expense: 68000 },
    { month: "Nov", income: 130000, expense: 72000 },
    { month: "Dec", income: 145000, expense: 75000 }
  ];

  const currentCashflowData = monthlyData;
  const totalBalance = 120000;
  const totalIncome = 48000;
  const totalExpense = 30000;

  // Expense categories for statistics
  const expenseCategories = [
    { name: "Rent & Living", percentage: 60, amount: "₦10,100", color: "bg-[#1c274c]" },
    { name: "Investment", percentage: 15, amount: "₦500", color: "bg-[#a6a4fa]" },
    { name: "Education", percentage: 12, amount: "₦500", color: "bg-[#e1e1ee]" },
    { name: "Food & Drink", percentage: 8, amount: "₦500", color: "bg-[#f1f1f1]" },
    { name: "Entertainment", percentage: 5, amount: "₦500", color: "bg-[#c0c0c0]" }
  ];

  // Transaction data matching Figma design exactly
  const transactions = [
    {
      id: "1",
      firstName: "Oyi",
      middleName: "Chijioke",
      lastName: "Nneka",
      type: "Credit",
      bank: "Zenith",
      amount: "₦100,000",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Buying Fuel",
      status: "Failed",
      avatar: "O",
      bgColor: "bg-red-100"
    },
    {
      id: "2",
      firstName: "Francis",
      middleName: "Obinna",
      lastName: "Okafor",
      type: "Debit",
      bank: "GTB",
      amount: "₦100,000",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Cash Deposit",
      status: "Successful",
      avatar: "F",
      bgColor: "bg-orange-100"
    },
    {
      id: "3",
      firstName: "Airtel VTU NG",
      middleName: "-",
      lastName: "-",
      type: "Debit",
      bank: "-",
      amount: "₦100,000",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Airtime Purchase",
      status: "Failed",
      avatar: "A",
      bgColor: "bg-red-100"
    },
    {
      id: "4",
      firstName: "Kwese TV",
      middleName: "-",
      lastName: "-",
      type: "Debit",
      bank: "UBA",
      amount: "₦20,000",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Dish Subscription",
      status: "Successful",
      avatar: "K",
      bgColor: "bg-purple-100"
    },
    {
      id: "5",
      firstName: "Dominic",
      middleName: "Emeka",
      lastName: "Ojebor",
      type: "Credit",
      bank: "Unity",
      amount: "₦32,000",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Buying Fuel",
      status: "Failed",
      avatar: "D",
      bgColor: "bg-green-100"
    },
    {
      id: "6",
      firstName: "Temitope",
      middleName: "Tolu",
      lastName: "Adeniyi",
      type: "Credit",
      bank: "GTB",
      amount: "₦21,456",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Airtime Purchase",
      status: "Pending",
      avatar: "T",
      bgColor: "bg-yellow-100"
    },
    {
      id: "7",
      firstName: "Emma",
      middleName: "Adaobi",
      lastName: "Sotomi",
      type: "Credit",
      bank: "UBA",
      amount: "₦1,072,000.00",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Buying Fuel",
      status: "Failed",
      avatar: "E",
      bgColor: "bg-teal-100"
    },
    {
      id: "8",
      firstName: "IKEDC",
      middleName: "-",
      lastName: "-",
      type: "Debit",
      bank: "Unity",
      amount: "₦32,800",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Electricity",
      status: "Pending",
      avatar: "I",
      bgColor: "bg-yellow-100"
    },
    {
      id: "9",
      firstName: "Marie",
      middleName: "Chinwe",
      lastName: "Stone",
      type: "Credit",
      bank: "GTB",
      amount: "₦21,890",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Buying Fuel",
      status: "Successful",
      avatar: "M",
      bgColor: "bg-green-100"
    },
    {
      id: "10",
      firstName: "Anne",
      middleName: "Nneka",
      lastName: "Unbridge",
      type: "Credit",
      bank: "Zenith",
      amount: "₦21,456",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      description: "Airtime Purchase",
      status: "Pending",
      avatar: "A",
      bgColor: "bg-yellow-100"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "credit") return transaction.type === "Credit";
    if (selectedFilter === "debit") return transaction.type === "Debit";
    if (selectedFilter === "successful") return transaction.status === "Successful";
    if (selectedFilter === "pending") return transaction.status === "Pending";
    if (selectedFilter === "failed") return transaction.status === "Failed";
    return true;
  });

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('individualTourCompleted', 'true');
  };

  const handleTourSkip = () => {
    setShowTour(false);
    localStorage.setItem('individualTourCompleted', 'true');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tour Guide */}
      <IndividualTourGuide
        steps={individualDashboardTourSteps}
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
      />

      {/* KYC Verification Modal */}
      <KYCIndividualVerification
        isOpen={showKYCModal}
        onClose={() => setShowKYCModal(false)}
        currentTier={kycLevel}
        onUpgrade={(tier) => {
          setKycLevel(tier);
          localStorage.setItem('kycLevel', tier.toString());
        }}
      />

      {/* Multi-Tier KYC Modal */}
      <MultiTierKYC
        isOpen={showMultiTierKYC}
        onClose={() => setShowMultiTierKYC(false)}
        currentTier={kycLevel}
        onTierComplete={(tier) => setKycLevel(tier)}
      />

      {/* Multi-Tier KYC Flow */}
      <MultiTierKYCFlow
        isOpen={showMultiTierKYC}
        onClose={() => setShowMultiTierKYC(false)}
        currentTier={kycLevel}
        onTierComplete={(tier) => {
          setKycLevel(tier);
          setShowMultiTierKYC(false);
        }}
      />

      {/* Enhanced KYC System */}
      <EnhancedKYCSystem
        isOpen={showEnhancedKYC}
        onClose={() => setShowEnhancedKYC(false)}
        currentTier={kycLevel}
        onUpgrade={(tier) => {
          setKycLevel(tier);
          localStorage.setItem('kycLevel', tier.toString());
        }}
      />

      {/* QR Code System */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1E293B]">QR Code Transfer</h2>
                <Button variant="ghost" onClick={() => setShowQRCode(false)}>
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              <QRCodeSystem />
            </div>
          </div>
        </div>
      )}

      {/* Referral System */}
      {showReferrals && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1E293B]">Referrals & Rewards</h2>
                <Button variant="ghost" onClick={() => setShowReferrals(false)}>
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              <ReferralSystem />
            </div>
          </div>
        </div>
      )}

      {/* Advanced Security */}
      <AdvancedSecurity
        isOpen={showSecurity}
        onClose={() => setShowSecurity(false)}
      />

      {/* Bulk & Schedule Transfer */}
      <BulkScheduleTransfer
        isOpen={showBulkTransfer}
        onClose={() => setShowBulkTransfer(false)}
      />

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {[
                { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, active: true, hasDropdown: false, onClick: () => navigate("/dashboard") },
                { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: true, onClick: () => navigate("/payments") },
                { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/transactions") },
                { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/cards") },
                { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-savings") },
                { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-budget") },
                { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/sure-escrow") },
                { name: "Chat", icon: <MessageCircleIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/chat") },
                { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, hasDropdown: false, onClick: () => navigate("/inbox") },
                { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, hasDropdown: false, onClick: () => navigate("/ratings") }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="w-4 h-4 ml-auto" />
                  )}
                  {item.notifications && (
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                      {item.notifications}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Refer & Earn Card */}
          <div className="p-4">
            <Card className="bg-[#1E293B] text-white card-no-shadow">
              <CardContent className="p-4 relative">
                <p className="text-sm text-gray-300 mb-3">
                  Gain full access to rewards and bonuses when you get your friends to use{" "}
                  <span className="font-bold">SureBanker</span>
                </p>
                <Button className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white text-sm shadow-lg btn-primary">
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
                  Good day, {currentAccount?.name?.split(' ')[0] || 'Carchy'}
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
                
                <Button 
                  className="bg-[#5B52FF] text-white px-6 py-2 rounded-xl hover:bg-[#4338CA] btn-primary"
                  onClick={() => navigate("/add-money")}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
                
                <Button 
                  className="bg-[#5B52FF] text-white px-6 py-2 rounded-xl hover:bg-[#4338CA] btn-primary"
                  onClick={() => navigate("/transfer")}
                >
                  <ArrowRightIcon className="w-4 h-4 mr-2" />
                  Transfer
                </Button>

                <Button 
                  variant="outline"
                  onClick={() => setShowQRCode(true)}
                  className="px-4 py-2 rounded-xl"
                >
                  <QrCodeIcon className="w-4 h-4 mr-2" />
                  QR Code
                </Button>

                <div className="relative">
                  <Button size="sm" onClick={() => setShowMultiTierKYC(true)} className="bg-yellow-600 text-white">
                    <BellIcon className="w-5 h-5 text-[#64748B]" onClick={() => navigate("/notifications")} />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0" onClick={() => navigate("/inbox")}>
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'Carchy Atinse'}</div>
                  </div>
                  <ProfileDropdown
                    userName={currentAccount?.name || 'Carchy Atinse'}
                    userRole={isBusinessAccount ? 'Business Account' : 'Individual Account'}
                    avatar={currentAccount?.avatar || 'CA'}
                    profileRoute="/profile"
                    accountType={isBusinessAccount ? 'business' : 'individual'}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            {/* Account Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8" data-tour="account-cards">
              {accountCards.map((card, index) => (
                <Card
                  key={index}
                  className={`${card.bgColor} h-40 relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow card-no-shadow`}
                  onClick={index === 0 ? () => setShowAccountDetails(true) : undefined}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full relative">
                    {/* Decorative elements for SureBanker card */}
                    {card.hasDecorations && (
                      <>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
                        <div className="absolute top-8 right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                      </>
                    )}
                    
                    {/* Jobs indicator for SureEscrow */}
                    {card.hasJobsIndicator && (
                      <div className="absolute top-4 left-4">
                        <div className="text-xs text-white/80 mb-1">Jobs</div>
                        <div className="bg-[#5B52FF] w-8 h-8 rounded border-2 border-white flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{card.jobs}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className={`font-semibold text-sm mb-1 ${card.textColor}`}>{card.type}</div>
                      {card.title && (
                        <div className={`text-xs opacity-80 ${card.textColor}`}>{card.title}</div>
                      )}
                    </div>
                    <div className="relative z-10">
                      <div className={`font-bold text-xl ${card.textColor}`}>{card.amount}</div>
                      {card.interest && (
                        <div className="text-sm font-semibold text-white mt-1">{card.interest}</div>
                      )}
                      {card.details && (
                        <div className={`text-xs opacity-80 mt-2 ${card.textColor}`}>{card.details}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* KYC Notification */}
            <Card className="bg-[#f1f0ff] border border-[#a7a5ff] mb-8 card-no-shadow" data-tour="kyc-banner">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-[#5B52FF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1e1e1e] text-base">
                      Complete Your KYC
                    </div>
                    <div className="text-[#596682] text-sm">
                      Complete your KYC to create an account on surebanker.
                    </div>
                  </div>
                </div>
                <Button className="bg-[#5B52FF] text-white btn-primary" size="sm" onClick={() => setShowMultiTierKYC(true)}>
                  Complete KYC
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Quick Actions and Tap to Send */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <div data-tour="quick-actions">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer hover:shadow-lg transition-all card-no-shadow"
                        onClick={action.action}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <div className={action.iconColor}>
                              {action.icon}
                            </div>
                          </div>
                          <p className="text-sm font-medium text-[#1E293B]">{action.title}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Tap to Send */}
                <div data-tour="tap-to-send">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Tap to Send</h3>
                  <div className="flex gap-4">
                    {tapToSendContacts.map((contact, index) => (
                      <div key={index} className="flex flex-col items-center cursor-pointer" onClick={contact.action}>
                        <Avatar className="w-12 h-12 mb-2">
                          <AvatarFallback className="bg-[#f2f9ff] text-[#5B52FF]">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-[#64748B]">{contact.name}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/transfer")}>
                      <div className="w-12 h-12 bg-[#f5f5ff] rounded-full mb-2 flex items-center justify-center">
                        <PlusIcon className="w-5 h-5 text-[#5B52FF]" />
                      </div>
                      <span className="text-xs font-bold text-[#5B52FF]">Add</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Cashflow Chart */}
              <div data-tour="cashflow-chart">
                <Card className="border border-[#e4e6e5] card-no-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Cashflow</h3>
                      <select className="border border-[#e4e6e5] rounded px-3 py-1 text-sm">
                        <option>This Year</option>
                        <option>Last Year</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-[#64748B] mb-1">Total Balance</div>
                      <div className="text-2xl font-bold text-[#1E293B]">₦120,000</div>
                    </div>

                    <div className="flex gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#5B52FF] rounded-sm"></div>
                        <span className="text-[#64748B]">Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#1c274c] rounded-sm"></div>
                        <span className="text-[#64748B]">Expense</span>
                      </div>
                    </div>

                    {/* Chart visualization */}
                    <div className="h-48 flex items-end justify-between gap-2">
                      {monthlyData.map((month, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full h-40 relative">
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-[#5B52FF] rounded-t-sm"
                              style={{ height: `${Math.max((month.income / Math.max(...currentCashflowData.map(d => Math.max(d.income, d.expense)))) * 100, 10)}%` }}
                            ></div>
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-[#1c274c] rounded-t-sm"
                              style={{ 
                                height: `${Math.max((month.expense / Math.max(...currentCashflowData.map(d => Math.max(d.income, d.expense)))) * 100, 8)}%`,
                                bottom: `${(month.income / 150000) * 100}%`
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-[#64748B] mt-2">{month.month}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Statistics */}
              <div data-tour="expense-statistics">
                <Card className="border border-[#e6e6e6] card-no-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Statistic</h3>
                      <select className="text-sm border border-gray-300 rounded px-2 py-1">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="flex mb-4">
                      <div className="flex-1 pb-2 border-b border-[#f1f1f1] text-sm text-[#64748B]">
                        Income <span className="text-xs">(₦48,000)</span>
                      </div>
                      <div className="flex-1 pb-2 border-b-2 border-[#a6a4fa] text-sm font-semibold text-[#1c274c]">
                        Expense <span className="text-xs">(₦30,000)</span>
                      </div>
                    </div>

                    {/* Donut chart representation */}
                    <div className="h-32 flex items-center justify-center mb-4">
                      <div className="relative w-24 h-24 rounded-full border-8 border-[#1c274c] bg-white flex items-center justify-center">
                        <div className="absolute top-0 right-0 w-12 h-12 border-8 border-[#a6a4fa] rounded-tr-full"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-8 border-[#e1e1ee] rounded-br-full"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-8 border-[#f1f1f1] rounded-bl-full"></div>
                        <div className="text-center">
                          <div className="text-xs text-[#64748B]">Total Expense</div>
                          <div className="font-bold text-[#1c274c] text-lg">₦30,100</div>
                        </div>
                      </div>
                    </div>

                    {/* Expense categories */}
                    <div className="space-y-3">
                      {expenseCategories.map((category, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`${category.color} w-6 h-6 rounded flex items-center justify-center`}>
                              <span className="text-xs text-white font-medium">{category.percentage}%</span>
                            </div>
                            <div className="text-sm font-medium text-[#1E293B]">{category.name}</div>
                          </div>
                          <div className="text-sm font-semibold text-[#1E293B]">{category.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Transaction History */}
            <div className="mt-8" data-tour="transaction-history">
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#1E293B]">Transaction History</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <Input 
                          placeholder="Search" 
                          className="pl-10 w-48 h-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm h-10"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                      >
                        <option value="all">All Category</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm h-10">
                        <option>All Account</option>
                      </select>
                      <Button variant="outline" className="flex items-center gap-2 h-10">
                        <select 
                          value={selectedTimeframe}
                          onChange={(e) => setSelectedTimeframe(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white"
                        >
                          <option value="This Year">This Year</option>
                          <option value="Last 6 Months">Last 6 Months</option>
                          <option value="Last 3 Months">Last 3 Months</option>
                        </select>
                      </Button>
                      <Button className="bg-[#1c274c] text-white h-10 px-6">
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Transaction Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#5B52FF] text-white">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium">IMG</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">FIRST NAME</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">MIDDLE NAME</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">LAST NAME</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">TRANSACTION</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">BANK</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">AMOUNT</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">TRANSACTION ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">DATE</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">DESCRIPTION</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className={`${transaction.bgColor} text-gray-700`}>
                                  {transaction.avatar}
                                </AvatarFallback>
                              </Avatar>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#1E293B]">
                              {transaction.firstName}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#1E293B]">
                              {transaction.middleName}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#1E293B]">
                              {transaction.lastName}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  transaction.type === "Credit" ? "bg-green-100" : "bg-red-100"
                                }`}>
                                  {transaction.type === "Credit" ? (
                                    <ArrowUpIcon className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <ArrowDownIcon className="w-3 h-3 text-red-600" />
                                  )}
                                </div>
                                <span className={`text-sm font-medium ${
                                  transaction.type === "Credit" ? "text-green-600" : "text-red-600"
                                }`}>
                                  {transaction.type}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.bank}</td>
                            <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{transaction.amount}</td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.transactionId}</td>
                            <td className="py-3 px-4 text-sm text-[#1E293B]">{transaction.date}</td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.description}</td>
                            <td className="py-3 px-4">
                              <Badge 
                                className={`text-xs px-3 py-1 rounded-full ${
                                  transaction.status === "Successful" 
                                    ? "bg-green-100 text-green-800" 
                                    : transaction.status === "Failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {/* Account Details Popup */}
      <AccountDetailsPopup
        isOpen={showAccountDetails}
        onClose={() => setShowAccountDetails(false)}
        accountData={accountDetailsData}
      />

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'CA'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Good day, {currentAccount?.name?.split(' ')[0] || 'Carchy'}</h1>
              <p className="text-xs text-[#64748B]">Welcome back</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>NGN</span>
              <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Content - Standardized Layout */}
        <main className="p-4 pb-20">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button 
              className="flex-1 bg-[#5B52FF] text-white h-12 btn-primary"
              onClick={() => navigate("/add-money")}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Money
            </Button>
            <Button 
              className="flex-1 bg-[#5B52FF] text-white h-12 btn-primary"
              onClick={() => navigate("/transfer")}
            >
              <ArrowRightIcon className="w-4 h-4 mr-2" />
              Transfer
            </Button>
          </div>

          {/* Account Cards - Mobile Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {accountCards.map((card, index) => (
              <Card
                key={index}
                className={`${card.bgColor} h-32 relative overflow-hidden card-no-shadow`}
              >
                <CardContent className="p-4 flex flex-col justify-between h-full relative">
                  {card.hasDecorations && (
                    <>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                      <div className="absolute top-4 right-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                    </>
                  )}
                  
                  {card.hasJobsIndicator && (
                    <div className="absolute top-2 left-2">
                      <div className="text-xs text-white/80">Jobs</div>
                      <div className="bg-[#5B52FF] w-6 h-6 rounded border border-white flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{card.jobs}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`font-semibold text-xs mb-1 ${card.textColor}`}>{card.type}</div>
                    {card.title && (
                      <div className={`text-xs opacity-80 ${card.textColor}`}>{card.title}</div>
                    )}
                  </div>
                  <div className="relative z-10">
                    <div className={`font-bold text-lg ${card.textColor}`}>{card.amount}</div>
                    {card.interest && (
                      <div className="text-xs font-semibold text-white">{card.interest}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* KYC Notification - Mobile */}
          <Card className="bg-[#f1f0ff] border border-[#a7a5ff] mb-6 card-no-shadow" data-tour="kyc-banner">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white w-10 h-10 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-[#5B52FF]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1e1e1e] text-sm">Complete Your KYC</div>
                  <div className="text-[#596682] text-xs">Complete your KYC to create an account</div>
                </div>
              </div>
              <Button 
                className="bg-[#5B52FF] text-white text-xs h-8 px-4 btn-primary"
                onClick={() => setShowMultiTierKYC(true)}
              >
                Complete
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions - Mobile */}
          <div className="mb-6" data-tour="quick-actions">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="cursor-pointer card-no-shadow" onClick={action.action}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <div className={action.iconColor}>{action.icon}</div>
                    </div>
                    <p className="text-xs font-medium text-[#1E293B]">{action.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tap to Send - Mobile */}
          <div className="mb-6" data-tour="tap-to-send">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Tap to Send</h3>
            <div className="flex gap-4 overflow-x-auto">
              {tapToSendContacts.map((contact, index) => (
                <div key={index} className="flex flex-col items-center cursor-pointer flex-shrink-0" onClick={contact.action}>
                  <Avatar className="w-10 h-10 mb-2">
                    <AvatarFallback className="bg-[#f2f9ff] text-[#5B52FF]">
                      {contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-[#64748B]">{contact.name}</span>
                </div>
              ))}
              <div className="flex flex-col items-center cursor-pointer flex-shrink-0" onClick={() => navigate("/transfer")}>
                <div className="w-10 h-10 bg-[#f5f5ff] rounded-full mb-2 flex items-center justify-center">
                  <PlusIcon className="w-4 h-4 text-[#5B52FF]" />
                </div>
                <span className="text-xs font-bold text-[#5B52FF]">Add</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions - Mobile */}
          <div>
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {filteredTransactions.slice(0, 5).map((transaction, index) => (
                <Card key={index} className="card-no-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={`${transaction.bgColor} text-gray-700`}>
                            {transaction.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-[#1E293B]">{transaction.firstName} {transaction.lastName}</p>
                          <p className="text-xs text-[#64748B]">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          transaction.type === "Credit" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "Credit" ? "+" : "-"}{transaction.amount}
                        </p>
                        <Badge 
                          className={`text-xs ${
                            transaction.status === "Successful" 
                              ? "bg-green-100 text-green-800" 
                              : transaction.status === "Failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation - Consistent with Dashboard */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            {[
              { name: "Home", icon: <HomeIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/dashboard") },
              { name: "Transfer", icon: <ArrowRightIcon className="w-6 h-6" />, onClick: () => navigate("/transfer") },
              { name: "Goals", icon: <StarIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
              { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/cards") },
              { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
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