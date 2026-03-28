import NonDynamicLayout from "../../layouts/NonDynamicLayout";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  DollarSign, 
  Award, 
  TrendingUp,
  Globe,
  Zap,
  MessageCircle,
  CheckCircle,
  Star,
  Truck,
  Package,
  Headphones
} from "lucide-react";

const About = () => {
  // Mission and vision data
  const missionPoints = [
    { icon: Target, title: "Our Mission", text: "To revolutionize spare parts procurement by creating a transparent, efficient, and cost-effective marketplace that connects buyers with verified suppliers across the United States." },
    { icon: Eye, title: "Our Vision", text: "To become the most trusted RFQ platform for spare parts, empowering businesses to find quality parts at competitive prices while helping vendors grow their customer base." },
    { icon: Heart, title: "Our Values", text: "Transparency, reliability, innovation, and customer-first approach guide everything we do at QuickQuotz." }
  ];

  // Core values
  const values = [
    { icon: Shield, title: "Trust & Transparency", text: "We verify all vendors and ensure complete transparency in pricing and processes." },
    { icon: Clock, title: "Speed & Efficiency", text: "Get quotes within 24-48 hours and make faster procurement decisions." },
    { icon: DollarSign, title: "Best Value", text: "Compare multiple quotes to ensure you get the best price for quality parts." },
    { icon: Users, title: "Community Driven", text: "Built by industry experts for businesses of all sizes across the US." }
  ];

  // Platform stats
  const stats = [
    { value: "10,000+", label: "Active Users", icon: Users },
    { value: "50,000+", label: "RFQs Posted", icon: Package },
    { value: "2,500+", label: "Verified Vendors", icon: Truck },
    { value: "35,000+", label: "Successful Deals", icon: CheckCircle },
    { value: "98%", label: "Customer Satisfaction", icon: Star },
    { value: "24/7", label: "Support Available", icon: Headphones }
  ];

  // Milestones
  const milestones = [
    { year: "2022", title: "Platform Launch", description: "QuickQuotz launched with a vision to transform spare parts procurement." },
    { year: "2023", title: "10,000 Users", description: "Reached 10,000 active users across the United States." },
    { year: "2024", title: "Vendor Network", description: "Expanded to 2,500+ verified vendors nationwide." },
    { year: "2025", title: "35,000 Deals", description: "Facilitated over 35,000 successful transactions." }
  ];

  // Team members
  const team = [
    { name: "Michael Rodriguez", role: "CEO & Founder", experience: "15+ years in automotive industry", icon: Users },
    { name: "Sarah Chen", role: "CTO", experience: "12+ years in software development", icon: Zap },
    { name: "David Williams", role: "Head of Operations", experience: "10+ years in supply chain", icon: Globe },
    { name: "Emily Parker", role: "Customer Success", experience: "8+ years in client relations", icon: MessageCircle }
  ];

  return (
    <NonDynamicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About <span className="text-yellow-300">QuickQuotz</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Transforming spare parts procurement through transparency, efficiency, and trust
          </p>
        </div>
      </section>

      {/* Main Description */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
            QuickQuotz is a pioneering RFQ (Request for Quotation) marketplace dedicated exclusively to spare parts procurement. 
            We connect businesses with verified vendors across the United States, making the procurement process faster, 
            more transparent, and cost-effective.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Whether you're a small auto repair shop, a large manufacturing facility, or a fleet management company, 
            QuickQuotz provides the tools you need to find quality spare parts at competitive prices.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Our Core Values</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The principles that guide us in serving our community
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="inline-flex p-2 bg-blue-100 rounded-lg mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 px-6 md:px-20 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">QuickQuotz by the Numbers</h2>
          <p className="text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            Our growing impact on the spare parts procurement industry
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-white/20 rounded-full mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Our Journey</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Milestones that shaped QuickQuotz into what it is today
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Why Choose QuickQuotz?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            What makes us different from traditional procurement methods
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">For Customers</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Post unlimited RFQs for free</li>
                    <li>✓ Receive quotes from multiple verified vendors</li>
                    <li>✓ Compare pricing and delivery options</li>
                    <li>✓ Track all your RFQs in one dashboard</li>
                    <li>✓ Save up to 40% on procurement costs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">For Vendors</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Access to qualified, serious buyers</li>
                    <li>✓ Showcase your products and capabilities</li>
                    <li>✓ Receive RFQs matching your expertise</li>
                    <li>✓ Build long-term customer relationships</li>
                    <li>✓ Grow your business with verified leads</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Leadership Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Meet the experts behind QuickQuotz
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.experience}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Join the QuickQuotz Community</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Whether you're looking to source spare parts or expand your customer base, QuickQuotz is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </NonDynamicLayout>
  );
};

export default About;