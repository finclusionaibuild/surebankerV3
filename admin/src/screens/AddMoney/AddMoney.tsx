import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon, 
  PlusIcon, 
  CheckIcon, 
  CreditCardIcon, 
  BanIcon as BuildingIcon, 
  PhoneIcon, 
  WalletIcon,
  HomeIcon, 
  ReceiptIcon, 
  PiggyBankIcon, 
  BarChart3Icon, 
  HandshakeIcon, 
  InboxIcon, 
  StarIcon, 
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  InfoIcon,
  CopyIcon,
  ShareIcon,
  DownloadIcon,
  HeadphonesIcon,
  ClockIcon,
  AlertTriangleIcon,
  LockIcon,
  SmartphoneIcon,
  GlobeIcon,
  QrCodeIcon,
  UserIcon
} from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'ussd' | 'qr';
  icon: React.ReactNode;
  color: string;
  description: string;
  fee?: string;
  processingTime: string;
  isRecommended?: boolean;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isLinked: boolean;
}

interface AddMoneyData {
  amount: string;
  paymentMethod: PaymentMethod | null;
  selectedBank: BankAccount | null;
  pin: string;
  reference: string;
}

export const AddMoney = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [addMoneyData, setAddMoneyData] = useState<AddMoneyData>({
    amount: "",
    paymentMethod: null,
    selectedBank: null,
    pin: "",
    reference: ""
  });
  const [showPin, setShowPin] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Payment methods data
  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Debit/Credit Card",
      type: "card",
      icon: <CreditCardIcon className="w-6 h-6" />,
      color: "bg-blue-500",
      description: "Add money using your debit or credit card",
      fee: "₦50",
      processingTime: "Instant",
      isRecommended: true
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      type: "bank",
      icon: <BuildingIcon className="w-6 h-6" />,
      color: "bg-green-500",
      description: "Transfer from your bank account",
      fee: "Free",
      processingTime: "5-10 minutes"
    },
    {
      id: "ussd",
      name: "USSD Code",
      type: "ussd",
      icon: <PhoneIcon className="w-6 h-6" />,
      color: "bg-orange-500",
      description: "Use your phone to dial USSD code",
      fee: "Free",
      processingTime: "Instant"
    },
    {
      id: "qr_code",
      name: "QR Code",
      type: "qr",
      icon: <QrCodeIcon className="w-6 h-6" />,
      color: "bg-purple-500",
      description: "Scan QR code with your banking app",
      fee: "Free",
      processingTime: "Instant"
    }
  ];

  // Sample linked bank accounts
  const linkedBanks: BankAccount[] = [
    {
      id: "1",
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "Carchy Atinse",
      isLinked: true
    },
    {
      id: "2",
      bankName: "Access Bank",
      accountNumber: "0987654321",
      accountName: "Carchy Atinse",
      isLinked: true
    },
    {
      id: "3",
      bankName: "Zenith Bank",
      accountNumber: "0456789123",
      accountName: "Carchy Atinse",
      isLinked: false
    }
  ];

  const quickAmounts = ["₦1,000", "₦5,000", "₦10,000", "₦50,000"];

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
      name: "Add Money", 
      icon: <PlusIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/add-money")
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

  const handleAmountNext = () => {
    if (addMoneyData.amount) {
      setCurrentStep(2);
    }
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setAddMoneyData({ ...addMoneyData, paymentMethod: method });
    if (method.type === 'bank') {
      setCurrentStep(3); // Go to bank selection
    } else if (method.type === 'card') {
      setCurrentStep(4); // Go to card details
    } else if (method.type === 'ussd') {
      setCurrentStep(7); // Go to USSD instructions
    } else if (method.type === 'qr') {
      setCurrentStep(8); // Go to QR code
    }
  };

  const handleBankSelect = (bank: BankAccount) => {
    setAddMoneyData({ ...addMoneyData, selectedBank: bank });
    setCurrentStep(4); // Go to confirmation
  };

  const handleConfirmPayment = () => {
    if (addMoneyData.pin.length === 4) {
      setTransactionId(`ADD${Date.now().toString().slice(-8)}`);
      setCurrentStep(5); // Processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(6); // Success
      }, 3000);
    }
  };

  const handleStartNewAddMoney = () => {
    setCurrentStep(1);
    setAddMoneyData({
      amount: "",
      paymentMethod: null,
      selectedBank: null,
      pin: "",
      reference: ""
    });
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

  // Step 1: Enter Amount
  const renderStep1 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Add Money</h2>
        <p className="text-[#64748B]">How much would you like to add to your wallet?</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-[#64748B] mb-2">Current Balance</p>
            <p className="text-2xl font-bold text-[#1E293B]">₦120,000.00</p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">Amount to Add</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">₦</span>
          <Input
            type="number"
            placeholder="0.00"
            value={addMoneyData.amount}
            onChange={(e) => setAddMoneyData({ ...addMoneyData, amount: e.target.value })}
            className="pl-8 h-16 text-2xl font-bold text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            onClick={() => setAddMoneyData({ ...addMoneyData, amount: amount.replace('₦', '').replace(',', '') })}
            className="h-12"
          >
            {amount}
          </Button>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200 mb-8 card-no-shadow">
        <CardContent className="p-4 flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Minimum Amount</p>
            <p className="text-xs text-blue-700">The minimum amount you can add is ₦100</p>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleAmountNext}
        disabled={!addMoneyData.amount || Number(addMoneyData.amount) < 100}
        className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
      >
        Continue
      </Button>
    </div>
  );

  // Step 2: Select Payment Method
  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Choose Payment Method</h2>
        <p className="text-[#64748B]">Select how you'd like to add money to your wallet</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-[#64748B] mb-1">Amount to Add</p>
          <p className="text-2xl font-bold text-[#5B52FF]">₦{Number(addMoneyData.amount).toLocaleString()}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className="cursor-pointer hover:shadow-md transition-all relative card-no-shadow"
            onClick={() => handlePaymentMethodSelect(method)}
          >
            {method.isRecommended && (
              <div className="absolute -top-2 left-4">
                <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                  Recommended
                </Badge>
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1E293B] mb-1">{method.name}</h3>
                  <p className="text-sm text-[#64748B] mb-2">{method.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-green-600 font-medium">Fee: {method.fee}</span>
                    <span className="text-blue-600 font-medium">{method.processingTime}</span>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          className="w-full h-12"
        >
          Back
        </Button>
      </div>
    </div>
  );

  // Step 3: Select Bank Account (for bank transfer)
  const renderStep3 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Select Bank Account</h2>
        <p className="text-[#64748B]">Choose which bank account to transfer from</p>
      </div>

      <div className="space-y-4 mb-8">
        {linkedBanks.filter(bank => bank.isLinked).map((bank) => (
          <Card 
            key={bank.id}
            className="cursor-pointer hover:shadow-md transition-all card-no-shadow"
            onClick={() => handleBankSelect(bank)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center text-white font-bold">
                  {bank.bankName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1E293B]">{bank.bankName}</h3>
                  <p className="text-sm text-[#64748B]">{bank.accountName}</p>
                  <p className="text-xs text-[#64748B]">•••• •••• •••• {bank.accountNumber.slice(-4)}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Linked</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        variant="outline"
        className="w-full h-12 mb-4"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Link New Bank Account
      </Button>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
      </div>
    </div>
  );

  // Step 4: Confirm Payment
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Confirm Payment</h2>
        <p className="text-[#64748B]">Please review your payment details</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">Amount to Add</p>
            <p className="text-3xl font-bold text-[#1E293B]">₦{Number(addMoneyData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Payment Method</span>
              <span className="font-medium text-[#1E293B]">{addMoneyData.paymentMethod?.name}</span>
            </div>
            
            {addMoneyData.selectedBank && (
              <>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">From Bank</span>
                  <span className="font-medium text-[#1E293B]">{addMoneyData.selectedBank.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Account</span>
                  <span className="font-medium text-[#1E293B]">•••• {addMoneyData.selectedBank.accountNumber.slice(-4)}</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between">
              <span className="text-[#64748B]">Processing Fee</span>
              <span className="font-medium text-[#1E293B]">{addMoneyData.paymentMethod?.fee}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-[#1E293B]">Total Amount</span>
                <span className="font-bold text-[#1E293B]">
                  ₦{(Number(addMoneyData.amount) + (addMoneyData.paymentMethod?.fee === 'Free' ? 0 : 50)).toLocaleString()}
                </span>
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
            value={addMoneyData.pin}
            onChange={(e) => setAddMoneyData({ ...addMoneyData, pin: e.target.value.slice(0, 4) })}
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
            <p className="text-sm font-medium text-blue-900">Secure Payment</p>
            <p className="text-xs text-blue-700">Your payment is protected with bank-level security</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(addMoneyData.paymentMethod?.type === 'bank' ? 3 : 2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={handleConfirmPayment}
          disabled={addMoneyData.pin.length !== 4}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Confirm Payment
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
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Processing Payment</h2>
        <p className="text-[#64748B]">Please wait while we process your payment...</p>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">Validating payment details</span>
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
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🎉 Money Added Successfully! 🎉</h2>
        <p className="text-[#64748B]">Your wallet has been topped up successfully</p>
      </div>

      <Card className="mb-8 border-2 border-green-200 bg-green-50 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">Amount Added</p>
            <p className="text-3xl font-bold text-green-600">₦{Number(addMoneyData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Payment Method</span>
              <span className="font-medium text-[#1E293B]">{addMoneyData.paymentMethod?.name}</span>
            </div>
            {addMoneyData.selectedBank && (
              <div className="flex justify-between">
                <span className="text-[#64748B]">From Bank</span>
                <span className="font-medium text-[#1E293B]">{addMoneyData.selectedBank.bankName}</span>
              </div>
            )}
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
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-[#64748B]">New Balance</span>
                <span className="font-bold text-[#1E293B] text-lg">
                  ₦{(120000 + Number(addMoneyData.amount)).toLocaleString()}.00
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button 
          onClick={handleStartNewAddMoney}
          className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Add More Money
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

  // Step 7: USSD Instructions
  const renderStep7 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">USSD Payment</h2>
        <p className="text-[#64748B]">Follow these steps to complete your payment</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-[#64748B] mb-2">Amount to Add</p>
            <p className="text-2xl font-bold text-[#5B52FF]">₦{Number(addMoneyData.amount).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="bg-[#F8F9FF] p-6 rounded-lg">
          <h3 className="font-semibold text-[#1E293B] mb-4">Instructions:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <p className="text-sm text-[#64748B]">Dial <span className="font-mono font-bold text-[#1E293B]">*737*50*{transactionId || 'XXXXXXXX'}#</span> on your phone</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <p className="text-sm text-[#64748B]">Enter your bank PIN when prompted</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <p className="text-sm text-[#64748B]">Confirm the transaction amount</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#5B52FF] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <p className="text-sm text-[#64748B]">Wait for confirmation SMS</p>
            </div>
          </div>
        </div>

        <Card className="bg-yellow-50 border-yellow-200 card-no-shadow">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Important</p>
              <p className="text-xs text-yellow-700">Make sure you have sufficient balance in your bank account before proceeding</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mt-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(5)}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          I've Completed USSD
        </Button>
      </div>
    </div>
  );

  // Step 8: QR Code Payment
  const renderStep8 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">QR Code Payment</h2>
        <p className="text-[#64748B]">Scan this QR code with your banking app</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-[#64748B] mb-2">Amount to Add</p>
            <p className="text-2xl font-bold text-[#5B52FF]">₦{Number(addMoneyData.amount).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-8">
        <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <QrCodeIcon className="w-24 h-24 text-gray-400" />
          </div>
        </div>
        <p className="text-sm text-[#64748B]">Scan with your mobile banking app</p>
      </div>

      <Card className="bg-blue-50 border-blue-200 mb-8 card-no-shadow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Supported Apps:</h3>
          <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
            <span>• GTBank App</span>
            <span>• Access Bank</span>
            <span>• Zenith Bank</span>
            <span>• UBA Mobile</span>
            <span>• First Bank</span>
            <span>• Others</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(5)}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          I've Completed Payment
        </Button>
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
                <h1 className="text-xl font-semibold text-[#1E293B]">Add Money</h1>
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
            {currentStep <= 6 && renderStepIndicator()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderStep7()}
            {currentStep === 8 && renderStep8()}
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Add Money</h1>
              <p className="text-xs text-[#64748B]">Fund your wallet</p>
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
          {currentStep <= 6 && renderStepIndicator()}
          
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}
          {currentStep === 8 && renderStep8()}
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