import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  HelpCircleIcon,
  LogOutIcon,
  EditIcon,
  ChevronRightIcon,
  HomeIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  BellRingIcon,
  CameraIcon,
  CheckCircleIcon,
  UsersIcon,
  ActivityIcon,
  BarChart3Icon,
  MessageCircleIcon,
  HeadphonesIcon,
  TicketIcon,
  BookOpenIcon,
  ThumbsUpIcon,
  ClockIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
  StarIcon
} from "lucide-react";

export const SupportProfile = (): JSX.Element => {
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [supportInfo, setSupportInfo] = useState({
    firstName: "Mike",
    lastName: "Support",
    email: "mike.support@surebanker.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
    employeeId: "SUP001",
    department: "Customer Support",
    role: "Senior Support Agent",
    dateJoined: "2023-03-15",
    lastLogin: "Today, 3:45 PM",
    profileImage: null,
    supportLevel: "Level 3 - Senior",
    specializations: ["Technical Support", "Account Issues", "Payment Problems", "KYC Assistance", "General Inquiries"]
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: false,
    smsNotifications: true,
    emailNotifications: true,
    supportPin: "****"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    ticketAlerts: true,
    escalationAlerts: true,
    customerFeedbackAlerts: true,
    urgentTicketAlerts: true,
    shiftReminders: true,
    performanceAlerts: true
  });

  const [supportSettings, setSupportSettings] = useState({
    language: "English",
    timezone: "Africa/Lagos",
    theme: "Light",
    autoLogout: "30 minutes",
    ticketAutoRefresh: true,
    sessionTimeout: "2 hours",
    soundNotifications: true,
    chatStatus: "Available"
  });

  const supportMenuItems = [
    { 
      id: "support-info", 
      icon: <HeadphonesIcon className="w-5 h-5" />, 
      title: "Support Agent Information", 
      description: "Update support profile and specializations",
      action: () => setCurrentView("support-info")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security Settings", 
      description: "Password, PIN, and support authentication",
      action: () => setCurrentView("security")
    },
    { 
      id: "permissions", 
      icon: <KeyIcon className="w-5 h-5" />, 
      title: "Support Permissions", 
      description: "View support access levels and capabilities",
      action: () => setCurrentView("permissions")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Support Notifications", 
      description: "Ticket alerts and support notifications",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "performance", 
      icon: <BarChart3Icon className="w-5 h-5" />, 
      title: "Performance Metrics", 
      description: "Support performance and customer satisfaction",
      action: () => setCurrentView("performance")
    },
    { 
      id: "knowledge", 
      icon: <BookOpenIcon className="w-5 h-5" />, 
      title: "Knowledge Base", 
      description: "Support resources and documentation",
      action: () => setCurrentView("knowledge")
    },
    { 
      id: "support-help", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Support Help", 
      description: "Get help with support tools and processes",
      action: () => setCurrentView("support-help")
    },
  ];

  const supportStats = [
    { label: "Tickets Resolved", value: "1,247", color: "text-[#F97316]", icon: <TicketIcon className="w-5 h-5" /> },
    { label: "Customer Rating", value: "4.9/5", color: "text-green-600", icon: <ThumbsUpIcon className="w-5 h-5" /> },
    { label: "Response Time", value: "2.3 min", color: "text-blue-600", icon: <ClockIcon className="w-5 h-5" /> },
    { label: "Resolution Rate", value: "98.5%", color: "text-green-600", icon: <CheckCircleIcon className="w-5 h-5" /> },
  ];

  const recentSupportActivity = [
    { action: "Ticket Resolved", details: "Helped customer with KYC verification issue", timestamp: "15 minutes ago", type: "ticket" },
    { action: "Escalation Handled", details: "Escalated payment issue to technical team", timestamp: "1 hour ago", type: "escalation" },
    { action: "Customer Feedback", details: "Received 5-star rating from customer", timestamp: "2 hours ago", type: "feedback" },
    { action: "Knowledge Base Updated", details: "Added new FAQ about card activation", timestamp: "4 hours ago", type: "knowledge" }
  ];

  const handleSaveSupportInfo = () => {
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (securitySettings.newPassword === securitySettings.confirmPassword) {
      setSecuritySettings({
        ...securitySettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  // Support Profile Overview Component
  const SupportProfileOverview = () => (
    <div className="space-y-6">
      {/* Support Header */}
      <Card className="bg-gradient-to-r from-[#F97316] to-[#EAB308] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  MS
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-[#F97316] hover:bg-gray-100"
              >
                <CameraIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {supportInfo.firstName} {supportInfo.lastName}
              </h2>
              <p className="text-white/80 mb-3">{supportInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {supportInfo.role}
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  {supportInfo.supportLevel}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  ID: {supportInfo.employeeId}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {supportStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('600', '100').replace('[#F97316]', 'orange-100')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm text-[#64748B] mb-1">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Support Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Support Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#F97316] text-white">
              <TicketIcon className="w-5 h-5" />
              <span className="text-sm">View Tickets</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <MessageSquareIcon className="w-5 h-5" />
              <span className="text-sm">Live Chat</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <BookOpenIcon className="w-5 h-5" />
              <span className="text-sm">Knowledge Base</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <BarChart3Icon className="w-5 h-5" />
              <span className="text-sm">Performance</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Support Activity */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Support Activity</h3>
          <div className="space-y-4">
            {recentSupportActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'ticket' ? 'bg-blue-100' :
                  activity.type === 'escalation' ? 'bg-red-100' :
                  activity.type === 'feedback' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'ticket' && <TicketIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'escalation' && <AlertTriangleIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'feedback' && <ThumbsUpIcon className="w-5 h-5 text-green-600" />}
                  {activity.type === 'knowledge' && <BookOpenIcon className="w-5 h-5 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B]">{activity.action}</p>
                  <p className="text-sm text-[#64748B]">{activity.details}</p>
                </div>
                <p className="text-sm text-[#64748B]">{activity.timestamp}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Support Profile Settings</h3>
          <div className="space-y-3">
            {supportMenuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-[#F8F9FF] rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#F97316]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">{item.title}</p>
                    <p className="text-sm text-[#64748B]">{item.description}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-[#64748B]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Information Component
  const SupportInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Agent Information</h2>
          <p className="text-[#64748B]">Manage your support profile and specializations</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <HeadphonesIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Full Name</p>
                <p className="font-medium text-[#1E293B]">{supportInfo.firstName} {supportInfo.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Email</p>
                <p className="font-medium text-[#1E293B]">{supportInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Phone</p>
                <p className="font-medium text-[#1E293B]">{supportInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StarIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Support Level</p>
                <p className="font-medium text-[#1E293B]">{supportInfo.supportLevel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Support Specializations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {supportInfo.specializations.map((specialization, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">{specialization}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Security Settings Component
  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Security Settings</h2>
          <p className="text-[#64748B]">Manage support account security and authentication</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">SMS Authentication</p>
                  <p className="text-sm text-[#64748B]">Receive codes via SMS for support access</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Permissions Component
  const SupportPermissions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Permissions</h2>
          <p className="text-[#64748B]">View your support access levels and capabilities</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Support Access Levels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <TicketIcon className="w-5 h-5 text-[#F97316]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Ticket Management</p>
                  <p className="text-sm text-[#64748B]">Create, update, and resolve customer tickets</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <UsersIcon className="w-5 h-5 text-[#F97316]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Customer Assistance</p>
                  <p className="text-sm text-[#64748B]">Help customers with account issues</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpenIcon className="w-5 h-5 text-[#F97316]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Knowledge Base</p>
                  <p className="text-sm text-[#64748B]">Access and update support documentation</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Read/Write</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Performance Metrics Component
  const PerformanceMetrics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Performance Metrics</h2>
          <p className="text-[#64748B]">Your support performance and customer satisfaction</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">This Month's Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Tickets Resolved</span>
                <span className="font-semibold text-[#1E293B]">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Average Response Time</span>
                <span className="font-semibold text-[#1E293B]">2.3 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Customer Satisfaction</span>
                <span className="font-semibold text-green-600">4.9/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Resolution Rate</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Customer Feedback</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUpIcon className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Excellent Support</span>
                </div>
                <p className="text-sm text-green-700">"Mike was very helpful and resolved my issue quickly!"</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUpIcon className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Great Service</span>
                </div>
                <p className="text-sm text-green-700">"Professional and knowledgeable support agent."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Knowledge Base Component
  const KnowledgeBase = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Knowledge Base</h2>
          <p className="text-[#64748B]">Support resources and documentation</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Support Documentation</h3>
          <div className="space-y-4">
            {[
              "How to help customers with KYC verification",
              "Troubleshooting payment issues",
              "Account recovery procedures",
              "Card activation and management",
              "Transfer and transaction support"
            ].map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-[#F8F9FF]">
                <div className="flex items-center gap-3">
                  <BookOpenIcon className="w-5 h-5 text-[#F97316]" />
                  <p className="text-[#1E293B]">{topic}</p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-[#64748B]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notification Settings Component
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Notification Settings</h2>
          <p className="text-[#64748B]">Manage support alerts and ticket notifications</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Support Alert Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "ticketAlerts", label: "New Ticket Alerts", description: "Get notified when new tickets are assigned" },
              { key: "escalationAlerts", label: "Escalation Alerts", description: "Notifications for escalated tickets" },
              { key: "customerFeedbackAlerts", label: "Customer Feedback", description: "Alerts for customer ratings and feedback" },
              { key: "urgentTicketAlerts", label: "Urgent Ticket Alerts", description: "High priority ticket notifications" },
              { key: "shiftReminders", label: "Shift Reminders", description: "Support shift and schedule reminders" },
              { key: "performanceAlerts", label: "Performance Alerts", description: "Performance milestone notifications" },
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <BellRingIcon className="w-5 h-5 text-[#64748B]" />
                  <div>
                    <p className="font-medium text-[#1E293B]">{setting.label}</p>
                    <p className="text-sm text-[#64748B]">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      [setting.key]: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F97316]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Help Center Component
  const SupportHelpCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Support Help Center</h2>
          <p className="text-[#64748B]">Get help with support tools and processes</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Support Chat</h3>
            <p className="text-sm text-[#64748B]">Chat with support supervisors</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Support Hotline</h3>
            <p className="text-sm text-[#64748B]">+234 700 SUPPORT</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Support Email</h3>
            <p className="text-sm text-[#64748B]">support-help@surebanker.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "support-info":
        return <SupportInformation />;
      case "security":
        return <SecuritySettings />;
      case "permissions":
        return <SupportPermissions />;
      case "notifications":
        return <NotificationSettings />;
      case "performance":
        return <PerformanceMetrics />;
      case "knowledge":
        return <KnowledgeBase />;
      case "support-help":
        return <SupportHelpCenter />;
      default:
        return <SupportProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Support Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
              <Badge className="bg-orange-100 text-orange-800 text-xs">SUPPORT</Badge>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                SUPPORT MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
                  onClick: () => navigate("/support")
                },
                { 
                  name: "Ticket Management", 
                  icon: <TicketIcon className="w-5 h-5" />,
                  onClick: () => navigate("/support")
                },
                { 
                  name: "Customer Assistance", 
                  icon: <UsersIcon className="w-5 h-5" />,
                  onClick: () => navigate("/support")
                },
                { 
                  name: "Knowledge Base", 
                  icon: <BookOpenIcon className="w-5 h-5" />,
                  onClick: () => navigate("/support")
                },
                { 
                  name: "Profile", 
                  icon: <UserIcon className="w-5 h-5" />,
                  active: true,
                  onClick: () => navigate("/support-profile")
                }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    item.active
                      ? "bg-[#F97316] text-white shadow-lg"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#F97316]"
                  }`}
                >
                  <div className={`${item.active ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4">
            <Card className="bg-gradient-to-br from-[#F97316] via-[#EAB308] to-[#F97316] text-white overflow-hidden relative card-no-shadow">
              <CardContent className="p-4 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#EAB308] to-[#F59E0B] rounded-full flex items-center justify-center">
                    <HeadphonesIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Support Agent</p>
                    <p className="text-sm text-gray-300">Customer Care</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#EAB308] to-[#F59E0B] hover:from-[#D97706] hover:to-[#EA580C] text-white shadow-lg btn-primary">
                  Support Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-64">
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                  <HeadphonesIcon className="w-6 h-6 text-[#F97316]" />
                  Support Profile
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-[#F8F9FF]">
                  <SearchIcon className="w-5 h-5 text-[#64748B]" />
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 hover:bg-[#F8F9FF]"
                    onClick={() => navigate("/support")}
                  >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    12
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Mike Support</div>
                    <div className="text-xs text-[#64748B]">Customer Support</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#F97316] text-white">MS</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#F97316] text-white">MS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Support Profile</h1>
              <p className="text-xs text-[#64748B]">Customer Support Agent</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                12
              </Badge>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/support") },
              { name: "Tickets", icon: <TicketIcon className="w-6 h-6" />, onClick: () => navigate("/support") },
              { name: "Knowledge", icon: <BookOpenIcon className="w-6 h-6" />, onClick: () => navigate("/support") },
              { name: "Profile", icon: <HeadphonesIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/support-profile") }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
                <div className={`${item.active ? 'text-[#F97316]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#F97316] font-medium' : 'text-gray-400'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-20 right-6 lg:bottom-6">
        <Button 
          variant="outline" 
          className="bg-white text-red-600 border-red-200 hover:bg-red-50 shadow-lg"
          onClick={() => navigate("/")}
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};