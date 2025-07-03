"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footers from '../../components/Footers';

// Contact form state
// Add this at the top level of your file
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwacn3ydoOEw7LCxNVLp8av_SWiuq1N9j_KJtRK7CGKT15cbJrqb6260VhECTOzZNke/exec';

// Updated TIMA Logo Component for dark mode
const TimaLogo = () => (
  <div className="flex items-center">
    <div className="mr-3">
      <Image src="/Tima monogram logo 6.png" alt="TIMA Logo" width={60} height={60} className="brightness-125" />
    </div>
    <div>
      <h1 className="text-xl font-bold text-white">TIMA Integrated Technologies</h1>
      <p className="text-sm text-indigo-200">Together We Raise Together We Thrive</p>
    </div>
  </div>
);

// Updated Feature Card for dark mode
const FeatureCard = ({ title, description, icon, index, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden group hover:border-indigo-500 transition-all duration-300"
    >
      <div className={`h-1 ${color} w-full`}></div>
      <div className="p-6">
        <div className="mb-4 text-4xl group-hover:text-indigo-400 transition-colors duration-300">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

// Updated Technology Badge for dark mode
const TechBadge = ({ name, color }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color} mr-2 mb-2`}>
    {name}
  </span>
);

// Updated Tech Badge colors for dark mode
const getDarkModeTechColor = (name) => {
  const techColors = {
    "Next.js": "bg-black text-white border border-gray-700",
    "React": "bg-gray-900 text-blue-400 border border-blue-400",
    "TypeScript": "bg-gray-900 text-blue-400 border border-blue-400",
    "Tailwind": "bg-gray-900 text-cyan-400 border border-cyan-400",
    "Flutter": "bg-gray-900 text-blue-400 border border-blue-400",
    "React Native": "bg-gray-900 text-indigo-400 border border-indigo-400",
    "Dart": "bg-gray-900 text-blue-400 border border-blue-400",
    "Firebase": "bg-gray-900 text-yellow-400 border border-yellow-400",
    "AWS": "bg-gray-900 text-orange-400 border border-orange-400",
    "Azure": "bg-gray-900 text-blue-400 border border-blue-400",
    "Docker": "bg-gray-900 text-blue-400 border border-blue-400",
    "Kubernetes": "bg-gray-900 text-blue-400 border border-blue-400"
  };
  
  return techColors[name] || "bg-gray-900 text-indigo-400 border border-indigo-400";
};

// Updated Process Step for dark mode with fixed alignment
const ProcessStep = ({ number, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: number * 0.1 }}
    viewport={{ once: true }}
    className="relative mb-16 last:mb-0"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-6">
        <div className="w-14 h-14 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold text-xl shadow-lg shadow-indigo-900/30">
          {number}
        </div>
      </div>
      <div className="pt-1">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-lg">{description}</p>
      </div>
    </div>
    {number < 4 && (
      <div className="absolute left-7 top-16 h-20 w-0.5 bg-indigo-900"></div>
    )}
  </motion.div>
);

// Updated Testimonial for dark mode
const Testimonial = ({ quote, author, role, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-gray-900 p-6 rounded-xl border border-gray-800 group hover:border-indigo-500 transition-all duration-300"
  >
    <div className="text-3xl text-indigo-400 mb-4">"</div>
    <p className="text-gray-300 mb-4 italic">{quote}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <p className="font-medium text-white">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

// Updated FAQ Item for dark mode
const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-800 py-4">
    <button
      className="flex justify-between items-center w-full text-left font-medium text-white"
      onClick={onClick}
    >
      <span>{question}</span>
      <span className="ml-6">
        {isOpen ? (
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    </button>
    {isOpen && (
      <div className="mt-2 text-gray-400">
        <p>{answer}</p>
      </div>
    )}
  </div>
);

// Glowing Orb Background Element
const GlowingOrb = ({ color, size, left, top, blur }) => (
  <div 
    className={`absolute ${left} ${top} w-${size} h-${size} rounded-full ${color} blur-${blur} opacity-20 animate-pulse-slow`}
  ></div>
);

// Animated Gradient Element
const AnimatedGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent animate-rotate-slow"></div>
    <div className="absolute -bottom-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-transparent animate-rotate-slow-reverse"></div>
  </div>
);

// Main Component with dark mode design
const SoftwareServicesPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Form state for Google Sheets integration
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'Please fill out all required fields'
      });
      return;
    }
    
    setFormStatus({
      submitting: true,
      submitted: false,
      error: null
    });
    
    try {
      // Create a URLSearchParams object instead of FormData for better compatibility
      const params = new URLSearchParams();
      
      // Format data according to what doPost expects
      params.append('Name', `${formData.firstName} ${formData.lastName}`);
      params.append('Email', formData.email);
      params.append('Message', `Service: ${formData.service}
  Company: ${formData.company || 'Not specified'}
  Details: ${formData.message}`);
      
      console.log('Sending form data:', params.toString());
      
      // Send data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
      });
      
      console.log('Form submitted, response status:', response.status);
      
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
      
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: 'There was an error submitting your request. Please try again.'
      });
    }
  };
  
  // Updated services with new color scheme for dark mode
  const services = [
    {
      title: "Web Development",
      description: "Crafting responsive, high-performance web applications with cutting-edge technologies that bring your digital vision to life.",
      technologies: [
        { name: "Next.js" },
        { name: "React" },
        { name: "TypeScript" },
        { name: "Tailwind" }
      ],
      features: [
        "Responsive & Adaptive Design",
        "SEO Optimized Architectures",
        "High-Performance Web Solutions",
        "Scalable Frontend Development"
      ],
      icon: "⚛️",
      color: "bg-indigo-600",
    },
    {
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications that deliver seamless user experiences with native-like performance.",
      technologies: [
        { name: "Flutter" },
        { name: "React Native" },
        { name: "Dart" },
        { name: "Firebase" }
      ],
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "Intuitive UI/UX Design",
        "Rapid Deployment Strategies"
      ],
      icon: "📱",
      color: "bg-purple-600",
    },
    {
      title: "Cloud Engineering",
      description: "Implementing robust cloud solutions and DevOps strategies to enhance scalability, security, and operational efficiency.",
      technologies: [
        { name: "AWS" },
        { name: "Azure" },
        { name: "Docker" },
        { name: "Kubernetes" }
      ],
      features: [
        "Scalable Cloud Architectures",
        "Continuous Integration",
        "Infrastructure as Code",
        "Enhanced Security Protocols"
      ],
      icon: "☁️",
      color: "bg-cyan-600",
    }
  ];

  // Process steps remain the same
  const processSteps = [
    {
      number: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your business needs, objectives, and challenges to create a comprehensive development roadmap."
    },
    {
      number: 2,
      title: "Design & Prototyping",
      description: "Our design team creates intuitive interfaces and interactive prototypes that align with your brand and user expectations."
    },
    {
      number: 3,
      title: "Development & Testing",
      description: "We build your solution using agile methodologies, with continuous testing to ensure the highest quality standards."
    },
    {
      number: 4,
      title: "Deployment & Support",
      description: "We handle the deployment process and provide ongoing maintenance and support to ensure your solution evolves with your business."
    }
  ];

  // Testimonials remain the same
  const testimonials = [
    {
      quote: "TIMA transformed our digital presence with a web application that exceeded our expectations in both functionality and design.",
      author: "Sarah Johnson",
      role: "CTO, FinTech Solutions",
      delay: 0
    },
    {
      quote: "The mobile app developed by TIMA helped us increase customer engagement by 45% within the first three months.",
      author: "Michael Chen",
      role: "Product Manager, RetailConnect",
      delay: 0.1
    },
    {
      quote: "Their cloud solutions significantly improved our system performance while reducing operational costs by over 30%.",
      author: "Jessica Williams",
      role: "Operations Director, HealthTech Inc.",
      delay: 0.2
    }
  ];

  // FAQs remain the same
  const faqs = [
    {
      question: "What types of businesses do you typically work with?",
      answer: "We work with businesses of all sizes, from startups to enterprise organizations, across various industries including healthcare, finance, retail, education, and more."
    },
    {
      question: "How long does it typically take to develop a custom software solution?",
      answer: "Project timelines vary based on complexity and scope. A simple web application might take 2-3 months, while more complex enterprise solutions could take 6+ months. We provide detailed timelines during our discovery phase."
    },
    {
      question: "Do you offer post-launch support and maintenance?",
      answer: "Yes, we offer flexible support and maintenance packages to ensure your software continues to operate optimally and evolve with your business needs."
    },
    {
      question: "What makes your development approach different from other agencies?",
      answer: "Our approach combines technical expertise with strategic business thinking. We don't just build software; we create solutions that address specific business challenges and drive measurable results."
    },
    {
      question: "Can you work with our existing development team?",
      answer: "Absolutely. We can either augment your existing team or take full ownership of the development process, depending on your preference and requirements."
    }
  ];

  // Adding custom animations for dark mode
  useEffect(() => {
    // Add custom classes for animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes rotate-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes rotate-slow-reverse {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      @keyframes pulse-slow {
        0% { opacity: 0.1; }
        50% { opacity: 0.3; }
        100% { opacity: 0.1; }
      }
      .animate-rotate-slow {
        animation: rotate-slow 80s linear infinite;
      }
      .animate-rotate-slow-reverse {
        animation: rotate-slow 100s linear infinite reverse;
      }
      .animate-pulse-slow {
        animation: pulse-slow 10s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated background gradients */}
      <AnimatedGradient />
      
      {/* Glowing orbs for futuristic effect */}
      <GlowingOrb color="bg-indigo-500" size="32" left="-top-16" top="left-1/4" blur="3xl" />
      <GlowingOrb color="bg-purple-500" size="48" left="top-1/3" top="-left-24" blur="3xl" />
      <GlowingOrb color="bg-cyan-500" size="40" left="bottom-0" top="right-1/4" blur="3xl" />
      
      {/* Hero Section - Dark Mode */}
      <div className="relative w-full py-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <TimaLogo />
              </div>
              <div className="mb-3">
                <div className="inline-block px-4 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-medium border border-indigo-700/50 backdrop-blur-sm">
                  Industry-Leading Software Solutions
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Business</span> With Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Development</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8">
                Our software development services combine cutting-edge technologies, expert developers, and agile methodologies to deliver scalable solutions that drive your business forward.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#services" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-md font-medium flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-900/30">
                  Get Started <span className="ml-1">→</span>
                </a>
                
                <a href="#process" className="bg-gray-900/50 text-white border border-indigo-800/30 px-8 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-indigo-900/20 transition-colors backdrop-blur-sm">
                  Explore Services <span className="ml-1">↓</span>
                </a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 backdrop-blur-sm text-center">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-4xl font-bold">98%</div>
                  <div className="text-gray-400 text-sm">Client Satisfaction</div>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 backdrop-blur-sm text-center">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-4xl font-bold">150+</div>
                  <div className="text-gray-400 text-sm">Projects Delivered</div>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 backdrop-blur-sm text-center">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-4xl font-bold">25+</div>
                  <div className="text-gray-400 text-sm">Technologies</div>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 backdrop-blur-sm text-center">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-4xl font-bold">12</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Code Terminal */}
            <div className="flex items-center justify-center relative">
              {/* Terminal Card */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-xl shadow-indigo-900/20 w-full max-w-lg relative z-10">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-4 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-sm mx-auto">TIMA Terminal</div>
                </div>
                
                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm">
                  <div className="flex items-start mb-4">
                    <span className="text-indigo-400 mr-2">$</span>
                    <span className="text-gray-300">initialize_project <span className="text-purple-400">--type=next.js</span></span>
                  </div>
                  
                  <div className="text-gray-400 mb-4 pl-4">
                    <div>Installing dependencies...</div>
                    <div>Setting up project structure...</div>
                    <div className="text-green-400">✓ Project initialized successfully!</div>
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <span className="text-indigo-400 mr-2">$</span>
                    <span className="text-gray-300">load_capabilities</span>
                  </div>
                  
                  <div className="text-gray-400 mb-4 pl-4">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-white">Custom Software Development</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-white">Web & Mobile Applications</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-white">API Development & Integration</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-white">AI & Machine Learning Solutions</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-indigo-400 mr-2">$</span>
                    <span className="text-gray-300">start_collaboration <span className="text-cyan-400">--mode=excellence</span></span>
                  </div>
                  
                  <div className="text-gray-400 pl-4">
                    <div className="text-green-400">Ready to transform your business...</div>
                    <div className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative tech floating elements */}
              <div className="absolute top-1/4 right-0 w-16 h-16 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rotate-12 border border-indigo-600/30 animate-float-slow"></div>
              <div className="absolute bottom-1/4 left-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-600/30 animate-float-slow-delay"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expertise Section - Dark Mode */}
      <section id="services" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px w-8 bg-indigo-500"></div>
                <span className="text-indigo-400 font-semibold tracking-wider text-sm">OUR EXPERTISE</span>
                <div className="h-px w-8 bg-indigo-500"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300">Technical Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming business challenges into elegant digital solutions through specialized technical competencies
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gray-900/70 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800 hover:border-indigo-600/50 transition-all duration-300 shadow-xl shadow-indigo-900/10 group">
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    index === 0 ? 'bg-gradient-to-r from-indigo-600/20 via-purple-600/5 to-transparent' :
                    index === 1 ? 'bg-gradient-to-r from-purple-600/20 via-fuchsia-600/5 to-transparent' :
                    'bg-gradient-to-r from-cyan-600/20 via-blue-600/5 to-transparent'
                  }`}></div>
                  
                  <div className="p-10 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Service icon and title area */}
                      <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
                        <div className={`text-7xl mb-6 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3`}>
                          {service.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 text-center lg:text-left">{service.title}</h3>
                        <div className={`h-1 w-12 ${service.color.replace('bg-', 'bg-').replace('600', '500')} my-4 transition-all duration-300 group-hover:w-20`}></div>
                      </div>
                      
                      {/* Description and capabilities */}
                      <div className="lg:col-span-9">
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                          {/* Features/Capabilities */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-5 flex items-center">
                              <span className={`inline-block h-8 w-1 ${service.color} mr-3 rounded-full`}></span>
                              Core Capabilities
                            </h4>
                            <ul className="space-y-3 pl-4">
                              {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <svg className={`h-5 w-5 ${service.color.replace('bg-', 'text-')} mr-3 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Technologies */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-5 flex items-center">
                              <span className={`inline-block h-8 w-1 ${service.color} mr-3 rounded-full`}></span>
                              Technology Stack
                            </h4>
                            <div className="flex flex-wrap">
                              {service.technologies.map((tech, i) => (
                                <span key={i} className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDarkModeTechColor(tech.name)} mr-2 mb-2`}>
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Circuit board pattern overlay - subtle tech decoration */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10H90M10 30H90M10 50H90M10 70H90M10 90H90M10 10V90M30 10V90M50 10V90M70 10V90M90 10V90" stroke="white" strokeWidth="0.5"/>
                      <circle cx="10" cy="10" r="2" fill="white"/>
                      <circle cx="30" cy="10" r="2" fill="white"/>
                      <circle cx="50" cy="10" r="2" fill="white"/>
                      <circle cx="70" cy="10" r="2" fill="white"/>
                      <circle cx="90" cy="10" r="2" fill="white"/>
                      <circle cx="10" cy="30" r="2" fill="white"/>
                      <circle cx="30" cy="30" r="2" fill="white"/>
                      <circle cx="50" cy="30" r="2" fill="white"/>
                      <circle cx="70" cy="30" r="2" fill="white"/>
                      <circle cx="90" cy="30" r="2" fill="white"/>
                      <circle cx="10" cy="50" r="2" fill="white"/>
                      <circle cx="30" cy="50" r="2" fill="white"/>
                      <circle cx="50" cy="50" r="2" fill="white"/>
                      <circle cx="70" cy="50" r="2" fill="white"/>
                      <circle cx="90" cy="50" r="2" fill="white"/>
                      <circle cx="10" cy="70" r="2" fill="white"/>
                      <circle cx="30" cy="70" r="2" fill="white"/>
                      <circle cx="50" cy="70" r="2" fill="white"/>
                      <circle cx="70" cy="70" r="2" fill="white"/>
                      <circle cx="90" cy="70" r="2" fill="white"/>
                      <circle cx="10" cy="90" r="2" fill="white"/>
                      <circle cx="30" cy="90" r="2" fill="white"/>
                      <circle cx="50" cy="90" r="2" fill="white"/>
                      <circle cx="70" cy="90" r="2" fill="white"/>
                      <circle cx="90" cy="90" r="2" fill="white"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section - Dark Mode */}
      <section id="process" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px w-8 bg-purple-500"></div>
                <span className="text-purple-400 font-semibold tracking-wider text-sm">HOW WE WORK</span>
                <div className="h-px w-8 bg-purple-500"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Development Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We follow a structured, collaborative approach to deliver high-quality solutions on time and within budget
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center">
            <div className="max-w-3xl w-full">
              {processSteps.map((step) => (
                <ProcessStep 
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Dark Mode */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-cyan-950/10 to-gray-950 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px w-8 bg-cyan-500"></div>
                <span className="text-cyan-400 font-semibold tracking-wider text-sm">FAQ</span>
                <div className="h-px w-8 bg-cyan-500"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </motion.div>
          
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-xl shadow-cyan-900/10">
            {faqs.map((faq, index) => (
              <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Dark Mode */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-cyan-900/30 pointer-events-none"></div>
        
        {/* Animated glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Let's discuss how our software development services can help you achieve your business goals
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#contact" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-md font-medium flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-900/30 transform hover:-translate-y-1">
                Start Your Project <span className="ml-1">→</span>
              </a>
              
              <a href="#process" className="bg-gray-900/70 backdrop-blur-sm text-white border border-indigo-600/30 px-10 py-4 rounded-md font-medium flex items-center gap-2 hover:bg-indigo-900/20 hover:border-indigo-500/50 transition-colors transform hover:-translate-y-1">
                Explore Our Process
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Tech grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border-t border-l border-white/10"></div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section - Dark Mode - UPDATED WITH GOOGLE SHEETS INTEGRATION */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-px w-8 bg-purple-500"></div>
                  <span className="text-purple-400 font-semibold tracking-wider text-sm">CONTACT US</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get in Touch</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Ready to discuss your project? Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-900/50 backdrop-blur-sm flex items-center justify-center text-indigo-400 mr-4 border border-indigo-700/50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="text-gray-400">+91 9363721147</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-900/50 backdrop-blur-sm flex items-center justify-center text-purple-400 mr-4 border border-purple-700/50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-gray-400">monarch@timatech.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 mr-4 border border-cyan-700/50">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Office</h3>
                    <p className="text-gray-400">50, Sundarajapuram AA road,<br />Madurai-625011, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-xl shadow-indigo-900/10">
                {formStatus.submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      Your message has been successfully submitted. Our team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus(prev => ({ ...prev, submitted: false }))}
                      className="px-6 py-2 bg-indigo-600/50 hover:bg-indigo-600 text-white rounded-md transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Service Interested In</label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                      >
                        <option value="">Select a service</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Cloud Engineering">Cloud Engineering</option>
                        <option value="Other Services">Other Services</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Project Details</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                        placeholder="Tell us about your project and requirements"
                      ></textarea>
                    </div>
                    
                    {formStatus.error && (
                      <div className="mb-6 p-3 bg-red-900/20 border border-red-800 rounded-md text-red-300 text-sm">
                        {formStatus.error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={formStatus.submitting}
                      className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-lg shadow-indigo-900/30 ${
                        formStatus.submitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                      }`}
                    >
                      {formStatus.submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer - using the imported Footers component */}
      <Footers />
    </div>
  );
};

export default SoftwareServicesPage;