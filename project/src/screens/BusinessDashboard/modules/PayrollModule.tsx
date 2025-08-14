import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge'; 
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { 
  UsersIcon, 
  PlusIcon, 
  DownloadIcon, 
  UploadIcon, 
  CalendarIcon,
  DollarSignIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  SearchIcon,
  FilterIcon,
  BellIcon,
  ArrowLeftIcon,
  HomeIcon,
  FileTextIcon,
  CreditCardIcon,
  BarChart3Icon,
  InboxIcon,
  StarIcon,
  BuildingIcon,
  ChevronDownIcon
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
  lastPaid: string;
  avatar: string;
}

export const PayrollModule: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 450000,
      status: 'active',
      lastPaid: '2024-01-01',
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'Product Manager',
      department: 'Product',
      salary: 520000,
      status: 'active',
      lastPaid: '2024-01-01',
      avatar: 'JS'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      position: 'Designer',
      department: 'Design',
      salary: 380000,
      status: 'active',
      lastPaid: '2024-01-01',
      avatar: 'MJ'
    }
  ]);

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const totalPayroll = employees
    .filter(emp => selectedEmployees.includes(emp.id))
    .reduce((sum, emp) => sum + emp.salary, 0);

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.id));
    }
  };

  const handleProcessPayroll = () => {
    // Process payroll for selected employees
    console.log('Processing payroll for:', selectedEmployees);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  active: true,
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
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">Payroll Management</h1>
                  <p className="text-sm text-[#64748B]">Manage employee salaries and process payments</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
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
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <UploadIcon className="w-4 h-4" />
                    Import CSV
                  </Button>
                  <Button className="bg-[#5B52FF] text-white flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add Employee
                  </Button>
                </div>
              </div>

              {/* Rest of the payroll content */}
              {/* Payroll Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Total Employees</p>
                        <p className="text-2xl font-bold text-[#1E293B]">{employees.length}</p>
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
                        <p className="text-sm text-[#64748B]">Monthly Payroll</p>
                        <p className="text-2xl font-bold text-[#1E293B]">
                          ₦{employees.reduce((sum, emp) => sum + emp.salary, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Next Payday</p>
                        <p className="text-lg font-bold text-[#1E293B]">Jan 31, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CheckIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[#64748B]">Selected</p>
                        <p className="text-2xl font-bold text-[#1E293B]">{selectedEmployees.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payroll Actions */}
              {selectedEmployees.length > 0 && (
                <Card className="bg-[#F8F9FF] border-[#5B52FF]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-[#1E293B]">
                          {selectedEmployees.length} employee(s) selected
                        </h3>
                        <p className="text-sm text-[#64748B]">
                          Total amount: ₦{totalPayroll.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setSelectedEmployees([])}>
                          Clear Selection
                        </Button>
                        <Button 
                          className="bg-[#5B52FF] text-white"
                          onClick={handleProcessPayroll}
                        >
                          Process Payroll
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Employee List */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#1E293B]">Employee List</h3>
                    <div className="flex gap-3">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <Input
                          placeholder="Search employees..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <FilterIcon className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4">
                            <input
                              type="checkbox"
                              checked={selectedEmployees.length === employees.length}
                              onChange={handleSelectAll}
                              className="rounded"
                            />
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">EMPLOYEE</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">POSITION</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DEPARTMENT</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">SALARY</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">LAST PAID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedEmployees.includes(employee.id)}
                                onChange={() => handleSelectEmployee(employee.id)}
                                className="rounded"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarFallback className="bg-[#5B52FF] text-white">
                                    {employee.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-[#1E293B]">{employee.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{employee.position}</td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{employee.department}</td>
                            <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                              ₦{employee.salary.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={
                                employee.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }>
                                {employee.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-[#64748B]">{employee.lastPaid}</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">
                                <EditIcon className="w-4 h-4" />
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Payroll</h1>
              <p className="text-xs text-[#64748B]">Manage employees</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="space-y-6">
            {/* Mobile content would go here */}
            <div className="text-center py-8">
              <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Payroll Management</h3>
              <p className="text-[#64748B]">Mobile view coming soon</p>
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Home", icon: <BuildingIcon className="w-6 h-6" />, onClick: () => navigate("/business-dashboard") },
              { name: "Payroll", icon: <UsersIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/payroll") },
              { name: "Reports", icon: <BarChart3Icon className="w-6 h-6" />, onClick: () => navigate("/reports") },
              { name: "POS", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/pos") }
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