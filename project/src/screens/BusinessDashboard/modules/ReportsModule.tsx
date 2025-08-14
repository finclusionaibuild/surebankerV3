import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { 
  DownloadIcon, 
  CalendarIcon,
  BarChart3Icon,
  PieChartIcon,
  FileTextIcon,
  FilterIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  PrinterIcon,
  MailIcon,
  ShareIcon,
  BellIcon,
  ArrowLeftIcon,
  HomeIcon,
  CreditCardIcon,
  UsersIcon,
  InboxIcon,
  StarIcon,
  BuildingIcon,
  SearchIcon
} from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('financial');
  
  const financialSummary = {
    revenue: 12500000,
    expenses: 8200000,
    profit: 4300000,
    revenueChange: '+15.3%',
    expensesChange: '-5.2%',
    profitChange: '+22.7%'
  };
  
  const topExpenseCategories = [
    { name: 'Salaries & Wages', amount: 4500000, percentage: 55 },
    { name: 'Rent & Utilities', amount: 1200000, percentage: 15 },
    { name: 'Marketing', amount: 800000, percentage: 10 },
    { name: 'Equipment', amount: 700000, percentage: 8 },
    { name: 'Software & Services', amount: 600000, percentage: 7 },
    { name: 'Other', amount: 400000, percentage: 5 }
  ];
  
  const monthlyData = [
    { month: 'Jan', revenue: 10200000, expenses: 7800000 },
    { month: 'Feb', revenue: 9800000, expenses: 7500000 },
    { month: 'Mar', revenue: 11500000, expenses: 8100000 },
    { month: 'Apr', revenue: 10800000, expenses: 7900000 },
    { month: 'May', revenue: 11200000, expenses: 8000000 },
    { month: 'Jun', revenue: 12500000, expenses: 8200000 }
  ];
  
  const availableReports = [
    { id: 'financial', name: 'Financial Statement', description: 'Revenue, expenses, and profit summary', icon: <BarChart3Icon className="w-5 h-5" /> },
    { id: 'tax', name: 'Tax Report', description: 'VAT, withholding tax, and other tax information', icon: <FileTextIcon className="w-5 h-5" /> },
    { id: 'payroll', name: 'Payroll Report', description: 'Employee salary and benefits summary', icon: <DollarSignIcon className="w-5 h-5" /> },
    { id: 'transactions', name: 'Transaction History', description: 'Detailed record of all transactions', icon: <TrendingUpIcon className="w-5 h-5" /> }
  ];

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
                  active: true,
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
                  <h1 className="text-xl font-semibold text-[#1E293B]">Business Reports</h1>
                  <p className="text-sm text-[#64748B]">Generate and analyze business performance reports</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>This Month</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Button>
                  <Button className="bg-[#5B52FF] text-white flex items-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    Export Report
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
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Report Types */}
            <div className="grid grid-cols-4 gap-4">
              {availableReports.map((report) => (
                <Card 
                  key={report.id}
                  className={`cursor-pointer transition-all ${
                    reportType === report.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                  }`}
                  onClick={() => setReportType(report.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white">
                        {report.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1E293B]">{report.name}</h3>
                        <p className="text-xs text-[#64748B]">{report.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUpIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Total Revenue</p>
                        <p className="text-2xl font-bold text-[#1E293B]">₦{financialSummary.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {financialSummary.revenueChange}
                    </Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <TrendingDownIcon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Total Expenses</p>
                        <p className="text-2xl font-bold text-[#1E293B]">₦{financialSummary.expenses.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {financialSummary.expensesChange}
                    </Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: `${(financialSummary.expenses / financialSummary.revenue) * 100}%` }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSignIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Net Profit</p>
                        <p className="text-2xl font-bold text-[#1E293B]">₦{financialSummary.profit.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {financialSummary.profitChange}
                    </Badge>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(financialSummary.profit / financialSummary.revenue) * 100}%` }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analysis */}
            <div className="grid grid-cols-2 gap-6">
              {/* Monthly Revenue vs Expenses */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#1E293B]">Revenue vs Expenses</h3>
                    <Button variant="outline" size="sm">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  
                  {/* Simplified Chart Visualization */}
                  <div className="h-64 flex items-end justify-between">
                    {monthlyData.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-16 h-48 relative">
                          <div 
                            className="absolute bottom-0 left-0 w-6 bg-green-500 rounded-t-sm"
                            style={{ height: `${(month.revenue / 15000000) * 100}%` }}
                          ></div>
                          <div 
                            className="absolute bottom-0 right-0 w-6 bg-red-500 rounded-t-sm"
                            style={{ height: `${(month.expenses / 15000000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-[#64748B] mt-2">{month.month}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <span className="text-sm text-[#64748B]">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span className="text-sm text-[#64748B]">Expenses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Expense Breakdown */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#1E293B]">Expense Breakdown</h3>
                    <Button variant="outline" size="sm">
                      <PieChartIcon className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {topExpenseCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-[#1E293B]">{category.name}</span>
                          <span className="text-sm font-medium text-[#1E293B]">₦{category.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-purple-500' :
                              index === 3 ? 'bg-yellow-500' :
                              index === 4 ? 'bg-red-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Reports */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-6">Available Reports</h3>
                
                <div className="space-y-4">
                  {[
                    { name: 'Monthly Financial Statement', date: 'June 2024', status: 'Ready', size: '1.2 MB' },
                    { name: 'Quarterly Tax Report', date: 'Q2 2024', status: 'Ready', size: '3.5 MB' },
                    { name: 'Annual Financial Report', date: '2023', status: 'Ready', size: '5.8 MB' },
                    { name: 'Employee Payroll Summary', date: 'June 2024', status: 'Ready', size: '0.8 MB' },
                    { name: 'Vendor Payment Report', date: 'June 2024', status: 'Processing', size: '1.1 MB' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                          <FileTextIcon className="w-5 h-5 text-[#5B52FF]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1E293B]">{report.name}</p>
                          <p className="text-sm text-[#64748B]">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {report.status}
                        </Badge>
                        {report.status === 'Ready' && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <DownloadIcon className="w-4 h-4 text-[#64748B]" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <PrinterIcon className="w-4 h-4 text-[#64748B]" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MailIcon className="w-4 h-4 text-[#64748B]" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <FileTextIcon className="w-4 h-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-[#1E293B]">Reports</h1>
                <p className="text-xs text-[#64748B]">Business performance reports</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <DownloadIcon className="w-4 h-4" />
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm" className="p-2">
                  <BellIcon className="w-4 h-4 text-[#64748B]" />
                </Button>
                <Badge className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  3
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <div className="p-4 space-y-4">
          {/* Mobile Report Types */}
          <div className="grid grid-cols-2 gap-3">
            {availableReports.map((report) => (
              <Card 
                key={report.id}
                className={`cursor-pointer transition-all ${
                  reportType === report.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                }`}
                onClick={() => setReportType(report.id)}
              >
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white mb-2">
                      {report.icon}
                    </div>
                    <h3 className="text-sm font-medium text-[#1E293B]">{report.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Financial Summary */}
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUpIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Total Revenue</p>
                      <p className="text-lg font-bold text-[#1E293B]">₦{financialSummary.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {financialSummary.revenueChange}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <TrendingDownIcon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Total Expenses</p>
                      <p className="text-lg font-bold text-[#1E293B]">₦{financialSummary.expenses.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {financialSummary.expensesChange}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSignIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B]">Net Profit</p>
                      <p className="text-lg font-bold text-[#1E293B]">₦{financialSummary.profit.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {financialSummary.profitChange}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Available Reports */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Available Reports</h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Monthly Financial Statement', date: 'June 2024', status: 'Ready', size: '1.2 MB' },
                  { name: 'Quarterly Tax Report', date: 'Q2 2024', status: 'Ready', size: '3.5 MB' },
                  { name: 'Annual Financial Report', date: '2023', status: 'Ready', size: '5.8 MB' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
                        <FileTextIcon className="w-4 h-4 text-[#5B52FF]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{report.name}</p>
                        <p className="text-xs text-[#64748B]">{report.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <DownloadIcon className="w-4 h-4 text-[#64748B]" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            {[
              { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, onClick: () => navigate("/business-dashboard") },
              { name: "Payroll", icon: <UsersIcon className="w-5 h-5" />, onClick: () => navigate("/payroll") },
              { name: "POS", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/pos") },
              { name: "Reports", icon: <BarChart3Icon className="w-5 h-5" />, active: true, onClick: () => navigate("/reports") },
              { name: "More", icon: <SearchIcon className="w-5 h-5" />, onClick: () => navigate("/business-dashboard") }
            ].map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg cursor-pointer transition-all ${
                  item.active ? "text-[#5B52FF]" : "text-[#64748B]"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};