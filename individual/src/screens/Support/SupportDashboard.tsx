import React, { useState, useEffect } from "react";
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
  HeadphonesIcon,
  UsersIcon,
  LayoutDashboardIcon,
  FileTextIcon,
  CreditCardIcon,
  TicketIcon,
  ShieldIcon,
  MessageSquareIcon,
  MailIcon,
  BellRingIcon,
  UserIcon,
  DollarSignIcon,
  SettingsIcon,
  ActivityIcon,
  ClockIcon,
  BuildingIcon,
  BarChart3Icon,
  XIcon,
  PlusIcon,
  EditIcon,
  EyeIcon,
  ArrowRightIcon,
  CheckIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CalendarIcon,
  FilterIcon,
  DownloadIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  PhoneIcon,
  MonitorIcon,
  ServerIcon,
  GlobeIcon,
  ZapIcon,
  HomeIcon
} from "lucide-react";

const SupportDashboard = (): JSX.Element => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();

  // Toggle menu open/closed
  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId) 
        : [...prev, menuId]
    );
  };

  // Check if menu is open
  const isMenuOpen = (menuId: string) => {
    return openMenus.includes(menuId);
  };

  // Success notification handler
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessNotification(true);
    
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  // Modal handlers
  const openModal = (type: string, data: any = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  // Sample data for tickets
  const tickets = [
    { 
      id: "TKT001", 
      customer: "John Doe", 
      subject: "Unable to transfer funds", 
      priority: "High", 
      status: "Open",
  BarChart3Icon,
      created: "2024-01-15 14:30",
      assignedTo: "Mike Support"
    },
    { 
      id: "TKT002", 
      customer: "Jane Smith", 
      subject: "Card activation problem", 
      priority: "Medium", 
      status: "In Progress",
      created: "2024-01-15 12:45",
      assignedTo: "Sarah Manager"
    },
    { 
      id: "TKT003", 
      customer: "Atinse Enterprises", 
      subject: "Business account setup issue", 
      priority: "High", 
      status: "Open",
      created: "2024-01-15 10:15",
      assignedTo: "Unassigned"
    }
  ];

  // Sample data for transactions
  const transactions = [
    { 
      id: "TXN001", 
      customer: "John Doe", 
      type: "Transfer", 
      amount: "₦50,000", 
      status: "Completed", 
      date: "2024-01-15 14:30", 
      platform: "Mobile App"
    },
    { 
      id: "TXN002", 
      customer: "Jane Smith", 
      type: "Bill Payment", 
      amount: "₦15,000", 
      status: "Pending", 
      date: "2024-01-15 13:45", 
      platform: "Web"
    }
  ];

  // Sample data for POS terminals
  const posTerminals = [
    {
      id: "POS001",
      merchant: "ABC Store",
      location: "Lagos",
      status: "Active",
      lastTransaction: "2024-01-15 14:30",
      balance: "₦120,000"
    },
    {
      id: "POS002",
      merchant: "XYZ Supermarket",
      location: "Abuja",
      status: "Inactive",
      lastTransaction: "2024-01-14 16:45",
      balance: "₦85,000"
    }
  ];

  // Sample data for disputes
  const disputes = [
    { 
      id: "DSP001", 
      customer: "John Doe", 
      type: "Unauthorized Transaction", 
      amount: "₦50,000", 
      status: "Open",
      created: "2024-01-15"
    },
    { 
      id: "DSP002", 
      customer: "Jane Smith", 
      type: "Double Charge", 
      amount: "₦15,000", 
      status: "Under Investigation",
      created: "2024-01-14"
    }
  ];

  // Navigation items
  const navigationItems = [
    { id: "dashboard", name: "Dashboard", icon: <LayoutDashboardIcon className="w-5 h-5" /> },
    { id: "platform_overview", name: "Platform Overview", icon: <GlobeIcon className="w-5 h-5" /> },
    { 
      id: "transactions", 
      name: "Transactions", 
      icon: <ActivityIcon className="w-5 h-5" />,
      children: [
        { id: "platform_transactions", name: "Platform Based Transactions" },
        { id: "transaction_management", name: "Transaction Management" }
      ]
    },
    { id: "pos_management", name: "POS Management", icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: "compliance_management", name: "Compliance Management", icon: <FileTextIcon className="w-5 h-5" /> },
    { id: "card_management", name: "Card Management", icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: "support_tickets", name: "Support Tickets", icon: <TicketIcon className="w-5 h-5" /> },
    { id: "security_center", name: "Security Center", icon: <ShieldIcon className="w-5 h-5" /> },
    { id: "dispute_management", name: "Dispute Management", icon: <AlertTriangleIcon className="w-5 h-5" /> },
    { id: "downtime_tracker", name: "Downtime Tracker", icon: <ClockIcon className="w-5 h-5" /> },
    { id: "chat_management", name: "Chat Management", icon: <MessageSquareIcon className="w-5 h-5" /> },
    { id: "email_templates", name: "Email & Template Management", icon: <MailIcon className="w-5 h-5" /> },
    { id: "notification_management", name: "Notification Management", icon: <BellRingIcon className="w-5 h-5" /> },
    { id: "profile_management", name: "Profile Management", icon: <UserIcon className="w-5 h-5" /> },
    { 
      id: "subscription_fee", 
      name: "Subscription & Fees", 
      icon: <DollarSignIcon className="w-5 h-5" />,
      children: [
        { id: "subscription_management", name: "Subscription Management" },
        { id: "fee_management", name: "Fee Management" }
      ]
    }
  ];

  // Render different pages based on active section
  const renderPageContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "platform_overview":
        return renderPlatformOverview();
      case "platform_transactions":
        return renderPlatformTransactions();
      case "transaction_management":
        return renderTransactionManagement();
      case "pos_management":
        return renderPOSManagement();
      case "compliance_management":
        return renderComplianceManagement();
      case "card_management":
        return renderCardManagement();
      case "support_tickets":
        return renderTickets();
      case "security_center":
        return renderSecurityCenter();
      case "dispute_management":
        return renderDisputeManagement();
      case "downtime_tracker":
        return renderDowntimeTracker();
      case "chat_management":
        return renderChatManagement();
      case "email_templates":
        return renderEmailTemplates();
      case "notification_management":
        return renderNotificationManagement();
      case "profile_management":
        return renderProfileManagement();
      case "subscription_management":
        return renderSubscriptionManagement();
      case "fee_management":
        return renderFeeManagement();
      default:
        return renderDashboard();
    }
  };

  // Dashboard page
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Support Dashboard</h2>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white"
        >
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Open Tickets</p>
                <p className="text-2xl font-bold text-[#1E293B]">45</p>
              </div>
              <TicketIcon className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">15 min</p>
              </div>
              <ClockIcon className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Chats</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
              </div>
              <MessageSquareIcon className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">System Health</p>
                <p className="text-2xl font-bold text-green-600">99.9%</p>
              </div>
              <ActivityIcon className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Support Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Ticket Resolved</p>
                <p className="text-sm text-[#64748B]">John Doe's payment issue resolved</p>
              </div>
              <span className="text-sm text-[#64748B] ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <MessageSquareIcon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">New Chat Started</p>
                <p className="text-sm text-[#64748B]">Jane Smith started a chat about account access</p>
              </div>
              <span className="text-sm text-[#64748B] ml-auto">15 minutes ago</span>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium">New Dispute Filed</p>
                <p className="text-sm text-[#64748B]">Unauthorized transaction reported by Mike Johnson</p>
              </div>
              <span className="text-sm text-[#64748B] ml-auto">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
          <div className="grid grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveSection("support_tickets")}
            >
              <TicketIcon className="w-6 h-6 text-blue-600" />
              <span>Support Tickets</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveSection("chat_management")}
            >
              <MessageSquareIcon className="w-6 h-6 text-green-600" />
              <span>Live Chat</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveSection("dispute_management")}
            >
              <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
              <span>Disputes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2"
              onClick={() => setActiveSection("transaction_management")}
            >
              <ActivityIcon className="w-6 h-6 text-purple-600" />
              <span>Transactions</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Platform Overview
  const renderPlatformOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Platform Overview</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white"
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">System Uptime</p>
                <p className="text-xl font-bold text-green-600">99.98%</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">API Response Time</p>
                <p className="text-xl font-bold">120ms</p>
              </div>
              <ZapIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Error Rate</p>
                <p className="text-xl font-bold text-green-600">0.02%</p>
              </div>
              <AlertTriangleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Users</p>
                <p className="text-xl font-bold">12,345</p>
              </div>
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Components */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Components</h3>
          <div className="space-y-4">
            {[
              { name: "Web Application", status: "Operational", response: "180ms", load: "45%" },
              { name: "Mobile App", status: "Operational", response: "210ms", load: "38%" },
              { name: "API Gateway", status: "Operational", response: "90ms", load: "52%" },
              { name: "Database Cluster", status: "Operational", response: "65ms", load: "60%" },
              { name: "Payment Processing", status: "Degraded", response: "350ms", load: "75%" }
            ].map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    component.status === "Operational" ? "bg-green-500" : 
                    component.status === "Degraded" ? "bg-yellow-500" : "bg-red-500"
                  }`}></div>
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-sm text-[#64748B]">{component.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-[#64748B]">Response Time</p>
                    <p className="font-medium">{component.response}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">Load</p>
                    <p className="font-medium">{component.load}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("component_details", component)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Incidents</h3>
          <div className="space-y-4">
            {[
              { 
                id: "INC001", 
                title: "API Latency Issues", 
                startTime: "2024-01-10 14:30",
                endTime: "2024-01-10 16:45",
                impact: "Minor",
                status: "Resolved"
              },
              { 
                id: "INC002", 
                title: "Payment Processing Delays", 
                startTime: "2024-01-15 10:00",
                endTime: null,
                impact: "Moderate",
                status: "In Progress"
              }
            ].map((incident, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{incident.title}</h4>
                      <span className="text-xs text-[#64748B]">#{incident.id}</span>
                    </div>
                  </div>
                  <Badge className={
                    incident.status === "Resolved" ? "bg-green-100 text-green-800" :
                    incident.status === "In Progress" ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {incident.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-[#64748B]">Start Time</p>
                    <p className="text-sm">{incident.startTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">End Time</p>
                    <p className="text-sm">{incident.endTime || "Ongoing"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Impact</p>
                    <p className="text-sm">{incident.impact}</p>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openModal("incident_details", incident)}
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Platform Based Transactions
  const renderPlatformTransactions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Platform Based Transactions</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button 
            onClick={() => openModal("export_transactions", {})}
            className="bg-blue-600 text-white"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Platform Transaction Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Web Transactions</p>
                <p className="text-xl font-bold">45,231</p>
              </div>
              <GlobeIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Mobile Transactions</p>
                <p className="text-xl font-bold">78,562</p>
              </div>
              <PhoneIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">POS Transactions</p>
                <p className="text-xl font-bold">23,456</p>
              </div>
              <CreditCardIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">API Transactions</p>
                <p className="text-xl font-bold">12,789</p>
              </div>
              <ServerIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Comparison */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Comparison</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-[#64748B]">Platform Comparison Chart</p>
          </div>
        </CardContent>
      </Card>

      {/* Transactions by Platform */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Transactions by Platform</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    id: "TXN001", 
                    customer: "John Doe", 
                    platform: "Mobile App",
                    type: "Transfer", 
                    amount: "₦50,000", 
                    status: "Completed", 
                    date: "2024-01-15 14:30"
                  },
                  { 
                    id: "TXN002", 
                    customer: "Jane Smith", 
                    platform: "Web",
                    type: "Bill Payment", 
                    amount: "₦15,000", 
                    status: "Pending", 
                    date: "2024-01-15 13:45"
                  },
                  { 
                    id: "TXN003", 
                    customer: "Mike Johnson", 
                    platform: "POS",
                    type: "Purchase", 
                    amount: "₦25,000", 
                    status: "Completed", 
                    date: "2024-01-15 12:30"
                  },
                  { 
                    id: "TXN004", 
                    customer: "Sarah Wilson", 
                    platform: "API",
                    type: "Withdrawal", 
                    amount: "₦100,000", 
                    status: "Failed", 
                    date: "2024-01-15 11:15"
                  }
                ].map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transaction.platform === "Mobile App" ? "bg-green-100 text-green-800" :
                        transaction.platform === "Web" ? "bg-blue-100 text-blue-800" :
                        transaction.platform === "POS" ? "bg-purple-100 text-purple-800" :
                        "bg-orange-100 text-orange-800"
                      }>
                        {transaction.platform}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{transaction.type}</td>
                    <td className="py-3 px-4 font-medium">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transaction.status === "Completed" ? "bg-green-100 text-green-800" :
                        transaction.status === "Pending" ? "bg-orange-100 text-orange-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openModal("view_transaction", transaction)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
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

  // Transaction Management
  const renderTransactionManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Transaction Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("export_transactions", {})}
            className="bg-blue-600 text-white"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Total Volume</p>
                <p className="text-xl font-bold">₦12,345,678</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Completed</p>
                <p className="text-xl font-bold text-green-600">1,234</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Pending</p>
                <p className="text-xl font-bold text-orange-600">56</p>
              </div>
              <ClockIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Failed</p>
                <p className="text-xl font-bold text-red-600">23</p>
              </div>
              <XIcon className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Types</option>
              <option>Transfer</option>
              <option>Bill Payment</option>
              <option>Withdrawal</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                    <td className="py-3 px-4">{transaction.type}</td>
                    <td className="py-3 px-4 font-medium">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        transaction.status === "Completed" ? "bg-green-100 text-green-800" :
                        transaction.status === "Pending" ? "bg-orange-100 text-orange-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("view_transaction", transaction)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        {transaction.status === "Pending" && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 text-white"
                            onClick={() => showSuccess(`Transaction ${transaction.id} approved successfully!`)}
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-[#64748B]">
              Showing {transactions.length} of {transactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // POS Management
  const renderPOSManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">POS Terminal Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("register_pos", {})}
            className="bg-blue-600 text-white"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Register Terminal
          </Button>
        </div>
      </div>

      {/* POS Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Total Terminals</p>
                <p className="text-xl font-bold">1,234</p>
              </div>
              <CreditCardIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Terminals</p>
                <p className="text-xl font-bold text-green-600">1,156</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Inactive Terminals</p>
                <p className="text-xl font-bold text-red-600">78</p>
              </div>
              <XIcon className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Transaction Volume</p>
                <p className="text-xl font-bold">₦45,678,900</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Terminals */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">POS Terminals</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Terminal ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Last Transaction</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Balance</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posTerminals.map((terminal, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{terminal.id}</td>
                    <td className="py-3 px-4">{terminal.merchant}</td>
                    <td className="py-3 px-4">{terminal.location}</td>
                    <td className="py-3 px-4">
                      <Badge className={terminal.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {terminal.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{terminal.lastTransaction}</td>
                    <td className="py-3 px-4 font-medium">{terminal.balance}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("view_terminal", terminal)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("edit_terminal", terminal)}
                        >
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

      {/* Terminal Maintenance */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Terminal Maintenance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Software Update</p>
                <p className="text-sm text-[#64748B]">Update terminal software to latest version</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("software_update", {})}
              >
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Remote Restart</p>
                <p className="text-sm text-[#64748B]">Restart terminals remotely</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("remote_restart", {})}
              >
                Restart
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Diagnostic Check</p>
                <p className="text-sm text-[#64748B]">Run diagnostic check on terminals</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("diagnostic_check", {})}
              >
                Run Diagnostic
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Compliance Management
  const renderComplianceManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Compliance Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("compliance_report", {})}
            className="bg-blue-600 text-white"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Compliance Score</p>
                <p className="text-xl font-bold text-green-600">92%</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Open Issues</p>
                <p className="text-xl font-bold text-orange-600">12</p>
              </div>
              <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Resolved Issues</p>
                <p className="text-xl font-bold">45</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Last Audit</p>
                <p className="text-xl font-bold">Jan 15, 2024</p>
              </div>
              <FileTextIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Requirements */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Requirements</h3>
          <div className="space-y-4">
            {[
              { 
                name: "KYC Verification", 
                description: "Ensure all users complete KYC verification", 
                status: "Compliant",
                lastChecked: "Jan 15, 2024"
              },
              { 
                name: "Transaction Monitoring", 
                description: "Monitor transactions for suspicious activity", 
                status: "Compliant",
                lastChecked: "Jan 15, 2024"
              },
              { 
                name: "Data Protection", 
                description: "Ensure user data is protected according to regulations", 
                status: "Partial",
                lastChecked: "Jan 10, 2024"
              },
              { 
                name: "Audit Trail", 
                description: "Maintain comprehensive audit trail of all activities", 
                status: "Compliant",
                lastChecked: "Jan 15, 2024"
              }
            ].map((requirement, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{requirement.name}</p>
                  <p className="text-sm text-[#64748B]">{requirement.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={
                    requirement.status === "Compliant" ? "bg-green-100 text-green-800" :
                    requirement.status === "Partial" ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {requirement.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("compliance_details", requirement)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Issues */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Issues</h3>
          <div className="space-y-4">
            {[
              { 
                id: "COMP001", 
                title: "Incomplete KYC Documentation", 
                severity: "Medium", 
                status: "Open",
                assignedTo: "Mike Support",
                dueDate: "Jan 20, 2024"
              },
              { 
                id: "COMP002", 
                title: "Suspicious Transaction Pattern", 
                severity: "High", 
                status: "In Progress",
                assignedTo: "Sarah Manager",
                dueDate: "Jan 18, 2024"
              },
              { 
                id: "COMP003", 
                title: "Data Retention Policy Update", 
                severity: "Low", 
                status: "Open",
                assignedTo: "Unassigned",
                dueDate: "Jan 25, 2024"
              }
            ].map((issue, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{issue.title}</h4>
                      <span className="text-xs text-[#64748B]">#{issue.id}</span>
                    </div>
                  </div>
                  <Badge className={
                    issue.severity === "High" ? "bg-red-100 text-red-800" :
                    issue.severity === "Medium" ? "bg-orange-100 text-orange-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {issue.severity}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-[#64748B]">Status</p>
                    <p className="text-sm">
                      <Badge className={
                        issue.status === "Open" ? "bg-orange-100 text-orange-800" :
                        issue.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {issue.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Assigned To</p>
                    <p className="text-sm">{issue.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Due Date</p>
                    <p className="text-sm">{issue.dueDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("view_compliance_issue", issue)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  {issue.assignedTo === "Unassigned" && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 text-white"
                      onClick={() => showSuccess(`Issue ${issue.id} assigned to you successfully!`)}
                    >
                      Assign to Me
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Card Management
  const renderCardManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Card Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("issue_card", {})}
            className="bg-blue-600 text-white"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Issue Card
          </Button>
        </div>
      </div>

      {/* Card Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Total Cards</p>
                <p className="text-xl font-bold">12,345</p>
              </div>
              <CreditCardIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Cards</p>
                <p className="text-xl font-bold text-green-600">11,234</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Blocked Cards</p>
                <p className="text-xl font-bold text-red-600">567</p>
              </div>
              <XIcon className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Pending Activation</p>
                <p className="text-xl font-bold text-orange-600">544</p>
              </div>
              <ClockIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card Types */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Card Types</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                type: "Virtual Card", 
                count: 5678, 
                status: "Active",
                icon: <CreditCardIcon className="w-6 h-6" />
              },
              { 
                type: "Physical Card", 
                count: 6543, 
                status: "Active",
                icon: <CreditCardIcon className="w-6 h-6" />
              },
              { 
                type: "Business Card", 
                count: 124, 
                status: "Active",
                icon: <CreditCardIcon className="w-6 h-6" />
              }
            ].map((cardType, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {cardType.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{cardType.type}</h4>
                      <p className="text-sm text-[#64748B]">{cardType.count.toLocaleString()} cards</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openModal("view_card_type", cardType)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Card Activities */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Card Activities</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Card Number</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    cardNumber: "•••• •••• •••• 1234", 
                    customer: "John Doe", 
                    type: "Virtual Card", 
                    action: "Card Issued", 
                    status: "Active",
                    date: "2024-01-15 14:30"
                  },
                  { 
                    cardNumber: "•••• •••• •••• 5678", 
                    customer: "Jane Smith", 
                    type: "Physical Card", 
                    action: "Card Blocked", 
                    status: "Blocked",
                    date: "2024-01-15 13:45"
                  },
                  { 
                    cardNumber: "•••• •••• •••• 9012", 
                    customer: "Mike Johnson", 
                    type: "Business Card", 
                    action: "PIN Reset", 
                    status: "Active",
                    date: "2024-01-15 12:30"
                  }
                ].map((card, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-mono">{card.cardNumber}</td>
                    <td className="py-3 px-4">{card.customer}</td>
                    <td className="py-3 px-4">{card.type}</td>
                    <td className="py-3 px-4">{card.action}</td>
                    <td className="py-3 px-4">
                      <Badge className={card.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {card.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{card.date}</td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openModal("view_card", card)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
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

  // Support Tickets
  const renderTickets = () => {
    return (
      <div className="min-h-screen bg-[#F8F9FF]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B]">Support Tickets</h1>
                <p className="text-sm text-[#64748B]">Manage customer support tickets</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button 
                onClick={() => openModal("create_ticket", {})}
                className="bg-blue-600 text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Ticket Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Open Tickets</p>
                    <p className="text-xl font-bold text-orange-600">45</p>
                  </div>
                  <TicketIcon className="w-6 h-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">In Progress</p>
                    <p className="text-xl font-bold text-blue-600">23</p>
                  </div>
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Resolved Today</p>
                    <p className="text-xl font-bold text-green-600">18</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Avg. Resolution Time</p>
                    <p className="text-xl font-bold">4.2 hours</p>
                  </div>
                  <ClockIcon className="w-6 h-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <Button variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>

              {/* Tickets Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Ticket ID</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Assigned To</th>
                      <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-mono text-sm">{ticket.id}</td>
                        <td className="py-3 px-4">{ticket.customer}</td>
                        <td className="py-3 px-4">{ticket.subject}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            ticket.priority === "High" ? "bg-red-100 text-red-800" :
                            ticket.priority === "Medium" ? "bg-orange-100 text-orange-800" :
                            "bg-green-100 text-green-800"
                          }>
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={
                            ticket.status === "Open" ? "bg-orange-100 text-orange-800" :
                            ticket.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-green-100 text-green-800"
                          }>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{ticket.created}</td>
                        <td className="py-3 px-4">
                          {ticket.assignedTo === "Unassigned" ? (
                            <Badge className="bg-gray-100 text-gray-800">Unassigned</Badge>
                          ) : (
                            ticket.assignedTo
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openModal("view_ticket", ticket)}
                            >
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                            {ticket.assignedTo === "Unassigned" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => showSuccess(`Ticket ${ticket.id} assigned to you successfully!`)}
                              >
                                Assign
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Categories */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Ticket Categories</h3>
                <Button 
                  variant="outline"
                  onClick={() => openModal("manage_categories", {})}
                >
                  Manage Categories
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Account Issues", tickets: 24, sla: "4 hours" },
                  { name: "Payment Problems", tickets: 18, sla: "2 hours" },
                  { name: "KYC Verification", tickets: 12, sla: "8 hours" },
                  { name: "Card Services", tickets: 15, sla: "4 hours" },
                  { name: "Technical Support", tickets: 9, sla: "6 hours" },
                  { name: "General Inquiry", tickets: 6, sla: "12 hours" }
                ].map((category, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{category.name}</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#64748B]">Open Tickets:</span>
                        <span>{category.tickets}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#64748B]">SLA Target:</span>
                        <span>{category.sla}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Security Center
  const renderSecurityCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Security Center</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button 
            onClick={() => openModal("security_scan", {})}
            className="bg-blue-600 text-white"
          >
            <ShieldIcon className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Security Score</p>
                <p className="text-xl font-bold text-green-600">92/100</p>
              </div>
              <ShieldIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Threats</p>
                <p className="text-xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Failed Logins</p>
                <p className="text-xl font-bold">156</p>
              </div>
              <XIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Last Audit</p>
                <p className="text-xl font-bold">2 days ago</p>
              </div>
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security Alerts</h3>
          <div className="space-y-4">
            {[
              { 
                severity: "High", 
                title: "Suspicious Login Attempts", 
                description: "Multiple failed login attempts from unusual locations", 
                timestamp: "2024-01-15 14:30",
                status: "Open"
              },
              { 
                severity: "Medium", 
                title: "Unusual Transaction Pattern", 
                description: "Detected unusual transaction pattern for user John Doe", 
                timestamp: "2024-01-15 12:45",
                status: "Under Investigation"
              },
              { 
                severity: "Low", 
                title: "API Rate Limit Exceeded", 
                description: "API rate limit exceeded for client XYZ Corp", 
                timestamp: "2024-01-15 10:15",
                status: "Resolved"
              }
            ].map((alert, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alert.severity === "High" ? "bg-red-100 text-red-600" :
                      alert.severity === "Medium" ? "bg-orange-100 text-orange-600" :
                      "bg-yellow-100 text-yellow-600"
                    }`}>
                      <AlertTriangleIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge className={
                          alert.severity === "High" ? "bg-red-100 text-red-800" :
                          alert.severity === "Medium" ? "bg-orange-100 text-orange-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm">{alert.description}</p>
                    </div>
                  </div>
                  <Badge className={
                    alert.status === "Open" ? "bg-red-100 text-red-800" :
                    alert.status === "Under Investigation" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }>
                    {alert.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#64748B]">
                    {alert.timestamp}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal("view_alert", alert)}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    {alert.status !== "Resolved" && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 text-white"
                        onClick={() => showSuccess(`Alert marked as resolved!`)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Logs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Security Logs</h3>
            <Button 
              variant="outline"
              onClick={() => openModal("export_logs", {})}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Timestamp</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Event</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">User</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">IP Address</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    timestamp: "2024-01-15 14:30:45", 
                    event: "Login Attempt", 
                    user: "john@email.com", 
                    ip: "192.168.1.1",
                    location: "Lagos, Nigeria",
                    status: "Success"
                  },
                  { 
                    timestamp: "2024-01-15 14:25:12", 
                    event: "Login Attempt", 
                    user: "unknown@email.com", 
                    ip: "203.0.113.1",
                    location: "Unknown",
                    status: "Failed"
                  },
                  { 
                    timestamp: "2024-01-15 14:20:33", 
                    event: "Password Reset", 
                    user: "jane@email.com", 
                    ip: "192.168.1.2",
                    location: "Abuja, Nigeria",
                    status: "Success"
                  }
                ].map((log, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm">{log.timestamp}</td>
                    <td className="py-3 px-4">{log.event}</td>
                    <td className="py-3 px-4">{log.user}</td>
                    <td className="py-3 px-4 font-mono text-sm">{log.ip}</td>
                    <td className="py-3 px-4">{log.location}</td>
                    <td className="py-3 px-4">
                      <Badge className={log.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {log.status}
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
  );

  // Dispute Management
  const renderDisputeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Dispute Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("create_dispute", {})}
            className="bg-blue-600 text-white"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Dispute
          </Button>
        </div>
      </div>

      {/* Dispute Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Open Disputes</p>
                <p className="text-xl font-bold text-orange-600">45</p>
              </div>
              <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Under Investigation</p>
                <p className="text-xl font-bold text-blue-600">23</p>
              </div>
              <SearchIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Resolved</p>
                <p className="text-xl font-bold text-green-600">128</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Avg. Resolution Time</p>
                <p className="text-xl font-bold">3.2 days</p>
              </div>
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dispute List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dispute List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Dispute ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{dispute.id}</td>
                    <td className="py-3 px-4">{dispute.customer}</td>
                    <td className="py-3 px-4">{dispute.type}</td>
                    <td className="py-3 px-4 font-medium">{dispute.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        dispute.status === "Open" ? "bg-orange-100 text-orange-800" :
                        dispute.status === "Under Investigation" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {dispute.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{dispute.created}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("view_dispute", dispute)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        {dispute.status !== "Resolved" && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 text-white"
                            onClick={() => openModal("resolve_dispute", dispute)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dispute Resolution Process */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dispute Resolution Process</h3>
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Submission", icon: <FileTextIcon className="w-5 h-5" /> },
              { step: 2, title: "Initial Review", icon: <EyeIcon className="w-5 h-5" /> },
              { step: 3, title: "Investigation", icon: <SearchIcon className="w-5 h-5" /> },
              { step: 4, title: "Decision", icon: <CheckIcon className="w-5 h-5" /> },
              { step: 5, title: "Resolution", icon: <CheckCircleIcon className="w-5 h-5" /> }
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-center">{item.title}</p>
                {index < 4 && <ArrowRightIcon className="w-4 h-4 text-gray-400 mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Downtime Tracker
  const renderDowntimeTracker = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Downtime Tracker</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button 
            onClick={() => openModal("schedule_maintenance", {})}
            className="bg-blue-600 text-white"
          >
            <ClockIcon className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">System Uptime</p>
                <p className="text-xl font-bold text-green-600">99.98%</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Current Status</p>
                <p className="text-xl font-bold text-green-600">Operational</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Incidents (30d)</p>
                <p className="text-xl font-bold">3</p>
              </div>
              <AlertTriangleIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Avg. Resolution</p>
                <p className="text-xl font-bold">45 min</p>
              </div>
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Status</h3>
          <div className="space-y-4">
            {[
              { name: "API Services", status: "Operational", uptime: "99.99%", lastIncident: "None" },
              { name: "Web Application", status: "Operational", uptime: "99.98%", lastIncident: "Jan 10, 2024" },
              { name: "Database Cluster", status: "Operational", uptime: "99.95%", lastIncident: "Jan 5, 2024" },
              { name: "Payment Processing", status: "Partial Outage", uptime: "99.5%", lastIncident: "Ongoing" },
              { name: "Authentication", status: "Operational", uptime: "100%", lastIncident: "None" }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{service.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#64748B]">Uptime:</span>
                    <span>{service.uptime}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge className={
                    service.status === "Operational" ? "bg-green-100 text-green-800" :
                    service.status === "Partial Outage" ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {service.status}
                  </Badge>
                  <div className="text-xs text-[#64748B] mt-1">
                    Last incident: {service.lastIncident}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Maintenance */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Scheduled Maintenance</h3>
            <Button 
              variant="outline"
              onClick={() => openModal("schedule_maintenance", {})}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                id: "MAINT001", 
                title: "Database Optimization", 
                description: "Scheduled maintenance for database optimization", 
                scheduledStart: "2024-01-20 02:00",
                scheduledEnd: "2024-01-20 04:00",
                status: "Scheduled",
                services: ["Database Cluster"]
              },
              { 
                id: "MAINT002", 
                title: "API Gateway Update", 
                description: "Updating API gateway to latest version", 
                scheduledStart: "2024-01-25 01:00",
                scheduledEnd: "2024-01-25 03:00",
                status: "Scheduled",
                services: ["API Services"]
              }
            ].map((maintenance, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{maintenance.title}</h4>
                      <span className="text-xs text-[#64748B]">#{maintenance.id}</span>
                    </div>
                    <p className="text-sm">{maintenance.description}</p>
                  </div>
                  <Badge className={
                    maintenance.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                    maintenance.status === "In Progress" ? "bg-orange-100 text-orange-800" :
                    "bg-green-100 text-green-800"
                  }>
                    {maintenance.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-[#64748B]">Start Time</p>
                    <p className="text-sm">{maintenance.scheduledStart}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">End Time</p>
                    <p className="text-sm">{maintenance.scheduledEnd}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Services Affected</p>
                    <div className="flex flex-wrap gap-1">
                      {maintenance.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("edit_maintenance", maintenance)}
                    className="flex-1"
                  >
                    <EditIcon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                    onClick={() => openModal("cancel_maintenance", maintenance)}
                  >
                    <XIcon className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Chat Management
  const renderChatManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Chat Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={() => openModal("chat_settings", {})}
            className="bg-blue-600 text-white"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Chat Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Chats</p>
                <p className="text-xl font-bold text-blue-600">45</p>
              </div>
              <MessageSquareIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Waiting</p>
                <p className="text-xl font-bold text-orange-600">12</p>
              </div>
              <ClockIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Resolved Today</p>
                <p className="text-xl font-bold text-green-600">78</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Avg. Response Time</p>
                <p className="text-xl font-bold">2.5 min</p>
              </div>
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Chats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Active Chats</h3>
          <div className="space-y-4">
            {[
              { 
                id: "CHAT001", 
                customer: "John Doe", 
                subject: "Payment Issue", 
                status: "Active", 
                agent: "Mike Support",
                lastMessage: "I've checked your transaction and found the issue...",
                time: "2 minutes ago"
              },
              { 
                id: "CHAT002", 
                customer: "Jane Smith", 
                subject: "Account Access", 
                status: "Waiting", 
                agent: "Unassigned",
                lastMessage: "I can't log into my account after changing my password...",
                time: "5 minutes ago"
              },
              { 
                id: "CHAT003", 
                customer: "Atinse Enterprises", 
                subject: "Business Account Setup", 
                status: "Active", 
                agent: "Sarah Manager",
                lastMessage: "We need to set up multiple users for our business account...",
                time: "10 minutes ago"
              }
            ].map((chat, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{chat.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{chat.customer}</h4>
                      <p className="text-sm text-[#64748B]">{chat.subject}</p>
                    </div>
                  </div>
                  <Badge className={
                    chat.status === "Active" ? "bg-green-100 text-green-800" :
                    chat.status === "Waiting" ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  }>
                    {chat.status}
                  </Badge>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm">{chat.lastMessage}</p>
                  <p className="text-xs text-[#64748B] mt-1">{chat.time}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-[#64748B]">Agent: </span>
                    <span className="font-medium">{chat.agent}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal("view_chat", chat)}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {chat.status === "Waiting" && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 text-white"
                        onClick={() => showSuccess(`Chat assigned to you successfully!`)}
                      >
                        Assign to Me
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Analytics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Chat Analytics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Common Issues</h4>
              <div className="space-y-2">
                {[
                  { issue: "Payment Problems", percentage: 35 },
                  { issue: "Account Access", percentage: 25 },
                  { issue: "KYC Verification", percentage: 20 },
                  { issue: "Card Issues", percentage: 15 },
                  { issue: "Other", percentage: 5 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.issue}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Agent Performance</h4>
              <div className="space-y-3">
                {[
                  { agent: "Mike Support", chats: 45, satisfaction: 4.8 },
                  { agent: "Sarah Manager", chats: 32, satisfaction: 4.9 },
                  { agent: "John Admin", chats: 28, satisfaction: 4.7 }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{agent.agent}</p>
                      <p className="text-sm text-[#64748B]">{agent.chats} chats</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{agent.satisfaction}</p>
                      <p className="text-xs text-[#64748B]">Satisfaction</p>
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

  // Email & Template Management
  const renderEmailTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Email & Template Management</h2>
        <Button 
          onClick={() => openModal("create_template", {})}
          className="bg-blue-600 text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Email Categories */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { 
            name: "Transactional", 
            description: "Transaction confirmations, receipts, and alerts", 
            templates: 12,
            icon: <CreditCardIcon className="w-6 h-6" />
          },
          { 
            name: "Onboarding", 
            description: "Welcome emails, verification, and setup guides", 
            templates: 8,
            icon: <UserIcon className="w-6 h-6" />
          },
          { 
            name: "Support", 
            description: "Support responses and ticket updates", 
            templates: 15,
            icon: <HeadphonesIcon className="w-6 h-6" />
          }
        ].map((category, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-[#64748B]">{category.templates} templates</p>
                </div>
              </div>
              
              <p className="text-sm text-[#64748B] mb-4">{category.description}</p>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => openModal("view_category", category)}
              >
                View Templates
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Email Templates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Email Templates</h3>
          <div className="space-y-4">
            {[
              { 
                name: "Welcome Email", 
                category: "Onboarding", 
                subject: "Welcome to SureBanker! Get Started in 3 Steps", 
                lastUpdated: "2024-01-10",
                status: "Active"
              },
              { 
                name: "Transaction Receipt", 
                category: "Transactional", 
                subject: "Your SureBanker Transaction Receipt", 
                lastUpdated: "2024-01-05",
                status: "Active"
              },
              { 
                name: "Support Ticket Response", 
                category: "Support", 
                subject: "Re: Your Support Ticket #{ticketId}", 
                lastUpdated: "2024-01-12",
                status: "Active"
              },
              { 
                name: "Password Reset", 
                category: "Transactional", 
                subject: "Reset Your SureBanker Password", 
                lastUpdated: "2024-01-15",
                status: "Active"
              }
            ].map((template, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm text-[#64748B]">{template.subject}</p>
                  </div>
                  <Badge className={template.status === "Active" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                    {template.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-[#64748B]">Category: </span>
                    <span>{template.category}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Last Updated: </span>
                    <span>{template.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("edit_template", template)}
                    className="flex-1"
                  >
                    <EditIcon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("preview_template", template)}
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("send_test", template)}
                  >
                    <MailIcon className="w-4 h-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notification Management
  const renderNotificationManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Notification Management</h2>
        <Button 
          onClick={() => openModal("create_notification", {})}
          className="bg-blue-600 text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Notification
        </Button>
      </div>

      {/* Notification Channels */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { name: "Push Notifications", status: "Active", icon: <BellRingIcon className="w-6 h-6" /> },
          { name: "Email Notifications", status: "Active", icon: <MailIcon className="w-6 h-6" /> },
          { name: "SMS Notifications", status: "Active", icon: <PhoneIcon className="w-6 h-6" /> },
          { name: "In-App Notifications", status: "Active", icon: <MessageSquareIcon className="w-6 h-6" /> }
        ].map((channel, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {channel.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{channel.name}</h3>
                  <Badge className="bg-green-100 text-green-800">{channel.status}</Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => openModal("channel_settings", channel)}
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notification Templates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notification Templates</h3>
          <div className="space-y-4">
            {[
              { 
                name: "Transaction Alert", 
                channels: ["Push", "Email", "SMS"], 
                message: "Your account has been {{action}} with {{amount}}. Balance: {{balance}}",
                lastUpdated: "2024-01-10"
              },
              { 
                name: "Support Ticket Update", 
                channels: ["Push", "Email"], 
                message: "Your support ticket #{{ticketId}} has been {{status}}.",
                lastUpdated: "2024-01-12"
              },
              { 
                name: "Security Alert", 
                channels: ["Push", "Email", "SMS"], 
                message: "A new login was detected from {{location}} on {{device}}.",
                lastUpdated: "2024-01-05"
              }
            ].map((template, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{template.name}</h4>
                  <div className="flex gap-1">
                    {template.channels.map((channel, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm font-mono">{template.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#64748B]">
                    Last Updated: {template.lastUpdated}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal("edit_notification", template)}
                    >
                      <EditIcon className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openModal("test_notification", template)}
                    >
                      <MailIcon className="w-4 h-4 mr-1" />
                      Test
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Notifications */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Scheduled Notifications</h3>
            <Button 
              variant="outline"
              onClick={() => openModal("schedule_notification", {})}
            >
              <ClockIcon className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                name: "Maintenance Notice", 
                message: "SureBanker will be undergoing maintenance on January 20, 2024 from 2:00 AM to 4:00 AM.", 
                scheduledFor: "2024-01-19 12:00",
                audience: "All Users",
                channels: ["Push", "Email"]
              },
              { 
                name: "New Feature Announcement", 
                message: "We're excited to announce our new bill payment feature is now available!", 
                scheduledFor: "2024-01-25 09:00",
                audience: "Active Users",
                channels: ["Push", "Email", "In-App"]
              }
            ].map((notification, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{notification.name}</h4>
                  <div className="flex gap-1">
                    {notification.channels.map((channel, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm mb-3">{notification.message}</p>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-[#64748B]">Scheduled For: </span>
                    <span>{notification.scheduledFor}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Audience: </span>
                    <span>{notification.audience}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("edit_scheduled", notification)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => showSuccess(`${notification.name} sent immediately!`)}
                  >
                    <MailIcon className="w-4 h-4 mr-1" />
                    Send Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                    onClick={() => openModal("cancel_scheduled", notification)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Profile Management
  const renderProfileManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Profile Management</h2>
        <Button 
          onClick={() => openModal("edit_profile", {})}
          className="bg-blue-600 text-white"
        >
          <EditIcon className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">MS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold mb-2">Mike Support</h3>
              <p className="text-[#64748B] mb-3">mike.support@surebanker.com</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-800">
                  Support Agent
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#64748B]">Full Name</p>
                <p className="font-medium">Mike Support</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Email</p>
                <p className="font-medium">mike.support@surebanker.com</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Phone</p>
                <p className="font-medium">+234 801 234 5678</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#64748B]">Role</p>
                <p className="font-medium">Support Agent</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Department</p>
                <p className="font-medium">Customer Support</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Joined</p>
                <p className="font-medium">January 1, 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity & Performance */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity & Performance</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Tickets Resolved</p>
                    <p className="text-xl font-bold">145</p>
                  </div>
                  <TicketIcon className="w-6 h-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Avg. Response Time</p>
                    <p className="text-xl font-bold">3.2 min</p>
                  </div>
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#64748B]">Customer Rating</p>
                    <p className="text-xl font-bold">4.8/5</p>
                  </div>
                  <UserIcon className="w-6 h-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-[#64748B]">Performance Chart</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-[#64748B]">Update your account password</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("change_password", {})}
              >
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-[#64748B]">Enable 2FA for added security</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("setup_2fa", {})}
              >
                Setup
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Notification Preferences</p>
                <p className="text-sm text-[#64748B]">Manage your notification settings</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => openModal("notification_preferences", {})}
              >
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Subscription Management
  const renderSubscriptionManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Subscription Management</h2>
        <Button 
          onClick={() => openModal("create_plan", {})}
          className="bg-blue-600 text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Subscription Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Total Subscribers</p>
                <p className="text-xl font-bold">12,345</p>
              </div>
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Active Subscriptions</p>
                <p className="text-xl font-bold text-green-600">11,234</p>
              </div>
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Monthly Revenue</p>
                <p className="text-xl font-bold">₦45,678,900</p>
              </div>
              <DollarSignIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Churn Rate</p>
                <p className="text-xl font-bold">2.5%</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { 
            name: "Basic", 
            price: "₦1,000/month", 
            features: ["Standard transfers", "Basic support", "1 card"], 
            users: 12450,
            color: "bg-blue-600"
          },
          { 
            name: "Premium", 
            price: "₦5,000/month", 
            features: ["Unlimited transfers", "Priority support", "5 cards", "Advanced analytics"], 
            users: 5280,
            color: "bg-purple-600"
          },
          { 
            name: "Business", 
            price: "₦15,000/month", 
            features: ["Business features", "Dedicated support", "10 cards", "API access", "Multi-user"], 
            users: 1840,
            color: "bg-green-600"
          }
        ].map((plan, index) => (
          <Card key={index}>
            <CardContent className="p-0">
              <div className={`${plan.color} text-white p-4 rounded-t-lg`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-lg">{plan.price}</p>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[#64748B] mb-4">
                  <span className="font-medium">{plan.users.toLocaleString()}</span> active users
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => openModal("edit_plan", plan)}
                  >
                    Edit Plan
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openModal("plan_analytics", plan)}
                  >
                    <BarChart3Icon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriber Management */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Subscriber Management</h3>
            <div className="flex gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search subscribers..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Next Billing</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    customer: "John Doe", 
                    email: "john@email.com",
                    plan: "Premium", 
                    status: "Active", 
                    startDate: "2023-12-01",
                    nextBilling: "2024-02-01",
                    amount: "₦5,000"
                  },
                  { 
                    customer: "Jane Smith", 
                    email: "jane@email.com",
                    plan: "Basic", 
                    status: "Active", 
                    startDate: "2023-11-15",
                    nextBilling: "2024-01-15",
                    amount: "₦1,000"
                  },
                  { 
                    customer: "Atinse Enterprises", 
                    email: "business@atinse.com",
                    plan: "Business", 
                    status: "Active", 
                    startDate: "2024-01-01",
                    nextBilling: "2024-02-01",
                    amount: "₦15,000"
                  }
                ].map((subscriber, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{subscriber.customer}</p>
                        <p className="text-sm text-[#64748B]">{subscriber.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{subscriber.plan}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">{subscriber.status}</Badge>
                    </td>
                    <td className="py-3 px-4">{subscriber.startDate}</td>
                    <td className="py-3 px-4">{subscriber.nextBilling}</td>
                    <td className="py-3 px-4 font-medium">{subscriber.amount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("view_subscription", subscriber)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openModal("change_plan", subscriber)}
                        >
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

  // Fee Management
  const renderFeeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Fee Management</h2>
        <Button 
          onClick={() => openModal("create_fee", {})}
          className="bg-blue-600 text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Fee
        </Button>
      </div>

      {/* Fee Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Total Revenue</p>
                <p className="text-xl font-bold">₦45,678,900</p>
              </div>
              <DollarSignIcon className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Transaction Fees</p>
                <p className="text-xl font-bold">₦23,456,789</p>
              </div>
              <ActivityIcon className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Subscription Fees</p>
                <p className="text-xl font-bold">₦12,345,678</p>
              </div>
              <UsersIcon className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">Other Fees</p>
                <p className="text-xl font-bold">₦9,876,543</p>
              </div>
              <DollarSignIcon className="w-6 h-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Fees */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transaction Fees</h3>
            <Button 
              variant="outline"
              onClick={() => openModal("edit_fees", {})}
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Fees
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Transaction Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Basic Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Premium Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Business Plan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Transfer (Same Bank)", basic: "₦10", premium: "Free", business: "Free" },
                  { type: "Transfer (Other Banks)", basic: "₦25", premium: "₦10", business: "Free" },
                  { type: "ATM Withdrawal", basic: "₦35", premium: "₦20", business: "₦10" },
                  { type: "Bill Payment", basic: "₦50", premium: "₦25", business: "₦10" }
                ].map((fee, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{fee.type}</td>
                    <td className="py-3 px-4">{fee.basic}</td>
                    <td className="py-3 px-4">{fee.premium}</td>
                    <td className="py-3 px-4">{fee.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Fee History */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fee History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Transaction Type</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#64748B]">Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    date: "2024-01-15 14:30", 
                    type: "Transfer (Other Banks)", 
                    customer: "John Doe",
                    plan: "Basic",
                    amount: "₦50,000",
                    fee: "₦25"
                  },
                  { 
                    date: "2024-01-15 13:45", 
                    type: "Bill Payment", 
                    customer: "Jane Smith",
                    plan: "Premium",
                    amount: "₦15,000",
                    fee: "₦25"
                  },
                  { 
                    date: "2024-01-15 12:30", 
                    type: "ATM Withdrawal", 
                    customer: "Mike Johnson",
                    plan: "Basic",
                    amount: "₦20,000",
                    fee: "₦35"
                  }
                ].map((record, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm">{record.date}</td>
                    <td className="py-3 px-4">{record.type}</td>
                    <td className="py-3 px-4">{record.customer}</td>
                    <td className="py-3 px-4">{record.plan}</td>
                    <td className="py-3 px-4">{record.amount}</td>
                    <td className="py-3 px-4 font-medium">{record.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Modal Component
  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {modalType === "view_transaction" && "View Transaction Details"}
                {modalType === "view_ticket" && "View Ticket Details"}
                {modalType === "view_dispute" && "View Dispute Details"}
                {modalType === "resolve_dispute" && "Resolve Dispute"}
                {modalType === "view_chat" && "View Chat"}
                {modalType === "edit_template" && "Edit Email Template"}
                {/* Add more modal titles as needed */}
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={closeModal}
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Modal content based on type */}
            <div className="space-y-4">
              {/* View Transaction */}
              {modalType === "view_transaction" && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#64748B]">Transaction ID</p>
                        <p className="font-medium">{formData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Customer</p>
                        <p className="font-medium">{formData.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Type</p>
                        <p className="font-medium">{formData.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Amount</p>
                        <p className="font-medium">{formData.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Status</p>
                        <Badge className={
                          formData.status === "Completed" ? "bg-green-100 text-green-800" :
                          formData.status === "Pending" ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {formData.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Date</p>
                        <p className="font-medium">{formData.date}</p>
                      </div>
                      {formData.platform && (
                        <div>
                          <p className="text-sm text-[#64748B]">Platform</p>
                          <p className="font-medium">{formData.platform}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Transaction Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Transaction Initiated</p>
                          <p className="text-sm text-[#64748B]">2024-01-15 14:30:00</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Authentication Successful</p>
                          <p className="text-sm text-[#64748B]">2024-01-15 14:30:05</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Transaction Completed</p>
                          <p className="text-sm text-[#64748B]">2024-01-15 14:30:10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* View Ticket */}
              {modalType === "view_ticket" && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#64748B]">Ticket ID</p>
                        <p className="font-medium">{formData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Customer</p>
                        <p className="font-medium">{formData.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Subject</p>
                        <p className="font-medium">{formData.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Priority</p>
                        <Badge className={
                          formData.priority === "High" ? "bg-red-100 text-red-800" :
                          formData.priority === "Medium" ? "bg-orange-100 text-orange-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {formData.priority}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Status</p>
                        <Badge className={
                          formData.status === "Open" ? "bg-orange-100 text-orange-800" :
                          formData.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {formData.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Created</p>
                        <p className="font-medium">{formData.created}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Assigned To</p>
                        <p className="font-medium">{formData.assignedTo}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Ticket Description</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm">
                        I'm having trouble transferring funds from my account. When I try to make a transfer, 
                        I get an error message saying "Transaction failed". I've tried multiple times but 
                        keep getting the same error.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Conversation</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-50 p-3 rounded-lg flex-1">
                          <p className="text-sm">
                            I'm having trouble transferring funds from my account. Can you help?
                          </p>
                          <p className="text-xs text-[#64748B] mt-1">2024-01-15 14:30</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div className="bg-blue-50 p-3 rounded-lg flex-1">
                          <p className="text-sm">
                            I'd be happy to help with your transfer issue. Could you please provide more details 
                            about the error message you're seeing?
                          </p>
                          <p className="text-xs text-[#64748B] mt-1">2024-01-15 14:35</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Add Response</h4>
                    <textarea 
                      className="w-full p-3 border rounded-lg h-24"
                      placeholder="Type your response here..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Other modal content types would go here */}
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50 flex justify-between">
            <Button 
              variant="outline"
              onClick={closeModal}
            >
              Close
            </Button>

            {modalType === "view_ticket" && (
              <div className="flex gap-2">
                <Button 
                  className="bg-orange-600 text-white"
                  onClick={() => {
                    showSuccess("Ticket escalated to supervisor!");
                    closeModal();
                  }}
                >
                  Escalate
                </Button>
                <Button 
                  className="bg-green-600 text-white"
                  onClick={() => {
                    showSuccess("Response sent and ticket resolved!");
                    closeModal();
                  }}
                >
                  Send & Resolve
                </Button>
              </div>
            )}

            {modalType === "resolve_dispute" && (
              <Button 
                className="bg-green-600 text-white"
                onClick={() => {
                  showSuccess("Dispute resolved successfully!");
                  closeModal();
                }}
              >
                Resolve Dispute
              </Button>
            )}

            {modalType === "edit_template" && (
              <Button 
                className="bg-blue-600 text-white"
                onClick={() => {
                  showSuccess("Template updated successfully!");
                  closeModal();
                }}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Success Notification
  const renderSuccessNotification = () => {
    if (!showSuccessNotification) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 max-w-md">
        <CheckCircleIcon className="w-6 h-6" />
        <div>
          <h4 className="font-semibold">Success</h4>
          <p className="text-sm">{successMessage}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowSuccessNotification(false)}
          className="text-white hover:bg-green-700 p-1 ml-auto"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1E293B]">Support Dashboard</h1>
                <p className="text-sm text-[#64748B]">Customer Support</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AccountTypeSwitcher variant="header" />
            
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-2">
                <BellIcon className="w-5 h-5 text-[#64748B]" />
              </Button>
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                5
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-[#1E293B]">Mike Support</div>
                <div className="text-xs text-[#64748B]">Customer Support</div>
              </div>
              <ProfileDropdown
                userName="Mike Support"
                userRole="Customer Support"
                avatar="MS"
                profileRoute="/support-profile"
                accountType="support"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto fixed">
          <div className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search..."
                className="pl-10"
              />
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Account Type Switcher */}
            <div className="mb-4">
              <AccountTypeSwitcher variant="sidebar" />
            </div>

            <div className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  <div
                    className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white"
                        : item.children && item.children.some(child => activeSection === child.id)
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#64748B] hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      if (item.children) {
                        toggleMenu(item.id);
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    {item.children && (
                      <ChevronDownIcon 
                        className={`w-4 h-4 ml-auto transition-transform ${
                          isMenuOpen(item.id) ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </div>

                  {item.children && isMenuOpen(item.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                            activeSection === child.id
                              ? "bg-blue-100 text-blue-600 font-medium"
                              : "text-[#64748B] hover:bg-gray-50"
                          }`}
                          onClick={() => setActiveSection(child.id)}
                        >
                          <span>{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          {renderPageContent()}
        </div>
      </div>

      {/* Modals */}
      {renderModal()}

      {/* Success Notification */}
      {renderSuccessNotification()}
    </div>
  );
};

export default SupportDashboard;