import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge'; 
import { 
  DollarSignIcon, 
  CalendarIcon,
  TrendingUpIcon,
  BarChart3Icon,
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  InfoIcon,
  FileTextIcon,
  CalculatorIcon,
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

interface LoanOption {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  processingFee: number;
  eligibility: string[];
}

export const BusinessLoanModule: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [loanTenure, setLoanTenure] = useState<number>(12);
  const [selectedLoanOption, setSelectedLoanOption] = useState<string>('working-capital');

  // Sample loan options
  const loanOptions: LoanOption[] = [
    {
      id: 'working-capital',
      name: 'Working Capital Loan',
      minAmount: 500000,
      maxAmount: 10000000,
      interestRate: 15,
      minTenure: 3,
      maxTenure: 24,
      processingFee: 1,
      eligibility: [
        'Business age > 1 year',
        'Monthly revenue > ₦1,000,000',
        'Good credit history',
        'KYB Tier 3 verification'
      ]
    },
    {
      id: 'equipment-financing',
      name: 'Equipment Financing',
      minAmount: 1000000,
      maxAmount: 20000000,
      interestRate: 18,
      minTenure: 6,
      maxTenure: 36,
      processingFee: 1.5,
      eligibility: [
        'Business age > 2 years',
        'Monthly revenue > ₦2,000,000',
        'Good credit history',
        'KYB Tier 3 verification',
        'Equipment invoice required'
      ]
    },
    {
      id: 'expansion-loan',
      name: 'Business Expansion Loan',
      minAmount: 5000000,
      maxAmount: 50000000,
      interestRate: 20,
      minTenure: 12,
      maxTenure: 60,
      processingFee: 2,
      eligibility: [
        'Business age > 3 years',
        'Monthly revenue > ₦5,000,000',
        'Excellent credit history',
        'KYB Tier 3 verification',
        'Business plan required',
        'Collateral may be required'
      ]
    }
  ];

  const selectedLoan = loanOptions.find(loan => loan.id === selectedLoanOption) || loanOptions[0];

  // Calculate monthly repayment
  const calculateMonthlyRepayment = () => {
    const principal = loanAmount;
    const monthlyInterestRate = selectedLoan.interestRate / 100 / 12;
    const numberOfPayments = loanTenure;
    
    const monthlyPayment = principal * monthlyInterestRate * 
      Math.pow(1 + monthlyInterestRate, numberOfPayments) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment);
  };

  // Calculate total repayment
  const calculateTotalRepayment = () => {
    const monthlyPayment = calculateMonthlyRepayment();
    return monthlyPayment * loanTenure;
  };

  // Calculate total interest
  const calculateTotalInterest = () => {
    return calculateTotalRepayment() - loanAmount;
  };

  // Calculate processing fee
  const calculateProcessingFee = () => {
    return loanAmount * (selectedLoan.processingFee / 100);
  };

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
                  active: true,
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
                  <h1 className="text-xl font-semibold text-[#1E293B]">Business Loans</h1>
                  <p className="text-sm text-[#64748B]">Apply for capital to grow your business</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-[#5B52FF] text-white">
                  Apply for Loan
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
              {/* Rest of loan content */}
              {/* Loan Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loanOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      selectedLoanOption === option.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedLoanOption(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                          <DollarSignIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1E293B]">{option.name}</h3>
                          <p className="text-sm text-[#64748B]">Up to ₦{option.maxAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-[#64748B]">Interest Rate</span>
                          <span className="text-sm font-medium text-[#1E293B]">{option.interestRate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#64748B]">Tenure</span>
                          <span className="text-sm font-medium text-[#1E293B]">
                            {option.minTenure} - {option.maxTenure} months
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#64748B]">Processing Fee</span>
                          <span className="text-sm font-medium text-[#1E293B]">{option.processingFee}%</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant={selectedLoanOption === option.id ? "default" : "outline"}
                        className={`w-full ${selectedLoanOption === option.id ? 'bg-[#5B52FF] text-white' : ''}`}
                        onClick={() => setSelectedLoanOption(option.id)}
                      >
                        {selectedLoanOption === option.id ? 'Selected' : 'Select'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Loan Calculator */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CalculatorIcon className="w-6 h-6 text-[#5B52FF]" />
                    <h3 className="text-lg font-semibold text-[#1E293B]">Loan Calculator</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Inputs */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Loan Amount (₦{loanAmount.toLocaleString()})
                        </label>
                        <Input
                          type="range"
                          min={selectedLoan.minAmount}
                          max={selectedLoan.maxAmount}
                          step={100000}
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-[#64748B] mt-1">
                          <span>₦{selectedLoan.minAmount.toLocaleString()}</span>
                          <span>₦{selectedLoan.maxAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Loan Tenure ({loanTenure} months)
                        </label>
                        <Input
                          type="range"
                          min={selectedLoan.minTenure}
                          max={selectedLoan.maxTenure}
                          step={1}
                          value={loanTenure}
                          onChange={(e) => setLoanTenure(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-[#64748B] mt-1">
                          <span>{selectedLoan.minTenure} months</span>
                          <span>{selectedLoan.maxTenure} months</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Interest Rate
                        </label>
                        <Input
                          type="text"
                          value={`${selectedLoan.interestRate}% per annum`}
                          disabled
                          className="w-full bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                          Processing Fee
                        </label>
                        <Input
                          type="text"
                          value={`${selectedLoan.processingFee}% (₦${calculateProcessingFee().toLocaleString()})`}
                          disabled
                          className="w-full bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Right side - Results */}
                    <div>
                      <Card className="bg-[#F8F9FF] border-[#5B52FF] mb-6">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-[#1E293B] mb-4">Loan Summary</h4>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">Loan Amount</span>
                              <span className="font-medium text-[#1E293B]">₦{loanAmount.toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">Loan Tenure</span>
                              <span className="font-medium text-[#1E293B]">{loanTenure} months</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">Monthly Repayment</span>
                              <span className="font-bold text-[#5B52FF]">₦{calculateMonthlyRepayment().toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">Total Interest</span>
                              <span className="font-medium text-[#1E293B]">₦{calculateTotalInterest().toLocaleString()}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-[#64748B]">Processing Fee</span>
                              <span className="font-medium text-[#1E293B]">₦{calculateProcessingFee().toLocaleString()}</span>
                            </div>
                            
                            <div className="border-t pt-4">
                              <div className="flex justify-between">
                                <span className="font-semibold text-[#1E293B]">Total Repayment</span>
                                <span className="font-bold text-[#1E293B]">₦{calculateTotalRepayment().toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4 flex items-start gap-3">
                          <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Eligibility Requirements</p>
                            <ul className="text-xs text-blue-700 mt-2 space-y-1">
                              {selectedLoan.eligibility.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button className="bg-[#5B52FF] text-white">
                      Apply for {selectedLoan.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Active Loans */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-6">Active Loans</h3>
                  
                  <div className="text-center py-8">
                    <FileTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-[#1E293B] mb-2">No Active Loans</h4>
                    <p className="text-[#64748B] max-w-md mx-auto">
                      You don't have any active business loans. Apply for a loan to grow your business.
                    </p>
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Business Loans</h1>
              <p className="text-xs text-[#64748B]">Apply for capital</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="text-center py-8">
            <DollarSignIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Business Loans</h3>
            <p className="text-[#64748B]">Mobile view coming soon</p>
          </div>
        </main>
      </div>
    </div>
  );
};