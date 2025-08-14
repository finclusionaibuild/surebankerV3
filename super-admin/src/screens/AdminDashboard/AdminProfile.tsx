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
  CreditCardIcon,
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
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
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
  FileTextIcon,
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
  DatabaseIcon,
  ActivityIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from "lucide-react";

export const AdminProfile = (): JSX.Element => {
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({
    firstName: "John",
    lastName: "Admin",
    email: "john.admin@surebanker.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
    employeeId: "ADM001",
    department: "Administration",
    role: "System Administrator",
    dateJoined: "2023-01-15",
    lastLogin: "Today, 2:30 PM",
    profileImage: null,
    permissions: ["User Management", "System Settings", "Reports", "Audit Logs"]
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: false,
    smsNotifications: true,
    emailNotifications: true,
    adminPin: "****"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    systemAlerts: true,
    userActivityAlerts: true,
    securityAlerts: true,
    maintenanceAlerts: true,
    reportAlerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    language: "English",
    timezone: "Africa/Lagos",
    theme: "Light",
    autoLogout: "30 minutes",
    auditLogging: true,
    sessionTimeout: "2 hours"
  });

  const adminMenuItems = [
    { 
      id: "admin-info", 
      icon: <UserIcon className="w-5 h-5" />, 
      title: "Admin Information", 
      description: "Update admin profile and contact details",
      action: () => setCurrentView("admin-info")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security Settings", 
      description: "Password, PIN, and admin authentication",
      action: () => setCurrentView("security")
    },
    { 
      id: "permissions", 
      icon: <KeyIcon className="w-5 h-5" />, 
      title: "Admin Permissions", 
      description: "View and manage admin access levels",
      action: () => setCurrentView("permissions")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Notification Settings", 
      description: "System and admin alert preferences",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "audit", 
      icon: <ActivityIcon className="w-5 h-5" />, 
      title: "Audit & Activity", 
      description: "View admin activity logs and audit trail",
      action: () => setCurrentView("audit")
    },
    { 
      id: "system", 
      icon: <SettingsIcon className="w-5 h-5" />, 
      title: "System Settings", 
      description: "Admin system preferences and configuration",
      action: () => setCurrentView("system")
    },
    { 
      id: "support", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Admin Support", 
      description: "Technical support and admin resources",
      action: () => setCurrentView("support")
    },
  ];

  const adminStats = [
    { label: "Users Managed", value: "12,847", color: "text-[#5B52FF]", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "System Uptime", value: "99.9%", color: "text-green-600", icon: <ActivityIcon className="w-5 h-5" /> },
    { label: "Active Sessions", value: "1,234", color: "text-blue-600", icon: <ClockIcon className="w-5 h-5" /> },
    { label: "Security Level", value: "High", color: "text-green-600", icon: <ShieldCheckIcon className="w-5 h-5" /> },
  ];

  const recentAdminActivity = [
    { action: "User Account Created", details: "Created account for John Doe", timestamp: "2 hours ago", type: "user" },
    { action: "System Settings Updated", details: "Modified transaction limits", timestamp: "4 hours ago", type: "system" },
    { action: "Security Alert Resolved", details: "Investigated suspicious login", timestamp: "6 hours ago", type: "security" },
    { action: "Report Generated", details: "Monthly user activity report", timestamp: "1 day ago", type: "report" }
  ];

  const handleSaveAdminInfo = () => {
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

  // Admin Profile Overview Component
  const AdminProfileOverview = () => (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  JA
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
                {adminInfo.firstName} {adminInfo.lastName}
              </h2>
              <p className="text-white/80 mb-3">{adminInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {adminInfo.role}
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  Administrator
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  ID: {adminInfo.employeeId}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-white/30 text-white hover:bg-white/10"
            >
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Admin Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
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

      {/* Quick Admin Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Admin Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#5B52FF] text-white">
              <UsersIcon className="w-5 h-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <DatabaseIcon className="w-5 h-5" />
              <span className="text-sm">System Backup</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <ActivityIcon className="w-5 h-5" />
              <span className="text-sm">View Audit Logs</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <BarChart3Icon className="w-5 h-5" />
              <span className="text-sm">Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Admin Activity */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Admin Activity</h3>
          <div className="space-y-4">
            {recentAdminActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'system' ? 'bg-green-100' :
                  activity.type === 'security' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'user' && <UsersIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'system' && <SettingsIcon className="w-5 h-5 text-green-600" />}
                  {activity.type === 'security' && <ShieldIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'report' && <BarChart3Icon className="w-5 h-5 text-purple-600" />}
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

      {/* Admin Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Admin Profile Settings</h3>
          <div className="space-y-3">
            {adminMenuItems.map((item, index) => (
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

  // Admin Information Component
  const AdminInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Information</h2>
          <p className="text-[#64748B]">Manage your admin profile and contact information</p>
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
            <h3 className="text-lg font-semibold text-[#1E293B]">Admin Details</h3>
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
                <label className="block text-sm font-medium text-[#1E293B] mb-2">First Name</label>
                <Input
                  value={adminInfo.firstName}
                  onChange={(e) => setAdminInfo({...adminInfo, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Last Name</label>
                <Input
                  value={adminInfo.lastName}
                  onChange={(e) => setAdminInfo({...adminInfo, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Email</label>
                <Input
                  value={adminInfo.email}
                  onChange={(e) => setAdminInfo({...adminInfo, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone</label>
                <Input
                  value={adminInfo.phone}
                  onChange={(e) => setAdminInfo({...adminInfo, phone: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Address</label>
                <Input
                  value={adminInfo.address}
                  onChange={(e) => setAdminInfo({...adminInfo, address: e.target.value})}
                />
              </div>
              <div className="lg:col-span-2 flex gap-4">
                <Button 
                  className="bg-[#5B52FF] text-white"
                  onClick={handleSaveAdminInfo}
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
                <UserIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Full Name</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.firstName} {adminInfo.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Email</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Phone</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Address</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BadgeIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Employee ID</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BuildingIcon className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-sm text-[#64748B]">Department</p>
                  <p className="font-medium text-[#1E293B]">{adminInfo.department}</p>
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
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Security Settings</h2>
          <p className="text-[#64748B]">Manage admin account security and authentication</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Change Admin Password</h3>
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
                  <p className="text-sm text-[#64748B]">Receive codes via SMS for admin access</p>
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

  // Admin Permissions Component
  const AdminPermissions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Permissions</h2>
          <p className="text-[#64748B]">View your admin access levels and permissions</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Current Permissions</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {adminInfo.permissions.map((permission, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">{permission}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Access Levels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <UsersIcon className="w-5 h-5 text-[#5B52FF]" />
                <div>
                  <p className="font-medium text-[#1E293B]">User Management</p>
                  <p className="text-sm text-[#64748B]">Create, edit, and manage user accounts</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-5 h-5 text-[#5B52FF]" />
                <div>
                  <p className="font-medium text-[#1E293B]">System Configuration</p>
                  <p className="text-sm text-[#64748B]">Modify system settings and parameters</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart3Icon className="w-5 h-5 text-[#5B52FF]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Reports & Analytics</p>
                  <p className="text-sm text-[#64748B]">Generate and view system reports</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <ActivityIcon className="w-5 h-5 text-[#5B52FF]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Audit Logs</p>
                  <p className="text-sm text-[#64748B]">View system audit trails and logs</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
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
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Notification Settings</h2>
          <p className="text-[#64748B]">Manage admin alerts and system notifications</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Admin Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "systemAlerts", label: "System Alerts", description: "Critical system notifications and errors" },
              { key: "userActivityAlerts", label: "User Activity Alerts", description: "Notifications about user actions and registrations" },
              { key: "securityAlerts", label: "Security Alerts", description: "Security incidents and suspicious activities" },
              { key: "maintenanceAlerts", label: "Maintenance Alerts", description: "System maintenance and update notifications" },
              { key: "reportAlerts", label: "Report Alerts", description: "Automated report generation notifications" },
              { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
              { key: "smsNotifications", label: "SMS Notifications", description: "Receive critical alerts via SMS" },
              { key: "pushNotifications", label: "Push Notifications", description: "Browser push notifications" },
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

  // Audit & Activity Component
  const AuditActivity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Audit & Activity</h2>
          <p className="text-[#64748B]">View admin activity logs and audit trail</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Admin Activity</h3>
          <div className="space-y-4">
            {recentAdminActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'system' ? 'bg-green-100' :
                  activity.type === 'security' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'user' && <UsersIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'system' && <SettingsIcon className="w-5 h-5 text-green-600" />}
                  {activity.type === 'security' && <ShieldIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'report' && <BarChart3Icon className="w-5 h-5 text-purple-600" />}
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
    </div>
  );

  // System Settings Component
  const SystemSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">System Settings</h2>
          <p className="text-[#64748B]">Configure admin system preferences</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Admin Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Language</label>
              <select 
                value={systemSettings.language}
                onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Timezone</label>
              <select 
                value={systemSettings.timezone}
                onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
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
                value={systemSettings.autoLogout}
                onChange={(e) => setSystemSettings({...systemSettings, autoLogout: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="4 hours">4 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Session Timeout</label>
              <select 
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="8 hours">8 hours</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Support Center Component
  const AdminSupportCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Admin Support</h2>
          <p className="text-[#64748B]">Get technical support and admin resources</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCurrentView("overview")}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Admin Chat</h3>
            <p className="text-sm text-[#64748B]">Chat with technical support</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <PhoneIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Admin Hotline</h3>
            <p className="text-sm text-[#64748B]">+234 700 ADMIN</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Admin Email</h3>
            <p className="text-sm text-[#64748B]">admin@surebanker.com</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin FAQ */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Admin FAQ</h3>
          <div className="space-y-4">
            {[
              "How do I reset a user's password?",
              "How do I generate system reports?",
              "How do I manage user permissions?",
              "How do I backup system data?",
              "How do I configure system settings?"
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
      case "admin-info":
        return <AdminInformation />;
      case "security":
        return <SecuritySettings />;
      case "permissions":
        return <AdminPermissions />;
      case "notifications":
        return <NotificationSettings />;
      case "audit":
        return <AuditActivity />;
      case "system":
        return <SystemSettings />;
      case "support":
        return <AdminSupportCenter />;
      default:
        return <AdminProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
              <Badge className="bg-red-100 text-red-800 text-xs">ADMIN</Badge>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                ADMIN MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
                  onClick: () => navigate("/admin")
                },
                { 
                  name: "User Management", 
                  icon: <UsersIcon className="w-5 h-5" />,
                  onClick: () => navigate("/admin")
                },
                { 
                  name: "System Settings", 
                  icon: <SettingsIcon className="w-5 h-5" />,
                  onClick: () => navigate("/admin")
                },
                { 
                  name: "Reports", 
                  icon: <BarChart3Icon className="w-5 h-5" />,
                  onClick: () => navigate("/admin")
                },
                { 
                  name: "Audit Logs", 
                  icon: <ActivityIcon className="w-5 h-5" />,
                  onClick: () => navigate("/admin")
                },
                { 
                  name: "Profile", 
                  icon: <UserIcon className="w-5 h-5" />,
                  active: true,
                  onClick: () => navigate("/admin-profile")
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
                    <ShieldIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Admin Account</p>
                    <p className="text-sm text-gray-300">System Administrator</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#5B52FF] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white shadow-lg btn-primary">
                  Admin Resources
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
                  Admin Profile Settings
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
                    onClick={() => navigate("/admin")}
                  >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    3
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">John Admin</div>
                    <div className="text-xs text-[#64748B]">Administrator</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#5B52FF] text-white">JA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>

          {/* Admin Profile Content */}
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
              <AvatarFallback className="bg-[#5B52FF] text-white">JA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Admin Profile</h1>
              <p className="text-xs text-[#64748B]">System Administrator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                3
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
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/admin") },
              { name: "Users", icon: <UsersIcon className="w-6 h-6" />, onClick: () => navigate("/admin") },
              { name: "Reports", icon: <BarChart3Icon className="w-6 h-6" />, onClick: () => navigate("/admin") },
              { name: "Profile", icon: <UserIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/admin-profile") }
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