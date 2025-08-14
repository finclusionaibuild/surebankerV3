import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { BellIcon, SearchIcon, ArrowLeftIcon, UserIcon, SettingsIcon, ShieldIcon, HelpCircleIcon, LogOutIcon, EditIcon, ChevronRightIcon, HomeIcon, PhoneIcon, MailIcon, MapPinIcon, EyeIcon, EyeOffIcon, KeyIcon, BellRingIcon, CameraIcon, CheckCircleIcon, UsersIcon, ActivityIcon, BarChart3Icon, CodeIcon, DatabaseIcon, ServerIcon, TerminalIcon, GitBranchIcon, ZapIcon, CloudIcon, LockIcon, UnlockIcon, RefreshCwIcon, PlayIcon, PauseIcon, HopIcon as StopIcon, MonitorIcon, CpuIcon, HardDriveIcon, NetworkIcon, ShieldCheckIcon, AlertTriangleIcon, CheckCircleIcon as CheckIcon, XCircleIcon, ClockIcon, TrendingUpIcon, FileTextIcon, BookOpenIcon, MessageCircleIcon, HeadphonesIcon } from "lucide-react";

export const DeveloperProfile = (): JSX.Element => {
  const [currentView, setCurrentView] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [developerInfo, setDeveloperInfo] = useState({
    firstName: "Alex",
    lastName: "Developer",
    email: "alex.developer@surebanker.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
    employeeId: "DEV001",
    department: "Engineering",
    role: "Senior Developer",
    dateJoined: "2023-01-10",
    lastLogin: "Today, 4:20 PM",
    profileImage: null,
    developerLevel: "Level 4 - Senior",
    specializations: ["API Development", "Frontend Engineering", "Database Design", "DevOps", "Security Implementation"],
    programmingLanguages: ["JavaScript", "TypeScript", "Python", "Go", "SQL"],
    frameworks: ["React", "Node.js", "Express", "PostgreSQL", "Docker"]
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    biometricEnabled: true,
    smsNotifications: true,
    emailNotifications: true,
    developerPin: "****",
    apiKeyAccess: true,
    sshKeyAccess: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    deploymentAlerts: true,
    errorAlerts: true,
    performanceAlerts: true,
    securityAlerts: true,
    apiStatusAlerts: true,
    buildAlerts: true,
    codeReviewAlerts: true
  });

  const [developerSettings, setDeveloperSettings] = useState({
    language: "English",
    timezone: "Africa/Lagos",
    theme: "Dark",
    autoLogout: "60 minutes",
    codeEditor: "VS Code",
    sessionTimeout: "4 hours",
    debugMode: true,
    apiEnvironment: "Development"
  });

  const developerMenuItems = [
    { 
      id: "developer-info", 
      icon: <CodeIcon className="w-5 h-5" />, 
      title: "Developer Information", 
      description: "Update developer profile and technical skills",
      action: () => setCurrentView("developer-info")
    },
    { 
      id: "security", 
      icon: <ShieldIcon className="w-5 h-5" />, 
      title: "Security & Access", 
      description: "API keys, SSH access, and developer authentication",
      action: () => setCurrentView("security")
    },
    { 
      id: "permissions", 
      icon: <KeyIcon className="w-5 h-5" />, 
      title: "Developer Permissions", 
      description: "View development access levels and API permissions",
      action: () => setCurrentView("permissions")
    },
    { 
      id: "notifications", 
      icon: <BellIcon className="w-5 h-5" />, 
      title: "Development Notifications", 
      description: "Build alerts, deployment notifications, and error alerts",
      action: () => setCurrentView("notifications")
    },
    { 
      id: "environment", 
      icon: <ServerIcon className="w-5 h-5" />, 
      title: "Development Environment", 
      description: "Configure development tools and environment settings",
      action: () => setCurrentView("environment")
    },
    { 
      id: "api-management", 
      icon: <DatabaseIcon className="w-5 h-5" />, 
      title: "API Management", 
      description: "Manage API keys, endpoints, and documentation",
      action: () => setCurrentView("api-management")
    },
    { 
      id: "developer-help", 
      icon: <HelpCircleIcon className="w-5 h-5" />, 
      title: "Developer Support", 
      description: "Technical documentation and developer resources",
      action: () => setCurrentView("developer-help")
    },
  ];

  const developerStats = [
    { label: "APIs Developed", value: "47", color: "text-[#3B82F6]", icon: <DatabaseIcon className="w-5 h-5" /> },
    { label: "Code Quality", value: "98.5%", color: "text-green-600", icon: <CheckIcon className="w-5 h-5" /> },
    { label: "Uptime", value: "99.9%", color: "text-green-600", icon: <MonitorIcon className="w-5 h-5" /> },
    { label: "Performance", value: "Excellent", color: "text-green-600", icon: <TrendingUpIcon className="w-5 h-5" /> },
  ];

  const recentDeveloperActivity = [
    { action: "API Endpoint Created", details: "Created new payment processing endpoint", timestamp: "30 minutes ago", type: "development" },
    { action: "Security Patch Deployed", details: "Applied security update to authentication service", timestamp: "2 hours ago", type: "security" },
    { action: "Database Migration", details: "Migrated user data to new schema", timestamp: "4 hours ago", type: "database" },
    { action: "Performance Optimization", details: "Optimized API response times by 40%", timestamp: "1 day ago", type: "optimization" }
  ];

  const apiKeys = [
    { name: "Production API", key: "pk_live_****", status: "Active", lastUsed: "2 hours ago", permissions: "Full Access" },
    { name: "Development API", key: "pk_dev_****", status: "Active", lastUsed: "30 minutes ago", permissions: "Development Only" },
    { name: "Testing API", key: "pk_test_****", status: "Active", lastUsed: "1 day ago", permissions: "Testing Environment" }
  ];

  const handleSaveDeveloperInfo = () => {
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

  // Developer Profile Overview Component
  const DeveloperProfileOverview = () => (
    <div className="space-y-6">
      {/* Developer Header */}
      <Card className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  AD
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-[#3B82F6] hover:bg-gray-100"
              >
                <CameraIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {developerInfo.firstName} {developerInfo.lastName}
              </h2>
              <p className="text-white/80 mb-3">{developerInfo.email}</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30">
                  {developerInfo.role}
                </Badge>
                <Badge className="bg-green-500/20 text-green-200 border-green-400/30">
                  {developerInfo.developerLevel}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  ID: {developerInfo.employeeId}
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

      {/* Developer Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {developerStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('600', '100').replace('[#3B82F6]', 'blue-100')} rounded-lg flex items-center justify-center mx-auto mb-3`}>
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

      {/* Quick Developer Actions */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Developer Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center gap-2 bg-[#3B82F6] text-white">
              <CodeIcon className="w-5 h-5" />
              <span className="text-sm">API Console</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <DatabaseIcon className="w-5 h-5" />
              <span className="text-sm">Database</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <MonitorIcon className="w-5 h-5" />
              <span className="text-sm">Monitoring</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
              <FileTextIcon className="w-5 h-5" />
              <span className="text-sm">Documentation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Developer Activity */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Recent Development Activity</h3>
          <div className="space-y-4">
            {recentDeveloperActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'development' ? 'bg-blue-100' :
                  activity.type === 'security' ? 'bg-red-100' :
                  activity.type === 'database' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'development' && <CodeIcon className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'security' && <ShieldIcon className="w-5 h-5 text-red-600" />}
                  {activity.type === 'database' && <DatabaseIcon className="w-5 h-5 text-green-600" />}
                  {activity.type === 'optimization' && <TrendingUpIcon className="w-5 h-5 text-purple-600" />}
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

      {/* Developer Settings Menu */}
      <Card className="card-no-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Developer Profile Settings</h3>
          <div className="space-y-3">
            {developerMenuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-[#F8F9FF] rounded-lg cursor-pointer transition-colors"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#3B82F6]">
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

  // Developer Information Component
  const DeveloperInformation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Developer Information</h2>
          <p className="text-[#64748B]">Manage your developer profile and technical skills</p>
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
              <CodeIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Full Name</p>
                <p className="font-medium text-[#1E293B]">{developerInfo.firstName} {developerInfo.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Email</p>
                <p className="font-medium text-[#1E293B]">{developerInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Phone</p>
                <p className="font-medium text-[#1E293B]">{developerInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5 text-[#64748B]" />
              <div>
                <p className="text-sm text-[#64748B]">Developer Level</p>
                <p className="font-medium text-[#1E293B]">{developerInfo.developerLevel}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Technical Specializations</h3>
            <div className="space-y-3">
              {developerInfo.specializations.map((specialization, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">{specialization}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-no-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Programming Languages</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {developerInfo.programmingLanguages.map((language, index) => (
                <Badge key={index} className="bg-green-100 text-green-800">
                  {language}
                </Badge>
              ))}
            </div>
            <h4 className="text-md font-semibold text-[#1E293B] mb-3">Frameworks & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {developerInfo.frameworks.map((framework, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-800">
                  {framework}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Security & Access Component
  const SecurityAccess = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Security & Access</h2>
          <p className="text-[#64748B]">Manage developer security and API access</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Developer Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">Two-Factor Authentication</p>
                  <p className="text-sm text-[#64748B]">Enhanced security for developer access</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#F8F9FF] rounded-lg">
              <div className="flex items-center gap-3">
                <KeyIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-[#1E293B]">SSH Key Access</p>
                  <p className="text-sm text-[#64748B]">Secure server access with SSH keys</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Configured</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // API Management Component
  const APIManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">API Management</h2>
          <p className="text-[#64748B]">Manage API keys, endpoints, and documentation</p>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1E293B]">API Keys</h3>
            <Button className="bg-[#3B82F6] text-white">
              <KeyIcon className="w-4 h-4 mr-2" />
              Generate New Key
            </Button>
          </div>
          <div className="space-y-4">
            {apiKeys.map((api, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <DatabaseIcon className="w-5 h-5 text-[#3B82F6]" />
                  <div>
                    <p className="font-medium text-[#1E293B]">{api.name}</p>
                    <p className="text-sm text-[#64748B] font-mono">{api.key}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={api.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {api.status}
                  </Badge>
                  <p className="text-sm text-[#64748B] mt-1">Last used: {api.lastUsed}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Developer Permissions Component
  const DeveloperPermissions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Developer Permissions</h2>
          <p className="text-[#64748B]">View your development access levels and API permissions</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Development Access Levels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CodeIcon className="w-5 h-5 text-[#3B82F6]" />
                <div>
                  <p className="font-medium text-[#1E293B]">API Development</p>
                  <p className="text-sm text-[#64748B]">Create and modify API endpoints</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <DatabaseIcon className="w-5 h-5 text-[#3B82F6]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Database Access</p>
                  <p className="text-sm text-[#64748B]">Read/write access to development databases</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <ServerIcon className="w-5 h-5 text-[#3B82F6]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Server Management</p>
                  <p className="text-sm text-[#64748B]">Deploy and manage development servers</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Full Access</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Development Environment Component
  const DevelopmentEnvironment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Development Environment</h2>
          <p className="text-[#64748B]">Configure development tools and environment settings</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Environment Configuration</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Code Editor</label>
              <select 
                value={developerSettings.codeEditor}
                onChange={(e) => setDeveloperSettings({...developerSettings, codeEditor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="VS Code">Visual Studio Code</option>
                <option value="WebStorm">WebStorm</option>
                <option value="Sublime Text">Sublime Text</option>
                <option value="Vim">Vim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">API Environment</label>
              <select 
                value={developerSettings.apiEnvironment}
                onChange={(e) => setDeveloperSettings({...developerSettings, apiEnvironment: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Development">Development</option>
                <option value="Staging">Staging</option>
                <option value="Production">Production</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <TerminalIcon className="w-5 h-5 text-[#3B82F6]" />
                <div>
                  <p className="font-medium text-[#1E293B]">Debug Mode</p>
                  <p className="text-sm text-[#64748B]">Enable detailed logging and debugging</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={developerSettings.debugMode}
                  onChange={(e) => setDeveloperSettings({...developerSettings, debugMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
              </label>
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
          <h2 className="text-2xl font-bold text-[#1E293B]">Development Notifications</h2>
          <p className="text-[#64748B]">Manage development alerts and system notifications</p>
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
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Developer Alert Preferences</h3>
          <div className="space-y-4">
            {[
              { key: "deploymentAlerts", label: "Deployment Alerts", description: "Notifications for code deployments and releases" },
              { key: "errorAlerts", label: "Error Alerts", description: "Critical error and exception notifications" },
              { key: "performanceAlerts", label: "Performance Alerts", description: "System performance and optimization alerts" },
              { key: "securityAlerts", label: "Security Alerts", description: "Security vulnerabilities and patches" },
              { key: "apiStatusAlerts", label: "API Status Alerts", description: "API uptime and status notifications" },
              { key: "buildAlerts", label: "Build Alerts", description: "Build success/failure notifications" },
              { key: "codeReviewAlerts", label: "Code Review Alerts", description: "Code review requests and approvals" },
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Developer Help Center Component
  const DeveloperHelpCenter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Developer Support</h2>
          <p className="text-[#64748B]">Technical documentation and developer resources</p>
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
            <MessageCircleIcon className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Developer Chat</h3>
            <p className="text-sm text-[#64748B]">Chat with senior developers</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <BookOpenIcon className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">API Documentation</h3>
            <p className="text-sm text-[#64748B]">Complete API reference</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow card-no-shadow">
          <CardContent className="p-6 text-center">
            <MailIcon className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Tech Support</h3>
            <p className="text-sm text-[#64748B]">dev-support@surebanker.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "developer-info":
        return <DeveloperInformation />;
      case "security":
        return <SecurityAccess />;
      case "permissions":
        return <DeveloperPermissions />;
      case "notifications":
        return <NotificationSettings />;
      case "environment":
        return <DevelopmentEnvironment />;
      case "api-management":
        return <APIManagement />;
      case "developer-help":
        return <DeveloperHelpCenter />;
      default:
        return <DeveloperProfileOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Developer Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-8 w-auto object-contain"
              />
              <Badge className="bg-blue-100 text-blue-800 text-xs">DEVELOPER</Badge>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                DEVELOPER MENU
              </div>
              {[
                { 
                  name: "Dashboard", 
                  icon: <HomeIcon className="w-5 h-5" />, 
                  onClick: () => navigate("/developer-dashboard")
                },
                { 
                  name: "API Management", 
                  icon: <DatabaseIcon className="w-5 h-5" />,
                  onClick: () => navigate("/developer-dashboard")
                },
                { 
                  name: "Sandbox Environment", 
                  icon: <ServerIcon className="w-5 h-5" />,
                  onClick: () => navigate("/developer-dashboard")
                },
                { 
                  name: "Documentation", 
                  icon: <BookOpenIcon className="w-5 h-5" />,
                  onClick: () => navigate("/developer-dashboard")
                },
                { 
                  name: "Profile", 
                  icon: <UserIcon className="w-5 h-5" />,
                  active: true,
                  onClick: () => navigate("/developer-profile")
                }
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    item.active
                      ? "bg-[#3B82F6] text-white shadow-lg"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#3B82F6]"
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
            <Card className="bg-gradient-to-br from-[#3B82F6] via-[#1D4ED8] to-[#3B82F6] text-white overflow-hidden relative card-no-shadow">
              <CardContent className="p-4 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1D4ED8] to-[#1E40AF] rounded-full flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Developer Account</p>
                    <p className="text-sm text-gray-300">API Access</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] hover:from-[#1E3A8A] hover:to-[#1E3A8A] text-white shadow-lg btn-primary">
                  Developer Resources
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
                  <CodeIcon className="w-6 h-6 text-[#3B82F6]" />
                  Developer Profile
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
                    onClick={() => navigate("/developer-dashboard")}
                  >
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                    7
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#1E293B]">Alex Developer</div>
                    <div className="text-xs text-[#64748B]">Senior Developer</div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#3B82F6] text-white">AD</AvatarFallback>
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
              <AvatarFallback className="bg-[#3B82F6] text-white">AD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-[#1E293B]">Developer Profile</h1>
              <p className="text-xs text-[#64748B]">Senior Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BellIcon className="w-6 h-6 text-[#64748B]" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                7
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
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, onClick: () => navigate("/developer-dashboard") },
              { name: "API", icon: <DatabaseIcon className="w-6 h-6" />, onClick: () => navigate("/developer-dashboard") },
              { name: "Docs", icon: <BookOpenIcon className="w-6 h-6" />, onClick: () => navigate("/developer-dashboard") },
              { name: "Profile", icon: <CodeIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/developer-profile") }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={item.onClick}
              >
                <div className={`${item.active ? 'text-[#3B82F6]' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${item.active ? 'text-[#3B82F6] font-medium' : 'text-gray-400'}`}>
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