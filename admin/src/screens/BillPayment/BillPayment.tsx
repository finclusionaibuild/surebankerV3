import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  CheckIcon, 
  PhoneIcon, 
  WifiIcon, 
  ZapIcon, 
  TvIcon, 
  GlobeIcon,
  DropletIcon,
  HomeIcon, 
  CreditCardIcon, 
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
  RefreshCwIcon,
  TrophyIcon,
  SparklesIcon,
  UserIcon
} from "lucide-react";

interface BillService {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  fee?: string;
  processingTime: string;
  isPopular?: boolean;
}

interface BillPaymentData {
  service: BillService | null;
  amount: string;
  accountNumber: string;
  customerName: string;
  pin: string;
  reference: string;
}

export const BillPayment = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const billType = searchParams.get('type') || 'airtime';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [billData, setBillData] = useState<BillPaymentData>({
    service: null,
    amount: "",
    accountNumber: "",
    customerName: "",
    pin: "",
    reference: ""
  });
  const [showPin, setShowPin] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Bill services data
  const billServices: { [key: string]: BillService[] } = {
    airtime: [
      {
        id: "mtn",
        name: "MTN",
        type: "airtime",
        icon: <PhoneIcon className="w-6 h-6" />,
        color: "bg-yellow-500",
        description: "MTN Airtime Top-up",
        fee: "Free",
        processingTime: "Instant",
        isPopular: true
      },
      {
        id: "airtel",
        name: "Airtel",
        type: "airtime",
        icon: <PhoneIcon className="w-6 h-6" />,
        color: "bg-red-500",
        description: "Airtel Airtime Top-up",
        fee: "Free",
        processingTime: "Instant"
      },
      {
        id: "glo",
        name: "Glo",
        type: "airtime",
        icon: <PhoneIcon className="w-6 h-6" />,
        color: "bg-green-500",
        description: "Glo Airtime Top-up",
        fee: "Free",
        processingTime: "Instant"
      },
      {
        id: "9mobile",
        name: "9mobile",
        type: "airtime",
        icon: <PhoneIcon className="w-6 h-6" />,
        color: "bg-green-600",
        description: "9mobile Airtime Top-up",
        fee: "Free",
        processingTime: "Instant"
      }
    ],
    data: [
      {
        id: "mtn_data",
        name: "MTN Data",
        type: "data",
        icon: <WifiIcon className="w-6 h-6" />,
        color: "bg-yellow-500",
        description: "MTN Data Bundle",
        fee: "Free",
        processingTime: "Instant",
        isPopular: true
      },
      {
        id: "airtel_data",
        name: "Airtel Data",
        type: "data",
        icon: <WifiIcon className="w-6 h-6" />,
        color: "bg-red-500",
        description: "Airtel Data Bundle",
        fee: "Free",
        processingTime: "Instant"
      },
      {
        id: "glo_data",
        name: "Glo Data",
        type: "data",
        icon: <WifiIcon className="w-6 h-6" />,
        color: "bg-green-500",
        description: "Glo Data Bundle",
        fee: "Free",
        processingTime: "Instant"
      },
      {
        id: "9mobile_data",
        name: "9mobile Data",
        type: "data",
        icon: <WifiIcon className="w-6 h-6" />,
        color: "bg-green-600",
        description: "9mobile Data Bundle",
        fee: "Free",
        processingTime: "Instant"
      }
    ],
    electricity: [
      {
        id: "ekedc",
        name: "EKEDC",
        type: "electricity",
        icon: <ZapIcon className="w-6 h-6" />,
        color: "bg-blue-500",
        description: "Eko Electricity Distribution",
        fee: "₦50",
        processingTime: "5-10 minutes",
        isPopular: true
      },
      {
        id: "ikedc",
        name: "IKEDC",
        type: "electricity",
        icon: <ZapIcon className="w-6 h-6" />,
        color: "bg-orange-500",
        description: "Ikeja Electric",
        fee: "₦50",
        processingTime: "5-10 minutes"
      },
      {
        id: "aedc",
        name: "AEDC",
        type: "electricity",
        icon: <ZapIcon className="w-6 h-6" />,
        color: "bg-purple-500",
        description: "Abuja Electricity Distribution",
        fee: "₦50",
        processingTime: "5-10 minutes"
      }
    ],
    cable: [
      {
        id: "dstv",
        name: "DSTV",
        type: "cable",
        icon: <TvIcon className="w-6 h-6" />,
        color: "bg-blue-600",
        description: "DSTV Subscription",
        fee: "₦50",
        processingTime: "Instant",
        isPopular: true
      },
      {
        id: "gotv",
        name: "GOtv",
        type: "cable",
        icon: <TvIcon className="w-6 h-6" />,
        color: "bg-green-600",
        description: "GOtv Subscription",
        fee: "₦50",
        processingTime: "Instant"
      },
      {
        id: "startimes",
        name: "StarTimes",
        type: "cable",
        icon: <TvIcon className="w-6 h-6" />,
        color: "bg-orange-500",
        description: "StarTimes Subscription",
        fee: "₦50",
        processingTime: "Instant"
      }
    ],
    internet: [
      {
        id: "spectranet",
        name: "Spectranet",
        type: "internet",
        icon: <GlobeIcon className="w-6 h-6" />,
        color: "bg-purple-600",
        description: "Spectranet Internet",
        fee: "₦50",
        processingTime: "Instant",
        isPopular: true
      },
      {
        id: "smile",
        name: "Smile",
        type: "internet",
        icon: <GlobeIcon className="w-6 h-6" />,
        color: "bg-red-500",
        description: "Smile Internet",
        fee: "₦50",
        processingTime: "Instant"
      },
      {
        id: "swift",
        name: "Swift",
        type: "internet",
        icon: <GlobeIcon className="w-6 h-6" />,
        color: "bg-blue-500",
        description: "Swift Internet",
        fee: "₦50",
        processingTime: "Instant"
      }
    ],
    water: [
      {
        id: "lagos_water",
        name: "Lagos Water",
        type: "water",
        icon: <DropletIcon className="w-6 h-6" />,
        color: "bg-blue-400",
        description: "Lagos Water Corporation",
        fee: "₦50",
        processingTime: "5-10 minutes",
        isPopular: true
      },
      {
        id: "abuja_water",
        name: "Abuja Water",
        type: "water",
        icon: <DropletIcon className="w-6 h-6" />,
        color: "bg-blue-600",
        description: "FCT Water Board",
        fee: "₦50",
        processingTime: "5-10 minutes"
      }
    ]
  };

  const quickAmounts = ["₦1,000", "₦2,000", "₦5,000", "₦10,000"];
  const dataPlans = [
    { name: "1GB (1 Day)", price: "₦500" },
    { name: "2GB (7 Days)", price: "₦1,000" },
    { name: "5GB (30 Days)", price: "₦2,500" },
    { name: "10GB (30 Days)", price: "₦5,000" }
  ];

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
      name: "Payments", 
      icon: <CreditCardIcon className="w-6 h-6" />,
      active: true,
      onClick: () => navigate("/payments")
    },
    { 
      name: "History", 
      icon: <ReceiptIcon className="w-6 h-6" />,
      onClick: () => navigate("/transactions")
    },
    { 
      name: "Profile", 
      icon: <UserIcon className="w-6 h-6" />,
      onClick: () => navigate("/profile")
    },
  ];

  // Set initial service based on URL parameter
  useEffect(() => {
    if (billType && billServices[billType] && billServices[billType].length > 0) {
      setBillData({
        ...billData,
        service: billServices[billType][0]
      });
    }
  }, [billType]);

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
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        triggerConfetti();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleServiceSelect = (service: BillService) => {
    setBillData({ ...billData, service });
    setCurrentStep(2);
  };

  const handleVerifyAccount = () => {
    if (!billData.accountNumber) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setBillData({
        ...billData,
        customerName: "John Doe"
      });
      setIsVerifying(false);
    }, 2000);
  };

  const handleAmountNext = () => {
    if (billData.amount && billData.accountNumber && billData.customerName) {
      setCurrentStep(3);
    }
  };

  const handleConfirmPayment = () => {
    if (billData.pin.length === 4) {
      setTransactionId(`BILL${Date.now().toString().slice(-8)}`);
      setCurrentStep(4); // Success
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handleStartNewPayment = () => {
    setCurrentStep(1);
    setBillData({
      service: billData.service,
      amount: "",
      accountNumber: "",
      customerName: "",
      pin: "",
      reference: ""
    });
    setTransactionId("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'airtime':
        return <PhoneIcon className="w-6 h-6" />;
      case 'data':
        return <WifiIcon className="w-6 h-6" />;
      case 'electricity':
        return <ZapIcon className="w-6 h-6" />;
      case 'cable':
        return <TvIcon className="w-6 h-6" />;
      case 'internet':
        return <GlobeIcon className="w-6 h-6" />;
      case 'water':
        return <DropletIcon className="w-6 h-6" />;
      default:
        return <CreditCardIcon className="w-6 h-6" />;
    }
  };

  const getServiceTitle = (type: string) => {
    switch (type) {
      case 'airtime':
        return "Airtime Top-up";
      case 'data':
        return "Data Bundle";
      case 'electricity':
        return "Electricity Bill";
      case 'cable':
        return "Cable TV Subscription";
      case 'internet':
        return "Internet Subscription";
      case 'water':
        return "Water Bill";
      default:
        return "Bill Payment";
    }
  };

  // Step 1: Select Service
  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{getServiceTitle(billType)}</h2>
        <p className="text-[#64748B]">Choose your service provider</p>
      </div>

      <div className="space-y-4">
        {billServices[billType]?.map((service) => (
          <Card 
            key={service.id}
            className="cursor-pointer hover:shadow-md transition-all relative card-no-shadow"
            onClick={() => handleServiceSelect(service)}
          >
            {service.isPopular && (
              <div className="absolute -top-2 left-4">
                <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                  Popular
                </Badge>
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center text-white`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1E293B] mb-1">{service.name}</h3>
                  <p className="text-sm text-[#64748B] mb-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-green-600 font-medium">Fee: {service.fee}</span>
                    <span className="text-blue-600 font-medium">{service.processingTime}</span>
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
          onClick={() => navigate("/dashboard")}
          className="w-full h-12"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  // Step 2: Enter Details
  const renderStep2 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{billData.service?.name}</h2>
        <p className="text-[#64748B]">Enter payment details</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-4 flex items-center gap-3">
          <div className={`w-12 h-12 ${billData.service?.color} rounded-lg flex items-center justify-center text-white`}>
            {billData.service?.icon}
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#1E293B]">{billData.service?.name}</p>
            <p className="text-sm text-[#64748B]">{billData.service?.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Account/Phone Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          {billData.service?.type === 'airtime' || billData.service?.type === 'data' 
            ? 'Phone Number' 
            : billData.service?.type === 'electricity' 
            ? 'Meter Number'
            : billData.service?.type === 'cable' || billData.service?.type === 'internet'
            ? 'Smart Card/IUC Number'
            : 'Account Number'
          }
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder={
              billData.service?.type === 'airtime' || billData.service?.type === 'data' 
                ? 'Enter phone number' 
                : billData.service?.type === 'electricity' 
                ? 'Enter meter number'
                : billData.service?.type === 'cable' || billData.service?.type === 'internet'
                ? 'Enter smart card/IUC number'
                : 'Enter account number'
            }
            value={billData.accountNumber}
            onChange={(e) => setBillData({ ...billData, accountNumber: e.target.value })}
            className="h-12"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleVerifyAccount}
            disabled={!billData.accountNumber || isVerifying}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>

      {/* Customer Name (shows after verification) */}
      {billData.customerName && (
        <Card className="bg-green-50 border-green-200 mb-6 card-no-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckIcon className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Account Verified</p>
              <p className="text-sm text-green-700">{billData.customerName}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amount or Data Plan Selection */}
      {billData.service?.type === 'data' ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            Select Data Plan
          </label>
          <div className="grid grid-cols-2 gap-3">
            {dataPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all card-no-shadow ${
                  billData.amount === plan.price.replace('₦', '').replace(',', '') 
                    ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setBillData({ ...billData, amount: plan.price.replace('₦', '').replace(',', '') })}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-[#1E293B]">{plan.name}</p>
                  <p className="text-sm text-[#5B52FF]">{plan.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">₦</span>
            <Input
              type="number"
              placeholder="0.00"
              value={billData.amount}
              onChange={(e) => setBillData({ ...billData, amount: e.target.value })}
              className="pl-8 h-12"
            />
          </div>
          {billData.service?.type === 'airtime' && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => setBillData({ ...billData, amount: amount.replace('₦', '').replace(',', '') })}
                  className="h-10 text-sm"
                >
                  {amount}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

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
          disabled={!billData.amount || !billData.accountNumber || !billData.customerName}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Step 3: Confirm Payment
  const renderStep3 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Confirm Payment</h2>
        <p className="text-[#64748B]">Please review your payment details</p>
      </div>

      <Card className="mb-6 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">Payment Amount</p>
            <p className="text-3xl font-bold text-[#1E293B]">₦{Number(billData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Service</span>
              <span className="font-medium text-[#1E293B]">{billData.service?.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#64748B]">
                {billData.service?.type === 'airtime' || billData.service?.type === 'data' 
                  ? 'Phone Number' 
                  : billData.service?.type === 'electricity' 
                  ? 'Meter Number'
                  : billData.service?.type === 'cable' || billData.service?.type === 'internet'
                  ? 'Smart Card/IUC Number'
                  : 'Account Number'
                }
              </span>
              <span className="font-medium text-[#1E293B]">{billData.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#64748B]">Customer Name</span>
              <span className="font-medium text-[#1E293B]">{billData.customerName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#64748B]">Processing Fee</span>
              <span className="font-medium text-[#1E293B]">{billData.service?.fee}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-[#1E293B]">Total Amount</span>
                <span className="font-bold text-[#1E293B]">
                  ₦{(Number(billData.amount) + (billData.service?.fee === 'Free' ? 0 : 50)).toLocaleString()}
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
            value={billData.pin}
            onChange={(e) => setBillData({ ...billData, pin: e.target.value.slice(0, 4) })}
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
          onClick={() => setCurrentStep(2)}
          className="flex-1 h-12"
        >
          Back
        </Button>
        <Button 
          onClick={handleConfirmPayment}
          disabled={billData.pin.length !== 4}
          className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">🎉 Payment Successful! 🎉</h2>
        <p className="text-[#64748B]">Your bill payment has been processed successfully</p>
      </div>

      <Card className="mb-8 border-2 border-green-200 bg-green-50 card-no-shadow">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#64748B] mb-2">Payment Amount</p>
            <p className="text-3xl font-bold text-green-600">₦{Number(billData.amount).toLocaleString()}</p>
          </div>

          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Service</span>
              <span className="font-medium text-[#1E293B]">{billData.service?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">
                {billData.service?.type === 'airtime' || billData.service?.type === 'data' 
                  ? 'Phone Number' 
                  : billData.service?.type === 'electricity' 
                  ? 'Meter Number'
                  : billData.service?.type === 'cable' || billData.service?.type === 'internet'
                  ? 'Smart Card/IUC Number'
                  : 'Account Number'
                }
              </span>
              <span className="font-medium text-[#1E293B]">{billData.accountNumber}</span>
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
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button 
          onClick={handleStartNewPayment}
          className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA] btn-primary"
        >
          Make Another Payment
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
                <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                  {getServiceIcon(billType)}
                  {getServiceTitle(billType)}
                </h1>
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
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </main>
        </div>
      </div>

      {/* Mobile Layout - STANDARDIZED */}
      <div className="lg:hidden bg-white">
        {/* Mobile Header - Consistent with Dashboard */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">CA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">{getServiceTitle(billType)}</h1>
              <p className="text-xs text-[#64748B]">Pay your bills</p>
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
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
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