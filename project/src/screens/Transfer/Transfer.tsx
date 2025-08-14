import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useAccount } from "../../contexts/AccountContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { BulkScheduleTransfer } from "../../components/ui/bulk-schedule-transfer";
import { BellIcon, SearchIcon, ArrowLeftIcon, ArrowRightIcon, PlusIcon, CheckIcon, XIcon, UserIcon, BanIcon as BuildingIcon, CreditCardIcon, PhoneIcon, MailIcon, ClockIcon, ShieldCheckIcon, HomeIcon, ReceiptIcon, PiggyBankIcon, BarChart3Icon, HandshakeIcon, InboxIcon, StarIcon, ChevronDownIcon, EyeIcon, EyeOffIcon, AlertTriangleIcon, InfoIcon, CopyIcon, ShareIcon, DownloadIcon, MessageCircleIcon, HeadphonesIcon } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  avatar: string;
  isFrequent?: boolean;
}

interface TransferData {
  recipient: Contact | null;
  amount: string;
  description: string;
  pin: string;
  transferType: 'instant' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
}

export const Transfer = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const { currentAccount } = useAccount();
  const [transferData, setTransferData] = useState<TransferData>({
    recipient: null,
    amount: "",
    description: "",
    pin: "",
    transferType: 'instant'
  });
  const [showPin, setShowPin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
  const [showTransferOptions, setShowTransferOptions] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [showBulkTransfer, setShowBulkTransfer] = useState(false);
  const navigate = useNavigate();

  // Get KYC level from account context
  const kycLevel = currentAccount?.accountType === 'individual' 
    ? parseInt(currentAccount.kycLevel || '0') 
    : 0;

  // Sample contacts data
  const frequentContacts: Contact[] = [
    { id: "1", name: "John Doe", bank: "GTBank", accountNumber: "0123456789", avatar: "JD", isFrequent: true },
    { id: "2", name: "Jane Smith", bank: "Access Bank", accountNumber: "0987654321", avatar: "JS", isFrequent: true },
    { id: "3", name: "Mike Johnson", bank: "Zenith Bank", accountNumber: "0456789123", avatar: "MJ", isFrequent: true },
    { id: "4", name: "Sarah Wilson", bank: "UBA", accountNumber: "0789123456", avatar: "SW", isFrequent: true },
  ];

  const allContacts: Contact[] = [
    ...frequentContacts,
    { id: "5", name: "David Brown", bank: "First Bank", accountNumber: "0321654987", avatar: "DB" },
    { id: "6", name: "Lisa Davis", bank: "Fidelity Bank", accountNumber: "0654987321", avatar: "LD" },
    { id: "7", name: "Tom Wilson", bank: "Sterling Bank", accountNumber: "0147258369", avatar: "TW" },
    { id: "8", name: "Emma Taylor", bank: "Wema Bank", accountNumber: "0963852741", avatar: "ET" },
  ];

  const banks = [
    "Access Bank", "GTBank", "Zenith Bank", "UBA", "First Bank", 
    "Fidelity Bank", "Sterling Bank", "Wema Bank", "Union Bank", "Ecobank"
  ];

  const quickAmounts = ["₦1,000", "₦5,000", "₦10,000", "₦50,000"];

  const filteredContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      active: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "Transactions", 
      icon: <ReceiptIcon className="w-5 h-5" />,
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
      active: true,
      onClick: () => navigate("/transfer")
    },
    { 
      name: "Goals", 
      icon: <StarIcon className="w-6 h-6" />,
      onClick: () => navigate("/dashboard")
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

  // Confetti animation function
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Trigger confetti when reaching success step
  useEffect(() => {
    if (currentStep === 6) {
      const timer = setTimeout(() => {
        triggerConfetti();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleContactSelect = (contact: Contact) => {
    setTransferData({ ...transferData, recipient: contact });
    setCurrentStep(2);
  };

  const handleNewRecipient = () => {
    setCurrentStep(7); // Go to add new recipient step
  };

  const handleVerifyAccount = async () => {
    if (!selectedBank || !accountNumber) return;
    
    setIsVerifyingAccount(true);
    setTimeout(() => {
      setAccountName("John Doe");
      setIsVerifyingAccount(false);
    }, 2000);
  };

  const handleAddNewRecipient = () => {
    if (accountName && selectedBank && accountNumber) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: accountName,
        bank: selectedBank,
        accountNumber: accountNumber,
        avatar: accountName.split(' ').map(n => n[0]).join('')
      };
      setTransferData({ ...transferData, recipient: newContact });
      setCurrentStep(2);
    }
  };

  const handleAmountNext = () => {
    if (transferData.amount) {
      setCurrentStep(3);
    }
  };

  const handleTransferTypeNext = () => {
    setCurrentStep(4);
  };

  const handleConfirmTransfer = () => {
    if (transferData.pin.length === 4) {
      setTransactionId(`TXN${Date.now().toString().slice(-8)}`);
      setCurrentStep(5); // Processing
      setTimeout(() => {
        setCurrentStep(6); // Success
      }, 3000);
    }
  };

  const handleStartNewTransfer = () => {
    setCurrentStep(1);
    setTransferData({
      recipient: null,
      amount: "",
      description: "",
      pin: "",
      transferType: 'instant'
    });
    setSearchQuery("");
    setSelectedBank("");
    setAccountNumber("");
    setAccountName("");
    setTransactionId("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep 
                ? "bg-[#5B52FF] text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              {step < currentStep ? <CheckIcon className="w-4 h-4" /> : step}
            </div>
            {step < 6 && (
              <div className={`w-12 h-0.5 ${
                step < currentStep ? "bg-[#5B52FF]" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Step 1: Select Recipient
  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Send Money</h2>
        <p className="text-[#64748B]">Choose a recipient to send money to</p>
      </div>

      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
        <Input
          placeholder="Search contacts or enter account details"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      <Button 
        onClick={handleNewRecipient}
        className="w-full mb-6 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add New Recipient
      </Button>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Frequent Contacts</h3>
        <div className="grid grid-cols-2 gap-4">
          {frequentContacts.map((contact) => (
            <Card 
              key={contact.id} 
              className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow"
              onClick={() => handleContactSelect(contact)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-[#5B52FF] text-white">
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B]">{contact.name}</p>
                  <p className="text-sm text-[#64748B]">{contact.bank}</p>
                  <p className="text-xs text-[#64748B]">{contact.accountNumber}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {searchQuery && (
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Search Results</h3>
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <Card 
                key={contact.id} 
                className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow"
                onClick={() => handleContactSelect(contact)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#F1F5F9] text-[#64748B]">
                      {contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[#1E293B]">{contact.name}</p>
                    <p className="text-sm text-[#64748B]">{contact.bank} • {contact.accountNumber}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: Enter Amount
  const renderStep2 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Enter Amount</h2>
        <p className="text-[#64748B]">How much would you like to send?</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-4 flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-[#5B52FF] text-white">
              {transferData.recipient?.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-[#1E293B]">{transferData.recipient?.name}</p>
            <p className="text-sm text-[#64748B]">{transferData.recipient?.bank}</p>
            <p className="text-xs text-[#64748B]">{transferData.recipient?.accountNumber}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">₦</span>
          <Input
            type="number"
            placeholder="0.00"
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
            className="pl-8 h-16 text-2xl font-bold text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            onClick={() => setTransferData({ ...transferData, amount: amount.replace('₦', '').replace(',', '') })}
            className="h-12"
          >
            {amount}
          </Button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Description (Optional)</label>
        <Input
          placeholder="What's this for?"
          value={transferData.description}
          onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
          className="h-12"
        />
      </div>

      <Card className="bg-[#F8F9FF] mb-8 card-no-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#64748B]">Available Balance</span>
            <span className="font-semibold text-[#1E293B]">₦120,000.00</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={handleAmountNext}
          disabled={!transferData.amount}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 3: Transfer Type Selection
  const renderStep3 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Transfer Type</h2>
        <p className="text-[#64748B]">Choose when you want to send this transfer</p>
      </div>

      <div className="space-y-4 mb-8">
        <Card 
          className={`cursor-pointer transition-all card-no-shadow ${
            transferData.transferType === 'instant' ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
          }`}
          onClick={() => setTransferData({ ...transferData, transferType: 'instant' })}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#5B52FF] rounded-full flex items-center justify-center">
                <ArrowRightIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1E293B] mb-1">Send Now</h3>
                <p className="text-sm text-[#64748B]">Transfer will be processed immediately</p>
                <p className="text-xs text-green-600 font-medium">Free • Instant</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                transferData.transferType === 'instant' 
                  ? 'border-[#5B52FF] bg-[#5B52FF]' 
                  : 'border-gray-300'
              }`}>
                {transferData.transferType === 'instant' && (
                  <CheckIcon className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all card-no-shadow ${
            transferData.transferType === 'scheduled' ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
          }`}
          onClick={() => setTransferData({ ...transferData, transferType: 'scheduled' })}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1E293B] mb-1">Schedule Transfer</h3>
                <p className="text-sm text-[#64748B]">Set a future date and time for this transfer</p>
                <p className="text-xs text-orange-600 font-medium">Free • Scheduled</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                transferData.transferType === 'scheduled' 
                  ? 'border-[#5B52FF] bg-[#5B52FF]' 
                  : 'border-gray-300'
              }`}>
                {transferData.transferType === 'scheduled' && (
                  <CheckIcon className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {transferData.transferType === 'scheduled' && (
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Select Date</label>
            <Input
              type="date"
              value={transferData.scheduledDate || ''}
              onChange={(e) => setTransferData({ ...transferData, scheduledDate: e.target.value })}
              className="h-12"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Select Time</label>
            <Input
              type="time"
              value={transferData.scheduledTime || ''}
              onChange={(e) => setTransferData({ ...transferData, scheduledTime: e.target.value })}
              className="h-12"
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={handleTransferTypeNext}
          disabled={transferData.transferType === 'scheduled' && (!transferData.scheduledDate || !transferData.scheduledTime)}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 4: Confirm Transfer
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Confirm Transfer</h2>
        <p className="text-[#64748B]">Please review your transfer details</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">You're sending</p>
            <p className="text-3xl font-bold text-[#1E293B]">₦{Number(transferData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#64748B]">To</span>
              <div className="text-right">
                <p className="font-medium text-[#1E293B]">{transferData.recipient?.name}</p>
                <p className="text-sm text-[#64748B]">{transferData.recipient?.bank}</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#64748B]">Account Number</span>
              <span className="font-medium text-[#1E293B]">{transferData.recipient?.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#64748B]">Transfer Type</span>
              <span className="font-medium text-[#1E293B]">
                {transferData.transferType === 'instant' ? 'Instant Transfer' : 'Scheduled Transfer'}
              </span>
            </div>

            {transferData.transferType === 'scheduled' && (
              <>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Scheduled Date</span>
                  <span className="font-medium text-[#1E293B]">{transferData.scheduledDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Scheduled Time</span>
                  <span className="font-medium text-[#1E293B]">{transferData.scheduledTime}</span>
                </div>
              </>
            )}
            
            {transferData.description && (
              <div className="flex justify-between">
                <span className="text-[#64748B]">Description</span>
                <span className="font-medium text-[#1E293B]">{transferData.description}</span>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Transfer Fee</span>
                <span className="font-medium text-[#1E293B]">₦0.00</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-[#1E293B]">Total</span>
                <span className="font-bold text-[#1E293B]">₦{Number(transferData.amount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Enter Transaction PIN</label>
        <div className="relative">
          <Input
            type={showPin ? "text" : "password"}
            placeholder="Enter 4-digit PIN"
            value={transferData.pin}
            onChange={(e) => setTransferData({ ...transferData, pin: e.target.value.slice(0, 4) })}
            className="h-12 text-center text-2xl tracking-widest"
            maxLength={4}
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          >
            {showPin ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200 mb-8 card-no-shadow">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Secure Transfer</p>
            <p className="text-xs text-blue-700">Your transaction is protected with bank-level security</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(3)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={handleConfirmTransfer}
          disabled={transferData.pin.length !== 4}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Confirm Transfer
        </Button>
      </div>
    </div>
  );

  // Step 5: Processing
  const renderStep5 = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-[#5B52FF] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <ClockIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Processing Transfer</h2>
        <p className="text-[#64748B]">Please wait while we process your transfer...</p>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Validating recipient details</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Verifying transaction PIN</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">Processing payment...</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-yellow-50 border-yellow-200 card-no-shadow">
        <CardContent className="p-4 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-900">Transaction ID: {transactionId}</p>
            <p className="text-xs text-yellow-700">Keep this ID for your records</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 6: Success
  const renderStep6 = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🎉 Transfer Successful! 🎉</h2>
        <p className="text-[#64748B]">Your money has been sent successfully</p>
      </div>

      <Card className="mb-8 border-2 border-green-200 bg-green-50 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">Amount Sent</p>
            <p className="text-3xl font-bold text-green-600">₦{Number(transferData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-[#64748B]">To</span>
              <span className="font-medium text-[#1E293B]">{transferData.recipient?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Bank</span>
              <span className="font-medium text-[#1E293B]">{transferData.recipient?.bank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#1E293B]">{transactionId}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transactionId)}
                  className="p-1"
                >
                  <CopyIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Date & Time</span>
              <span className="font-medium text-[#1E293B]">{new Date().toLocaleString()}</span>
            </div>
            {transferData.transferType === 'scheduled' && (
              <div className="flex justify-between">
                <span className="text-[#64748B]">Scheduled For</span>
                <span className="font-medium text-[#1E293B]">
                  {transferData.scheduledDate} at {transferData.scheduledTime}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button 
          onClick={handleStartNewTransfer}
          className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Send Another Transfer
        </Button>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline"
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <DownloadIcon className="w-4 h-4" />
            <span className="text-xs">Download</span>
          </Button>
          <Button 
            variant="outline"
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <ShareIcon className="w-4 h-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button 
            variant="outline"
            className="h-12 flex flex-col items-center justify-center gap-1"
          >
            <HeadphonesIcon className="w-4 h-4" />
            <span className="text-xs">Support</span>
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 7: Add New Recipient
  const renderStep7 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Add New Recipient</h2>
        <p className="text-[#64748B]">Enter the recipient's bank details</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Select Bank</label>
          <select 
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            <option value="">Choose a bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Account Number</label>
          <Input
            type="number"
            placeholder="Enter 10-digit account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="h-12"
            maxLength={10}
          />
        </div>

        <Button 
          onClick={handleVerifyAccount}
          disabled={!selectedBank || accountNumber.length !== 10 || isVerifyingAccount}
          className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          {isVerifyingAccount ? "Verifying..." : "Verify Account"}
        </Button>

        {accountName && (
          <Card className="bg-green-50 border-green-200 card-no-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Account Verified</p>
                  <p className="text-sm text-green-700">{accountName}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(1)}
            className="flex-1 h-12"
          >
            Back
          </Button>
          <Button 
            onClick={handleAddNewRecipient}
            disabled={!accountName}
            className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );

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
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <h1 className="text-xl font-semibold text-[#1E293B]">Transfer Money</h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowBulkTransfer(true)}
                  className="px-6 py-2 rounded-xl"
                >
                  Bulk Transfer
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
                    <div className="text-sm font-medium text-[#1E293B]">Carchy Atinse</div>
                  </div>
                  <Avatar className="w-8 h-8" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>
                    <AvatarFallback className="bg-[#5B52FF] text-white">CA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* KYC Upgrade Prompt for Transfers */}
            {kycLevel < 1 && (
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <ArrowRightIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Complete KYC to Enable Transfers</h3>
                      <p className="text-sm text-green-700">Verify your identity to start sending money</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => navigate("/notifications")}
                  >
                    Start KYC
                  </Button>
                </CardContent>
              </Card>
            )}

            {renderStepIndicator()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderStep7()}
          </main>
        </div>
      </div>

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">CA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Transfer</h1>
              <p className="text-xs text-[#64748B]">Send money instantly</p>
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

        <main className="p-4 pb-20">
          {renderStepIndicator()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}
        </main>

        {/* Bulk Transfer Modal */}
        <BulkScheduleTransfer
          isOpen={showBulkTransfer}
          onClose={() => setShowBulkTransfer(false)}
        />

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