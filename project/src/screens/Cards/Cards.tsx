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
  CreditCardIcon,
  PlusIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UnlockIcon,
  SettingsIcon,
  TrashIcon,
  CopyIcon,
  MoreHorizontalIcon,
  ShieldIcon,
  CalendarIcon,
  DollarSignIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeIcon,
  ReceiptIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  StarIcon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  DownloadIcon,
  ShareIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from "lucide-react";

interface CardData {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard' | 'verve';
  cardName: string;
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  isVirtual: boolean;
  spendingLimit: number;
  monthlySpent: number;
  lastTransaction: string;
  cardColor: string;
}

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  location: string;
}

export const Cards = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const navigate = useNavigate();
  const [kycLevel, setKycLevel] = useState(2); // Get from account context
  const [currentView, setCurrentView] = useState('overview');
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showCardNumber, setShowCardNumber] = useState<{ [key: string]: boolean }>({});
  const [showCVV, setShowCVV] = useState<{ [key: string]: boolean }>({});

  // Sample card data
  const userCards: CardData[] = [
    {
      id: "card_001",
      cardNumber: "4532 1234 5678 9012",
      cardHolder: "CARCHY ATINSE",
      expiryDate: "12/27",
      cvv: "123",
      cardType: "visa",
      cardName: "SureBanker Visa Card",
      balance: 45000,
      status: "active",
      isVirtual: false,
      spendingLimit: 100000,
      monthlySpent: 25000,
      lastTransaction: "2 hours ago",
      cardColor: "bg-gradient-to-br from-[#5B52FF] to-[#7C3AED]"
    },
    {
      id: "card_002",
      cardNumber: "5234 5678 9012 3456",
      cardHolder: "CARCHY ATINSE",
      expiryDate: "08/26",
      cvv: "456",
      cardType: "mastercard",
      cardName: "SureBanker Mastercard",
      balance: 12000,
      status: "active",
      isVirtual: true,
      spendingLimit: 50000,
      monthlySpent: 8000,
      lastTransaction: "1 day ago",
      cardColor: "bg-gradient-to-br from-[#1E293B] to-[#374151]"
    },
    {
      id: "card_003",
      cardNumber: "5061 2345 6789 0123",
      cardHolder: "CARCHY ATINSE",
      expiryDate: "03/25",
      cvv: "789",
      cardType: "verve",
      cardName: "SureBanker Verve Card",
      balance: 5000,
      status: "blocked",
      isVirtual: false,
      spendingLimit: 25000,
      monthlySpent: 0,
      lastTransaction: "1 week ago",
      cardColor: "bg-gradient-to-br from-[#DC2626] to-[#991B1B]"
    }
  ];

  // Sample transaction data
  const cardTransactions: Transaction[] = [
    {
      id: "txn_001",
      merchant: "Amazon",
      amount: -15000,
      date: "Aug 26, 2024",
      time: "14:30",
      status: "completed",
      category: "Shopping",
      location: "Online"
    },
    {
      id: "txn_002",
      merchant: "Shoprite",
      amount: -8500,
      date: "Aug 25, 2024",
      time: "16:45",
      status: "completed",
      category: "Groceries",
      location: "Lagos, Nigeria"
    },
    {
      id: "txn_003",
      merchant: "Netflix",
      amount: -2900,
      date: "Aug 24, 2024",
      time: "09:15",
      status: "completed",
      category: "Entertainment",
      location: "Online"
    },
    {
      id: "txn_004",
      merchant: "Uber",
      amount: -3200,
      date: "Aug 23, 2024",
      time: "18:20",
      status: "completed",
      category: "Transportation",
      location: "Lagos, Nigeria"
    }
  ];

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, active: false, onClick: () => navigate("/dashboard") },
    { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: true, onClick: () => navigate("/payments") },
    { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, onClick: () => navigate("/transactions") },
    { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/cards") },
    { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, onClick: () => navigate("/sure-savings") },
    { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/sure-budget") },
    { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, onClick: () => navigate("/sure-escrow") },
    { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, onClick: () => navigate("/inbox") },
    { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, onClick: () => navigate("/ratings") }
  ];

  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, active: false, onClick: () => navigate("/dashboard") },
    { name: "Transfer", icon: <ArrowRightIcon className="w-6 h-6" />, onClick: () => navigate("/transfer") },
    { name: "Goals", icon: <StarIcon className="w-6 h-6" />, onClick: () => navigate("/dashboard") },
    { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/cards") },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
  ];

  const toggleCardNumberVisibility = (cardId: string) => {
    setShowCardNumber(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const toggleCVVVisibility = (cardId: string) => {
    setShowCVV(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="text-white font-bold text-lg">VISA</div>;
      case 'mastercard':
        return <div className="text-white font-bold text-lg">MC</div>;
      case 'verve':
        return <div className="text-white font-bold text-lg">VERVE</div>;
      default:
        return <CreditCardIcon className="w-6 h-6 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCardNumber = (cardNumber: string, isVisible: boolean) => {
    if (isVisible) {
      return cardNumber;
    }
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  };

  // Cards Overview Component
  const CardsOverview = () => (
    <div className="space-y-6">
      {/* Cards Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">{userCards.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Balance</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  ₦{userCards.reduce((sum, card) => sum + card.balance, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Monthly Spent</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  ₦{userCards.reduce((sum, card) => sum + card.monthlySpent, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Active Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {userCards.filter(card => card.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Button 
          className="h-16 bg-[#5B52FF] text-white flex flex-col items-center justify-center gap-2 btn-primary"
          onClick={() => setCurrentView('add-card')}
        >
          <PlusIcon className="w-6 h-6" />
          <span>Add New Card</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex flex-col items-center justify-center gap-2"
          onClick={() => setCurrentView('virtual-card')}
        >
          <CreditCardIcon className="w-6 h-6" />
          <span>Create Virtual Card</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex flex-col items-center justify-center gap-2"
        >
          <SettingsIcon className="w-6 h-6" />
          <span>Card Settings</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex flex-col items-center justify-center gap-2"
        >
          <DownloadIcon className="w-6 h-6" />
          <span>Download Statement</span>
        </Button>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#1E293B]">Your Cards</h3>
          <Button 
            className="bg-[#5B52FF] text-white btn-primary"
            onClick={() => setCurrentView('add-card')}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {userCards.map((card) => (
            <div key={card.id} className="space-y-4">
              {/* Card Visual */}
              <Card 
                className={`${card.cardColor} text-white h-48 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all card-no-shadow`}
                onClick={() => {
                  setSelectedCard(card);
                  setCurrentView('card-details');
                }}
              >
                <CardContent className="p-6 flex flex-col justify-between h-full relative">
                  {/* Card decorations */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">{card.cardName}</p>
                      {card.isVirtual && (
                        <Badge className="bg-white/20 text-white text-xs mt-1">Virtual</Badge>
                      )}
                    </div>
                    {getCardTypeIcon(card.cardType)}
                  </div>
                      {formatCardNumber(card.cardNumber, showCardNumber[card.id])}
                  <div>
                    <p className="text-xl font-mono tracking-wider mb-2">
                      {kycLevel === 0 ? 'Start with Tier 1 verification, then upgrade to Tier 2 for card access' :
                       'Complete Tier 2 verification to unlock card requests and higher limits'}
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-white/80 text-xs">
                          {kycLevel === 0 ? 'Start with Tier 1 verification, then upgrade to Tier 2 for card access' :
                           'Complete Tier 2 verification to unlock card requests and higher limits'}
                        </p>
                        <p className="text-sm font-medium">{card.cardHolder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-xs">Expires</p>
                        <p className="text-sm font-medium">{card.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Info */}
              <Card className="card-no-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-[#1E293B]">{card.cardName}</p>
                      <p className="text-sm text-[#64748B]">Balance: ₦{card.balance.toLocaleString()}</p>
                    </div>
                    <Badge className={getStatusColor(card.status)}>
                      {card.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">Monthly Spent</span>
                    <span className="font-medium">₦{card.monthlySpent.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#5B52FF] h-2 rounded-full" 
                      style={{ width: `${Math.min((card.monthlySpent / card.spendingLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedCard(card);
                        setCurrentView('card-details');
                      }}
                    >
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <SettingsIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Card Details Component
  const CardDetails = () => {
    if (!selectedCard) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('overview')}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-[#1E293B]">Card Details</h2>
              <p className="text-[#64748B]">{selectedCard.cardName}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LockIcon className="w-4 h-4 mr-2" />
              {selectedCard.status === 'active' ? 'Block Card' : 'Unblock Card'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Visual & Details */}
          <div className="space-y-6">
            {/* Card */}
            <Card className={`${selectedCard.cardColor} text-white h-56 relative overflow-hidden card-no-shadow`}>
              <CardContent className="p-8 flex flex-col justify-between h-full relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm mb-2">{selectedCard.cardName}</p>
                    {selectedCard.isVirtual && (
                      <Badge className="bg-white/20 text-white text-xs">Virtual Card</Badge>
                    )}
                  </div>
                  {getCardTypeIcon(selectedCard.cardType)}
                </div>
                
                <div>
                  <p className="text-2xl font-mono tracking-wider mb-4">
                    {formatCardNumber(selectedCard.cardNumber, showCardNumber[selectedCard.id])}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs">Card Holder</p>
                      <p className="text-lg font-medium">{selectedCard.cardHolder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs">Expires</p>
                      <p className="text-lg font-medium">{selectedCard.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                onClick={() => toggleCardNumberVisibility(selectedCard.id)}
                className="h-12"
              >
                {showCardNumber[selectedCard.id] ? <EyeOffIcon className="w-4 h-4 mr-2" /> : <EyeIcon className="w-4 h-4 mr-2" />}
                {showCardNumber[selectedCard.id] ? 'Hide' : 'Show'} Number
              </Button>
              <Button 
                variant="outline"
                onClick={() => copyToClipboard(selectedCard.cardNumber.replace(/\s/g, ''))}
                className="h-12"
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy Number
              </Button>
            </div>

            {/* Card Information */}
            <Card className="card-no-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Card Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Card Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">
                        {formatCardNumber(selectedCard.cardNumber, showCardNumber[selectedCard.id])}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCardNumberVisibility(selectedCard.id)}
                        className="p-1"
                      >
                        {showCardNumber[selectedCard.id] ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">CVV</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">
                        {showCVV[selectedCard.id] ? selectedCard.cvv : '***'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCVVVisibility(selectedCard.id)}
                        className="p-1"
                      >
                        {showCVV[selectedCard.id] ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Expiry Date</span>
                    <span className="font-medium">{selectedCard.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Card Type</span>
                    <span className="font-medium capitalize">{selectedCard.cardType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Status</span>
                    <Badge className={getStatusColor(selectedCard.status)}>
                      {selectedCard.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Card Stats & Transactions */}
          <div className="space-y-6">
            {/* Card Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSignIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B]">Balance</p>
                      <p className="text-xl font-bold text-[#1E293B]">₦{selectedCard.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-no-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUpIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-[#64748B]">Monthly Spent</p>
                      <p className="text-xl font-bold text-[#1E293B]">₦{selectedCard.monthlySpent.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spending Limit */}
            <Card className="card-no-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#1E293B]">Spending Limit</h4>
                  <Button variant="outline" size="sm">
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Adjust
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Monthly Limit</span>
                    <span className="font-medium">₦{selectedCard.spendingLimit.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#5B52FF] h-3 rounded-full" 
                      style={{ width: `${Math.min((selectedCard.monthlySpent / selectedCard.spendingLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Used: ₦{selectedCard.monthlySpent.toLocaleString()}</span>
                    <span className="text-[#64748B]">
                      {Math.round((selectedCard.monthlySpent / selectedCard.spendingLimit) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="card-no-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#1E293B]">Recent Transactions</h4>
                  <Button variant="outline" size="sm" onClick={() => navigate("/transactions")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {cardTransactions.slice(0, 4).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{transaction.merchant.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-[#1E293B]">{transaction.merchant}</p>
                          <p className="text-sm text-[#64748B]">{transaction.date} • {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">₦{Math.abs(transaction.amount).toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Add Card Component
  const AddCard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setCurrentView('overview')}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Add New Card</h2>
            <p className="text-[#64748B]">Request a new physical or virtual card</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Types */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-[#1E293B]">Choose Card Type</h3>
          
          <div className="space-y-4">
            <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-[#5B52FF] card-no-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#5B52FF] rounded-lg flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1E293B] mb-1">Physical Card</h4>
                    <p className="text-sm text-[#64748B]">Get a physical card delivered to your address</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-green-600">Delivery: 5-7 days</span>
                      <span className="text-blue-600">Fee: ₦2,000</span>
                    </div>
                  </div>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-[#5B52FF] card-no-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#1E293B] mb-1">Virtual Card</h4>
                    <p className="text-sm text-[#64748B]">Get an instant virtual card for online payments</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-green-600">Instant</span>
                      <span className="text-blue-600">Fee: Free</span>
                    </div>
                  </div>
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200 card-no-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Card Requirements</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• KYC Tier 2 verification required</li>
                    <li>• Minimum account balance: ₦5,000</li>
                    <li>• Valid phone number and address</li>
                    <li>• Account must be active for 30+ days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-[#1E293B]">Application Details</h3>
          
          <Card className="card-no-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Card Name</label>
                  <Input placeholder="Enter a name for your card" className="h-12" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Spending Limit</label>
                  <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                    <option>₦25,000 per month</option>
                    <option>₦50,000 per month</option>
                    <option>₦100,000 per month</option>
                    <option>₦200,000 per month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Delivery Address</label>
                  <textarea 
                    placeholder="Enter your delivery address"
                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone Number</label>
                  <Input placeholder="Enter your phone number" className="h-12" />
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input type="checkbox" className="mt-1" />
                  <div className="text-sm text-[#64748B]">
                    I agree to the <span className="text-[#5B52FF] font-medium">Terms and Conditions</span> for card issuance and understand the associated fees.
                  </div>
                </div>

                <Button className="w-full h-12 bg-[#5B52FF] text-white btn-primary">
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Virtual Card Component
  const VirtualCard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setCurrentView('overview')}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B]">Create Virtual Card</h2>
            <p className="text-[#64748B]">Get an instant virtual card for online payments</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="card-no-shadow">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">Instant Virtual Card</h3>
              <p className="text-[#64748B]">Create a virtual card in seconds for secure online payments</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Card Name</label>
                <Input placeholder="e.g., Online Shopping Card" className="h-12" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Spending Limit</label>
                <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                  <option>₦10,000 per month</option>
                  <option>₦25,000 per month</option>
                  <option>₦50,000 per month</option>
                  <option>₦100,000 per month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Card Purpose</label>
                <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                  <option>Online Shopping</option>
                  <option>Subscriptions</option>
                  <option>Travel Bookings</option>
                  <option>General Use</option>
                </select>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Virtual Card Benefits</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Instant creation and activation</li>
                        <li>• Enhanced security for online payments</li>
                        <li>• Easy to freeze/unfreeze</li>
                        <li>• No physical card required</li>
                        <li>• Real-time transaction notifications</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full h-12 bg-[#5B52FF] text-white btn-primary">
                Create Virtual Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'card-details':
        return <CardDetails />;
      case 'add-card':
        return <AddCard />;
      case 'virtual-card':
        return <VirtualCard />;
      default:
        return <CardsOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
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
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                  <CreditCardIcon className="w-6 h-6 text-[#5B52FF]" />
                  Card Management
                </h1>
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
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'U'}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* KYC Upgrade Prompt for Cards */}
            {kycLevel < 2 && (
              <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <CreditCardIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">Card Requests Require KYC Tier 2</h3>
                      <p className="text-sm text-purple-700">Complete your verification to request physical and virtual cards</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-purple-600 text-white hover:bg-purple-700"
                    onClick={() => navigate("/notifications")}
                  >
                    Complete KYC
                  </Button>
                </CardContent>
              </Card>
            )}

            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Cards</h1>
              <p className="text-xs text-[#64748B]">Manage your cards</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-[#5B52FF] text-white btn-primary"
              size="sm"
              onClick={() => setCurrentView('add-card')}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                1
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

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