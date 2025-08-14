import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { useAccountTransactions, useAccountNavigation } from "../../hooks/useAccountData";
import { AccountSwitcher } from "../../components/ui/account-switcher";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  DownloadIcon,
  FilterIcon,
  ChevronDownIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  ArrowRightIcon,
  UserIcon
} from "lucide-react";

export const Transactions = (): JSX.Element => {
  const { currentAccount, isBusinessAccount } = useAccount();
  const { transactions } = useAccountTransactions();
  const { navigationItems } = useAccountNavigation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30days");
  const navigate = useNavigate();

  const sampleTransactionsData = [
    {
      id: "TXN001",
      name: "Oyi Chijioke Nneka",
      type: "Credit",
      bank: "Zenith Bank",
      amount: "₦100,000.00",
      transactionId: "#CGA479847299244",
      date: "Aug 26, 2024",
      time: "14:30:23",
      description: "Buying Fuel",
      status: "Failed",
      avatar: "O",
      bgColor: "bg-red-100",
    },
    {
      id: "TXN002",
      name: "Francis Obinna Okafor",
      type: "Debit",
      bank: "GTB",
      amount: "₦100,000.00",
      transactionId: "#CGA479847299245",
      date: "Aug 26, 2024",
      time: "12:15:45",
      description: "Cash Deposit",
      status: "Successful",
      avatar: "F",
      bgColor: "bg-orange-100",
    },
    {
      id: "TXN003",
      name: "Airtel VTU NG",
      type: "Debit",
      bank: "N/A",
      amount: "₦1,000.00",
      transactionId: "#CGA479847299246",
      date: "Aug 25, 2024",
      time: "09:22:11",
      description: "Airtime Purchase",
      status: "Successful",
      avatar: "A",
      bgColor: "bg-blue-100",
    },
    {
      id: "TXN004",
      name: "Kwese TV",
      type: "Debit",
      bank: "UBA",
      amount: "₦20,000.00",
      transactionId: "#CGA479847299247",
      date: "Aug 25, 2024",
      time: "16:45:33",
      description: "Dish Subscription",
      status: "Successful",
      avatar: "K",
      bgColor: "bg-purple-100",
    },
    {
      id: "TXN005",
      name: "Dominic Emeka Ojebor",
      type: "Credit",
      bank: "Unity Bank",
      amount: "₦32,000.00",
      transactionId: "#CGA479847299248",
      date: "Aug 24, 2024",
      time: "11:30:15",
      description: "Transfer Received",
      status: "Successful",
      avatar: "D",
      bgColor: "bg-green-100",
    },
    {
      id: "TXN006",
      name: "Temitope Tolu Adeniyi",
      type: "Credit",
      bank: "GTB",
      amount: "₦21,456.00",
      transactionId: "#CGA479847299249",
      date: "Aug 24, 2024",
      time: "08:15:22",
      description: "Salary Payment",
      status: "Pending",
      avatar: "T",
      bgColor: "bg-yellow-100",
    },
  ];

  const filteredTransactions = sampleTransactionsData.filter(transaction => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "credit") return transaction.type === "Credit";
    if (selectedFilter === "debit") return transaction.type === "Debit";
    if (selectedFilter === "successful") return transaction.status === "Successful";
    if (selectedFilter === "pending") return transaction.status === "Pending";
    if (selectedFilter === "failed") return transaction.status === "Failed";
    return true;
  });

  const totalAmount = sampleTransactionsData.reduce((sum, transaction) => {
    const amount = parseFloat(transaction.amount.replace(/[₦,]/g, ''));
    return transaction.type === "Credit" ? sum + amount : sum - amount;
  }, 0);

  // Navigation items with navigation functions
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <HomeIcon className="w-5 h-5" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Payments", 
      icon: <CreditCardIcon className="w-5 h-5" />, 
      hasDropdown: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "Transactions", 
      icon: <ReceiptIcon className="w-5 h-5" />, 
      active: true,
      onClick: () => navigate("/transactions")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-5 h-5" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "SureSavings", 
      icon: <PiggyBankIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "SureBudget", 
      icon: <BarChart3Icon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "SureEscrow", 
      icon: <HandshakeIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Inbox", 
      icon: <InboxIcon className="w-5 h-5" />, 
      notifications: 99,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Rate Us", 
      icon: <StarIcon className="w-5 h-5" />,
      onClick: () => navigate("/dashboard")
    },
  ];

  // Mobile Navigation Items with navigation functions
  const mobileNavItems = [
    { 
      name: "Home", 
      icon: <HomeIcon className="w-6 h-6" />, 
      active: false,
      onClick: () => navigate("/dashboard")
    },
    { 
      name: "Transfer", 
      icon: <ArrowRightIcon className="w-6 h-6" />,
      onClick: () => navigate("/transfer")
    },
    { 
      name: "History", 
      icon: <ReceiptIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/transactions")
    },
    { 
      name: "Cards", 
      icon: <CreditCardIcon className="w-6 h-6" />,
      onClick: () => navigate("/cards")
    },
    { 
      name: "Profile", 
      icon: <UserIcon className="w-6 h-6" />,
      onClick: () => navigate("/profile")
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar - Static */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 p-4 overflow-hidden">
            <div className="space-y-1">
              {navItems.map((item, index) => (
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

          <div className="p-4">
            <Card className="bg-[#1E293B] text-white card-no-shadow">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-3">
                  Gain full access to rewards and bonuses when you get your friends to use{" "}
                  <span className="font-bold">SureBanker</span>
                </p>
                <Button className="w-full bg-[#5B52FF] hover:bg-[#4338CA] text-white btn-primary">
                  Refer & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <h1 className="text-xl font-semibold text-[#1E293B]">Transaction History</h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="p-2"
                   onClick={() => navigate("/inbox")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'User'}</div>
                  </div>
                  <AccountSwitcher />
                </div>
              </div>
            </div>
          </header>

          {/* Transaction Content */}
          <main className="flex-1 p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-[#64748B] mb-2">Total Balance</p>
                  <p className="text-2xl font-bold text-[#1E293B]">₦{totalAmount.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+2.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-[#64748B] mb-2">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">₦153,456</p>
                  <p className="text-sm text-green-600 mt-1">+5.2% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-[#64748B] mb-2">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₦121,000</p>
                  <p className="text-sm text-red-600 mt-1">+1.8% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-[#64748B] mb-2">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">₦21,456</p>
                  <p className="text-sm text-[#64748B] mt-1">1 transaction</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Controls */}
            <Card className="mb-6 card-no-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1E293B]">All Transactions</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <CalendarIcon className="w-4 h-4" />
                      <span>1-30 August 2024</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <DownloadIcon className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                    <Input 
                      placeholder="Search transactions..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="credit">Credit Only</option>
                    <option value="debit">Debit Only</option>
                    <option value="successful">Successful</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Banks</option>
                    <option>GTB</option>
                    <option>Zenith Bank</option>
                    <option>UBA</option>
                    <option>Unity Bank</option>
                  </select>
                </div>

                {/* Transaction Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#5B52FF] text-white">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium">TRANSACTION</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">TYPE</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">BANK</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">AMOUNT</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">DATE & TIME</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">DESCRIPTION</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${transaction.bgColor} rounded-full flex items-center justify-center`}>
                                <span className="text-sm font-medium">{transaction.avatar}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#1E293B]">{transaction.name}</p>
                                <p className="text-xs text-[#64748B]">{transaction.transactionId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {transaction.type === "Credit" ? (
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <ArrowUpIcon className="w-3 h-3 text-green-600" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                  <ArrowDownIcon className="w-3 h-3 text-red-600" />
                                </div>
                              )}
                              <span className={`text-sm font-medium ${
                                transaction.type === "Credit" ? "text-green-600" : "text-red-600"
                              }`}>
                                {transaction.type}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.bank}</td>
                          <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">{transaction.amount}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm text-[#1E293B]">{transaction.date}</p>
                              <p className="text-xs text-[#64748B]">{transaction.time}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.description}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={`text-xs px-2 py-1 rounded-full ${
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

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-[#64748B]">
                    Showing {filteredTransactions.length} of {sampleTransactionsData.length} transactions
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm" className="bg-[#5B52FF] text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden bg-white">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Transactions</h1>
              <p className="text-xs text-[#64748B]">{isBusinessAccount ? 'Business transactions' : 'Transaction history'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
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
          {/* Summary Cards - Standard Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="card-no-shadow">
              <CardContent className="p-4">
                <p className="text-xs text-[#64748B] mb-1">Total Income</p>
                <p className="text-lg font-bold text-green-600">₦153,456</p>
              </CardContent>
            </Card>
            <Card className="card-no-shadow">
              <CardContent className="p-4">
                <p className="text-xs text-[#64748B] mb-1">Total Expenses</p>
                <p className="text-lg font-bold text-red-600">₦121,000</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter Buttons - Standard Height */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("all")}
              className={selectedFilter === "all" ? "bg-[#5B52FF] text-white" : ""}
            >
              All
            </Button>
            <Button 
              variant={selectedFilter === "credit" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("credit")}
              className={selectedFilter === "credit" ? "bg-[#5B52FF] text-white" : ""}
            >
              Credit
            </Button>
            <Button 
              variant={selectedFilter === "debit" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("debit")}
              className={selectedFilter === "debit" ? "bg-[#5B52FF] text-white" : ""}
            >
              Debit
            </Button>
            <Button 
              variant={selectedFilter === "pending" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("pending")}
              className={selectedFilter === "pending" ? "bg-[#5B52FF] text-white" : ""}
            >
              Pending
            </Button>
          </div>

          {/* Transaction List - Standard Layout */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <Card key={index} className="card-no-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${transaction.bgColor} rounded-full flex items-center justify-center`}>
                        <span className="text-sm font-medium">{transaction.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{transaction.name}</p>
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
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>{transaction.date} • {transaction.time}</span>
                    <span>{transaction.transactionId}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Mobile Bottom Navigation - Consistent with Dashboard */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
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