import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  PiggyBankIcon,
  TrendingUpIcon,
  CalendarIcon,
  PlusIcon,
  MinusIcon,
  TargetIcon,
  DollarSignIcon,
  ChartBarIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  UserIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  AlertTriangleIcon,
  CarIcon,
  GraduationCapIcon,
  PlaneIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon
} from "lucide-react";

interface SavingsPlan {
  id: string;
  name: string;
  icon: React.ReactNode;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Behind Schedule';
  color: string;
  members?: string[];
  dueDate?: string;
  remaining?: string;
}

interface Transaction {
  id: string;
  type: 'Income' | 'Withdrawal';
  member: string;
  date: string;
  time: string;
  amount: number;
  description: string;
}

export const SureSavings = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<SavingsPlan | null>(null);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanTarget, setNewPlanTarget] = useState("");

  const savingsOverview = {
    totalSavings: 120000,
    totalTarget: 200000,
    totalPlans: 4,
    yesterdayInterest: 18000
  };

  const savingsPlans: SavingsPlan[] = [
    {
      id: "1",
      name: "Emergency Fund",
      icon: <AlertTriangleIcon className="w-5 h-5" />,
      currentAmount: 60000,
      targetAmount: 100000,
      progress: 60,
      status: "In Progress",
      color: "bg-red-500"
    },
    {
      id: "2", 
      name: "Vacation Fund",
      icon: <PlaneIcon className="w-5 h-5" />,
      currentAmount: 30000,
      targetAmount: 60000,
      progress: 60,
      status: "In Progress",
      color: "bg-blue-500",
      members: ["Andrew Forbat", "Sarah Connors", "Mike Johnson"],
      dueDate: "31 December, 2028",
      remaining: "95 days"
    },
    {
      id: "3",
      name: "Retirement Fund", 
      icon: <PiggyBankIcon className="w-5 h-5" />,
      currentAmount: 60000,
      targetAmount: 100000,
      progress: 28,
      status: "In Progress",
      color: "bg-purple-500"
    },
    {
      id: "4",
      name: "Home Down Payment",
      icon: <HomeIcon className="w-5 h-5" />,
      currentAmount: 60000,
      targetAmount: 100000,
      progress: 100,
      status: "Completed",
      color: "bg-green-500"
    },
    {
      id: "5",
      name: "Education Fund (for children)",
      icon: <GraduationCapIcon className="w-5 h-5" />,
      currentAmount: 60000,
      targetAmount: 100000,
      progress: 40,
      status: "In Progress",
      color: "bg-orange-500"
    },
    {
      id: "6",
      name: "Car Replacement Fund",
      icon: <CarIcon className="w-5 h-5" />,
      currentAmount: 6000000,
      targetAmount: 6000000,
      progress: 25,
      status: "Behind Schedule",
      color: "bg-yellow-500"
    }
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "Income",
      member: "Andrew Forbat",
      date: "2028-09-01",
      time: "09:00 AM",
      amount: 5500,
      description: "Monthly contribution to fund"
    },
    {
      id: "2", 
      type: "Income",
      member: "Sarah Connors",
      date: "2028-09-01",
      time: "10:15 AM", 
      amount: 5500,
      description: "Monthly contribution to fund"
    },
    {
      id: "3",
      type: "Income",
      member: "Mike Johnson",
      date: "2028-09-04",
      time: "11:30 AM",
      amount: 5500,
      description: "Monthly contribution to fund"
    },
    {
      id: "4",
      type: "Withdrawal",
      member: "Andrew Forbat",
      date: "2028-07-15",
      time: "02:00 PM",
      amount: 5200,
      description: "Used for urgent travel booking"
    }
  ];

  const savingsTips = [
    "Mission: Save ₦21 per day for 95 days to meet goal.",
    "Cut unnecessary subscriptions, save more.",
    "Skip eating out twice a week.",
    "Automate savings from paycheck."
  ];

  const chartData = [
    { month: "Jan", amount: 15000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 22000 },
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 30000 },
    { month: "Jun", amount: 35000 },
    { month: "Jul", amount: 42000 },
    { month: "Aug", amount: 48000 },
    { month: "Sep", amount: 55000 },
    { month: "Oct", amount: 62000 },
    { month: "Nov", amount: 68000 },
    { month: "Dec", amount: 75000 }
  ];

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/dashboard") },
    { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: true, onClick: () => navigate("/payments") },
    { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, onClick: () => navigate("/transactions") },
    { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/cards") },
    { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/sure-savings") },
    { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/sure-budget") },
    { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, onClick: () => navigate("/sure-escrow") },
    { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, onClick: () => navigate("/inbox") },
    { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, onClick: () => navigate("/ratings") }
  ];

  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
    { name: "Savings", icon: <PiggyBankIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/sure-savings") },
    { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/cards") },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-600";
      case "In Progress": return "text-blue-600";
      case "Behind Schedule": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getProgressBarColor = (progress: number, status: string) => {
    if (status === "Completed") return "bg-green-500";
    if (status === "Behind Schedule") return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img src="/Logo Main Trans.png" alt="SureBanker" className="h-8 w-auto object-contain" />
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    item.active ? "bg-[#5B52FF] text-white" : "text-[#64748B] hover:bg-gray-50"
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
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">Good day, {currentAccount?.name?.split(' ')[0] || 'Carchy'}</h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-[#5B52FF] text-white btn-primary">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline">
                  <ArrowRightIcon className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>

                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="p-2"
                   onClick={() => navigate("/notifications")}
                 >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    1
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'Carchy Atinse'}</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'CA'}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gray-50">
            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-green-100 to-green-200 border-green-300">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-green-700 mb-2">Total Savings</p>
                  <p className="text-3xl font-bold text-green-800">₦ {savingsOverview.totalSavings.toLocaleString()}.00</p>
                  <p className="text-sm text-green-600 mt-2">Yesterday interest +₦{savingsOverview.yesterdayInterest.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-blue-700 mb-2">Total Target</p>
                  <p className="text-3xl font-bold text-blue-800">₦ {savingsOverview.totalTarget.toLocaleString()}.00</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-purple-700 mb-2">Total Plans</p>
                  <p className="text-3xl font-bold text-purple-800">{savingsOverview.totalPlans}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Savings Plans */}
              <div className="col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Saving Plans</h3>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {savingsPlans.map((plan) => (
                        <div 
                          key={plan.id} 
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedPlan?.id === plan.id ? 'border-[#5B52FF] bg-[#F8F9FF]' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedPlan(plan)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${plan.color} rounded-lg flex items-center justify-center text-white`}>
                                {plan.icon}
                              </div>
                              <span className="font-medium text-[#1E293B]">{plan.name}</span>
                            </div>
                            <span className="text-sm font-bold">{plan.progress}%</span>
                          </div>
                          
                          <div className="mb-2">
                            <p className="text-sm text-[#64748B] mb-1">
                              ₦{plan.currentAmount.toLocaleString()} / ₦{plan.targetAmount.toLocaleString()}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressBarColor(plan.progress, plan.status)}`}
                                style={{ width: `${plan.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <p className={`text-xs font-medium ${getStatusColor(plan.status)}`}>
                            {plan.status}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-[#1E293B] text-white hover:bg-[#2D3748]"
                      onClick={() => setShowAddPlan(true)}
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column - Selected Plan Details */}
              <div className="col-span-1">
                {selectedPlan ? (
                  <div className="space-y-6">
                    {/* Plan Details Card */}
                    <Card className="bg-gradient-to-br from-green-100 to-green-200 border-green-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 ${selectedPlan.color} rounded-lg flex items-center justify-center text-white`}>
                            {selectedPlan.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-800">{selectedPlan.name}</h3>
                            <p className="text-sm text-green-600">₦{selectedPlan.currentAmount.toLocaleString()}/₦{selectedPlan.targetAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-green-700">In Progress</span>
                            <span className="text-sm font-bold text-green-800">{selectedPlan.progress}%</span>
                          </div>
                          <div className="w-full bg-green-300 rounded-full h-3">
                            <div 
                              className="bg-green-600 h-3 rounded-full"
                              style={{ width: `${selectedPlan.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {selectedPlan.members && (
                          <div className="mb-4">
                            <p className="text-sm text-green-700 mb-2">Members</p>
                            <div className="space-y-1">
                              {selectedPlan.members.map((member, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">{member.charAt(0)}</span>
                                  </div>
                                  <span className="text-sm text-green-800">{member}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedPlan.dueDate && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-green-700">Due Date</p>
                              <p className="font-medium text-green-800">{selectedPlan.dueDate}</p>
                            </div>
                            <div>
                              <p className="text-green-700">Remaining</p>
                              <p className="font-medium text-green-800">{selectedPlan.remaining}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Transactions */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-[#1E293B]">Transactions</h4>
                          <Button variant="outline" size="sm">
                            This Month <ChevronDownIcon className="w-4 h-4 ml-1" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4 text-xs font-medium text-[#64748B] pb-2 border-b">
                            <span>Transaction Type</span>
                            <span>Date & Time</span>
                            <span>Amount</span>
                            <span>Brief Note</span>
                          </div>

                          {transactions.map((transaction) => (
                            <div key={transaction.id} className="grid grid-cols-4 gap-4 text-sm py-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                  {transaction.type === 'Income' ? (
                                    <ArrowUpIcon className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <ArrowDownIcon className="w-3 h-3 text-red-600" />
                                  )}
                                </div>
                                <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                                  {transaction.type} - {transaction.member}
                                </span>
                              </div>
                              <span className="text-[#64748B]">
                                {transaction.date} - {transaction.time}
                              </span>
                              <span className={`font-medium ${
                                transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'Income' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                              </span>
                              <span className="text-[#64748B]">{transaction.description}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <PiggyBankIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Select a Savings Plan</h3>
                      <p className="text-[#64748B]">Choose a savings plan from the left to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Tips and Balance Chart */}
              <div className="col-span-1 space-y-6">
                {/* Saving Tips */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-[#1E293B] mb-4">Saving Tips</h4>
                    <div className="space-y-3">
                      {savingsTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#5B52FF] rounded-full mt-2"></div>
                          <p className="text-sm text-[#64748B]">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Balance Chart */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-[#1E293B]">Balance</h4>
                      <Button variant="outline" size="sm">
                        This Year <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-[#1E293B] rounded-sm"></div>
                        <span className="text-sm text-[#64748B]">Jun 2024</span>
                        <span className="text-sm font-bold text-[#1E293B]">₦3,875</span>
                      </div>
                    </div>

                    {/* Simple Chart Visualization */}
                    <div className="h-48 flex items-end justify-between gap-1">
                      {chartData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm"
                            style={{ 
                              height: `${(data.amount / Math.max(...chartData.map(d => d.amount))) * 100}%`,
                              minHeight: '20px'
                            }}
                          ></div>
                          <span className="text-xs text-[#64748B] mt-2">{data.month}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                      <div>
                        <p className="text-xs text-[#64748B]">0</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B]">15k</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B]">30k</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B]">6k</p>
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
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold text-[#1E293B]">SureSavings</h1>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#5B52FF] text-white" size="sm">
              <PlusIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 pb-20">
          {/* Mobile Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-green-100 to-green-200">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-green-700 mb-1">Total Savings</p>
                <p className="text-lg font-bold text-green-800">₦{savingsOverview.totalSavings.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-blue-700 mb-1">Total Target</p>
                <p className="text-lg font-bold text-blue-800">₦{savingsOverview.totalTarget.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Savings Plans */}
          <div className="space-y-4">
            {savingsPlans.slice(0, 4).map((plan) => (
              <Card key={plan.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${plan.color} rounded-lg flex items-center justify-center text-white`}>
                        {plan.icon}
                      </div>
                      <span className="font-medium text-[#1E293B]">{plan.name}</span>
                    </div>
                    <span className="text-sm font-bold">{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressBarColor(plan.progress, plan.status)}`}
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-[#64748B]">
                    ₦{plan.currentAmount.toLocaleString()} / ₦{plan.targetAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item, index) => (
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

      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Create New Savings Plan</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Plan name"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                />
                <Input
                  placeholder="Target amount"
                  value={newPlanTarget}
                  onChange={(e) => setNewPlanTarget(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowAddPlan(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-[#5B52FF] text-white"
                    onClick={() => setShowAddPlan(false)}
                  >
                    Create Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};