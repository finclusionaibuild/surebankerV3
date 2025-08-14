import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input"; 
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, UserIcon, MailIcon, PhoneIcon, ShieldIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface OnboardingData {
  // Step 1: Authentication
  authMethod: 'email' | 'phone' | 'finclusion' | 'sso';
  email: string;
  phone: string;
  finclusionId: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Details
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  state: string;
  city: string;
  googleAddress: string;
  
  // Step 3: Next of Kin
  kinFirstName: string;
  kinMiddleName: string;
  kinLastName: string;
  kinRelationship: string;
  kinPhone: string;
  kinEmail: string;
  kinAddress: string;
}

export const IndividualOnboarding = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    authMethod: 'email',
    email: '',
    phone: '',
    finclusionId: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    country: 'Nigeria',
    state: '',
    city: '',
    googleAddress: '',
    kinFirstName: '',
    kinMiddleName: '',
    kinLastName: '',
    kinRelationship: '',
    kinPhone: '',
    kinEmail: '',
    kinAddress: ''
  });
  const navigate = useNavigate();

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const relationships = [
    'Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'
  ];

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and redirect to dashboard with restricted access
      localStorage.setItem('accountType', 'individual');
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('individualOnboardingComplete', 'true');
      localStorage.setItem('kycLevel', '0'); // Start with no KYC
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep 
                ? "bg-[#5B52FF] text-white" 
                : "bg-gray-200 text-gray-500"
            }`}>
              {step < currentStep ? <CheckIcon className="w-5 h-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-0.5 ${
                step < currentStep ? "bg-[#5B52FF]" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Step 1: Quick Authentication
  const renderStep1 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <UserIcon className="w-16 h-16 text-[#5B52FF] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Quick Onboarding</h2>
        <p className="text-[#64748B]">Choose your preferred authentication method</p>
      </div>

      <div className="space-y-4 mb-6">
        {[
          { id: 'email', label: 'Email Address', icon: <MailIcon className="w-5 h-5" /> },
          { id: 'phone', label: 'Phone Number', icon: <PhoneIcon className="w-5 h-5" /> },
          { id: 'finclusion', label: 'Finclusion ID', icon: <ShieldIcon className="w-5 h-5" /> },
          { id: 'sso', label: 'Single Sign-On (SSO)', icon: <UserIcon className="w-5 h-5" /> }
        ].map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all ${
              formData.authMethod === method.id ? 'ring-2 ring-[#5B52FF] bg-[#F8F9FF]' : 'hover:shadow-md'
            }`}
            onClick={() => handleInputChange('authMethod', method.id as any)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-[#5B52FF]">{method.icon}</div>
              <span className="font-medium">{method.label}</span>
              <div className={`ml-auto w-5 h-5 rounded-full border-2 ${
                formData.authMethod === method.id 
                  ? 'border-[#5B52FF] bg-[#5B52FF]' 
                  : 'border-gray-300'
              }`}>
                {formData.authMethod === method.id && (
                  <CheckIcon className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {formData.authMethod === 'email' && (
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-12"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="h-12"
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
      )}

      {formData.authMethod === 'phone' && (
        <div className="space-y-4">
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="h-12"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {formData.authMethod === 'finclusion' && (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your Finclusion ID"
            value={formData.finclusionId}
            onChange={(e) => handleInputChange('finclusionId', e.target.value)}
            className="h-12"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            >
              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {formData.authMethod === 'sso' && (
        <div className="text-center py-8">
          <p className="text-[#64748B] mb-4">You will be redirected to your organization's SSO portal</p>
          <Button className="bg-[#5B52FF] text-white">
            Continue with SSO
          </Button>
        </div>
      )}
    </div>
  );

  // Step 2: Personal Details
  const renderStep2 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Personal Information</h2>
        <p className="text-[#64748B]">Tell us about yourself</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">First Name *</label>
            <Input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Middle Name</label>
            <Input
              type="text"
              placeholder="Middle name"
              value={formData.middleName}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Last Name *</label>
          <Input
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Date of Birth * (MM/DD/YYYY)</label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Country *</label>
          <select 
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">State *</label>
            <select 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select state</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">City *</label>
            <Input
              type="text"
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Google Address *</label>
          <Input
            type="text"
            placeholder="Enter your full address"
            value={formData.googleAddress}
            onChange={(e) => handleInputChange('googleAddress', e.target.value)}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Next of Kin
  const renderStep3 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Next of Kin</h2>
        <p className="text-[#64748B]">Emergency contact information</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">First Name *</label>
            <Input
              type="text"
              placeholder="First name"
              value={formData.kinFirstName}
              onChange={(e) => handleInputChange('kinFirstName', e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">Middle Name</label>
            <Input
              type="text"
              placeholder="Middle name"
              value={formData.kinMiddleName}
              onChange={(e) => handleInputChange('kinMiddleName', e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Last Name *</label>
          <Input
            type="text"
            placeholder="Last name"
            value={formData.kinLastName}
            onChange={(e) => handleInputChange('kinLastName', e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Relationship *</label>
          <select 
            value={formData.kinRelationship}
            onChange={(e) => handleInputChange('kinRelationship', e.target.value)}
            className="w-full h-12 px-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select relationship</option>
            {relationships.map((rel) => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Phone Number *</label>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={formData.kinPhone}
            onChange={(e) => handleInputChange('kinPhone', e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={formData.kinEmail}
            onChange={(e) => handleInputChange('kinEmail', e.target.value)}
            className="h-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">Address *</label>
          <Input
            type="text"
            placeholder="Enter full address"
            value={formData.kinAddress}
            onChange={(e) => handleInputChange('kinAddress', e.target.value)}
            className="h-12"
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Completion with Restricted Access Notice
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Registration Complete!</h2>
        <p className="text-[#64748B]">Your account has been created with restricted access</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200 mb-8">
        <CardContent className="p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Restricted/Limited Access Notice</h3>
          <p className="text-sm text-yellow-700 mb-4">
            Your account currently has limited access. To unlock full features, please complete your KYC verification.
          </p>
          <div className="text-left space-y-2">
            <p className="text-xs text-yellow-600">✓ Basic dashboard access</p>
            <p className="text-xs text-yellow-600">✓ View account information</p>
            <p className="text-xs text-yellow-600">✓ Limited wallet operations</p>
            <p className="text-xs text-yellow-600">✗ Full money transfers (requires KYC Tier 1)</p>
            <p className="text-xs text-yellow-600">✗ Bill payments (requires KYC Tier 1)</p>
            <p className="text-xs text-yellow-600">✗ Card requests (requires KYC Tier 2)</p>
            <p className="text-xs text-yellow-600">✗ Higher transaction limits (requires KYC Tier 3)</p>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleNext}
        className="w-full h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA]"
      >
        Continue to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img 
            src="/Logo Main Trans.png" 
            alt="SureBanker" 
            className="h-10 w-auto object-contain mx-auto mb-6"
          />
        </div>

        {renderStepIndicator()}

        <Card className="bg-white">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {currentStep < 4 && (
              <div className="flex gap-4 mt-8">
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="flex-1 h-12 bg-[#5B52FF] text-white hover:bg-[#4338CA]"
                >
                  Continue
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};