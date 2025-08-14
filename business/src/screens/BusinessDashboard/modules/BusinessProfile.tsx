import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../contexts/AccountContext";
import { KYBVerificationSystem } from "../../../components/ui/kyb-verification-system";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  ArrowLeftIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  BuildingIcon,
  HelpCircleIcon,
  LogOutIcon,
  EditIcon,
  ChevronRightIcon,
  HomeIcon,
  ReceiptIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CalendarIcon,
  FileTextIcon,
  BarChart3Icon,
  InboxIcon,
  StarIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  CheckIcon,
  XIcon,
  CameraIcon,
  UploadIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  KeyIcon,
  SmartphoneIcon,
  BellRingIcon,
  LanguagesIcon,
  PaletteIcon,
  DownloadIcon,
  ShareIcon,
  MessageCircleIcon,
  HeadphonesIcon,
  AlertCircleIcon,
  InfoIcon,
  TrendingUpIcon,
  DollarSignIcon,
  WalletIcon,
  CopyIcon,
  RefreshCwIcon,
  PlusIcon,
  MinusIcon,
  ScanIcon,
  QrCodeIcon,
  FingerprintIcon,
  ShieldCheckIcon,
  UsersIcon,
  CreditCardIcon
} from "lucide-react";

export const BusinessProfile = (): JSX.Element => {
  const { currentAccount } = useAccount();
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showKYBSystem, setShowKYBSystem] = useState(false);
  const [kybTier, setKybTier] = useState(3);
  const navigate = useNavigate();

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Atinse Enterprises",
    businessType: "Technology",
    registrationNumber: "RC123456789",
    taxId: "TIN987654321",
    email: "admin@atinse.com",
    phone: "+234 801 234 5678",
    address: "Victoria Island, Lagos, Nigeria",
    website: "www.atinse.com",
    industry: "Software Development",
    employees: 247,
    foundedYear: "2015",
    kybLevel: "Tier 3",
    accountType: "Business",
    profileImage: null
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: false,
    smsNotifications: true,
    emailNotifications: true,
    transactionPin: "****"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    transactionAlerts: true,
    payrollAlerts: true,
    complianceAlerts: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const [appSettings, setAppSettings] = useState({
    language: "English",
    currency: "NGN",
    theme: "Light",
    biometricLogin: false,
    autoLogout: "15 minutes",
    timezone: "Africa/Lagos"
  });

  const businessMenuItems = [
    { 
      id: "business-info", 
      icon: <BuildingIcon className="w-5 h-5" />, 
      title: "Business Information", 
      description: "Update business details and registration",
      action: () => setCurrentView("business-info")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security Settings", 
      description: "Password, PIN, and 2FA for business account",
      action: () => setCurrentView("security")
    },
    { 
      id: "team", 
      icon: <UsersIcon className="w-5 h-5" />, 
      title: "Team Management", 
      description: "Manage business users and permissions",
      action: () => setCurrentView("team")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Notifications", 
      description: "Business notification preferences",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "compliance", 
      icon: <FileTextIcon className="w-5 h-5" />, 
      title: "KYB & Compliance", 
      description: "Business verification and compliance status",
      action: () => setCurrentView("compliance")
    },
    { 
      id: "settings", 
      icon: <SettingsIcon className="w-5 h-5" />, 
      title: "Business Settings", 
      description: "Language, timezone, and business preferences",
      action: () => setCurrentView("settings")
    },
    { 
      id: "support", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Business Support", 
      description: "Dedicated business support and resources",
      action: () => setCurrentView("support")
    },
  ];

  const businessStats = [
    { label: "Business Balance", value: "₦2,500,000.00", color: "text-[#5B52FF]", icon: <WalletIcon className="w-5 h-5" /> },
    { label: "Monthly Revenue", value: "₦12,500,000", color: "text-green-600", icon: <TrendingUpIcon className="w-5 h-5" /> },
    { label: "Active Employees", value: "247", color: "text-blue-600", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "KYB Status", value: "Tier 3 Verified", color: "text-green-600", icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const teamMembers = [
    { name: "John Manager", role: "Business Manager", email: "john@atinse.com", permissions: "Full Access", status: "Active" },
    { name: "Sarah Admin", role: "Finance Admin", email: "sarah@atinse.com", permissions: "Finance Only", status: "Active" },
    { name: "Mike Operator", role: "Operations", email: "mike@atinse.com", permissions: "Limited Access", status: "Inactive" }
  ];

  // Navigation items with navigation functions
  const navItems = [
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
      notifications: 99,
      onClick: () => navigate("/business-inbox")
    },
    { 
      name: "Rate Us", 
      icon: <StarIcon className="w-5 h-5" />,
      onClick: () => navigate("/business-ratings")
    }
  ];

  const handleSaveBusinessInfo = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handlePasswordChange = () => {
    if (securitySettings.newPassword === securitySettings.confirmPassword) {
      // Handle password change
      setSecuritySettings({
        ...securitySettings,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Business Profile Overview Component
  const BusinessProfileOverview = () => (
    <div className="space-y-6">
      {/* Business Header */}
      <Card className="bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  {businessInfo.businessName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-[#5B52FF] hover:bg-gray-100"
              >
                <CameraIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {businessInfo.businessName}
              </h2>
              <p className="text-white/80 mb-3">{businessInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {businessInfo.kybLevel} Verified
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  {businessInfo.accountType}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  {businessInfo.employees} Employees
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Business Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {businessStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('600', '100')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
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

      {/* Quick Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Business Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#5B52FF] text-white">
              <UsersIcon className="w-5 h-5" />
              <span className="text-sm">Manage Team</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <FileTextIcon className="w-5 h-5" />
              <span className="text-sm">Business Reports</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <DownloadIcon className="w-5 h-5" />
              <span className="text-sm">Download Statements</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              <span className="text-sm">Business Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Profile Settings</h3>
          <div className="space-y-3">
            {businessMenuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-[#F8F9FF] rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#5B52FF]">
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

  // Business Information Component
  const BusinessInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Business Information</h2>
          <p className="text-[#64748B]">Manage your business details and registration information</p>
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Business Details</h3>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Name</label>
                <Input
                  value={businessInfo.businessName}
                  onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Type</label>
                <Input
                  value={businessInfo.businessType}
                  onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Registration Number</label>
                <Input
                  value={businessInfo.registrationNumber}
                  onChange={(e) => setBusinessInfo({...businessInfo, registrationNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Tax ID</label>
                <Input
                  value={businessInfo.taxId}
                  onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Email</label>
                <Input
                  value={businessInfo.email}
                  onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone</label>
                <Input
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Business Address</label>
                <Input
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Website</label>
                <Input
                  value={businessInfo.website}
                  onChange={(e) => setBusinessInfo({...businessInfo, website: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Industry</label>
                <Input
                  value={businessInfo.industry}
                  onChange={(e) => setBusinessInfo({...businessInfo, industry: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2 flex gap-4">
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={handleSaveBusinessInfo}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <BuildingIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Business Name</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.businessName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileTextIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Registration Number</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.registrationNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Email</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Phone</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Address</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUpIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Industry</p>
                  <p className="font-medium text-[#1E293B]">{businessInfo.industry}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Security Settings Component
  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Business Security Settings</h2>
          <p className="text-[#64748B]">Manage business account security and authentication</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Password Change */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Change Business Account Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showCurrentPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">New Password</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showNewPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Confirm New Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button 
              onClick={handlePasswordChange}
              disabled={!securitySettings.currentPassword || !securitySettings.newPassword || securitySettings.newPassword !== securitySettings.confirmPassword}
              className="bg-[#5B52FF] text-white"
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Two-Factor Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">SMS Authentication</p>
                  <p className="text-sm text-[#64748B]">Receive codes via SMS for business account</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                <Button variant="outline" size="sm">
                  Disable
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Team Management Component
  const TeamManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Team Management</h2>
          <p className="text-[#64748B]">Manage business users and their permissions</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView("overview")}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button className="bg-[#5B52FF] text-white">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Team Members</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#5B52FF] text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#1E293B]">{member.name}</p>
                    <p className="text-sm text-[#64748B]">{member.role}</p>
                    <p className="text-sm text-[#64748B]">{member.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    member.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }>
                    {member.status}
                  </Badge>
                  <p className="text-sm text-[#64748B] mt-1">{member.permissions}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Notifications Component
  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Business Notification Settings</h2>
          <p className="text-[#64748B]">Manage how your business receives notifications</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "pushNotifications", label: "Push Notifications", description: "Receive notifications on your device" },
              { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
              { key: "smsNotifications", label: "SMS Notifications", description: "Receive notifications via SMS" },
              { key: "transactionAlerts", label: "Transaction Alerts", description: "Get notified of all business transactions" },
              { key: "payrollAlerts", label: "Payroll Alerts", description: "Notifications for payroll processing" },
              { key: "complianceAlerts", label: "Compliance Alerts", description: "Important compliance and regulatory notifications" },
              { key: "securityAlerts", label: "Security Alerts", description: "Important security notifications" },
              { key: "marketingEmails", label: "Marketing Emails", description: "Business promotional offers and updates" },
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B52FF]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Compliance Component
  const ComplianceStatus = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">KYB & Compliance Status</h2>
          <p className="text-[#64748B]">Business verification and compliance information</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Current KYB Status */}
      <Card className="border-green-200 bg-green-50 card-no-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">Tier 3 Business Verified</h3>
              <p className="text-green-700">Your business is fully verified for all platform features</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYB Levels */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Verification Levels</h3>
          <div className="space-y-4">
            {[
              {
                tier: "Tier 1",
                status: "completed",
                features: ["Basic business operations", "Limited transaction amounts"],
                requirements: ["Business Registration", "Tax ID", "Basic Information"]
              },
              {
                tier: "Tier 2",
                status: "completed",
                features: ["Bulk transfers", "Payroll management", "Higher limits"],
                requirements: ["Financial Statements", "Bank Statements", "Director Information"]
              },
              {
                tier: "Tier 3",
                status: "completed",
                features: ["POS integration", "Business loans", "Maximum limits"],
                requirements: ["Audited Financials", "Business License", "Compliance Documents"]
              }
            ].map((level, index) => (
              <div key={index} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E293B]">{level.tier}</h4>
                      <p className="text-sm text-[#64748B]">Business verification level</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] mb-2">Features Unlocked:</p>
                    <ul className="text-sm text-[#64748B] space-y-1">
                      {level.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B] mb-2">Requirements:</p>
                    <ul className="text-sm text-[#64748B] space-y-1">
                      {level.requirements.map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={() => setShowKYBSystem(true)}
              className="w-full bg-[#5B52FF] text-white"
            >
              View Full KYB System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Business Settings Component
  const BusinessSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Business Settings</h2>
          <p className="text-[#64748B]">Customize your business account preferences</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Language</label>
              <select 
                value={appSettings.language}
                onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Currency</label>
              <select 
                value={appSettings.currency}
                onChange={(e) => setAppSettings({...appSettings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Timezone</label>
              <select 
                value={appSettings.timezone}
                onChange={(e) => setAppSettings({...appSettings, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                <option value="Africa/Accra">Africa/Accra (GMT)</option>
                <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Auto Logout</label>
              <select 
                value={appSettings.autoLogout}
                onChange={(e) => setAppSettings({...appSettings, autoLogout: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="4 hours">4 hours</option>
                <option value="Never">Never</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Center Component
  const BusinessSupportCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Business Support</h2>
          <p className="text-[#64748B]">Get dedicated business support and resources</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Business Support Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Business Chat</h3>
            <p className="text-sm text-[#64748B]">Chat with our business support team</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Business Hotline</h3>
            <p className="text-sm text-[#64748B]">+234 700 BUSINESS</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Business Email</h3>
            <p className="text-sm text-[#64748B]">business@surebanker.com</p>
          </CardContent>
        </Card>
      </div>

      {/* Business FAQ */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business FAQ</h3>
          <div className="space-y-4">
            {[
              "How do I upgrade my KYB verification?",
              "What are the business transaction limits?",
              "How do I set up payroll for my employees?",
              "How do I integrate POS terminals?",
              "What documents are required for business loans?"
            ].map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-[#F8F9FF]">
                <p className="text-[#1E293B]">{question}</p>
                <ChevronRightIcon className="w-5 h-5 text-[#64748B]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "business-info":
        return <BusinessInformation />;
      case "security":
        return <SecuritySettings />;
      case "team":
        return <TeamManagement />;
      case "notifications":
        return <NotificationSettings />;
      case "compliance":
        return <ComplianceStatus />;
      case "settings":
        return <BusinessSettings />;
      case "support":
        return <BusinessSupportCenter />;
      default:
        return <BusinessProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* KYB Verification System */}
      <KYBVerificationSystem
        isOpen={showKYBSystem}
        onClose={() => setShowKYBSystem(false)}
        currentTier={kybTier}
        onTierUpgrade={(tier) => setKybTier(tier)}
      />

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Business Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                BUSINESS MENU
              </div>
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className="px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 text-[#64748B] hover:bg-gray-50 hover:text-[#5B52FF]"
                >
                  <div>{item.icon}</div>
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
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-[#1E293B] flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-[#5B52FF]" />
                  Business Profile Settings
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
                    onClick={() => navigate("/business-inbox")}
                  >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    5
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">{currentAccount?.name || 'Business Admin'}</div>
                    <div className="text-xs text-[#64748B]">Business Account</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'BA'}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          {/* Business Profile Content */}
          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#5B52FF] text-white">{currentAccount?.avatar || 'BA'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Business Profile</h1>
              <p className="text-xs text-[#64748B]">Manage business account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center p-0">
                5
              </Badge>
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Home", icon: <BuildingIcon className="w-6 h-6" />, onClick: () => navigate("/business-dashboard") },
              { name: "Payroll", icon: <UsersIcon className="w-6 h-6" />, onClick: () => navigate("/payroll") },
              { name: "Reports", icon: <BarChart3Icon className="w-6 h-6" />, onClick: () => navigate("/reports") },
              { name: "Profile", icon: <UserIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/business-profile") }
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