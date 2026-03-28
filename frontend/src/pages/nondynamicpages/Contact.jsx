import { useState } from "react";
import NonDynamicLayout from "../../layouts/NonDynamicLayout";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Users, 
  Headphones,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Simulate form submission
    setSubmitted(true);
    setError("");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  // Contact information
  const contactInfo = [
    { icon: Mail, title: "Email Us", details: "support@quickquotz.com", sub: "sales@quickquotz.com", link: "mailto:support@quickquotz.com" },
    { icon: Phone, title: "Call Us", details: "+1 (555) 123-4567", sub: "Mon-Fri, 9am-6pm EST", link: "tel:+15551234567" },
    { icon: MapPin, title: "Visit Us", details: "123 Business Avenue", sub: "New York, NY 10001, USA", link: "#" },
    { icon: Clock, title: "Business Hours", details: "Monday - Friday", sub: "9:00 AM - 6:00 PM EST", link: "#" }
  ];

  // Support teams
  const supportTeams = [
    { icon: Users, title: "Customer Support", email: "support@quickquotz.com", response: "Response within 24 hours" },
    { icon: Headphones, title: "Technical Support", email: "tech@quickquotz.com", response: "Priority response for technical issues" },
    { icon: MessageCircle, title: "Sales Inquiries", email: "sales@quickquotz.com", response: "Get personalized quotes" }
  ];

  // FAQ data
  const faqs = [
    { question: "How do I post an RFQ?", answer: "Simply create an account, click on 'Create RFQ', fill in the details about the spare parts you need, and submit. Vendors will start sending quotes within 24-48 hours." },
    { question: "Is it free to use QuickQuotz?", answer: "Yes! Creating an account and posting RFQs is completely free. Vendors pay a small commission only when they successfully close a deal." },
    { question: "How are vendors verified?", answer: "We verify all vendors through business license verification, customer reviews, and background checks to ensure quality and reliability." },
    { question: "What types of spare parts can I find?", answer: "We cover automotive parts, industrial equipment, engine components, electrical parts, hydraulic systems, and much more across all major categories." }
  ];

  return (
    <NonDynamicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact <span className="text-yellow-300">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            We're here to help! Reach out to us anytime
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.details}</p>
                  <p className="text-gray-500 text-xs mt-1">{info.sub}</p>
                  {info.link && info.link !== "#" && (
                    <a href={info.link} className="text-blue-600 text-sm mt-3 inline-block hover:underline">
                      Contact →
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Send us a Message</h2>
              <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700">Message sent successfully! We'll contact you soon.</p>
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Map & Location */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Location</h2>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    title="QuickQuotz Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00625868458428!3d40.71276807933123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bf5e4b5%3A0xc89c5f8b3b7c8b5e!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0, borderRadius: "0.5rem" }}
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-gray-600 text-sm">
                  123 Business Avenue, New York, NY 10001, United States
                </p>
              </div>
              
              {/* Social Links */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Connect With Us</h2>
                <p className="text-gray-600 mb-4">Follow us on social media for updates and news</p>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Twitter className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Instagram className="w-6 h-6 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Teams */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Contact Our Support Teams</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Get in touch with the right team for your specific needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportTeams.map((team, index) => {
              const Icon = team.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{team.title}</h3>
                  <a href={`mailto:${team.email}`} className="text-blue-600 font-medium mb-2 block hover:underline">
                    {team.email}
                  </a>
                  <p className="text-sm text-gray-500">{team.response}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-12">
            Find quick answers to common questions
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Our support team is always ready to assist you
          </p>
          <button className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
            Live Chat Support
          </button>
        </div>
      </section>
    </NonDynamicLayout>
  );
};

export default Contact;