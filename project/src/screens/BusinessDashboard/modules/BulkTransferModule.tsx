import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge'; 
import { 
  UploadIcon, 
  DownloadIcon, 
  FileTextIcon,
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  InfoIcon,
  DollarSignIcon,
  UsersIcon,
  BellIcon,
  ArrowLeftIcon,
  HomeIcon,
  CreditCardIcon,
  BarChart3Icon,
  InboxIcon,
  StarIcon,
  BuildingIcon,
  SearchIcon
} from 'lucide-react';

interface BulkTransferRecord {
  id: string;
  recipientName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  description: string;
  status: 'pending' | 'validated' | 'error';
  error?: string;
}

export const BulkTransferModule: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [transferRecords, setTransferRecords] = useState<BulkTransferRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleRecords: BulkTransferRecord[] = [
    {
      id: '1',
      recipientName: 'John Doe',
      accountNumber: '0123456789',
      bankName: 'GTBank',
      amount: 50000,
      description: 'Vendor Payment',
      status: 'validated'
    },
    {
      id: '2',
      recipientName: 'Jane Smith',
      accountNumber: '0987654321',
      bankName: 'Access Bank',
      amount: 75000,
      description: 'Contractor Fee',
      status: 'validated'
    },
    {
      id: '3',
      recipientName: 'Invalid Account',
      accountNumber: '0000000000',
      bankName: 'UBA',
      amount: 25000,
      description: 'Service Payment',
      status: 'error',
      error: 'Invalid account number'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate CSV processing
      setTimeout(() => {
        setTransferRecords(sampleRecords);
      }, 1000);
    }
  };

  const handleProcessTransfers = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Update status of validated records
      setTransferRecords(prev => 
        prev.map(record => 
          record.status === 'validated' 
            ? { ...record, status: 'pending' as const }
            : record
        )
      );
    }, 3000);
  };

  const validRecords = transferRecords.filter(r => r.status === 'validated');
  const errorRecords = transferRecords.filter(r => r.status === 'error');
  const totalAmount = validRecords.reduce((sum, record) => sum + record.amount, 0);

  const downloadTemplate = () => {
    const csvContent = "Recipient Name,Account Number,Bank Name,Amount,Description\nJohn Doe,0123456789,GTBank,50000,Vendor Payment\nJane Smith,0987654321,Access Bank,75000,Contractor Fee";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_transfer_template.csv';
    a.click();
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
                  active: true,
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
                  <h1 className="text-xl font-semibold text-[#1E293B]">Bulk Transfer</h1>
                  <p className="text-sm text-[#64748B]">Upload CSV file to process multiple transfers</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={downloadTemplate}
                  className="flex items-center gap-2"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download Template
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
              {/* Rest of bulk transfer content */}
              {/* Upload Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#5B52FF] transition-colors">
                      <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Upload CSV File</h3>
                      <p className="text-[#64748B] mb-4">
                        Select a CSV file containing recipient details for bulk transfer
                      </p>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="csv-upload"
                      />
                      <label htmlFor="csv-upload">
                        <Button className="bg-[#5B52FF] text-white cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                      {uploadedFile && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {uploadedFile.name} uploaded successfully
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CSV Format Instructions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">CSV Format Requirements</h3>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Recipient Name:</strong> Full name of the recipient</p>
                        <p>• <strong>Account Number:</strong> 10-digit bank account number</p>
                        <p>• <strong>Bank Name:</strong> Full bank name (e.g., GTBank, Access Bank)</p>
                        <p>• <strong>Amount:</strong> Transfer amount in Naira (numbers only)</p>
                        <p>• <strong>Description:</strong> Payment description or reference</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Summary */}
              {transferRecords.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <UsersIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-[#64748B]">Total Recipients</p>
                          <p className="text-2xl font-bold text-[#1E293B]">{transferRecords.length}</p>
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
                          <p className="text-sm text-[#64748B]">Total Amount</p>
                          <p className="text-2xl font-bold text-[#1E293B]">₦{totalAmount.toLocaleString()}</p>
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
                          <p className="text-sm text-[#64748B]">Validation Errors</p>
                          <p className="text-2xl font-bold text-[#1E293B]">{errorRecords.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Records Table */}
              {transferRecords.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#1E293B]">Bulk Transfer Records</h3>
                      <Button
                        className="bg-[#5B52FF] text-white"
                        disabled={validRecords.length === 0 || isProcessing}
                        onClick={handleProcessTransfers}
                      >
                        {isProcessing ? 'Processing...' : 'Process Transfers'}
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">RECIPIENT</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">ACCOUNT NUMBER</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">BANK</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">AMOUNT</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">DESCRIPTION</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-[#64748B]">STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transferRecords.map((record) => (
                            <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                                {record.recipientName}
                              </td>
                              <td className="py-3 px-4 text-sm text-[#64748B]">{record.accountNumber}</td>
                              <td className="py-3 px-4 text-sm text-[#64748B]">{record.bankName}</td>
                              <td className="py-3 px-4 text-sm font-medium text-[#1E293B]">
                                ₦{record.amount.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-sm text-[#64748B]">{record.description}</td>
                              <td className="py-3 px-4">
                                {record.status === 'validated' && (
                                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                                    <CheckIcon className="w-3 h-3" />
                                    Validated
                                  </Badge>
                                )}
                                {record.status === 'pending' && (
                                  <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
                                    <InfoIcon className="w-3 h-3" />
                                    Pending
                                  </Badge>
                                )}
                                {record.status === 'error' && (
                                  <div>
                                    <Badge className="bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                                      <XIcon className="w-3 h-3" />
                                      Error
                                    </Badge>
                                    {record.error && (
                                      <p className="text-xs text-red-600 mt-1">{record.error}</p>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Bulk Transfer</h1>
              <p className="text-xs text-[#64748B]">Upload CSV transfers</p>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="text-center py-8">
            <FileTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Bulk Transfer</h3>
            <p className="text-[#64748B]">Mobile view coming soon</p>
          </div>
        </main>
      </div>
    </div>
  );
};