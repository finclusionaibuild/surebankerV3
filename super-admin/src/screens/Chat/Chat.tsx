import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { MessageCircleIcon, SendIcon, PhoneIcon, VideoIcon, MoreHorizontalIcon, SearchIcon, PlusIcon, ArrowLeftIcon, BellIcon, UserIcon, HomeIcon, CreditCardIcon, ReceiptIcon, PiggyBankIcon, BarChart3Icon, HandshakeIcon, InboxIcon, StarIcon, ChevronDownIcon, ArrowRightIcon, ContactIcon as PaperclipIcon, ImageIcon, MicIcon, SmileIcon, CheckIcon, CheckCheckIcon } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'individual' | 'support' | 'group';
}

export const Chat = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: '1',
      name: 'SureBanker Support',
      avatar: 'SS',
      lastMessage: 'How can I help you today?',
      timestamp: '2 min ago',
      unreadCount: 1,
      isOnline: true,
      type: 'support'
    },
    {
      id: '2',
      name: 'John Doe',
      avatar: 'JD',
      lastMessage: 'Thanks for the transfer!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: true,
      type: 'individual'
    },
    {
      id: '3',
      name: 'Jane Smith',
      avatar: 'JS',
      lastMessage: 'Can you send me the receipt?',
      timestamp: '3 hours ago',
      unreadCount: 2,
      isOnline: false,
      type: 'individual'
    },
    {
      id: '4',
      name: 'Family Group',
      avatar: 'FG',
      lastMessage: 'Mom: Dinner at 7pm',
      timestamp: '1 day ago',
      unreadCount: 5,
      isOnline: true,
      type: 'group'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      senderId: 'support',
      senderName: 'SureBanker Support',
      content: 'Hello! Welcome to SureBanker support. How can I assist you today?',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'user',
      senderName: 'You',
      content: 'Hi, I need help with my transaction that failed yesterday.',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'support',
      senderName: 'SureBanker Support',
      content: 'I\'d be happy to help you with that. Can you please provide me with the transaction ID?',
      timestamp: '10:33 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      senderId: 'user',
      senderName: 'You',
      content: 'The transaction ID is TXN123456789',
      timestamp: '10:35 AM',
      type: 'text',
      status: 'delivered'
    },
    {
      id: '5',
      senderId: 'support',
      senderName: 'SureBanker Support',
      content: 'Thank you! I can see the transaction. It looks like there was a temporary network issue. I\'ve initiated a retry and you should see the funds reflected in your account within the next 30 minutes.',
      timestamp: '10:37 AM',
      type: 'text',
      status: 'sent'
    }
  ];

  const navItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, active: false, onClick: () => navigate("/dashboard") },
    { name: "Payments", icon: <CreditCardIcon className="w-5 h-5" />, hasDropdown: true, onClick: () => navigate("/payments") },
    { name: "Transactions", icon: <ReceiptIcon className="w-5 h-5" />, onClick: () => navigate("/transactions") },
    { name: "Cards", icon: <CreditCardIcon className="w-5 h-5" />, onClick: () => navigate("/cards") },
    { name: "SureSavings", icon: <PiggyBankIcon className="w-5 h-5" />, onClick: () => navigate("/sure-savings") },
    { name: "SureBudget", icon: <BarChart3Icon className="w-5 h-5" />, onClick: () => navigate("/sure-budget") },
    { name: "SureEscrow", icon: <HandshakeIcon className="w-5 h-5" />, onClick: () => navigate("/sure-escrow") },
    { name: "Chat", icon: <MessageCircleIcon className="w-5 h-5" />, active: true, onClick: () => navigate("/chat") },
    { name: "Inbox", icon: <InboxIcon className="w-5 h-5" />, notifications: 99, onClick: () => navigate("/inbox") },
    { name: "Rate Us", icon: <StarIcon className="w-5 h-5" />, onClick: () => navigate("/ratings") }
  ];

  const mobileNavItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, active: false, onClick: () => navigate("/dashboard") },
    { name: "Chat", icon: <MessageCircleIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/chat") },
    { name: "Cards", icon: <CreditCardIcon className="w-6 h-6" />, onClick: () => navigate("/cards") },
    { name: "Profile", icon: <UserIcon className="w-6 h-6" />, onClick: () => navigate("/profile") }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Add message sending logic here
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckIcon className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheckIcon className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheckIcon className="w-3 h-3 text-blue-500" />;
      default:
        return null;
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
        <div className="flex-1 flex ml-64">
          {/* Chat List */}
          <div className="w-80 border-r border-gray-200 flex flex-col h-screen">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#1E293B]">Messages</h2>
                <Button size="sm" className="bg-[#5B52FF] text-white">
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-[#F8F9FF] border-r-2 border-r-[#5B52FF]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-[#5B52FF] text-white">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-[#1E293B] truncate">{chat.name}</h3>
                        <span className="text-xs text-[#64748B]">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#64748B] truncate">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-[#5B52FF] text-white text-xs px-2 py-1 rounded-full">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-screen">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#5B52FF] text-white">
                            {selectedChat.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E293B]">{selectedChat.name}</h3>
                        <p className="text-sm text-[#64748B]">
                          {selectedChat.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <PhoneIcon className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <VideoIcon className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <MoreHorizontalIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.senderId === 'user' 
                          ? 'bg-[#5B52FF] text-white' 
                          : 'bg-gray-100 text-[#1E293B]'
                      } rounded-lg p-3`}>
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-between mt-2 ${
                          message.senderId === 'user' ? 'text-white/70' : 'text-[#64748B]'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.senderId === 'user' && (
                            <div className="ml-2">
                              {getMessageStatusIcon(message.status)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="p-2">
                      <PaperclipIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-12"
                      />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                        <SmileIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-[#5B52FF] text-white p-2"
                    >
                      <SendIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Select a conversation</h3>
                  <p className="text-[#64748B]">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">CA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Messages</h1>
              <p className="text-xs text-[#64748B]">Stay connected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-[#5B52FF] text-white">
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

        <main className="pb-20">
          {!selectedChat ? (
            <div className="p-4">
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-3">
                {filteredChats.map((chat) => (
                  <Card 
                    key={chat.id}
                    className="cursor-pointer card-no-shadow"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#5B52FF] text-white">
                              {chat.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-[#1E293B] truncate">{chat.name}</h3>
                            <span className="text-xs text-[#64748B]">{chat.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#64748B] truncate">{chat.lastMessage}</p>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-[#5B52FF] text-white text-xs px-2 py-1 rounded-full">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-screen">
              {/* Mobile Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
                    <ArrowLeftIcon className="w-4 h-4" />
                  </Button>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#5B52FF] text-white">
                      {selectedChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1E293B]">{selectedChat.name}</h3>
                    <p className="text-sm text-[#64748B]">
                      {selectedChat.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <PhoneIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <VideoIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs ${
                      message.senderId === 'user' 
                        ? 'bg-[#5B52FF] text-white' 
                        : 'bg-gray-100 text-[#1E293B]'
                    } rounded-lg p-3`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-2 ${
                        message.senderId === 'user' ? 'text-white/70' : 'text-[#64748B]'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === 'user' && (
                          <div className="ml-2">
                            {getMessageStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Message Input */}
              <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                      <SmileIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-[#5B52FF] text-white p-2"
                  >
                    <SendIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
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