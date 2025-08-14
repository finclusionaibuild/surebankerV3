import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountTypeSwitcher } from '../../components/ui/account-type-switcher';
import { ProfileDropdown } from '../../components/ui/profile-dropdown';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { 
  CodeIcon, 
  KeyIcon, 
  PlayIcon, 
  WebhookIcon, 
  ShieldIcon, 
  BookOpenIcon, 
  ActivityIcon, 
  BugIcon,
  SettingsIcon,
  DatabaseIcon,
  MonitorIcon,
  TerminalIcon,
  GitBranchIcon,
  ZapIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CopyIcon,
  RefreshCwIcon,
  CheckIcon,
  XIcon,
  AlertTriangleIcon,
  InfoIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  UserIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
  SearchIcon,
  FilterIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  FileTextIcon,
  ServerIcon,
  CloudIcon,
  WifiIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  RotateCcwIcon,
  SendIcon,
  MessageSquareIcon,
  BellIcon,
  HomeIcon,
  BarChart3Icon,
  CreditCardIcon
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: 'sandbox' | 'production';
  permissions: string[];
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
  usage: {
    today: number;
    month: number;
    limit: number;
  };
}

interface WebhookEvent {
  id: string;
  event: string;
  url: string;
  status: 'success' | 'failed' | 'pending' | 'retrying';
  timestamp: string;
  payload: any;
  response: any;
  attempts: number;
  nextRetry?: string;
}

interface OAuthClient {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  scopes: string[];
  grantTypes: string[];
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
  usage: {
    totalRequests: number;
    activeTokens: number;
  };
}

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  endpoint: string;
  statusCode: number;
  message: string;
  stackTrace: string;
  userId?: string;
  resolved: boolean;
  tags: string[];
}

interface MockDataTemplate {
  id: string;
  name: string;
  type: 'users' | 'transactions' | 'accounts' | 'cards' | 'payments';
  description: string;
  fields: string[];
  sampleCount: number;
}

