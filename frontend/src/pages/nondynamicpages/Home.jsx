import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NonDynamicLayout from "../../layouts/NonDynamicLayout";
import { 
  Package, 
  Truck, 
  Shield, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Headphones,
  FileText,
  Send,
  Eye
} from "lucide-react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Stats data
  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "RFQs Posted", value: "50,000+", icon: FileText },
    { label: "Verified Vendors", value: "2,500+", icon: Truck },
    { label: "Successful Deals", value: "35,000+", icon: CheckCircle }
  ];

  // Features data
  const features = [
    { icon: Package, title: "Spare Parts Focus", description: "Specialized marketplace for automotive, industrial, and machinery spare parts across the US." },
    { icon: Shield, title: "Verified Vendors", description: "All vendors are thoroughly vetted to ensure quality products and reliable service." },
    { icon: Clock, title: "Quick Response", description: "Get competitive quotes within 24-48 hours from multiple verified suppliers." },
    { icon: DollarSign, title: "Best Pricing", description: "Compare quotes and negotiate directly to get the best value for your money." },
    { icon: TrendingUp, title: "Transparent Process", description: "Track your RFQ status, compare offers, and make informed decisions." },
    { icon: Award, title: "Quality Guarantee", description: "All parts come with warranty and quality assurance from trusted suppliers." }
  ];

  // Categories data
  const categories = [
    { name: "Automotive Parts", icon: Package, count: "15,000+", bg: "bg-blue-100", text: "text-blue-600" },
    { name: "Industrial Equipment", icon: Truck, count: "8,500+", bg: "bg-green-100", text: "text-green-600" },
    { name: "Engine Components", icon: Shield, count: "12,000+", bg: "bg-purple-100", text: "text-purple-600" },
    { name: "Electrical Parts", icon: TrendingUp, count: "7,200+", bg: "bg-yellow-100", text: "text-yellow-600" }
  ];

  // Testimonials data
  const testimonials = [
    { name: "John Davis", company: "Davis Auto Repair", text: "QuickQuotz saved us 30% on spare parts costs. The vendor comparison feature is invaluable!", rating: 5 },
    { name: "Sarah Miller", company: "Miller Manufacturing", text: "Finding reliable industrial parts suppliers has never been easier. Highly recommended!", rating: 5 },
    { name: "Robert Chen", company: "Chen Fleet Services", text: "Fast quotes, verified vendors, and great prices. This platform transformed our procurement process.", rating: 5 }
  ];

  return (
    <NonDynamicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Welcome to <span className="text-yellow-300">QuickQuotz</span>
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100">
                The #1 RFQ Marketplace for Spare Parts in the US
              </p>
              <p className="text-base mb-8 text-blue-100 max-w-lg">
                Easily request quotations for automotive, industrial, and machinery spare parts. 
                Get competitive quotes from verified vendors and save up to 40% on procurement costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </button>
                <button
                  onClick={() => navigate("/rfqs")}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  Browse RFQs
                </button>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <Send className="w-8 h-8 text-yellow-300" />
                  <span className="text-xl font-semibold">Active Now</span>
                </div>
                <p className="text-sm mb-3">250+ RFQs posted in last 24 hours</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Automotive Parts</span>
                    <span className="text-yellow-300">125 requests</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Industrial Equipment</span>
                    <span className="text-yellow-300">78 requests</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Engine Components</span>
                    <span className="text-yellow-300">47 requests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">How QuickQuotz Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple, fast, and transparent process to get the best quotes for your spare parts needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Post Your RFQ</h3>
              <p className="text-gray-600">Describe the spare parts you need with quantity, specifications, and deadline</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">Receive Quotes</h3>
              <p className="text-gray-600">Verified vendors send competitive quotes within 24-48 hours</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Compare & Choose</h3>
              <p className="text-gray-600">Review quotes, compare pricing, and select the best offer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Why Choose QuickQuotz?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We make spare parts procurement simple, transparent, and cost-effective
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="inline-flex p-3 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Popular Categories</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Browse thousands of spare parts across various categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className={`${category.bg} p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform`}>
                  <Icon className={`w-12 h-12 ${category.text} mx-auto mb-3`} />
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} parts</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-20 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">What Our Customers Say</h2>
          <p className="text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust QuickQuotz for their spare parts needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join QuickQuotz today and transform your spare parts procurement process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Free Account
            </button>
            <button
              onClick={() => navigate("/rfqs")}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              Browse RFQs
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center relative transform scale-100 transition-all">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 mb-2">Join thousands of businesses finding the best spare parts deals!</p>
            <p className="text-sm text-gray-500 mb-6">Choose your role to get started</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
              >
               Login
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </NonDynamicLayout>
  );
};

export default Home;