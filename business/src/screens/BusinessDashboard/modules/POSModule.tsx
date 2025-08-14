import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge'; 
import { 
  CreditCardIcon, 
  DownloadIcon, 
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart3Icon,
  PieChartIcon,
  RefreshCwIcon,
  SearchIcon,
  FilterIcon,
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  BellIcon,
  ArrowLeftIcon,
  HomeIcon,
  FileTextIcon,
  DollarSignIcon,
  UsersIcon,
  InboxIcon,
  StarIcon,
  BuildingIcon
} from 'lucide-react';

interface POSTransaction {
  id: string;
  terminalId: string;
  amount: number;
  status: 'successful' | 'failed' | 'pending';
  date: string;
  time: string;
  cardType: string;
  location: string;
  merchantName: string;
}

export const POSModule: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample POS transactions
  const posTransactions: POSTransaction[] = [
    {
      id: 'POS001',
      terminalId: 'TRM12345',
      amount: 15000,
      status: 'successful',
      date: '2024-01-15',
      time: '14:30:23',
      cardType: 'Visa',
      location: 'Lagos Branch',
      merchantName: 'Main Store'
    },
    {
      id: 'POS002',
      terminalId: 'TRM12346',
      amount: 8500,
      status: 'successful',
      date: '2024-01-15',
      time: '12:15:45',
      cardType: 'Mastercard',
      location: 'Abuja Branch',
      merchantName: 'Satellite Office'
    },
    {
      id: 'POS003',
      terminalId: 'TRM12345',
      amount: 5000,
      status: 'failed',
      date: '2024-01-15',
      time: '09:22:11',
      cardType: 'Verve',
      location: 'Lagos Branch',
      merchantName: 'Main Store'
    },
    {
      id: 'POS004',
      terminalId: 'TRM12347',
      amount: 12000,
      status: 'pending',
      date: '2024-01-15',
      time: '16:45:33',
      cardType: 'Visa',
      location: 'Port Harcourt Branch',
      merchantName: 'Satellite Office'
    }
  ];

  const filteredTransactions = posTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.terminalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalSuccessful = posTransactions
    .filter(t => t.status === 'successful')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFailed = posTransactions
    .filter(t => t.status === 'failed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPending = posTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Business Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-8 w-auto object-contain"
            />
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                BUSINESS MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
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
                  name: "POS Dashboard", 
                  icon: <CreditCardIcon className="w-5 h-5" />,
                  active: true,
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

          <div className="p-4">
            <Card className="bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#1E293B] text-white overflow-hidden relative card-no-shadow">
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
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">POS Dashboard</h1>
                  <p className="text-sm text-[#64748B]">Monitor and manage your POS transactions</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Today</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Export
                  </Button>
                  <Button className="bg-[#5B52FF] text-white flex items-center gap-2">
                    <RefreshCwIcon className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    3
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Business Admin</div>
                  </div>
                  <div className="w-8 h-8 bg-[#5B52FF] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">BA</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              {/* Transaction Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCardIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Total Transactions</p>
                        <p className="text-2xl font-bold text-[#1E293B]">{posTransactions.length}</p>
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
                        <p className="text-sm text-[#64748B]">Successful</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₦{totalSuccessful.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <TrendingDownIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Failed</p>
                        <p className="text-2xl font-bold text-red-600">
                          ₦{totalFailed.toLocaleString()}
                        </p>
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
                        <p className="text-sm text-[#64748B]">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          ₦{totalPending.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Terminal Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Terminal Performance</h3>
                      <Button variant="outline" size="sm">
                        <BarChart3Icon className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">T1</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">TRM12345</p>
                            <p className="text-xs text-[#64748B]">Lagos Branch</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1E293B]">₦20,000</p>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">T2</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">TRM12346</p>
                            <p className="text-xs text-[#64748B]">Abuja Branch</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1E293B]">₦8,500</p>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">T3</span>
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">TRM12347</p>
                            <p className="text-xs text-[#64748B]">Port Harcourt Branch</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#1E293B]">₦12,000</p>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Card Type Distribution</h3>
                      <Button variant="outline" size="sm">
                        <PieChartIcon className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    <div className="flex items-center justify-center h-48">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-500">45%</span>
                          </div>
                          <p className="mt-2 font-medium text-[#1E293B]">Visa</p>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full border-8 border-orange-500 flex items-center justify-center">
                            <span className="text-lg font-bold text-orange-500">35%</span>
                          </div>
                          <p className="mt-2 font-medium text-[#1E293B]">Mastercard</p>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                            <span className="text-lg font-bold text-green-500">20%</span>
                          </div>
                          <p className="mt-2 font-medium text-[#1E293B]">Verve</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction List */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#1E293B]">Recent POS Transactions</h3>
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
                      <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="successful">Successful</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TRANSACTION ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">TERMINAL ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DATE & TIME</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">CARD TYPE</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LOCATION</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                              {transaction.id}
                            </td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.terminalId}</td>
                            <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                              ₦{transaction.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="text-sm text-[#1E293B]">{transaction.date}</p>
                                <p className="text-xs text-[#64748B]">{transaction.time}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{transaction.cardType}</td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">
                              <div>
                                <p className="text-sm text-[#1E293B]">{transaction.location}</p>
                                <p className="text-xs text-[#64748B]">{transaction.merchantName}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={
                                transaction.status === 'successful' 
                                  ? 'bg-green-100 text-green-800 flex items-center gap-1 w-fit' 
                                  : transaction.status === 'failed'
                                  ? 'bg-red-100 text-red-800 flex items-center gap-1 w-fit'
                                  : 'bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit'
                              }>
                                {transaction.status === 'successful' && <CheckIcon className="w-3 h-3" />}
                                {transaction.status === 'failed' && <XIcon className="w-3 h-3" />}
                                {transaction.status === 'pending' && <AlertTriangleIcon className="w-3 h-3" />}
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

      {/* Mobile Layout */}
      <div className="lg:hidden bg-white">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">POS Dashboard</h1>
              <p className="text-xs text-[#64748B]">Monitor transactions</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="text-center py-8">
            <CreditCardIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">POS Dashboard</h3>
            <p className="text-[#64748B]">Mobile view coming soon</p>
          </div>
        </main>
      </div>
    </div>
  );
};