export const DeveloperDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('overview');
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});
  const [showClientSecret, setShowClientSecret] = useState<{ [key: string]: boolean }>({});
  
  // API Management State
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Main API Key',
      key: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
      environment: 'sandbox',
      permissions: ['read', 'write', 'admin'],
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      status: 'active',
      usage: { today: 1247, month: 45230, limit: 100000 }
    },
    {
      id: '2',
      name: 'Production Key',
      key: 'sk_live_51HqLyjWDarjtT1zdp7dc4eC39',
      environment: 'production',
      permissions: ['read', 'write'],
      created: '2024-01-10',
      lastUsed: '1 day ago',
      status: 'active',
      usage: { today: 523, month: 12450, limit: 50000 }
    }
  ]);

  // Webhook State
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([
    {
      id: '1',
      event: 'payment.completed',
      url: 'https://api.example.com/webhooks',
      status: 'success',
      timestamp: '2024-01-15 14:30:23',
      payload: { amount: 1000, currency: 'NGN', status: 'completed' },
      response: { status: 200, message: 'OK' },
      attempts: 1
    },
    {
      id: '2',
      event: 'transfer.failed',
      url: 'https://api.example.com/webhooks',
      status: 'failed',
      timestamp: '2024-01-15 14:25:15',
      payload: { amount: 5000, currency: 'NGN', error: 'insufficient_funds' },
      response: { status: 500, message: 'Internal Server Error' },
      attempts: 3,
      nextRetry: '2024-01-15 14:35:15'
    }
  ]);

  // OAuth Clients State
  const [oauthClients, setOauthClients] = useState<OAuthClient[]>([
    {
      id: '1',
      name: 'Mobile App',
      clientId: 'client_1234567890',
      clientSecret: 'secret_abcdefghijklmnop',
      redirectUris: ['https://app.example.com/callback'],
      scopes: ['read', 'write', 'payments'],
      grantTypes: ['authorization_code', 'refresh_token'],
      created: '2024-01-10',
      lastUsed: '2 hours ago',
      status: 'active',
      usage: { totalRequests: 15420, activeTokens: 234 }
    }
  ]);

  // Error Logs State
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:23',
      level: 'error',
      endpoint: '/api/v1/payments',
      statusCode: 500,
      message: 'Database connection timeout',
      stackTrace: 'Error: Connection timeout\n  at Database.connect()\n  at PaymentService.process()',
      userId: 'user_123',
      resolved: false,
      tags: ['database', 'timeout', 'payments']
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:15',
      level: 'warning',
      endpoint: '/api/v1/auth',
      statusCode: 429,
      message: 'Rate limit exceeded',
      stackTrace: 'Warning: Rate limit exceeded for user\n  at RateLimiter.check()',
      userId: 'user_456',
      resolved: true,
      tags: ['rate-limit', 'auth']
    }
  ]);

  // Mock Data Templates
  const [mockDataTemplates] = useState<MockDataTemplate[]>([
    {
      id: '1',
      name: 'User Profiles',
      type: 'users',
      description: 'Generate realistic user profile data',
      fields: ['name', 'email', 'phone', 'address', 'kyc_level'],
      sampleCount: 100
    },
    {
      id: '2',
      name: 'Transaction Records',
      type: 'transactions',
      description: 'Generate transaction history data',
      fields: ['amount', 'currency', 'status', 'timestamp', 'reference'],
      sampleCount: 500
    },
    {
      id: '3',
      name: 'Bank Accounts',
      type: 'accounts',
      description: 'Generate bank account information',
      fields: ['account_number', 'bank_name', 'balance', 'type'],
      sampleCount: 50
    }
  ]);

  // Form States
  const [newApiKeyForm, setNewApiKeyForm] = useState({
    name: '',
    environment: 'sandbox' as 'sandbox' | 'production',
    permissions: [] as string[]
  });

  const [newOAuthClientForm, setNewOAuthClientForm] = useState({
    name: '',
    redirectUris: [''],
    scopes: [] as string[],
    grantTypes: ['authorization_code']
  });

  const [webhookTestForm, setWebhookTestForm] = useState({
    url: '',
    event: 'payment.completed',
    payload: '{\n  "amount": 1000,\n  "currency": "NGN",\n  "status": "completed"\n}'
  });

  const [apiTestForm, setApiTestForm] = useState({
    endpoint: '/api/v1/accounts',
    method: 'GET',
    headers: '{\n  "Authorization": "Bearer sk_test_...",\n  "Content-Type": "application/json"\n}',
    body: ''
  });

  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Statistics
  const devStats = {
    totalApiCalls: 67890,
    successRate: 99.2,
    totalWebhooks: 1234,
    sandboxRequests: 45670,
    activeKeys: apiKeys.filter(k => k.status === 'active').length,
    totalErrors: errorLogs.filter(e => !e.resolved).length
  };

  // Utility Functions
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const toggleClientSecretVisibility = (clientId: string) => {
    setShowClientSecret(prev => ({ ...prev, [clientId]: !prev[clientId] }));
  };

  const generateApiKey = () => {
    if (!newApiKeyForm.name) return;
    
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newApiKeyForm.name,
      key: `sk_${newApiKeyForm.environment}_${Math.random().toString(36).substring(2, 15)}`,
      environment: newApiKeyForm.environment,
      permissions: newApiKeyForm.permissions,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active',
      usage: { today: 0, month: 0, limit: newApiKeyForm.environment === 'production' ? 50000 : 100000 }
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewApiKeyForm({ name: '', environment: 'sandbox', permissions: [] });
  };

  const revokeApiKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    ));
  };

  const createOAuthClient = () => {
    if (!newOAuthClientForm.name) return;
    
    const newClient: OAuthClient = {
      id: Date.now().toString(),
      name: newOAuthClientForm.name,
      clientId: `client_${Math.random().toString(36).substring(2, 15)}`,
      clientSecret: `secret_${Math.random().toString(36).substring(2, 25)}`,
      redirectUris: newOAuthClientForm.redirectUris.filter(uri => uri.trim()),
      scopes: newOAuthClientForm.scopes,
      grantTypes: newOAuthClientForm.grantTypes,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active',
      usage: { totalRequests: 0, activeTokens: 0 }
    };
    
    setOauthClients([...oauthClients, newClient]);
    setNewOAuthClientForm({ name: '', redirectUris: [''], scopes: [], grantTypes: ['authorization_code'] });
  };

  const sendTestWebhook = () => {
    if (!webhookTestForm.url) return;
    
    setIsLoading(true);
    
    // Simulate webhook sending
    setTimeout(() => {
      const newEvent: WebhookEvent = {
        id: Date.now().toString(),
        event: webhookTestForm.event,
        url: webhookTestForm.url,
        status: Math.random() > 0.2 ? 'success' : 'failed',
        timestamp: new Date().toISOString(),
        payload: JSON.parse(webhookTestForm.payload),
        response: Math.random() > 0.2 ? 
          { status: 200, message: 'OK' } : 
          { status: 500, message: 'Internal Server Error' },
        attempts: 1
      };
      
      setWebhookEvents([newEvent, ...webhookEvents]);
      setIsLoading(false);
    }, 2000);
  };

  const testApiEndpoint = () => {
    if (!apiTestForm.endpoint) return;
    
    setIsLoading(true);
    
    // Simulate API testing
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': '999',
          'X-Response-Time': '45ms'
        },
        data: {
          success: true,
          data: apiTestForm.endpoint.includes('accounts') ? 
            [{ id: '123', name: 'John Doe', balance: 50000 }] :
            { message: 'API endpoint tested successfully' },
          timestamp: new Date().toISOString()
        }
      };
      
      setTestResults(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockData = (template: MockDataTemplate) => {
    setIsLoading(true);
    
    // Simulate mock data generation
    setTimeout(() => {
      const mockData = Array.from({ length: template.sampleCount }, (_, i) => {
        const baseData: any = { id: i + 1 };
        
        template.fields.forEach(field => {
          switch (field) {
            case 'name':
              baseData[field] = `User ${i + 1}`;
              break;
            case 'email':
              baseData[field] = `user${i + 1}@example.com`;
              break;
            case 'amount':
              baseData[field] = Math.floor(Math.random() * 100000) + 1000;
              break;
            case 'balance':
              baseData[field] = Math.floor(Math.random() * 1000000) + 10000;
              break;
            default:
              baseData[field] = `Sample ${field} ${i + 1}`;
          }
        });
        
        return baseData;
      });
      
      setTestResults({
        template: template.name,
        count: template.sampleCount,
        data: mockData.slice(0, 5), // Show first 5 items
        downloadUrl: `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(mockData, null, 2))}`
      });
      setIsLoading(false);
    }, 2000);
  };

  const resolveError = (errorId: string) => {
    setErrorLogs(errorLogs.map(log => 
      log.id === errorId ? { ...log, resolved: true } : log
    ));
  };

  // Overview Dashboard
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Developer Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">API Calls</p>
                <p className="text-2xl font-bold text-gray-900">{devStats.totalApiCalls.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{devStats.successRate}%</p>
                <p className="text-xs text-green-600">+0.3% this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <WebhookIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Webhooks</p>
                <p className="text-2xl font-bold text-gray-900">{devStats.totalWebhooks}</p>
                <p className="text-xs text-blue-600">24 today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sandbox</p>
                <p className="text-2xl font-bold text-gray-900">{devStats.sandboxRequests.toLocaleString()}</p>
                <p className="text-xs text-orange-600">Testing active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => setCurrentView('api-management')}
              className="h-20 flex flex-col items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <KeyIcon className="w-6 h-6" />
              <span>Generate API Key</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('sandbox')}
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <PlayIcon className="w-6 h-6" />
              <span>Test API</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('webhooks')}
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <WebhookIcon className="w-6 h-6" />
              <span>Send Webhook</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('documentation')}
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
            >
              <BookOpenIcon className="w-6 h-6" />
              <span>View Docs</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Environment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Environment Status</h3>
              <Badge className="bg-green-100 text-green-800">All Systems Operational</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Sandbox API</span>
                </div>
                <span className="text-sm text-gray-600">99.9% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Production API</span>
                </div>
                <span className="text-sm text-gray-600">99.8% uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Webhook Service</span>
                </div>
                <span className="text-sm text-gray-600">100% uptime</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <KeyIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">API Key Created</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Webhook Delivered</p>
                  <p className="text-xs text-gray-600">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <PlayIcon className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Sandbox Test Run</p>
                  <p className="text-xs text-gray-600">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // API Management Page
  const ApiManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Management</h2>
          <p className="text-gray-600">Manage your API keys and monitor usage</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as 'sandbox' | 'production')}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="sandbox">Sandbox</option>
            <option value="production">Production</option>
          </select>
          <Badge className={environment === 'sandbox' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
            {environment.charAt(0).toUpperCase() + environment.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Create New API Key */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New API Key</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Input
              placeholder="API Key Name"
              value={newApiKeyForm.name}
              onChange={(e) => setNewApiKeyForm({...newApiKeyForm, name: e.target.value})}
            />
            <select 
              value={newApiKeyForm.environment}
              onChange={(e) => setNewApiKeyForm({...newApiKeyForm, environment: e.target.value as 'sandbox' | 'production'})}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </select>
            <Button onClick={generateApiKey} className="bg-indigo-600 text-white">
              <PlusIcon className="w-4 h-4 mr-2" />
              Generate Key
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Permissions:</p>
            <div className="flex gap-2">
              {['read', 'write', 'admin'].map(permission => (
                <label key={permission} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newApiKeyForm.permissions.includes(permission)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewApiKeyForm({
                          ...newApiKeyForm,
                          permissions: [...newApiKeyForm.permissions, permission]
                        });
                      } else {
                        setNewApiKeyForm({
                          ...newApiKeyForm,
                          permissions: newApiKeyForm.permissions.filter(p => p !== permission)
                        });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your API Keys</h3>
          <div className="space-y-4">
            {apiKeys.filter(key => key.environment === environment).map((key) => (
              <div key={key.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{key.name}</h4>
                    <p className="text-sm text-gray-600">Created: {key.created} • Last used: {key.lastUsed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {key.status}
                    </Badge>
                    {key.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => revokeApiKey(key.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <code className="bg-gray-100 px-3 py-2 rounded font-mono text-sm flex-1">
                    {showApiKey[key.id] ? key.key : key.key.substring(0, 12) + '...'}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleApiKeyVisibility(key.id)}
                  >
                    {showApiKey[key.id] ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(key.key)}
                  >
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Today</p>
                    <p className="font-semibold">{key.usage.today.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(key.usage.today / key.usage.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">This Month</p>
                    <p className="font-semibold">{key.usage.month.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${(key.usage.month / key.usage.limit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Limit</p>
                    <p className="font-semibold">{key.usage.limit.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">per month</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-1">Permissions:</p>
                  <div className="flex gap-2">
                    {key.permissions.map(permission => (
                      <Badge key={permission} className="bg-gray-100 text-gray-800 text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Sandbox Environment Page
  const SandboxEnvironment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sandbox Environment</h2>
          <p className="text-gray-600">Test your integrations safely</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-orange-100 text-orange-800">Sandbox Mode</Badge>
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcwIcon className="w-4 h-4" />
            Reset Environment
          </Button>
        </div>
      </div>

      {/* Environment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ServerIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Environment</p>
                <p className="text-lg font-bold text-green-600">Healthy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Test Data</p>
                <p className="text-lg font-bold text-blue-600">1,247 Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">API Calls</p>
                <p className="text-lg font-bold text-purple-600">45,670</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Testing */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Endpoint Testing</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
                <select 
                  value={apiTestForm.endpoint}
                  onChange={(e) => setApiTestForm({...apiTestForm, endpoint: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="/api/v1/accounts">GET /api/v1/accounts</option>
                  <option value="/api/v1/transactions">GET /api/v1/transactions</option>
                  <option value="/api/v1/payments">POST /api/v1/payments</option>
                  <option value="/api/v1/transfers">POST /api/v1/transfers</option>
                  <option value="/api/v1/webhooks">POST /api/v1/webhooks</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headers</label>
                <textarea
                  value={apiTestForm.headers}
                  onChange={(e) => setApiTestForm({...apiTestForm, headers: e.target.value})}
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>

              {apiTestForm.endpoint.includes('POST') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Body</label>
                  <textarea
                    value={apiTestForm.body}
                    onChange={(e) => setApiTestForm({...apiTestForm, body: e.target.value})}
                    placeholder='{\n  "amount": 1000,\n  "currency": "NGN"\n}'
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                </div>
              )}

              <Button 
                onClick={testApiEndpoint}
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white"
              >
                {isLoading ? (
                  <>
                    <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Test Endpoint
                  </>
                )}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Response</label>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-80 overflow-auto font-mono text-sm">
                {testResults ? (
                  <pre>{JSON.stringify(testResults, null, 2)}</pre>
                ) : (
                  <p className="text-gray-500">Run a test to see the response here...</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mock Data Generator */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mock Data Generator</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {mockDataTemplates.map((template) => (
              <Card key={template.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Fields:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map(field => (
                        <Badge key={field} className="bg-gray-100 text-gray-800 text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={() => generateMockData(template)}
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white"
                  >
                    Generate {template.sampleCount} Records
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Webhook Tester Page
  const WebhookTester = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Webhook Tester</h2>
          <p className="text-gray-600">Test and monitor webhook deliveries</p>
        </div>
      </div>

      {/* Webhook Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <WebhookIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{webhookEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">
                  {webhookEvents.filter(e => e.status === 'success').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">
                  {webhookEvents.filter(e => e.status === 'failed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {webhookEvents.filter(e => e.status === 'pending' || e.status === 'retrying').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Test Webhook */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Test Webhook</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <Input
                  placeholder="https://your-app.com/webhooks"
                  value={webhookTestForm.url}
                  onChange={(e) => setWebhookTestForm({...webhookTestForm, url: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select 
                  value={webhookTestForm.event}
                  onChange={(e) => setWebhookTestForm({...webhookTestForm, event: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="payment.completed">payment.completed</option>
                  <option value="payment.failed">payment.failed</option>
                  <option value="transfer.completed">transfer.completed</option>
                  <option value="transfer.failed">transfer.failed</option>
                  <option value="account.created">account.created</option>
                  <option value="kyc.completed">kyc.completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payload</label>
                <textarea
                  value={webhookTestForm.payload}
                  onChange={(e) => setWebhookTestForm({...webhookTestForm, payload: e.target.value})}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
              </div>

              <Button 
                onClick={sendTestWebhook}
                disabled={isLoading || !webhookTestForm.url}
                className="w-full bg-purple-600 text-white"
              >
                {isLoading ? (
                  <>
                    <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Send Test Webhook
                  </>
                )}
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Response</label>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-auto font-mono text-sm">
                <pre>{`{
  "status": 200,
  "message": "Webhook received successfully",
  "timestamp": "${new Date().toISOString()}",
  "event_id": "evt_${Math.random().toString(36).substring(2, 15)}"
}`}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Events History */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Webhook Events</h3>
          <div className="space-y-3">
            {webhookEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.status === 'success' ? 'bg-green-500' :
                      event.status === 'failed' ? 'bg-red-500' :
                      event.status === 'retrying' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <span className="font-medium">{event.event}</span>
                    <Badge className={`${
                      event.status === 'success' ? 'bg-green-100 text-green-800' :
                      event.status === 'failed' ? 'bg-red-100 text-red-800' :
                      event.status === 'retrying' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">{event.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{event.url}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Attempts: {event.attempts}</p>
                    {event.nextRetry && (
                      <p className="text-gray-600">Next retry: {event.nextRetry}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600">
                      Response: {event.response?.status} {event.response?.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // OAuth Management Page
  const OAuthManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">OAuth Client Management</h2>
          <p className="text-gray-600">Manage OAuth applications and tokens</p>
        </div>
      </div>

      {/* OAuth Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{oauthClients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-green-600">
                  {oauthClients.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-purple-600">
                  {oauthClients.reduce((sum, c) => sum + c.usage.totalRequests, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create OAuth Client */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create OAuth Client</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Name</label>
                <Input
                  placeholder="My App"
                  value={newOAuthClientForm.name}
                  onChange={(e) => setNewOAuthClientForm({...newOAuthClientForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grant Types</label>
                <div className="flex gap-2">
                  {['authorization_code', 'client_credentials', 'refresh_token'].map(type => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newOAuthClientForm.grantTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewOAuthClientForm({
                              ...newOAuthClientForm,
                              grantTypes: [...newOAuthClientForm.grantTypes, type]
                            });
                          } else {
                            setNewOAuthClientForm({
                              ...newOAuthClientForm,
                              grantTypes: newOAuthClientForm.grantTypes.filter(t => t !== type)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-xs">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Redirect URIs</label>
              {newOAuthClientForm.redirectUris.map((uri, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="https://your-app.com/callback"
                    value={uri}
                    onChange={(e) => {
                      const newUris = [...newOAuthClientForm.redirectUris];
                      newUris[index] = e.target.value;
                      setNewOAuthClientForm({...newOAuthClientForm, redirectUris: newUris});
                    }}
                  />
                  {index === newOAuthClientForm.redirectUris.length - 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setNewOAuthClientForm({
                        ...newOAuthClientForm,
                        redirectUris: [...newOAuthClientForm.redirectUris, '']
                      })}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scopes</label>
              <div className="flex gap-2">
                {['read', 'write', 'payments', 'transfers', 'accounts'].map(scope => (
                  <label key={scope} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newOAuthClientForm.scopes.includes(scope)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewOAuthClientForm({
                            ...newOAuthClientForm,
                            scopes: [...newOAuthClientForm.scopes, scope]
                          });
                        } else {
                          setNewOAuthClientForm({
                            ...newOAuthClientForm,
                            scopes: newOAuthClientForm.scopes.filter(s => s !== scope)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{scope}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={createOAuthClient} className="bg-indigo-600 text-white">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create OAuth Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* OAuth Clients List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">OAuth Clients</h3>
          <div className="space-y-4">
            {oauthClients.map((client) => (
              <div key={client.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">Created: {client.created} • Last used: {client.lastUsed}</p>
                  </div>
                  <Badge className={client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {client.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Client ID</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">{client.clientId}</code>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(client.clientId)}>
                        <CopyIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Client Secret</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                        {showClientSecret[client.id] ? client.clientSecret : '••••••••••••••••'}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleClientSecretVisibility(client.id)}
                      >
                        {showClientSecret[client.id] ? <EyeOffIcon className="w-3 h-3" /> : <EyeIcon className="w-3 h-3" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(client.clientSecret)}>
                        <CopyIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Total Requests</p>
                    <p className="font-semibold">{client.usage.totalRequests.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Active Tokens</p>
                    <p className="font-semibold">{client.usage.activeTokens}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Scopes:</p>
                    <div className="flex gap-1">
                      {client.scopes.map(scope => (
                        <Badge key={scope} className="bg-blue-100 text-blue-800 text-xs">{scope}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // API Documentation Page
  const ApiDocumentation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
          <p className="text-gray-600">Interactive API reference and testing</p>
        </div>
        <Button className="bg-indigo-600 text-white">
          <ExternalLinkIcon className="w-4 h-4 mr-2" />
          Open in New Tab
        </Button>
      </div>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <PlayCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Getting Started</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Quick start guide and authentication</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Authentication methods</li>
              <li>• Making your first API call</li>
              <li>• Error handling</li>
              <li>• Rate limiting</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">API Reference</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Complete endpoint documentation</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Accounts API</li>
              <li>• Payments API</li>
              <li>• Transfers API</li>
              <li>• Webhooks API</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Code Examples</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Ready-to-use code snippets</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• JavaScript/Node.js</li>
              <li>• Python</li>
              <li>• PHP</li>
              <li>• cURL</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Interactive API Explorer */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive API Explorer</h3>
          
          <div className="border border-gray-200 rounded-lg">
            {/* API Endpoint Tabs */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { name: 'Accounts', method: 'GET', endpoint: '/api/v1/accounts' },
                  { name: 'Create Payment', method: 'POST', endpoint: '/api/v1/payments' },
                  { name: 'Transfers', method: 'GET', endpoint: '/api/v1/transfers' },
                  { name: 'Webhooks', method: 'POST', endpoint: '/api/v1/webhooks' }
                ].map((api, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Badge className={`${
                      api.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    } text-xs`}>
                      {api.method}
                    </Badge>
                    {api.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* API Details */}
            <div className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
                      <code className="block bg-gray-100 px-3 py-2 rounded text-sm">
                        GET https://api.surebanker.com/v1/accounts
                      </code>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Headers</label>
                      <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                        <pre>{`Authorization: Bearer sk_test_...
Content-Type: application/json
X-API-Version: 2024-01-15`}</pre>
                      </div>
                    </div>
                    <Button className="w-full bg-indigo-600 text-white">
                      <PlayIcon className="w-4 h-4 mr-2" />
                      Try It Out
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Response</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm h-64 overflow-auto">
                    <pre>{`{
  "success": true,
  "data": [
    {
      "id": "acc_1234567890",
      "user_id": "user_123",
      "account_number": "0123456789",
      "bank_name": "SureBanker",
      "balance": 50000.00,
      "currency": "NGN",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 1,
    "total_pages": 1
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
          <div className="space-y-4">
            {[
              { 
                language: 'JavaScript', 
                code: `const response = await fetch('https://api.surebanker.com/v1/accounts', {
  headers: {
    'Authorization': 'Bearer sk_test_...',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();` 
              },
              { 
                language: 'Python', 
                code: `import requests

headers = {
    'Authorization': 'Bearer sk_test_...',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.surebanker.com/v1/accounts', headers=headers)
data = response.json()` 
              },
              { 
                language: 'cURL', 
                code: `curl -X GET "https://api.surebanker.com/v1/accounts" \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json"` 
              }
            ].map((example, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{example.language}</h4>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code)}>
                    <CopyIcon className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                  <pre>{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Rate Limiting Dashboard
  const RateLimitingDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rate Limiting Dashboard</h2>
          <p className="text-gray-600">Monitor API usage and limits</p>
        </div>
      </div>

      {/* Rate Limit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">67,890</p>
                <p className="text-xs text-blue-600">Last 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Within Limits</p>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
                <p className="text-xs text-green-600">Compliance rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rate Limited</p>
                <p className="text-2xl font-bold text-red-600">1,023</p>
                <p className="text-xs text-red-600">Blocked requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reset Time</p>
                <p className="text-lg font-bold text-purple-600">23:45</p>
                <p className="text-xs text-purple-600">Next reset</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Endpoint Rate Limits */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Rate Limits</h3>
          <div className="space-y-4">
            {[
              { endpoint: '/api/v1/accounts', limit: 1000, used: 847, resetTime: '23:45' },
              { endpoint: '/api/v1/payments', limit: 500, used: 234, resetTime: '23:45' },
              { endpoint: '/api/v1/transfers', limit: 200, used: 156, resetTime: '23:45' },
              { endpoint: '/api/v1/webhooks', limit: 100, used: 23, resetTime: '23:45' }
            ].map((limit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="font-mono text-sm">{limit.endpoint}</code>
                  <span className="text-sm text-gray-600">Resets at {limit.resetTime}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    {limit.used.toLocaleString()} / {limit.limit.toLocaleString()} requests
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round((limit.used / limit.limit) * 100)}% used
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (limit.used / limit.limit) > 0.9 ? 'bg-red-500' :
                      (limit.used / limit.limit) > 0.7 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${(limit.used / limit.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Analytics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Hourly Usage (Last 24h)</h4>
              <div className="h-32 flex items-end justify-between gap-1">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="w-3 bg-indigo-500 rounded-t"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{i}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Response Times</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average</span>
                  <span className="font-medium">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">95th Percentile</span>
                  <span className="font-medium">120ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">99th Percentile</span>
                  <span className="font-medium">250ms</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Error Logs Page
  const ErrorLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Error Logs & Debugging</h2>
          <p className="text-gray-600">Monitor and debug API errors</p>
        </div>
        <Button variant="outline">
          <DownloadIcon className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Error Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">
                  {errorLogs.filter(e => e.level === 'error' && !e.resolved).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {errorLogs.filter(e => e.level === 'warning').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <InfoIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Info</p>
                <p className="text-2xl font-bold text-blue-600">
                  {errorLogs.filter(e => e.level === 'info').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {errorLogs.filter(e => e.resolved).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Input placeholder="Search errors..." className="flex-1" />
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Levels</option>
              <option>Errors</option>
              <option>Warnings</option>
              <option>Info</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Unresolved</option>
              <option>Resolved</option>
            </select>
            <Button variant="outline">
              <FilterIcon className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Logs List */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Errors</h3>
          <div className="space-y-3">
            {errorLogs.map((log) => (
              <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      log.level === 'error' ? 'bg-red-500' :
                      log.level === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="font-medium">{log.endpoint}</span>
                    <Badge className={`${
                      log.level === 'error' ? 'bg-red-100 text-red-800' :
                      log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.level}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800">{log.statusCode}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{log.timestamp}</span>
                    {!log.resolved && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveError(log.id)}
                        className="text-green-600"
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-900 mb-2">{log.message}</p>
                
                <details className="text-sm">
                  <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                    View Stack Trace
                  </summary>
                  <div className="mt-2 bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                    <pre>{log.stackTrace}</pre>
                  </div>
                </details>

                <div className="flex items-center gap-2 mt-3">
                  {log.tags.map(tag => (
                    <Badge key={tag} className="bg-gray-100 text-gray-800 text-xs">{tag}</Badge>
                  ))}
                  {log.resolved && (
                    <Badge className="bg-green-100 text-green-800 text-xs">Resolved</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'api-management':
        return <ApiManagement />;
      case 'sandbox':
        return <SandboxEnvironment />;
      case 'webhooks':
        return <WebhookTester />;
      case 'oauth':
        return <OAuthManagement />;
      case 'documentation':
        return <ApiDocumentation />;
      case 'rate-limiting':
        return <RateLimitingDashboard />;
      case 'error-logs':
        return <ErrorLogs />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Developer Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold">SureBanker</h2>
                <p className="text-sm text-gray-400">Developer Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Account Type Switcher */}
            <div className="mb-4">
              <AccountTypeSwitcher variant="sidebar" />
            </div>

            <div className="space-y-1">
              {[
                { id: 'overview', name: 'Overview', icon: <HomeIcon className="w-5 h-5" /> },
                { id: 'api-management', name: 'API Management', icon: <KeyIcon className="w-5 h-5" /> },
                { id: 'sandbox', name: 'Sandbox', icon: <PlayIcon className="w-5 h-5" /> },
                { id: 'webhooks', name: 'Webhooks', icon: <WebhookIcon className="w-5 h-5" /> },
                { id: 'oauth', name: 'OAuth', icon: <ShieldIcon className="w-5 h-5" /> },
                { id: 'documentation', name: 'Documentation', icon: <BookOpenIcon className="w-5 h-5" /> },
                { id: 'rate-limiting', name: 'Rate Limiting', icon: <ActivityIcon className="w-5 h-5" /> },
                { id: 'error-logs', name: 'Error Logs', icon: <BugIcon className="w-5 h-5" /> }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    currentView === item.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <CodeIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Developer Mode</p>
                    <p className="text-xs text-gray-400">Advanced Features</p>
                  </div>
                </div>
                <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                  View API Status
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
                <h1 className="text-xl font-semibold text-gray-900">Developer Dashboard</h1>
                <p className="text-sm text-gray-600">Build and test your fintech integrations</p>
              </div>

              <div className="flex items-center gap-4">
                <AccountTypeSwitcher variant="header" />
                
                <Button variant="ghost" size="sm" className="p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">All Systems Operational</span>
                  </div>
                </Button>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Alex Developer</div>
                    <div className="text-xs text-gray-600">Developer Account</div>
                  </div>
                  <ProfileDropdown
                    userName="Alex Developer"
                    userRole="Developer Account"
                    avatar="AD"
                    profileRoute="/developer-profile"
                    accountType="developer"
                  />
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
        <header className="bg-gray-900 text-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CodeIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Developer Portal</h1>
              <p className="text-xs text-gray-400">Build & Test</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">Online</span>
          </div>
        </header>

        <main className="p-4 pb-20">
          {renderCurrentView()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { id: 'overview', name: 'Overview', icon: <HomeIcon className="w-5 h-5" /> },
              { id: 'api-management', name: 'APIs', icon: <KeyIcon className="w-5 h-5" /> },
              { id: 'sandbox', name: 'Test', icon: <PlayIcon className="w-5 h-5" /> },
              { id: 'documentation', name: 'Docs', icon: <BookOpenIcon className="w-5 h-5" /> }
            ].map((item) => (
              <div 
                key={item.id}
                className="flex flex-col items-center py-2 cursor-pointer"
                onClick={() => setCurrentView(item.id)}
              >
                <div className={`${currentView === item.id ? 'text-indigo-400' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 ${currentView === item.id ? 'text-indigo-400 font-medium' : 'text-gray-400'}`}>
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