import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountTypeSwitcher } from "../../components/ui/account-type-switcher";
import { ProfileDropdown } from "../../components/ui/profile-dropdown";
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
  ChevronRightIcon,
  HomeIcon,
  ReceiptIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
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
  UsersIcon,
  ActivityIcon,
  AlertTriangleIcon,
  ClockIcon,
  FilterIcon,
  MoreHorizontalIcon,
  TrashIcon,
  BuildingIcon,
  GlobeIcon,
  DatabaseIcon,
  ServerIcon,
  MonitorIcon,
  WifiIcon,
  ZapIcon,
  TvIcon,
  CarIcon,
  GraduationCapIcon,
  SendIcon,
  MousePointerClickIcon
} from "lucide-react";

export const AdminDashboard = (): JSX.Element => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  // Platform metrics data
  const platformMetrics = {
    totalUsers: 125847,
    activeUsers: 98234,
    totalTransactions: 2456789,
    transactionVolume: 45678900000,
    revenue: 234567890,
    disputes: 234,
    pendingKYC: 1456,
    systemUptime: 99.97,
    supportTickets: 89,
    fraudAlerts: 12
  };

  // Recent activities
  const recentActivities = [
    {
      id: "1",
      type: "user_registration",
      description: "New user registered: John Doe",
      timestamp: "2 minutes ago",
      severity: "info",
      user: "john.doe@email.com"
    },
    {
      id: "2", 
      type: "transaction_alert",
      description: "Large transaction flagged for review",
      timestamp: "5 minutes ago",
      severity: "warning",
      amount: "₦5,000,000"
    },
    {
      id: "3",
      type: "security_alert",
      description: "Multiple failed login attempts detected",
      timestamp: "10 minutes ago",
      severity: "high",
      ip: "192.168.1.100"
    },
    {
      id: "4",
      type: "system_update",
      description: "System maintenance completed successfully",
      timestamp: "1 hour ago",
      severity: "success"
    }
  ];

  // Users data
  const usersData = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 801 234 5678",
      kycStatus: "Verified",
      accountType: "Individual",
      balance: 125000,
      lastActive: "2 hours ago",
      status: "Active",
      joinDate: "2024-01-15",
      riskLevel: "Low"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@business.com",
      phone: "+234 802 345 6789",
      kycStatus: "Pending",
      accountType: "Business",
      balance: 2500000,
      lastActive: "1 day ago",
      status: "Active",
      joinDate: "2024-01-10",
      riskLevel: "Medium"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+234 803 456 7890",
      kycStatus: "Rejected",
      accountType: "Individual",
      balance: 45000,
      lastActive: "3 days ago",
      status: "Suspended",
      joinDate: "2024-01-05",
      riskLevel: "High"
    }
  ];

  // Transactions data
  const transactionsData = [
    {
      id: "TXN001",
      from: "John Doe",
      to: "Jane Smith",
      amount: 50000,
      type: "Transfer",
      status: "Completed",
      timestamp: "2024-01-20 14:30:23",
      fee: 50,
      reference: "REF123456789",
      channel: "Mobile App"
    },
    {
      id: "TXN002",
      from: "Business Corp",
      to: "Multiple Recipients",
      amount: 1250000,
      type: "Bulk Transfer",
      status: "Processing",
      timestamp: "2024-01-20 13:15:45",
      fee: 2500,
      reference: "BULK789456123",
      channel: "Web Portal"
    },
    {
      id: "TXN003",
      from: "Mike Johnson",
      to: "MTN Nigeria",
      amount: 1000,
      type: "Bill Payment",
      status: "Failed",
      timestamp: "2024-01-20 12:45:12",
      fee: 0,
      reference: "BILL456789123",
      channel: "USSD"
    }
  ];

  // Support tickets data
  const supportTickets = [
    {
      id: "TICK001",
      subject: "Unable to complete transaction",
      customer: "John Doe",
      email: "john.doe@email.com",
      priority: "High",
      status: "Open",
      assignedTo: "Sarah Support",
      created: "2024-01-20 10:30:00",
      lastUpdate: "2024-01-20 14:15:00",
      category: "Transaction Issue"
    },
    {
      id: "TICK002",
      subject: "KYC document verification delay",
      customer: "Jane Smith",
      email: "jane.smith@business.com",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Mike Support",
      created: "2024-01-19 16:45:00",
      lastUpdate: "2024-01-20 09:30:00",
      category: "KYC/Verification"
    },
    {
      id: "TICK003",
      subject: "Card activation issue",
      customer: "Alice Johnson",
      email: "alice.j@email.com",
      priority: "Low",
      status: "Resolved",
      assignedTo: "Tom Support",
      created: "2024-01-18 11:20:00",
      lastUpdate: "2024-01-19 15:45:00",
      category: "Card Services"
    }
  ];

  // POS terminals data
  const posTerminals = [
    {
      id: "POS001",
      merchantName: "SuperMart Lagos",
      terminalId: "TRM12345",
      location: "Victoria Island, Lagos",
      status: "Active",
      lastTransaction: "2024-01-20 14:45:00",
      dailyVolume: 2500000,
      monthlyVolume: 45000000,
      model: "Ingenico iWL250"
    },
    {
      id: "POS002",
      merchantName: "Tech Hub Abuja",
      terminalId: "TRM12346",
      location: "Wuse 2, Abuja",
      status: "Offline",
      lastTransaction: "2024-01-19 18:30:00",
      dailyVolume: 850000,
      monthlyVolume: 18000000,
      model: "Verifone VX520"
    },
    {
      id: "POS003",
      merchantName: "Fashion Store PH",
      terminalId: "TRM12347",
      location: "GRA, Port Harcourt",
      status: "Maintenance",
      lastTransaction: "2024-01-20 12:15:00",
      dailyVolume: 1200000,
      monthlyVolume: 25000000,
      model: "PAX A920"
    }
  ];

  // Compliance data
  const complianceData = {
    kycPending: 1456,
    kycApproved: 45678,
    kycRejected: 234,
    amlAlerts: 89,
    suspiciousTransactions: 45,
    regulatoryReports: 12,
    complianceScore: 94.5
  };

  // Security alerts
  const securityAlerts = [
    {
      id: "SEC001",
      type: "Multiple Failed Logins",
      severity: "High",
      description: "User attempted login 5+ times with wrong credentials",
      user: "suspicious.user@email.com",
      ip: "192.168.1.100",
      timestamp: "2024-01-20 14:30:00",
      status: "Active"
    },
    {
      id: "SEC002",
      type: "Unusual Transaction Pattern",
      severity: "Medium",
      description: "Large transaction outside normal pattern",
      user: "john.doe@email.com",
      amount: "₦5,000,000",
      timestamp: "2024-01-20 13:15:00",
      status: "Investigating"
    },
    {
      id: "SEC003",
      type: "Device Fingerprint Mismatch",
      severity: "Low",
      description: "User logged in from new device",
      user: "jane.smith@business.com",
      device: "iPhone 15 Pro",
      timestamp: "2024-01-20 12:45:00",
      status: "Resolved"
    }
  ];

  // System health data
  const systemHealth = {
    apiUptime: 99.97,
    databaseHealth: 98.5,
    paymentGateway: 99.8,
    mobileApp: 99.2,
    webPortal: 99.5,
    responseTime: 245,
    errorRate: 0.03,
    activeConnections: 15847
  };

  // Navigation items
  const navItems = [
    { 
      id: 'dashboard',
      name: "Dashboard", 
      icon: <HomeIcon className="w-5 h-5" />, 
      active: currentView === 'dashboard'
    },
    { 
      id: 'platform-overview',
      name: "Platform Overview", 
      icon: <BarChart3Icon className="w-5 h-5" />, 
      active: currentView === 'platform-overview'
    },
    { 
      id: 'platform-transactions',
      name: "Platform Transactions", 
      icon: <DatabaseIcon className="w-5 h-5" />, 
      active: currentView === 'platform-transactions'
    },
    { 
      id: 'transaction-management',
      name: "Transaction Management", 
      icon: <ReceiptIcon className="w-5 h-5" />, 
      active: currentView === 'transaction-management'
    },
    { 
      id: 'pos-management',
      name: "POS Management", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      active: currentView === 'pos-management'
    },
    { 
      id: 'compliance',
      name: "Compliance Management", 
      icon: <ShieldCheckIcon className="w-5 h-5" />, 
      active: currentView === 'compliance'
    },
    { 
      id: 'card-management',
      name: "Card Management", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      active: currentView === 'card-management'
    },
    { 
      id: 'support-tickets',
      name: "Support Tickets", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      active: currentView === 'support-tickets'
    },
    { 
      id: 'security-center',
      name: "Security Center", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      active: currentView === 'security-center'
    },
    { 
      id: 'dispute-management',
      name: "Dispute Management", 
      icon: <AlertTriangleIcon className="w-5 h-5" />, 
      active: currentView === 'dispute-management'
    },
    { 
      id: 'downtime-tracker',
      name: "DownTime Tracker", 
      icon: <MonitorIcon className="w-5 h-5" />, 
      active: currentView === 'downtime-tracker'
    },
    { 
      id: 'chat-management',
      name: "Chat Management", 
      icon: <MessageCircleIcon className="w-5 h-5" />, 
      active: currentView === 'chat-management'
    },
    { 
      id: 'email-templates',
      name: "Email & Templates", 
      icon: <MailIcon className="w-5 h-5" />, 
      active: currentView === 'email-templates'
    },
    { 
      id: 'notifications',
      name: "Notification Management", 
      icon: <BellIcon className="w-5 h-5" />, 
      active: currentView === 'notifications'
    },
    { 
      id: 'profile-management',
      name: "Profile Management", 
      icon: <UserIcon className="w-5 h-5" />, 
      active: currentView === 'profile-management'
    },
    { 
      id: 'subscriptions',
      name: "Subscriptions Management", 
      icon: <StarIcon className="w-5 h-5" />, 
      active: currentView === 'subscriptions'
    },
    { 
      id: 'fee-management',
      name: "Fee Management", 
      icon: <DollarSignIcon className="w-5 h-5" />, 
      active: currentView === 'fee-management'
    }
  ];

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Dashboard</h2>
          <p className="text-[#64748B]">Platform overview and key metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            Refresh
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformMetrics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Transaction Volume</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(platformMetrics.transactionVolume / 1000000000).toFixed(1)}B</p>
                <p className="text-xs text-green-600">+8.3% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(platformMetrics.revenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">+15.7% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Alerts</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformMetrics.fraudAlerts + platformMetrics.disputes}</p>
                <p className="text-xs text-red-600">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.severity === 'high' ? 'bg-red-100' :
                    activity.severity === 'warning' ? 'bg-yellow-100' :
                    activity.severity === 'success' ? 'bg-green-100' :
                    'bg-blue-100'
                  }`}>
                    <ActivityIcon className={`w-4 h-4 ${
                      activity.severity === 'high' ? 'text-red-600' :
                      activity.severity === 'warning' ? 'text-yellow-600' :
                      activity.severity === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1E293B]">{activity.description}</p>
                    <p className="text-xs text-[#64748B]">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">API Uptime</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-[99%] h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.apiUptime}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Database Health</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-[98%] h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.databaseHealth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-[99%] h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{systemHealth.paymentGateway}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Response Time</span>
                <span className="text-sm font-medium text-green-600">{systemHealth.responseTime}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Platform Overview Component
  const PlatformOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Platform Overview</h2>
          <p className="text-[#64748B]">Comprehensive platform analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B]">User Growth</h3>
              <TrendingUpIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Total Users</span>
                <span className="font-semibold">{platformMetrics.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Active Users</span>
                <span className="font-semibold text-green-600">{platformMetrics.activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Growth Rate</span>
                <span className="font-semibold text-green-600">+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B]">Transaction Analytics</h3>
              <BarChart3Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Total Transactions</span>
                <span className="font-semibold">{platformMetrics.totalTransactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Success Rate</span>
                <span className="font-semibold text-green-600">98.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Avg. Processing Time</span>
                <span className="font-semibold">2.3s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1E293B]">Revenue Metrics</h3>
              <DollarSignIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Monthly Revenue</span>
                <span className="font-semibold">₦{(platformMetrics.revenue / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Transaction Fees</span>
                <span className="font-semibold text-green-600">₦45.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Growth</span>
                <span className="font-semibold text-green-600">+15.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Geographic Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Top States by Users</h4>
              <div className="space-y-3">
                {[
                  { state: "Lagos", users: 45678, percentage: 36.3 },
                  { state: "Abuja", users: 23456, percentage: 18.6 },
                  { state: "Rivers", users: 15234, percentage: 12.1 },
                  { state: "Kano", users: 12345, percentage: 9.8 },
                  { state: "Ogun", users: 9876, percentage: 7.8 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <span className="font-medium">{item.state}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.users.toLocaleString()}</p>
                      <p className="text-xs text-[#64748B]">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Transaction Volume by Region</h4>
              <div className="space-y-3">
                {[
                  { region: "South West", volume: 18.5, color: "bg-blue-500" },
                  { region: "North Central", volume: 12.3, color: "bg-green-500" },
                  { region: "South South", volume: 8.7, color: "bg-purple-500" },
                  { region: "North West", volume: 6.2, color: "bg-orange-500" },
                  { region: "Others", volume: 4.3, color: "bg-gray-500" }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.region}</span>
                      <span className="text-sm font-semibold">₦{item.volume}B</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${(item.volume / 18.5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Transaction Management Component
  const TransactionManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Transaction Management</h2>
          <p className="text-[#64748B]">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Successful</p>
                <p className="text-2xl font-bold text-green-600">2,423,567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">23,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Failed</p>
                <p className="text-2xl font-bold text-red-600">9,766</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Volume</p>
                <p className="text-2xl font-bold text-blue-600">₦45.6B</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent Transactions</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">FROM</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TIMESTAMP</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{transaction.id}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.from}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.to}</td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{transaction.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.type}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // User Management Component
  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">User Management</h2>
          <p className="text-[#64748B]">Manage user accounts and verification status</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Users
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformMetrics.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Verified Users</p>
                <p className="text-2xl font-bold text-green-600">98,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending KYC</p>
                <p className="text-2xl font-bold text-yellow-600">{platformMetrics.pendingKYC.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Flagged Users</p>
                <p className="text-2xl font-bold text-red-600">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">User Accounts</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Users</option>
                <option>Individual</option>
                <option>Business</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">USER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CONTACT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACCOUNT TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">KYC STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BALANCE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1E293B]">{user.name}</p>
                          <p className="text-xs text-[#64748B]">Joined {user.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-[#1E293B]">{user.email}</p>
                        <p className="text-xs text-[#64748B]">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={user.accountType === 'Business' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                        {user.accountType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' :
                        user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {user.kycStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{user.balance.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Tickets Component
  const SupportTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Tickets</h2>
          <p className="text-[#64748B]">Manage customer support requests and issues</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Tickets
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <HelpCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Tickets</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Tickets</p>
                <p className="text-2xl font-bold text-yellow-600">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response Time</p>
                <p className="text-2xl font-bold text-purple-600">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Support Tickets</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-10 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TICKET ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SUBJECT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CUSTOMER</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">PRIORITY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ASSIGNED TO</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CREATED</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{ticket.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{ticket.subject}</p>
                        <p className="text-xs text-[#64748B]">{ticket.category}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-[#1E293B]">{ticket.customer}</p>
                        <p className="text-xs text-[#64748B]">{ticket.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                        ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{ticket.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{new Date(ticket.created).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Security Center Component
  const SecurityCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Security Center</h2>
          <p className="text-[#64748B]">Monitor security threats and manage platform security</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-red-600 text-white">
            <AlertTriangleIcon className="w-4 h-4 mr-2" />
            Security Alert
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Threats</p>
                <p className="text-2xl font-bold text-red-600">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Blocked IPs</p>
                <p className="text-2xl font-bold text-yellow-600">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Security Score</p>
                <p className="text-2xl font-bold text-green-600">94.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Monitored Events</p>
                <p className="text-2xl font-bold text-blue-600">45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Security Alerts</h3>
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  alert.severity === 'High' ? 'bg-red-100' :
                  alert.severity === 'Medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <AlertTriangleIcon className={`w-5 h-5 ${
                    alert.severity === 'High' ? 'text-red-600' :
                    alert.severity === 'Medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#1E293B]">{alert.type}</h4>
                    <Badge className={
                      alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#64748B] mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span>User: {alert.user}</span>
                    {alert.ip && <span>IP: {alert.ip}</span>}
                    {alert.amount && <span>Amount: {alert.amount}</span>}
                    <span>Time: {alert.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                  <Button size="sm" className="bg-red-600 text-white">
                    Block
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // POS Management Component
  const POSManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">POS Management</h2>
          <p className="text-[#64748B]">Monitor and manage POS terminals across the platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Terminals
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Terminal
          </Button>
        </div>
      </div>

      {/* POS Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Terminals</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Terminals</p>
                <p className="text-2xl font-bold text-green-600">2,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Offline Terminals</p>
                <p className="text-2xl font-bold text-red-600">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Daily Volume</p>
                <p className="text-2xl font-bold text-purple-600">₦125M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Terminals Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">POS Terminals</h3>
            <div className="flex gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search terminals..."
                  className="pl-10 w-64"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Offline</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TERMINAL ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">MERCHANT</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LOCATION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DAILY VOLUME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST TRANSACTION</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {posTerminals.map((terminal) => (
                  <tr key={terminal.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{terminal.terminalId}</p>
                        <p className="text-xs text-[#64748B]">{terminal.model}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.merchantName}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{terminal.location}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        terminal.status === 'Active' ? 'bg-green-100 text-green-800' :
                        terminal.status === 'Offline' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {terminal.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">₦{terminal.dailyVolume.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-[#64748B]">{new Date(terminal.lastTransaction).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Compliance Management Component
  const ComplianceManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Compliance Management</h2>
          <p className="text-[#64748B]">Monitor KYC, AML compliance and regulatory requirements</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <FileTextIcon className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">KYC Approved</p>
                <p className="text-2xl font-bold text-green-600">{complianceData.kycApproved.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">KYC Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{complianceData.kycPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">AML Alerts</p>
                <p className="text-2xl font-bold text-red-600">{complianceData.amlAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Compliance Score</p>
                <p className="text-2xl font-bold text-blue-600">{complianceData.complianceScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">KYC Status Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Approved</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-[85%] h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Pending Review</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-[12%] h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Rejected</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="w-[3%] h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">AML Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Suspicious Transactions</span>
                <span className="font-semibold text-red-600">{complianceData.suspiciousTransactions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Active Investigations</span>
                <span className="font-semibold text-yellow-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Regulatory Reports</span>
                <span className="font-semibold text-blue-600">{complianceData.regulatoryReports}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Risk Score</span>
                <span className="font-semibold text-green-600">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Card Management Component
  const CardManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Card Management</h2>
          <p className="text-[#64748B]">Manage card issuance, controls and monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Cards
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Issue Card
          </Button>
        </div>
      </div>

      {/* Card Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Cards</p>
                <p className="text-2xl font-bold text-green-600">42,345</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <LockIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Blocked Cards</p>
                <p className="text-2xl font-bold text-red-600">2,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Card Spend</p>
                <p className="text-2xl font-bold text-purple-600">₦2.3B</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card Types Distribution */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Card Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-500">65%</span>
              </div>
              <h4 className="font-medium text-[#1E293B]">Virtual Cards</h4>
              <p className="text-sm text-[#64748B]">29,691 cards</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full border-8 border-green-500 flex items-center justify-center">
                <span className="text-lg font-bold text-green-500">25%</span>
              </div>
              <h4 className="font-medium text-[#1E293B]">Physical Cards</h4>
              <p className="text-sm text-[#64748B]">11,420 cards</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full border-8 border-purple-500 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-500">10%</span>
              </div>
              <h4 className="font-medium text-[#1E293B]">Premium Cards</h4>
              <p className="text-sm text-[#64748B]">4,567 cards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Dispute Management Component
  const DisputeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Dispute Management</h2>
          <p className="text-[#64748B]">Handle transaction disputes and chargebacks</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Disputes
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <FileTextIcon className="w-4 h-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Dispute Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Disputes</p>
                <p className="text-2xl font-bold text-red-600">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Under Review</p>
                <p className="text-2xl font-bold text-yellow-600">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Resolved</p>
                <p className="text-2xl font-bold text-green-600">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Disputed Amount</p>
                <p className="text-2xl font-bold text-purple-600">₦45.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Disputes */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Disputes</h3>
          <div className="space-y-4">
            {[
              {
                id: "DISP001",
                transaction: "TXN123456789",
                customer: "John Doe",
                merchant: "SuperMart Lagos",
                amount: 25000,
                reason: "Unauthorized Transaction",
                status: "Open",
                created: "2024-01-20 10:30:00"
              },
              {
                id: "DISP002",
                transaction: "TXN987654321",
                customer: "Jane Smith",
                merchant: "Tech Store Abuja",
                amount: 150000,
                reason: "Product Not Received",
                status: "Under Review",
                created: "2024-01-19 14:15:00"
              },
              {
                id: "DISP003",
                transaction: "TXN456789123",
                customer: "Mike Johnson",
                merchant: "Fashion Hub PH",
                amount: 75000,
                reason: "Duplicate Charge",
                status: "Resolved",
                created: "2024-01-18 09:45:00"
              }
            ].map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-medium text-[#1E293B]">{dispute.id}</h4>
                    <Badge className={
                      dispute.status === 'Open' ? 'bg-red-100 text-red-800' :
                      dispute.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {dispute.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#64748B]">
                    <div>
                      <span className="font-medium">Customer:</span> {dispute.customer}
                    </div>
                    <div>
                      <span className="font-medium">Merchant:</span> {dispute.merchant}
                    </div>
                    <div>
                      <span className="font-medium">Amount:</span> ₦{dispute.amount.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Reason:</span> {dispute.reason}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EditIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Downtime Tracker Component
  const DowntimeTracker = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Downtime Tracker</h2>
          <p className="text-[#64748B]">Monitor system uptime and service availability</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Current System Status</h3>
            <div className="space-y-4">
              {[
                { service: "API Gateway", status: "Operational", uptime: 99.97 },
                { service: "Database", status: "Operational", uptime: 99.85 },
                { service: "Payment Gateway", status: "Operational", uptime: 99.92 },
                { service: "Mobile App", status: "Degraded", uptime: 98.5 },
                { service: "Web Portal", status: "Operational", uptime: 99.78 }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'Operational' ? 'bg-green-500' :
                      service.status === 'Degraded' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-[#1E293B]">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{service.uptime}%</p>
                    <p className={`text-xs ${
                      service.status === 'Operational' ? 'text-green-600' :
                      service.status === 'Degraded' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {service.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Average Response Time</span>
                <span className="font-semibold text-green-600">{systemHealth.responseTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Error Rate</span>
                <span className="font-semibold text-green-600">{systemHealth.errorRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Active Connections</span>
                <span className="font-semibold text-blue-600">{systemHealth.activeConnections.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#64748B]">Throughput</span>
                <span className="font-semibold text-purple-600">1,245 req/sec</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incident History */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Incidents</h3>
          <div className="space-y-4">
            {[
              {
                id: "INC001",
                title: "Database Connection Timeout",
                severity: "High",
                status: "Resolved",
                duration: "45 minutes",
                affected: "Payment Processing",
                resolved: "2024-01-19 15:30:00"
              },
              {
                id: "INC002",
                title: "Mobile App Slow Response",
                severity: "Medium",
                status: "Monitoring",
                duration: "2 hours",
                affected: "Mobile Application",
                resolved: "Ongoing"
              }
            ].map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-medium text-[#1E293B]">{incident.title}</h4>
                    <Badge className={
                      incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {incident.severity}
                    </Badge>
                    <Badge className={
                      incident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-[#64748B]">
                    <div>
                      <span className="font-medium">Duration:</span> {incident.duration}
                    </div>
                    <div>
                      <span className="font-medium">Affected:</span> {incident.affected}
                    </div>
                    <div>
                      <span className="font-medium">Resolved:</span> {incident.resolved}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <EyeIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Chat Management Component
  const ChatManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Chat Management</h2>
          <p className="text-[#64748B]">Manage live chat sessions and customer interactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Chats
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <MessageCircleIcon className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Chats</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Online Agents</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg Response Time</p>
                <p className="text-2xl font-bold text-yellow-600">2.3m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-purple-600">94.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Chat Sessions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Active Chat Sessions</h3>
          <div className="space-y-4">
            {[
              {
                id: "CHAT001",
                customer: "John Doe",
                agent: "Sarah Support",
                subject: "Transaction Issue",
                duration: "5 minutes",
                status: "Active",
                priority: "High"
              },
              {
                id: "CHAT002",
                customer: "Jane Smith",
                agent: "Mike Support",
                subject: "Account Verification",
                duration: "12 minutes",
                status: "Active",
                priority: "Medium"
              },
              {
                id: "CHAT003",
                customer: "Bob Wilson",
                agent: "Tom Support",
                subject: "Card Activation",
                duration: "3 minutes",
                status: "Waiting",
                priority: "Low"
              }
            ].map((chat) => (
              <div key={chat.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-medium text-[#1E293B]">{chat.id}</h4>
                    <Badge className={
                      chat.priority === 'High' ? 'bg-red-100 text-red-800' :
                      chat.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {chat.priority}
                    </Badge>
                    <Badge className={
                      chat.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {chat.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#64748B]">
                    <div>
                      <span className="font-medium">Customer:</span> {chat.customer}
                    </div>
                    <div>
                      <span className="font-medium">Agent:</span> {chat.agent}
                    </div>
                    <div>
                      <span className="font-medium">Subject:</span> {chat.subject}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {chat.duration}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Email & Templates Component
  const EmailTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Email & Template Management</h2>
          <p className="text-[#64748B]">Manage email campaigns and notification templates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Templates
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Email Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MailIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Emails Sent Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Delivery Rate</p>
                <p className="text-2xl font-bold text-green-600">98.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Open Rate</p>
                <p className="text-2xl font-bold text-purple-600">24.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MousePointerClickIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Click Rate</p>
                <p className="text-2xl font-bold text-orange-600">3.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Templates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Email Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Welcome Email",
                type: "Onboarding",
                usage: "12,456 sent",
                status: "Active",
                lastModified: "2024-01-15"
              },
              {
                name: "Transaction Confirmation",
                type: "Transactional",
                usage: "45,678 sent",
                status: "Active",
                lastModified: "2024-01-10"
              },
              {
                name: "KYC Reminder",
                type: "Compliance",
                usage: "3,456 sent",
                status: "Active",
                lastModified: "2024-01-12"
              },
              {
                name: "Password Reset",
                type: "Security",
                usage: "1,234 sent",
                status: "Active",
                lastModified: "2024-01-08"
              },
              {
                name: "Monthly Statement",
                type: "Reporting",
                usage: "23,456 sent",
                status: "Active",
                lastModified: "2024-01-01"
              },
              {
                name: "Promotional Offer",
                type: "Marketing",
                usage: "8,901 sent",
                status: "Draft",
                lastModified: "2024-01-18"
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#1E293B]">{template.name}</h4>
                    <Badge className={template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {template.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-[#64748B]">
                    <p><span className="font-medium">Type:</span> {template.type}</p>
                    <p><span className="font-medium">Usage:</span> {template.usage}</p>
                    <p><span className="font-medium">Modified:</span> {template.lastModified}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <EditIcon className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notification Management Component
  const NotificationManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Notification Management</h2>
          <p className="text-[#64748B]">Configure and manage system notifications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <SendIcon className="w-4 h-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Sent Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,678</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Delivered</p>
                <p className="text-2xl font-bold text-green-600">44,567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Read Rate</p>
                <p className="text-2xl font-bold text-purple-600">78.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Failed</p>
                <p className="text-2xl font-bold text-red-600">1,111</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Notification Types</h3>
            <div className="space-y-4">
              {[
                { type: "Transaction Alerts", enabled: true, count: "15,234" },
                { type: "Security Notifications", enabled: true, count: "2,456" },
                { type: "KYC Reminders", enabled: true, count: "3,789" },
                { type: "Marketing Messages", enabled: false, count: "8,901" },
                { type: "System Updates", enabled: true, count: "567" }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${notification.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="font-medium text-[#1E293B]">{notification.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#64748B]">{notification.count} sent</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notification.enabled}
                        className="sr-only peer"
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {[
                {
                  title: "System Maintenance Alert",
                  message: "Scheduled maintenance on Jan 25, 2024",
                  sent: "2 hours ago",
                  recipients: "All Users"
                },
                {
                  title: "Security Update",
                  message: "New security features available",
                  sent: "1 day ago",
                  recipients: "Verified Users"
                },
                {
                  title: "KYC Reminder",
                  message: "Complete your verification",
                  sent: "2 days ago",
                  recipients: "Unverified Users"
                }
              ].map((notification, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-[#1E293B] mb-1">{notification.title}</h4>
                  <p className="text-sm text-[#64748B] mb-2">{notification.message}</p>
                  <div className="flex justify-between text-xs text-[#64748B]">
                    <span>Sent: {notification.sent}</span>
                    <span>To: {notification.recipients}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Profile Management Component
  const ProfileManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Profile Management</h2>
          <p className="text-[#64748B]">Manage user profiles and account settings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Profiles
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Complete Profiles</p>
                <p className="text-2xl font-bold text-[#1E293B]">98,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Incomplete Profiles</p>
                <p className="text-2xl font-bold text-yellow-600">12,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Verified Profiles</p>
                <p className="text-2xl font-bold text-green-600">89,567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Flagged Profiles</p>
                <p className="text-2xl font-bold text-red-600">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion Analysis */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Profile Completion Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Completion Rate by Field</h4>
              <div className="space-y-3">
                {[
                  { field: "Basic Information", completion: 98 },
                  { field: "Contact Details", completion: 95 },
                  { field: "Identity Documents", completion: 87 },
                  { field: "Address Verification", completion: 82 },
                  { field: "Bank Account Details", completion: 76 }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{item.field}</span>
                      <span className="text-sm font-semibold">{item.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5B52FF] h-2 rounded-full"
                        style={{ width: `${item.completion}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[#1E293B] mb-3">Profile Issues</h4>
              <div className="space-y-3">
                {[
                  { issue: "Missing Phone Verification", count: 3456, severity: "Medium" },
                  { issue: "Expired ID Documents", count: 1234, severity: "High" },
                  { issue: "Incomplete Address", count: 2345, severity: "Low" },
                  { issue: "Suspicious Activity", count: 123, severity: "High" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-[#1E293B]">{item.issue}</p>
                      <p className="text-sm text-[#64748B]">{item.count} profiles affected</p>
                    </div>
                    <Badge className={
                      item.severity === 'High' ? 'bg-red-100 text-red-800' :
                      item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {item.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Subscriptions Management Component
  const SubscriptionsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Subscriptions Management</h2>
          <p className="text-[#64748B]">Manage subscription plans and billing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter Plans
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Subscription Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Subscriptions</p>
                <p className="text-2xl font-bold text-[#1E293B]">23,456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦45.2M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Growth Rate</p>
                <p className="text-2xl font-bold text-purple-600">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Churn Rate</p>
                <p className="text-2xl font-bold text-red-600">2.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Subscription Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Basic Plan",
                price: "₦0",
                period: "Free",
                subscribers: 45678,
                features: ["Basic transfers", "Mobile app", "Email support"],
                status: "Active"
              },
              {
                name: "Premium Plan",
                price: "₦2,500",
                period: "Monthly",
                subscribers: 12456,
                features: ["Unlimited transfers", "Priority support", "Advanced analytics", "Virtual cards"],
                status: "Active"
              },
              {
                name: "Business Plan",
                price: "₦15,000",
                period: "Monthly",
                subscribers: 3456,
                features: ["All Premium features", "Multi-user access", "API access", "Dedicated support"],
                status: "Active"
              }
            ].map((plan, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-[#5B52FF] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-[#1E293B]">{plan.name}</h4>
                    <Badge className="bg-green-100 text-green-800">{plan.status}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#1E293B]">{plan.price}</span>
                    <span className="text-[#64748B]">/{plan.period}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-[#64748B] mb-2">
                      <span className="font-semibold text-[#1E293B]">{plan.subscribers.toLocaleString()}</span> subscribers
                    </p>
                  </div>
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-[#64748B]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <EditIcon className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <BarChart3Icon className="w-4 h-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Fee Management Component
  const FeeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Fee Management System</h2>
          <p className="text-[#64748B]">Configure and manage platform fees and pricing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Fees
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Fee Structure
          </Button>
        </div>
      </div>

      {/* Fee Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Fee Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦234.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ReceiptIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Transaction Fees</p>
                <p className="text-2xl font-bold text-blue-600">₦156.7M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Card Fees</p>
                <p className="text-2xl font-bold text-purple-600">₦45.8M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Subscription Fees</p>
                <p className="text-2xl font-bold text-orange-600">₦32.0M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structures */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Current Fee Structures</h3>
          <div className="space-y-4">
            {[
              {
                category: "Money Transfer",
                type: "Percentage",
                fee: "0.5%",
                minimum: "₦10",
                maximum: "₦1,000",
                status: "Active"
              },
              {
                category: "Bill Payment",
                type: "Fixed",
                fee: "₦50",
                minimum: "-",
                maximum: "-",
                status: "Active"
              },
              {
                category: "Card Issuance",
                type: "Fixed",
                fee: "₦2,000",
                minimum: "-",
                maximum: "-",
                status: "Active"
              },
              {
                category: "International Transfer",
                type: "Percentage",
                fee: "2.5%",
                minimum: "₦500",
                maximum: "₦5,000",
                status: "Active"
              },
              {
                category: "ATM Withdrawal",
                type: "Fixed",
                fee: "₦100",
                minimum: "-",
                maximum: "-",
                status: "Active"
              }
            ].map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="font-medium text-[#1E293B]">{fee.category}</p>
                      <p className="text-sm text-[#64748B]">{fee.type} Fee</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B]">Fee Amount</p>
                      <p className="font-semibold text-[#1E293B]">{fee.fee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B]">Minimum</p>
                      <p className="font-semibold text-[#1E293B]">{fee.minimum}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B]">Maximum</p>
                      <p className="font-semibold text-[#1E293B]">{fee.maximum}</p>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800">{fee.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontalIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'platform-overview':
        return <PlatformOverview />;
      case 'platform-transactions':
      case 'transaction-management':
        return <TransactionManagement />;
      case 'pos-management':
        return <POSManagement />;
      case 'compliance':
        return <ComplianceManagement />;
      case 'card-management':
        return <CardManagement />;
      case 'support-tickets':
        return <SupportTickets />;
      case 'security-center':
        return <SecurityCenter />;
      case 'dispute-management':
        return <DisputeManagement />;
      case 'downtime-tracker':
        return <DowntimeTracker />;
      case 'chat-management':
        return <ChatManagement />;
      case 'email-templates':
        return <EmailTemplates />;
      case 'notifications':
        return <NotificationManagement />;
      case 'profile-management':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionsManagement />;
      case 'fee-management':
        return <FeeManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-[#1E293B]">Admin Panel</h1>
                <p className="text-xs text-[#64748B]">SureBanker</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Account Type Switcher */}
            <div className="mb-4">
              <AccountTypeSwitcher variant="sidebar" />
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors text-sm ${
                    item.active
                      ? "bg-[#5B52FF] text-white"
                      : "text-[#64748B] hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-[#1E293B] text-white">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-3">
                  Admin Dashboard v2.1.0
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-white border-white/30 hover:bg-white/10"
                  onClick={() => navigate("/")}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B]">
                  {navItems.find(item => item.id === currentView)?.name || 'Dashboard'}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <AccountTypeSwitcher variant="header" />
                
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {platformMetrics.fraudAlerts}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Admin User</div>
                    <div className="text-xs text-[#64748B]">Administrator</div>
                    <div className="text-xs text-[#64748B]">Administrator</div>
                  </div>
                  <ProfileDropdown
                    userName="John Admin"
                    userRole="Administrator"
                    avatar="JA"
                    profileRoute="/admin-profile"
                    accountType="admin"
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#5B52FF] rounded-lg flex items-center justify-center">
              <ShieldIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Admin Panel</h1>
              <p className="text-xs text-[#64748B]">SureBanker</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                {platformMetrics.fraudAlerts}
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item) => (
              <div 
                key={item.id}
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={() => setCurrentView(item.id)}
              >
                <div className={`${item.active ? 'text-[#5B52FF]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#5B52FF] font-medium' : 'text-gray-400'}`}>
                  {item.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};