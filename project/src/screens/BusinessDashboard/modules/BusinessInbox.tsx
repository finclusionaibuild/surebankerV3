import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon, 
  InboxIcon, 
  MailIcon, 
  MessageSquareIcon, 
  AlertCircleIcon, 
  CheckCircleIcon, 
  InfoIcon, 
  GiftIcon, 
  CreditCardIcon, 
  TrendingUpIcon, 
  ShieldIcon, 
  StarIcon, 
  FilterIcon, 
  MoreHorizontalIcon, 
  TrashIcon, 
  ArchiveIcon, 
  BookMarkedIcon as MarkAsUnreadIcon, 
  HomeIcon, 
  UsersIcon, 
  FileTextIcon, 
  DollarSignIcon, 
  BarChart3Icon, 
  BuildingIcon 
} from "lucide-react";

interface BusinessMessage {
  id: string;
  type: 'notification' | 'promotion' | 'transaction' | 'security' | 'system' | 'payroll' | 'compliance';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
  color: string;
}

export const BusinessInbox: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const businessMessages: BusinessMessage[] = [
    {
      id: "1",
      type: "payroll",
      title: "Payroll Processing Complete",
      message: "Monthly payroll for 247 employees has been successfully processed. Total amount: ₦12,450,000",
      timestamp: "2 minutes ago",
      isRead: false,
      priority: "medium",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      id: "2",
      type: "security",
      title: "Suspicious Login Attempt",
      message: "Multiple failed login attempts detected from IP 192.168.1.100. Account temporarily locked for security.",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "high",
      icon: <ShieldIcon className="w-5 h-5" />,
      color: "text-red-600"
    },
    {
      id: "3",
      type: "compliance",
      title: "KYB Verification Required",
      message: "Your business account requires Tier 3 KYB verification to access advanced features like bulk transfers and POS integration.",
      timestamp: "3 hours ago",
      isRead: true,
      priority: "high",
      icon: <AlertCircleIcon className="w-5 h-5" />,
      color: "text-orange-600"
    },
    {
      id: "4",
      type: "transaction",
      title: "Large Transaction Alert",
      message: "Bulk transfer of ₦5,000,000 to 50 recipients is pending approval from authorized personnel.",
      timestamp: "1 day ago",
      isRead: false,
      priority: "medium",
      icon: <CreditCardIcon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "5",
      type: "system",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance on January 30th from 2:00 AM to 4:00 AM. POS services may be temporarily unavailable.",
      timestamp: "2 days ago",
      isRead: true,
      priority: "medium",
      icon: <InfoIcon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "6",
      type: "promotion",
      title: "Business Loan Offer",
      message: "Pre-approved for business expansion loan up to ₦50,000,000 at competitive rates. Apply now!",
      timestamp: "3 days ago",
      isRead: true,
      priority: "low",
      icon: <GiftIcon className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      id: "7",
      type: "payroll",
      title: "Employee Onboarding",
      message: "5 new employees added to payroll system. Please review and approve salary structures.",
      timestamp: "1 week ago",
      isRead: true,
      priority: "low",
      icon: <UsersIcon className="w-5 h-5" />,
      color: "text-green-600"
    }
  ];

  const filteredMessages = businessMessages.filter(message => {
    const matchesFilter = selectedFilter === "all" || message.type === selectedFilter;
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = businessMessages.filter(m => !m.isRead).length;

  const handleMessageSelect = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleMarkAsRead = (messageId: string) => {
    console.log("Mark as read:", messageId);
  };

  const handleDeleteMessage = (messageId: string) => {
    console.log("Delete message:", messageId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-orange-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transaction": return "bg-blue-100 text-blue-800";
      case "security": return "bg-red-100 text-red-800";
      case "promotion": return "bg-purple-100 text-purple-800";
      case "notification": return "bg-orange-100 text-orange-800";
      case "system": return "bg-gray-100 text-gray-800";
      case "payroll": return "bg-green-100 text-green-800";
      case "compliance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
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

          <nav className="flex-1 p-4 overflow-hidden">
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
                  onClick: () => navigate("/reports")
                },
                { 
                  name: "Inbox", 
                  icon: <InboxIcon className="w-5 h-5" />, 
                  notifications: unreadCount,
                  active: true,
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
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                    <InboxIcon className="w-6 h-6 text-[#5B52FF]" />
                    Business Inbox
                  </h1>
                  <p className="text-sm text-[#64748B]">{unreadCount} unread business messages</p>
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
                    {unreadCount}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Business Admin</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">BA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <Input
                    placeholder="Search business messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-white"
                  />
                </div>
                
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Messages</option>
                  <option value="payroll">Payroll</option>
                  <option value="transaction">Transactions</option>
                  <option value="security">Security</option>
                  <option value="compliance">Compliance</option>
                  <option value="promotion">Promotions</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`cursor-pointer hover:shadow-md transition-all bg-white border-l-4 ${getPriorityColor(message.priority)} ${
                    !message.isRead ? 'bg-blue-50' : ''
                  } card-no-shadow`}
                  onClick={() => handleMessageSelect(message.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          message.type === 'transaction' ? 'bg-blue-100' :
                          message.type === 'security' ? 'bg-red-100' :
                          message.type === 'promotion' ? 'bg-purple-100' :
                          message.type === 'notification' ? 'bg-orange-100' :
                          message.type === 'payroll' ? 'bg-green-100' :
                          message.type === 'compliance' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <div className={message.color}>
                            {message.icon}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-[#1E293B] ${!message.isRead ? 'font-bold' : ''}`}>
                              {message.title}
                            </h3>
                            <Badge className={`text-xs ${getTypeColor(message.type)}`}>
                              {message.type}
                            </Badge>
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-[#64748B] text-sm mb-2 ${!message.isRead ? 'font-medium' : ''}`}>
                            {message.message}
                          </p>
                          <p className="text-xs text-[#64748B]">{message.timestamp}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id);
                          }}
                        >
                          <MarkAsUnreadIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <InboxIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No messages found</h3>
                <p className="text-[#64748B]">Try adjusting your search or filter criteria</p>
              </div>
            )}
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Business Inbox</h1>
              <p className="text-xs text-[#64748B]">{unreadCount} unread</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                {unreadCount}
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {/* Search */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("all")}
              className={selectedFilter === "all" ? "bg-[#5B52FF] text-white" : "bg-white"}
            >
              All
            </Button>
            <Button 
              variant={selectedFilter === "payroll" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("payroll")}
              className={selectedFilter === "payroll" ? "bg-[#5B52FF] text-white" : "bg-white"}
            >
              Payroll
            </Button>
            <Button 
              variant={selectedFilter === "transaction" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("transaction")}
              className={selectedFilter === "transaction" ? "bg-[#5B52FF] text-white" : "bg-white"}
            >
              Transactions
            </Button>
            <Button 
              variant={selectedFilter === "security" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedFilter("security")}
              className={selectedFilter === "security" ? "bg-[#5B52FF] text-white" : "bg-white"}
            >
              Security
            </Button>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`bg-white border-l-4 ${getPriorityColor(message.priority)} ${
                  !message.isRead ? 'bg-blue-50' : ''
                } card-no-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'transaction' ? 'bg-blue-100' :
                      message.type === 'security' ? 'bg-red-100' :
                      message.type === 'promotion' ? 'bg-purple-100' :
                      message.type === 'notification' ? 'bg-orange-100' :
                      message.type === 'payroll' ? 'bg-green-100' :
                      message.type === 'compliance' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <div className={message.color}>
                        {message.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold text-[#1E293B] text-sm ${!message.isRead ? 'font-bold' : ''}`}>
                          {message.title}
                        </h3>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-[#64748B] text-sm mb-2 ${!message.isRead ? 'font-medium' : ''}`}>
                        {message.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#64748B]">{message.timestamp}</p>
                        <Badge className={`text-xs ${getTypeColor(message.type)}`}>
                          {message.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Home", icon: <BuildingIcon className="w-6 h-6" />, onClick: () => navigate("/business-dashboard") },
              { name: "Payroll", icon: <UsersIcon className="w-6 h-6" />, onClick: () => navigate("/payroll") },
              { name: "Inbox", icon: <InboxIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/business-inbox") },
              { name: "Reports", icon: <BarChart3Icon className="w-6 h-6" />, onClick: () => navigate("/reports") }
            ].map((item, index) => (
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