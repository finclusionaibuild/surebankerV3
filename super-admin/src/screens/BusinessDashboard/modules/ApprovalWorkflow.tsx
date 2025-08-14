import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  FileTextIcon,
  UsersIcon,
  DollarSignIcon,
  SettingsIcon,
  BellIcon,
  ArrowLeftIcon,
  HomeIcon,
  CreditCardIcon,
  BarChart3Icon,
  InboxIcon,
  StarIcon,
  BuildingIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  MessageSquareIcon,
  CalendarIcon,
  TrendingUpIcon,
  ShieldIcon,
  UserPlusIcon,
  CopyIcon,
  MoreHorizontalIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  RefreshCwIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  UploadIcon,
  PaperclipIcon,
  SendIcon,
  ReplyIcon,
  ForwardIcon,
  ArchiveIcon,
  FlagIcon,
  TimerIcon,
  UserCheckIcon,
  UserXIcon,
  AlertCircleIcon,
  InfoIcon,
  CheckIcon,
  XIcon
} from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'payment' | 'user_management' | 'expense' | 'contract' | 'policy_change' | 'vendor_payment';
  title: string;
  description: string;
  amount?: number;
  submittedBy: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated' | 'in_review' | 'requires_info';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  currentApprover: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  approvalChain: ApprovalStep[];
  attachments: Attachment[];
  comments: Comment[];
  dueDate: string;
  escalationDate?: string;
  businessUnit: string;
  riskLevel: 'low' | 'medium' | 'high';
  complianceRequired: boolean;
}

