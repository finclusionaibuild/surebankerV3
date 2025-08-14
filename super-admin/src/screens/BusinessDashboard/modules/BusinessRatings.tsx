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
  StarIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  SendIcon,
  HeartIcon,
  SmileIcon,
  TrendingUpIcon,
  AwardIcon,
  UsersIcon,
  CheckCircleIcon,
  HomeIcon,
  CreditCardIcon,
  ReceiptIcon,
  PiggyBankIcon,
  BarChart3Icon,
  HandshakeIcon,
  InboxIcon,
  ChevronDownIcon,
  UserIcon,
  FileTextIcon,
  DollarSignIcon,
  BuildingIcon
} from "lucide-react";

interface BusinessReview {
  id: string;
  companyName: string;
  rating: number;
  comment: string;
  timestamp: string;
  avatar: string;
  verified: boolean;
  businessType: string;
}

export const BusinessRatings: React.FC = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const businessAppRating = 4.9;
  const totalBusinessReviews = 8547;
  const businessRatingDistribution = [
    { stars: 5, count: 6234, percentage: 72.9 },
    { stars: 4, count: 1567, percentage: 18.3 },
    { stars: 3, count: 492, percentage: 5.8 },
    { stars: 2, count: 167, percentage: 2.0 },
    { stars: 1, count: 87, percentage: 1.0 }
  ];

  const businessReviews: BusinessReview[] = [
    {
      id: "1",
      companyName: "Tech Solutions Ltd",
      rating: 5,
      comment: "Outstanding business banking platform! The payroll management and bulk transfer features have streamlined our operations significantly. Customer support is exceptional.",
      timestamp: "2 days ago",
      avatar: "TS",
      verified: true,
      businessType: "Technology"
    },
    {
      id: "2",
      companyName: "Green Energy Corp",
      rating: 5,
      comment: "Best business banking solution we've used. The POS integration and real-time reporting have transformed how we manage our finances. Highly recommended for growing businesses.",
      timestamp: "1 week ago",
      avatar: "GE",
      verified: true,
      businessType: "Energy"
    },
    {
      id: "3",
      companyName: "Retail Masters Inc",
      rating: 4,
      comment: "Great platform with excellent features. The multi-wallet system is perfect for our business structure. Would love to see more customization options in future updates.",
      timestamp: "2 weeks ago",
      avatar: "RM",
      verified: false,
      businessType: "Retail"
    },
    {
      id: "4",
      companyName: "Construction Pro",
      rating: 5,
      comment: "The business loan feature helped us secure funding for expansion. The approval process was smooth and transparent. SureBanker understands business needs.",
      timestamp: "3 weeks ago",
      avatar: "CP",
      verified: true,
      businessType: "Construction"
    },
    {
      id: "5",
      companyName: "Digital Marketing Hub",
      rating: 4,
      comment: "Solid business banking platform with good security features. The compliance management tools are particularly useful for our industry requirements.",
      timestamp: "1 month ago",
      avatar: "DM",
      verified: true,
      businessType: "Marketing"
    }
  ];

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      setHasSubmitted(true);
      console.log("Business rating submitted:", { rating: userRating, comment: userComment });
    }
  };

  const renderStars = (rating: number, interactive = false, size = "w-6 h-6") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoverRating || userRating) : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={interactive ? () => setUserRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
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
                  notifications: 5,
                  onClick: () => navigate("/business-inbox")
                },
                { 
                  name: "Rate Us", 
                  icon: <StarIcon className="w-5 h-5" />,
                  active: true,
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
                    <StarIcon className="w-6 h-6 text-[#5B52FF]" />
                    Rate SureBanker Business
                  </h1>
                  <p className="text-sm text-[#64748B]">Share your business experience with us</p>
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
                    5
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
            <div className="max-w-4xl mx-auto">
              {/* Business App Rating Overview */}
              <Card className="mb-8 bg-white card-no-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-6xl font-bold text-[#5B52FF]">{businessAppRating}</div>
                      <div>
                        {renderStars(businessAppRating, false, "w-8 h-8")}
                        <p className="text-[#64748B] mt-2">{totalBusinessReviews.toLocaleString()} business reviews</p>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Trusted by thousands of businesses</h2>
                    <p className="text-[#64748B]">Join the community of successful businesses using SureBanker</p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Rating Distribution</h3>
                      <div className="space-y-3">
                        {businessRatingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-12">
                              <span className="text-sm font-medium">{item.stars}</span>
                              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-[#64748B] w-16">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Business Highlights</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUpIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Streamlined Operations</p>
                            <p className="text-sm text-[#64748B]">Automated payroll and bulk transfers</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <AwardIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Award Winning Platform</p>
                            <p className="text-sm text-[#64748B]">Best business fintech 2024</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B]">Trusted by 50K+ Businesses</p>
                            <p className="text-sm text-[#64748B]">From startups to enterprises</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Rating Section */}
              {!hasSubmitted ? (
                <Card className="mb-8 bg-white card-no-shadow">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#1E293B] mb-4">Rate Your Business Experience</h3>
                      <p className="text-[#64748B] mb-8">How would you rate SureBanker for your business needs?</p>
                      
                      <div className="flex justify-center mb-8">
                        {renderStars(userRating, true, "w-12 h-12")}
                      </div>

                      {userRating > 0 && (
                        <div className="max-w-md mx-auto mb-6">
                          <textarea
                            placeholder="Tell us about your business experience with SureBanker (optional)"
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg resize-none h-24 bg-white"
                          />
                        </div>
                      )}

                      <Button 
                        onClick={handleRatingSubmit}
                        disabled={userRating === 0}
                        className="bg-[#5B52FF] text-white px-8 py-3 btn-primary"
                      >
                        Submit Business Rating
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-8 bg-green-50 border-green-200 card-no-shadow">
                  <CardContent className="p-8 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
                    <p className="text-green-700 mb-4">Your business rating has been submitted successfully.</p>
                    <Button 
                      onClick={() => setHasSubmitted(false)}
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Rate Again
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Business Reviews */}
              <Card className="bg-white card-no-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-6">Recent Business Reviews</h3>
                  <div className="space-y-6">
                    {businessReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#5B52FF] text-white">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-[#1E293B]">{review.companyName}</h4>
                              {review.verified && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">
                                  Verified Business
                                </Badge>
                              )}
                              <Badge className="bg-gray-100 text-gray-800 text-xs">
                                {review.businessType}
                              </Badge>
                              <span className="text-sm text-[#64748B]">• {review.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {renderStars(review.rating, false, "w-4 h-4")}
                            </div>
                            <p className="text-[#64748B] leading-relaxed">{review.comment}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#5B52FF]">
                                <ThumbsUpIcon className="w-4 h-4 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#64748B] hover:text-[#5B52FF]">
                                <MessageSquareIcon className="w-4 h-4 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
              <h1 className="text-lg font-semibold text-[#1E293B]">Rate Us</h1>
              <p className="text-xs text-[#64748B]">Business experience</p>
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

        <main className="p-4 pb-20">
          {/* Business App Rating Overview */}
          <Card className="mb-6 bg-white card-no-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#5B52FF] mb-2">{businessAppRating}</div>
              {renderStars(businessAppRating, false, "w-6 h-6")}
              <p className="text-[#64748B] mt-2">{totalBusinessReviews.toLocaleString()} business reviews</p>
            </CardContent>
          </Card>

          {/* Business Rating */}
          {!hasSubmitted ? (
            <Card className="mb-6 bg-white card-no-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">Rate Your Business Experience</h3>
                <div className="flex justify-center mb-6">
                  {renderStars(userRating, true, "w-10 h-10")}
                </div>
                {userRating > 0 && (
                  <div className="mb-6">
                    <textarea
                      placeholder="Tell us about your business experience"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg resize-none h-20 bg-white"
                    />
                  </div>
                )}
                <Button 
                  onClick={handleRatingSubmit}
                  disabled={userRating === 0}
                  className="w-full bg-[#5B52FF] text-white btn-primary"
                >
                  Submit Business Rating
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6 bg-green-50 border-green-200 card-no-shadow">
              <CardContent className="p-6 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-900 mb-2">Thank You!</h3>
                <p className="text-green-700 text-sm">Your business rating has been submitted.</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Business Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E293B]">Recent Business Reviews</h3>
            {businessReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="bg-white card-no-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#5B52FF] text-white text-sm">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#1E293B] text-sm">{review.companyName}</h4>
                        {review.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating, false, "w-3 h-3")}
                        <span className="text-xs text-[#64748B]">{review.timestamp}</span>
                      </div>
                      <p className="text-[#64748B] text-sm">{review.comment}</p>
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
              { name: "Rate", icon: <StarIcon className="w-6 h-6" />, active: true, onClick: () => navigate("/business-ratings") },
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