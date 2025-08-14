import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, PlayIcon } from "lucide-react";

export const SignIn = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd validate against a backend
    if (email && password) {
      // Navigate to dashboard after successful sign in
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#4340ff] hover:text-[#3632e6] mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/Logo Main Trans.png" 
              alt="SureBanker" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#201f4f] mb-2 font-raleway">
              Welcome back
            </h1>
            <p className="text-[#667085] text-base">
              Sign in to your SureBanker account
            </p>
          </div>

          {/* Demo Login Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PlayIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 text-sm mb-1">Try Demo Accounts</h3>
                  <p className="text-xs text-blue-700">Experience different user roles with one-click login</p>
                </div>
                <Link to="/demo">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-4 py-2">
                    Demo Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sign In Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#201f4f] mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#201f4f] mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4340ff] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#4340ff] transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#4340ff] border-gray-300 rounded focus:ring-[#4340ff]"
                />
                <span className="text-sm text-[#667085]">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#4340ff] hover:text-[#3632e6] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-[#4340ff] text-white font-semibold rounded-xl hover:bg-[#3632e6] transition-colors"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#f8f9ff] text-[#667085]">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5 mr-2" />
                Apple
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-[#667085]">Don't have an account? </span>
              <Link 
                to="/individual-onboarding" 
                className="text-[#4340ff] hover:text-[#3632e6] font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Much Bigger Image */}
      <div className="hidden lg:flex w-3/5 bg-white items-center justify-center p-4 relative overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src="/Frame 1618874613 (1).png" 
            alt="SureBanker Mobile App" 
            className="w-full h-full object-contain scale-110"
          />
        </div>
      </div>
    </div>
  );
};