interface ApprovalStep {
  id: string;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  actionDate?: string;
  comments?: string;
  order: number;
  isParallel?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface Comment {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'approval' | 'rejection' | 'info_request';
}

interface ApprovalRule {
  id: string;
  name: string;
  type: 'payment' | 'user_management' | 'expense' | 'contract' | 'policy_change';
  conditions: {
    amountThreshold?: number;
    department?: string;
    riskLevel?: string;
  };
  approvers: {
    role: string;
    name: string;
    order: number;
    isRequired: boolean;
    isParallel?: boolean;
  }[];
  autoApprovalRules?: {
    maxAmount?: number;
    trustedUsers?: string[];
    recurringPayments?: boolean;
  };
  escalationRules: {
    timeLimit: number; // hours
    escalateTo: string;
  };
  isActive: boolean;
}

export const ApprovalWorkflow: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'requests' | 'rules' | 'analytics' | 'create'>('dashboard');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showRuleEditor, setShowRuleEditor] = useState(false);

  // Sample approval requests data
  const approvalRequests: ApprovalRequest[] = [
    {
      id: 'APR001',
      type: 'payment',
      title: 'Vendor Payment - Tech Solutions Ltd',
      description: 'Payment for software development services rendered in Q3 2024',
      amount: 2500000,
      submittedBy: {
        id: 'user1',
        name: 'John Manager',
        role: 'Operations Manager',
        avatar: 'JM'
      },
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending',
      priority: 'high',
      currentApprover: {
        id: 'user2',
        name: 'Sarah Director',
        role: 'Finance Director',
        avatar: 'SD'
      },
      approvalChain: [
        {
          id: 'step1',
          approverName: 'Mike Supervisor',
          approverRole: 'Department Supervisor',
          status: 'approved',
          actionDate: '2024-01-15T11:00:00Z',
          comments: 'Approved - vendor services verified',
          order: 1
        },
        {
          id: 'step2',
          approverName: 'Sarah Director',
          approverRole: 'Finance Director',
          status: 'pending',
          order: 2
        },
        {
          id: 'step3',
          approverName: 'David CEO',
          approverRole: 'Chief Executive Officer',
          status: 'pending',
          order: 3
        }
      ],
      attachments: [
        {
          id: 'att1',
          name: 'invoice_tech_solutions.pdf',
          type: 'PDF',
          size: '2.3 MB',
          uploadedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 'att2',
          name: 'service_agreement.pdf',
          type: 'PDF',
          size: '1.8 MB',
          uploadedAt: '2024-01-15T10:30:00Z'
        }
      ],
      comments: [
        {
          id: 'comm1',
          author: 'John Manager',
          authorRole: 'Operations Manager',
          content: 'Urgent payment required to maintain vendor relationship. All deliverables completed successfully.',
          timestamp: '2024-01-15T10:30:00Z',
          type: 'comment'
        },
        {
          id: 'comm2',
          author: 'Mike Supervisor',
          authorRole: 'Department Supervisor',
          content: 'Verified all deliverables. Vendor performance excellent. Recommend approval.',
          timestamp: '2024-01-15T11:00:00Z',
          type: 'approval'
        }
      ],
      dueDate: '2024-01-17T17:00:00Z',
      escalationDate: '2024-01-16T17:00:00Z',
      businessUnit: 'Technology',
      riskLevel: 'medium',
      complianceRequired: true
    },
    {
      id: 'APR002',
      type: 'user_management',
      title: 'Add New Employee - Marketing Department',
      description: 'Request to add Sarah Johnson as Marketing Specialist with system access',
      submittedBy: {
        id: 'user3',
        name: 'Lisa HR',
        role: 'HR Manager',
        avatar: 'LH'
      },
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'in_review',
      priority: 'medium',
      currentApprover: {
        id: 'user4',
        name: 'Tom Marketing',
        role: 'Marketing Director',
        avatar: 'TM'
      },
      approvalChain: [
        {
          id: 'step1',
          approverName: 'Tom Marketing',
          approverRole: 'Marketing Director',
          status: 'pending',
          order: 1
        },
        {
          id: 'step2',
          approverName: 'David CEO',
          approverRole: 'Chief Executive Officer',
          status: 'pending',
          order: 2
        }
      ],
      attachments: [
        {
          id: 'att3',
          name: 'sarah_johnson_resume.pdf',
          type: 'PDF',
          size: '1.2 MB',
          uploadedAt: '2024-01-14T14:20:00Z'
        }
      ],
      comments: [],
      dueDate: '2024-01-18T17:00:00Z',
      businessUnit: 'Marketing',
      riskLevel: 'low',
      complianceRequired: false
    },
    {
      id: 'APR003',
      type: 'expense',
      title: 'Office Equipment Purchase',
      description: 'Purchase of new laptops and office furniture for expanding team',
      amount: 850000,
      submittedBy: {
        id: 'user5',
        name: 'Alex Admin',
        role: 'Office Administrator',
        avatar: 'AA'
      },
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'approved',
      priority: 'low',
      currentApprover: {
        id: 'user2',
        name: 'Sarah Director',
        role: 'Finance Director',
        avatar: 'SD'
      },
      approvalChain: [
        {
          id: 'step1',
          approverName: 'Sarah Director',
          approverRole: 'Finance Director',
          status: 'approved',
          actionDate: '2024-01-13T15:30:00Z',
          comments: 'Approved - within budget allocation',
          order: 1
        }
      ],
      attachments: [
        {
          id: 'att4',
          name: 'equipment_quotes.xlsx',
          type: 'Excel',
          size: '0.8 MB',
          uploadedAt: '2024-01-13T09:15:00Z'
        }
      ],
      comments: [
        {
          id: 'comm3',
          author: 'Sarah Director',
          authorRole: 'Finance Director',
          content: 'Equipment purchase approved. Please proceed with procurement.',
          timestamp: '2024-01-13T15:30:00Z',
          type: 'approval'
        }
      ],
      dueDate: '2024-01-15T17:00:00Z',
      businessUnit: 'Administration',
      riskLevel: 'low',
      complianceRequired: false
    }
  ];

  // Sample approval rules
  const approvalRules: ApprovalRule[] = [
    {
      id: 'rule1',
      name: 'Large Payment Approval',
      type: 'payment',
      conditions: {
        amountThreshold: 1000000,
        riskLevel: 'high'
      },
      approvers: [
        { role: 'Department Supervisor', name: 'Mike Supervisor', order: 1, isRequired: true },
        { role: 'Finance Director', name: 'Sarah Director', order: 2, isRequired: true },
        { role: 'Chief Executive Officer', name: 'David CEO', order: 3, isRequired: true }
      ],
      escalationRules: {
        timeLimit: 24,
        escalateTo: 'Chief Executive Officer'
      },
      isActive: true
    },
    {
      id: 'rule2',
      name: 'User Management Approval',
      type: 'user_management',
      conditions: {
        department: 'all'
      },
      approvers: [
        { role: 'Department Head', name: 'Department Head', order: 1, isRequired: true },
        { role: 'HR Director', name: 'Lisa HR', order: 2, isRequired: true }
      ],
      escalationRules: {
        timeLimit: 48,
        escalateTo: 'Chief Executive Officer'
      },
      isActive: true
    }
  ];

  const filteredRequests = approvalRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.type === filterType;
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'escalated': return 'bg-orange-100 text-orange-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'requires_info': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSignIcon className="w-5 h-5" />;
      case 'user_management': return <UsersIcon className="w-5 h-5" />;
      case 'expense': return <CreditCardIcon className="w-5 h-5" />;
      case 'contract': return <FileTextIcon className="w-5 h-5" />;
      case 'policy_change': return <SettingsIcon className="w-5 h-5" />;
      case 'vendor_payment': return <BuildingIcon className="w-5 h-5" />;
      default: return <FileTextIcon className="w-5 h-5" />;
    }
  };

  const handleApprovalAction = (requestId: string, action: 'approve' | 'reject' | 'request_info', comment?: string) => {
    console.log(`${action} request ${requestId}:`, comment);
    // Implementation would update the request status and add to audit trail
  };

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Pending Approvals</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {approvalRequests.filter(r => r.status === 'pending').length}
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
                <p className="text-sm text-[#64748B]">Approved Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {approvalRequests.filter(r => r.status === 'approved').length}
                </p>
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
                <p className="text-sm text-[#64748B]">Escalated</p>
                <p className="text-2xl font-bold text-[#1E293B]">
                  {approvalRequests.filter(r => r.status === 'escalated').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('create')}>
          <CardContent className="p-6 text-center">
            <PlusIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Create Request</h3>
            <p className="text-sm text-[#64748B]">Submit new approval request</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('requests')}>
          <CardContent className="p-6 text-center">
            <FileTextIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">View Requests</h3>
            <p className="text-sm text-[#64748B]">Manage all approval requests</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('rules')}>
          <CardContent className="p-6 text-center">
            <SettingsIcon className="w-12 h-12 text-[#5B52FF] mx-auto mb-3" />
            <h3 className="font-semibold text-[#1E293B] mb-2">Manage Rules</h3>
            <p className="text-sm text-[#64748B]">Configure approval workflows</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1E293B]">Recent Requests</h3>
            <Button variant="outline" onClick={() => setCurrentView('requests')}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {approvalRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                   onClick={() => setSelectedRequest(request)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#5B52FF]">
                    {getTypeIcon(request.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1E293B]">{request.title}</h4>
                    <p className="text-sm text-[#64748B]">By {request.submittedBy.name} • {new Date(request.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {request.amount && (
                    <span className="font-semibold text-[#1E293B]">₦{request.amount.toLocaleString()}</span>
                  )}
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(request.priority)}`}></div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Requests Management View
  const renderRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Approval Requests</h2>
        <Button className="bg-[#5B52FF] text-white" onClick={() => setCurrentView('create')}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="escalated">Escalated</option>
              <option value="in_review">In Review</option>
            </select>

            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              <option value="payment">Payments</option>
              <option value="user_management">User Management</option>
              <option value="expense">Expenses</option>
              <option value="contract">Contracts</option>
              <option value="policy_change">Policy Changes</option>
            </select>

            <Button variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRequest(request)}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#5B52FF]">
                    {getTypeIcon(request.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[#1E293B]">{request.title}</h3>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(request.priority)}`}></div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#64748B] mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-[#64748B]">
                      <span>By {request.submittedBy.name}</span>
                      <span>•</span>
                      <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Due: {new Date(request.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {request.amount && (
                    <p className="font-bold text-[#1E293B] text-lg">₦{request.amount.toLocaleString()}</p>
                  )}
                  <p className="text-sm text-[#64748B]">Current: {request.currentApprover.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Request Detail Modal
  const renderRequestDetail = () => {
    if (!selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F1F5F9] rounded-lg flex items-center justify-center text-[#5B52FF]">
                  {getTypeIcon(selectedRequest.type)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1E293B]">{selectedRequest.title}</h2>
                  <p className="text-[#64748B]">Request ID: {selectedRequest.id}</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Request Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1E293B] mb-4">Request Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#64748B]">Description</label>
                        <p className="text-[#1E293B]">{selectedRequest.description}</p>
                      </div>
                      {selectedRequest.amount && (
                        <div>
                          <label className="text-sm font-medium text-[#64748B]">Amount</label>
                          <p className="text-xl font-bold text-[#1E293B]">₦{selectedRequest.amount.toLocaleString()}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#64748B]">Business Unit</label>
                          <p className="text-[#1E293B]">{selectedRequest.businessUnit}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#64748B]">Risk Level</label>
                          <Badge className={`${
                            selectedRequest.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                            selectedRequest.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedRequest.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Approval Chain */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1E293B] mb-4">Approval Chain</h3>
                    <div className="space-y-4">
                      {selectedRequest.approvalChain.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === 'approved' ? 'bg-green-500 text-white' :
                            step.status === 'rejected' ? 'bg-red-500 text-white' :
                            step.status === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {step.status === 'approved' ? <CheckIcon className="w-4 h-4" /> :
                             step.status === 'rejected' ? <XIcon className="w-4 h-4" /> :
                             step.status === 'pending' ? <ClockIcon className="w-4 h-4" /> :
                             index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#1E293B]">{step.approverName}</p>
                            <p className="text-sm text-[#64748B]">{step.approverRole}</p>
                            {step.comments && (
                              <p className="text-sm text-[#64748B] mt-1">"{step.comments}"</p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(step.status)}>
                              {step.status}
                            </Badge>
                            {step.actionDate && (
                              <p className="text-xs text-[#64748B] mt-1">
                                {new Date(step.actionDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Comments */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1E293B] mb-4">Comments & History</h3>
                    <div className="space-y-4">
                      {selectedRequest.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-[#5B52FF] text-white text-xs">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[#1E293B]">{comment.author}</span>
                              <span className="text-sm text-[#64748B]">{comment.authorRole}</span>
                              <span className="text-xs text-[#64748B]">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-[#64748B]">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-[#5B52FF] text-white">BA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <textarea
                            placeholder="Add a comment..."
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm" className="bg-[#5B52FF] text-white">
                              <SendIcon className="w-4 h-4 mr-2" />
                              Add Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1E293B] mb-4">Actions</h3>
                    <div className="space-y-3">
                      {selectedRequest.status === 'pending' && (
                        <>
                          <Button 
                            className="w-full bg-green-600 text-white hover:bg-green-700"
                            onClick={() => handleApprovalAction(selectedRequest.id, 'approve')}
                          >
                            <CheckIcon className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleApprovalAction(selectedRequest.id, 'reject')}
                          >
                            <XIcon className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleApprovalAction(selectedRequest.id, 'request_info')}
                          >
                            <MessageSquareIcon className="w-4 h-4 mr-2" />
                            Request Info
                          </Button>
                        </>
                      )}
                      <Button variant="outline" className="w-full">
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Audit Trail
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Request Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#1E293B] mb-4">Request Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-[#64748B]">Submitted By</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-[#5B52FF] text-white text-xs">
                              {selectedRequest.submittedBy.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[#1E293B]">{selectedRequest.submittedBy.name}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#64748B]">Priority</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedRequest.priority)}`}></div>
                          <span className="text-[#1E293B] capitalize">{selectedRequest.priority}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#64748B]">Due Date</label>
                        <p className="text-[#1E293B]">{new Date(selectedRequest.dueDate).toLocaleDateString()}</p>
                      </div>
                      {selectedRequest.escalationDate && (
                        <div>
                          <label className="text-sm font-medium text-[#64748B]">Escalation Date</label>
                          <p className="text-red-600">{new Date(selectedRequest.escalationDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Attachments */}
                {selectedRequest.attachments.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-[#1E293B] mb-4">Attachments</h3>
                      <div className="space-y-3">
                        {selectedRequest.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                            <FileTextIcon className="w-5 h-5 text-[#64748B]" />
                            <div className="flex-1">
                              <p className="font-medium text-[#1E293B]">{attachment.name}</p>
                              <p className="text-sm text-[#64748B]">{attachment.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <DownloadIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Create Request View
  const renderCreateRequest = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-[#1E293B]">Create Approval Request</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Request Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select request type</option>
                <option value="payment">Payment Approval</option>
                <option value="user_management">User Management</option>
                <option value="expense">Expense Approval</option>
                <option value="contract">Contract Approval</option>
                <option value="policy_change">Policy Change</option>
                <option value="vendor_payment">Vendor Payment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Title</label>
              <Input placeholder="Enter request title" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Description</label>
              <textarea
                placeholder="Provide detailed description of the request"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Amount (if applicable)</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Due Date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-[#64748B]">Drag and drop files here or click to browse</p>
                <Button variant="outline" className="mt-2">
                  <PaperclipIcon className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setCurrentView('dashboard')}>
                Cancel
              </Button>
              <Button className="flex-1 bg-[#5B52FF] text-white">
                <SendIcon className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Rules Management View
  const renderRules = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E293B]">Approval Rules</h2>
        <Button className="bg-[#5B52FF] text-white" onClick={() => setShowRuleEditor(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Rule
        </Button>
      </div>

      <div className="space-y-4">
        {approvalRules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#1E293B]">{rule.name}</h3>
                    <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#64748B] mb-4">
                    Type: {rule.type.replace('_', ' ')} • 
                    {rule.conditions.amountThreshold && ` Amount > ₦${rule.conditions.amountThreshold.toLocaleString()}`}
                    {rule.conditions.department && ` Department: ${rule.conditions.department}`}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E293B]">Approval Chain:</h4>
                    <div className="flex items-center gap-2">
                      {rule.approvers.map((approver, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {approver.order}. {approver.role}
                          </Badge>
                          {index < rule.approvers.length - 1 && (
                            <ArrowRightIcon className="w-3 h-3 text-[#64748B]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Analytics View
  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1E293B]">Approval Analytics</h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Total Requests</p>
                <p className="text-2xl font-bold text-[#1E293B]">247</p>
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
                <p className="text-sm text-[#64748B]">Approval Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TimerIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.4h</p>
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
                <p className="text-sm text-[#64748B]">Escalated</p>
                <p className="text-2xl font-bold text-[#1E293B]">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#1E293B] mb-4">Approval Trends</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-[#64748B]">Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#1E293B] mb-4">Request Types Distribution</h3>
            <div className="space-y-3">
              {[
                { type: 'Payments', count: 45, percentage: 65 },
                { type: 'User Management', count: 15, percentage: 22 },
                { type: 'Expenses', count: 8, percentage: 12 },
                { type: 'Others', count: 1, percentage: 1 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#64748B]">{item.type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#5B52FF] h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[#1E293B] font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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
          
          <nav className="flex-1 p-4 overflow-y-auto">
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
                  name: "Approval Workflow", 
                  icon: <CheckCircleIcon className="w-5 h-5" />,
                  active: true,
                  onClick: () => navigate("/approval-workflow")
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
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/business-dashboard")}>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-[#1E293B]">Approval Workflow</h1>
                  <p className="text-sm text-[#64748B]">Manage business approval processes</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Switcher */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button 
                    variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('dashboard')}
                    className={currentView === 'dashboard' ? 'bg-white shadow-sm' : ''}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant={currentView === 'requests' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('requests')}
                    className={currentView === 'requests' ? 'bg-white shadow-sm' : ''}
                  >
                    Requests
                  </Button>
                  <Button 
                    variant={currentView === 'rules' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('rules')}
                    className={currentView === 'rules' ? 'bg-white shadow-sm' : ''}
                  >
                    Rules
                  </Button>
                  <Button 
                    variant={currentView === 'analytics' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('analytics')}
                    className={currentView === 'analytics' ? 'bg-white shadow-sm' : ''}
                  >
                    Analytics
                  </Button>
                </div>
                
                <div className="relative">
                  <Button variant="ghost" size="sm" className="p-2">
                    <BellIcon className="w-5 h-5 text-[#64748B]" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    3
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
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'requests' && renderRequests()}
            {currentView === 'rules' && renderRules()}
            {currentView === 'analytics' && renderAnalytics()}
            {currentView === 'create' && renderCreateRequest()}
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Approvals</h1>
              <p className="text-xs text-[#64748B]">Workflow management</p>
            </div>
          </div>
          <Button className="bg-[#5B52FF] text-white" size="sm" onClick={() => setCurrentView('create')}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </header>

        <main className="p-4 pb-20">
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'requests' && renderRequests()}
          {currentView === 'rules' && renderRules()}
          {currentView === 'analytics' && renderAnalytics()}
          {currentView === 'create' && renderCreateRequest()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            {[
              { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, active: currentView === 'dashboard', onClick: () => setCurrentView('dashboard') },
              { name: "Requests", icon: <FileTextIcon className="w-6 h-6" />, active: currentView === 'requests', onClick: () => setCurrentView('requests') },
              { name: "Rules", icon: <SettingsIcon className="w-6 h-6" />, active: currentView === 'rules', onClick: () => setCurrentView('rules') },
              { name: "Analytics", icon: <BarChart3Icon className="w-6 h-6" />, active: currentView === 'analytics', onClick: () => setCurrentView('analytics') }
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

      {/* Request Detail Modal */}
      {selectedRequest && renderRequestDetail()}
    </div>
  );
};