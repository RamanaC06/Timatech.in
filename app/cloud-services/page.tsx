"use client";

import React, { useRef, useState } from 'react';
import { TextAnimate } from '../../components/ui/text-animate';
import { SparklesCore } from '../../components/ui/sparkles';
import Footers from '../../components/Footers';
import { 
  ServerIcon, 
  DatabaseIcon, 
  ShieldIcon, 
  ScaleIcon, 
  NetworkIcon,
  ActivityIcon,
  CloudLightningIcon,
  BarChartIcon,
  ArrowRight,
  CloudIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  XIcon,
  CheckIcon,
  UsersIcon,
  SettingsIcon,
  LayoutIcon,
  AwardIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CloudServicesPage = () => {
  // State for section expansion and active sections
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedService, setExpandedService] = useState(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedCloud, setSelectedCloud] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  // References for scroll functionality
  const sectionsRef = useRef({});
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      // Replace with your Google Apps Script web app URL
      const scriptUrl = "https://script.google.com/macros/s/AKfycbyiPUFp127H0q_VY3xOSsG7W3tnQPSRO1OsK0l4LGinbkspjl34YuQqUUXpW5bxpWeQ/exec";
      
      // Create form data to send
      const formDataToSend = new FormData();
      formDataToSend.append('Name', `${formData.firstName} ${formData.lastName}`);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Company', formData.company);
      formDataToSend.append('InterestedIn', formData.service);
      formDataToSend.append('Message', formData.message);
      
      // Send form data to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (result.result === 'success') {
        // Form submitted successfully
        setFormSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        // Handle error
        setFormError("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      setFormError("There was an error submitting your form. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Cloud services data
  const cloudServices = [
    {
      id: 'infrastructure',
      icon: ServerIcon,
      title: "Cloud Infrastructure",
      description: "Robust and scalable cloud infrastructure solutions tailored to your business needs, ensuring optimal performance and reliability.",
      details: {
        benefits: [
          "99.9% guaranteed uptime for all services",
          "Automated scaling based on demand patterns",
          "Built-in redundancy and disaster recovery",
          "Global edge locations for minimal latency"
        ],
        technologies: ["Kubernetes", "Docker", "Terraform", "VMware"],
        casestudy: "Helped an e-commerce platform scale from 10k to 1M daily users without downtime."
      }
    },
    {
      id: 'data',
      icon: DatabaseIcon,
      title: "Data Management",
      description: "Advanced data storage, processing, and management strategies with cutting-edge security and intelligent analytics capabilities.",
      details: {
        benefits: [
          "Unified data management across cloud providers",
          "Automated data classification and governance",
          "Real-time analytics and visualization",
          "Cost-optimized storage tiers"
        ],
        technologies: ["MongoDB", "PostgreSQL", "Elasticsearch", "Apache Kafka"],
        casestudy: "Reduced data processing costs by 40% while increasing analytical capabilities for a financial services client."
      }
    },
    {
      id: 'security',
      icon: ShieldIcon,
      title: "Security Services",
      description: "Comprehensive cloud security solutions including threat detection, encryption, access management, and continuous monitoring.",
      details: {
        benefits: [
          "Zero-trust architecture implementation",
          "24/7 security operations center",
          "Compliance with global security standards",
          "Automated vulnerability scanning and remediation"
        ],
        technologies: ["HashiCorp Vault", "Prisma Cloud", "Crowdstrike", "SentinelOne"],
        casestudy: "Implemented enterprise-grade security for a healthcare provider handling sensitive patient data across 50+ locations."
      }
    },
    {
      id: 'scalability',
      icon: ScaleIcon,
      title: "Scalability Consulting",
      description: "Expert guidance on dynamic cloud scaling, ensuring your infrastructure grows seamlessly with your business demands.",
      details: {
        benefits: [
          "Predictive scaling based on business metrics",
          "Cost optimization during scaling events",
          "Performance maintenance during rapid growth",
          "Multi-region expansion strategies"
        ],
        technologies: ["AWS Auto Scaling", "Azure Scale Sets", "GCP Instance Groups", "Kubernetes HPA"],
        casestudy: "Enabled a SaaS provider to scale from 100 to 10,000 enterprise customers with zero performance degradation."
      }
    }
  ];

  // Advanced features data
  const additionalFeatures = [
    {
      id: 'multi-cloud',
      icon: NetworkIcon,
      title: "Multi-Cloud Integration",
      description: "Seamless connectivity and management across multiple cloud platforms for maximum flexibility.",
      details: {
        benefits: [
          "Avoid vendor lock-in",
          "Optimize costs across providers",
          "Leverage best-in-class services",
          "Unified management dashboard"
        ]
      }
    },
    {
      id: 'deployment',
      icon: CloudLightningIcon,
      title: "Rapid Deployment",
      description: "Accelerated cloud migration and deployment strategies to minimize downtime and maximize efficiency.",
      details: {
        benefits: [
          "Automated CI/CD pipelines",
          "Blue-green deployment support",
          "Canary testing built-in",
          "One-click rollback capability"
        ]
      }
    },
    {
      id: 'performance',
      icon: ActivityIcon,
      title: "Performance Optimization",
      description: "Continuous performance monitoring and optimization to ensure peak cloud infrastructure performance.",
      details: {
        benefits: [
          "Real-time performance analytics",
          "Resource utilization optimization",
          "Bottleneck identification",
          "Automated performance tuning"
        ]
      }
    },
    {
      id: 'cost',
      icon: BarChartIcon,
      title: "Cost Management",
      description: "Advanced cost optimization strategies to maximize your cloud investment and reduce unnecessary expenses.",
      details: {
        benefits: [
          "Usage-based resource allocation",
          "Idle resource identification",
          "Reserved instance management",
          "Cost anomaly detection"
        ]
      }
    }
  ];

  // Cloud providers data
  const cloudProviders = [
    {
      id: 'aws',
      logo: "/AWS.svg",
      name: "Amazon Web Services",
      color: "orange",
      services: [
        { name: "EC2", description: "Scalable virtual servers in the cloud" },
        { name: "S3", description: "Object storage built to store and retrieve data" },
        { name: "Lambda", description: "Run code without thinking about servers" },
        { name: "DynamoDB", description: "Fast and flexible NoSQL database service" },
        { name: "RDS", description: "Managed relational database service" },
        { name: "CloudFront", description: "Fast content delivery network (CDN)" }
      ]
    },
    {
      id: 'azure',
      logo: "/AZURE.svg",
      name: "Microsoft Azure",
      color: "blue",
      services: [
        { name: "Virtual Machines", description: "Provision Windows and Linux virtual machines" },
        { name: "Blob Storage", description: "Massively scalable object storage" },
        { name: "Functions", description: "Event-driven serverless compute platform" },
        { name: "Cosmos DB", description: "Globally distributed multi-model database" },
        { name: "App Service", description: "Create web and mobile apps for any platform" },
        { name: "SQL Database", description: "Intelligent, scalable, cloud database service" }
      ]
    },
    {
      id: 'gcp',
      logo: "/GCP.svg",
      name: "Google Cloud Platform",
      color: "green",
      services: [
        { name: "Compute Engine", description: "Virtual machines running in Google's data centers" },
        { name: "Cloud Storage", description: "Object storage for companies of all sizes" },
        { name: "Cloud Functions", description: "Serverless environment to build and connect cloud services" },
        { name: "Firestore", description: "Flexible, scalable NoSQL cloud database" },
        { name: "BigQuery", description: "Serverless, highly scalable data warehouse" },
        { name: "Kubernetes Engine", description: "Managed Kubernetes service" }
      ]
    }
  ];
  
  // Pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      price: "$499",
      period: "per month",
      description: "Essential cloud services for small businesses",
      features: [
        "Single cloud provider support",
        "Basic infrastructure monitoring",
        "Email support (business hours)",
        "99.5% uptime SLA",
        "Monthly performance reports"
      ],
      notIncluded: [
        "Multi-cloud integration",
        "Advanced security features",
        "Dedicated account manager",
        "Custom solutions development"
      ],
      recommended: false
    },
    {
      name: "Business",
      price: "$1,499",
      period: "per month",
      description: "Comprehensive cloud management for growing companies",
      features: [
        "Dual cloud provider support",
        "24/7 infrastructure monitoring",
        "Priority support with 4hr response",
        "99.9% uptime SLA",
        "Weekly performance reports",
        "Basic security monitoring",
        "Cost optimization recommendations"
      ],
      notIncluded: [
        "Advanced multi-cloud orchestration",
        "Custom solutions development"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored solution",
      description: "Full-scale cloud transformation for enterprises",
      features: [
        "Multi-cloud architecture support",
        "24/7 premium monitoring & support",
        "15min response time for critical issues",
        "99.99% uptime SLA",
        "Daily performance & security reports",
        "Dedicated solutions architect",
        "Advanced security monitoring",
        "Continuous cost optimization",
        "Custom solution development"
      ],
      notIncluded: [],
      recommended: false
    }
  ];
  
  // Service details modal
  const ServiceDetailsModal = ({ service, onClose }) => {
    if (!service) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
        
        <motion.div 
          className="relative w-full max-w-3xl bg-gray-900 rounded-2xl border border-blue-500/30 shadow-xl overflow-hidden z-10"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <service.icon className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
              </div>
              <button 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                onClick={onClose}
              >
                <XIcon size={16} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-8">{service.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h4 className="text-blue-300 text-lg font-semibold mb-4 flex items-center">
                  <AwardIcon className="w-5 h-5 mr-2" />
                  Key Benefits
                </h4>
                <ul className="space-y-3">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {service.details.technologies && (
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-blue-300 text-lg font-semibold mb-4 flex items-center">
                    <SettingsIcon className="w-5 h-5 mr-2" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.details.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {service.details.casestudy && (
              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 mb-6">
                <h4 className="text-blue-300 text-lg font-semibold mb-2 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  Case Study
                </h4>
                <p className="text-gray-300">{service.details.casestudy}</p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                onClick={onClose}
              >
                Schedule Consultation
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Cloud provider details component
  const CloudProviderDetails = ({ provider }) => {
    if (!provider) return null;
    
    const colorMap = {
      'orange': 'from-orange-500/20 to-orange-700/20 border-orange-500/30 text-orange-300',
      'blue': 'from-blue-500/20 to-blue-700/20 border-blue-500/30 text-blue-300',
      'green': 'from-green-500/20 to-green-700/20 border-green-500/30 text-green-300'
    };
    
    const bgGradient = colorMap[provider.color] || colorMap['blue'];
    
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="overflow-hidden"
      >
        <div className={`bg-gradient-to-b ${bgGradient} rounded-xl p-6 mt-6`}>
          <h3 className={`text-xl font-semibold mb-4 ${provider.color === 'orange' ? 'text-orange-300' : provider.color === 'green' ? 'text-green-300' : 'text-blue-300'}`}>
            Popular {provider.name} Services
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {provider.services.map((service, index) => (
              <div key={index} className="bg-gray-900/40 backdrop-blur-sm p-3 rounded-lg">
                <h4 className="font-medium text-white mb-1">{service.name}</h4>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Navigation links for the fixed sidebar
  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'features', label: 'Features' },
    { id: 'providers', label: 'Cloud Providers' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Sparkle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="cloud-services-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          particleColor="#4299e1"
        />
      </div>

      {/* Fixed Navigation Sidebar */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800/50 rounded-full p-2">
          <div className="flex flex-col items-center space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeSection === link.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="sr-only">{link.label}</span>
                {link.id === 'hero' && <CloudIcon size={18} />}
                {link.id === 'services' && <ServerIcon size={18} />}
                {link.id === 'features' && <LayoutIcon size={18} />}
                {link.id === 'providers' && <DatabaseIcon size={18} />}
                {link.id === 'pricing' && <BarChartIcon size={18} />}
                {link.id === 'contact' && <UsersIcon size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-4 left-0 right-0 z-40 xl:hidden">
        <div className="bg-gray-900/60 backdrop-blur-lg mx-4 rounded-xl p-2 border border-gray-800/50">
          <div className="flex justify-between items-center overflow-x-auto hide-scrollbar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 whitespace-nowrap transition-all rounded-lg ${
                  activeSection === link.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background - enhanced version */}
        <div className="absolute inset-0">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-950"></div>
          
          {/* Stars layer */}
          <div className="absolute inset-0 bg-[url('/stars-bg.png')] opacity-70"></div>
          
          {/* Nebula/galaxy effects */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-900/20 via-transparent to-transparent opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/20 via-transparent to-transparent opacity-40"></div>
          
          {/* Light glow effects - fixed positions */}
          <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-[60px]"></div>
          
          {/* Static stars instead of random positions */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-1px h-1px rounded-full bg-white opacity-60 top-[15%] left-[23%]"></div>
            <div className="absolute w-2px h-2px rounded-full bg-white opacity-70 top-[35%] left-[65%]"></div>
            <div className="absolute w-1px h-1px rounded-full bg-white opacity-50 top-[78%] left-[82%]"></div>
            <div className="absolute w-2px h-2px rounded-full bg-white opacity-80 top-[56%] left-[13%]"></div>
            <div className="absolute w-1px h-1px rounded-full bg-white opacity-60 top-[25%] left-[76%]"></div>
            <div className="absolute w-1px h-1px rounded-full bg-white opacity-50 top-[62%] left-[32%]"></div>
            <div className="absolute w-2px h-2px rounded-full bg-white opacity-70 top-[48%] left-[89%]"></div>
            <div className="absolute w-1px h-1px rounded-full bg-white opacity-60 top-[83%] left-[45%]"></div>
          </div>
          
          {/* Subtle digital grid */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        </div>
        
        {/* Content Container */}
        <div className="container relative z-10 mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Left Content - Main Heading */}
            <div className="md:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-block px-4 py-1 bg-blue-900/50 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium mb-6">
                  NextGen Technology
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Cloud Services
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text leading-tight mb-8">
                  Transformation
                </h1>
                
                <p className="text-lg text-gray-300 mb-10 max-w-lg">
                  Revolutionizing digital landscapes through innovative, intelligent, and integrated cloud solutions that drive business growth.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold flex items-center"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2" size={18} />
                  </motion.button>
                  
                  <button 
                    onClick={() => scrollToSection('providers')}
                    className="px-8 py-4 bg-transparent border border-blue-500/40 text-blue-300 rounded-full hover:bg-blue-800/20 transition-all duration-300 text-lg font-semibold flex items-center"
                  >
                    Explore Services
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                </div>
                
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border border-blue-500/30 bg-blue-800/30 flex items-center justify-center text-blue-400">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 12.5C6.6625 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.3375 12.5 10 12.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      Trusted by <span className="text-blue-400 font-semibold">500+</span> enterprises
                    </p>
                    <div className="flex items-center text-yellow-400">
                      ★★★★★ <span className="ml-1 text-gray-400">5.0</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - TIMA Logo & Company Info */}
            <div className="md:w-5/12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gray-800/80 p-6"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <Image 
                      src="/Tima monogram logo 6.png" 
                      alt="TIMA Integrated Technologies" 
                      width={100}
                      height={100}
                      className="drop-shadow-lg"
                    />
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-white text-center">
                    TIMA Integrated Technologies
                  </h2>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent my-3"></div>
                  
                  <p className="text-gray-300 text-sm text-center mb-6">
                    Together We Raise, Together We Thrive
                  </p>
                  
                  {/* Animated orbit container */}
                  <div className="relative w-[280px] h-[280px] mt-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-32 h-32 rounded-full bg-blue-900/30 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center"
                        animate={{ 
                          boxShadow: [
                            '0 0 15px rgba(59, 130, 246, 0.2)', 
                            '0 0 25px rgba(59, 130, 246, 0.4)', 
                            '0 0 15px rgba(59, 130, 246, 0.2)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <CloudIcon size={48} className="text-blue-400" />
                      </motion.div>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute right-0 top-1/4 transform translate-x-1/2">
                      <motion.div
                        className="bg-gray-900/70 backdrop-blur-md p-3 rounded-xl border border-blue-500/20"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-800/40 flex items-center justify-center">
                            <ServerIcon size={16} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Cloud Servers</p>
                            <p className="text-white font-medium">99.9% Uptime</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute left-0 bottom-1/4 transform -translate-x-1/2">
                      <motion.div
                        className="bg-gray-900/70 backdrop-blur-md p-3 rounded-xl border border-blue-500/20"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-800/40 flex items-center justify-center">
                            <ShieldIcon size={16} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Security Level</p>
                            <p className="text-white font-medium">Enterprise Grade</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-blue-400 text-sm mb-2">Scroll to explore</span>
              <motion.div 
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}  
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-blue-950/20 opacity-50"></div>
        </div>
        
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-medium px-4 py-1 bg-blue-500/10 rounded-full inline-block mb-3">
              ENTERPRISE SOLUTIONS
            </span>
            <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
              Core Cloud Services
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our comprehensive suite of cloud solutions designed to transform your digital infrastructure with unmatched scalability and security.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {cloudServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
                onClick={() => setExpandedService(service)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative bg-gray-800 hover:bg-gray-800/80 border border-gray-700 group-hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 h-full backdrop-blur-sm overflow-hidden cursor-pointer">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div className="flex flex-col h-full">
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors duration-300">
                        <service.icon className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">{service.title}</h3>
                      <div className="w-12 h-0.5 bg-blue-500/50 mb-4 group-hover:w-16 transition-all duration-300"></div>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{service.description}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <button 
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 transform transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedService(service);
                        }}
                      >
                        View details 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] -top-40 -right-40 bg-blue-700/5 rounded-full blur-3xl"></div>
          <div className="absolute w-[600px] h-[600px] -bottom-20 -left-20 bg-purple-700/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-medium px-4 py-1 bg-blue-500/10 rounded-full inline-block mb-3">
              NEXT-LEVEL FEATURES
            </span>
            <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
              Advanced Cloud Capabilities
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Leverage cutting-edge capabilities that go beyond traditional cloud offerings to maximize your infrastructure's potential.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 group-hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 overflow-hidden relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">{feature.title}</h3>
                  
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500/60 to-purple-500/60 mb-4 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors z-10 relative">{feature.description}</p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section id="providers" className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/30 opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-400 text-sm font-medium px-4 py-1 bg-blue-500/10 rounded-full inline-block mb-3">
              CLOUD PLATFORMS
            </span>
            <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
              Explore Cloud Services
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover the powerful services offered by leading cloud providers to find the perfect solution for your needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cloudProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm p-8 rounded-t-2xl border-t border-l border-r border-b-0 transition-all duration-300 ${
                  provider.color === 'orange' 
                    ? 'border-orange-500/30' 
                    : provider.color === 'green'
                      ? 'border-green-500/30'
                      : 'border-blue-500/30'
                }`}>
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={provider.logo} 
                      alt={provider.name} 
                      width={160} 
                      height={80} 
                    />
                  </div>
                  <div>
                    <div className={`h-0.5 w-full ${
                      provider.color === 'orange' 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-600' 
                        : provider.color === 'green'
                          ? 'bg-gradient-to-r from-green-400 to-green-600'
                          : 'bg-gradient-to-r from-blue-400 to-blue-600'
                    } mb-3`}></div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      provider.color === 'orange' 
                        ? 'text-orange-300' 
                        : provider.color === 'green'
                          ? 'text-green-300'
                          : 'text-blue-300'
                    }`}>{provider.name} Services</h3>
                  </div>
                </div>
                
                <div className={`bg-gradient-to-b ${
                  provider.color === 'orange' 
                    ? 'from-orange-900/20 to-orange-900/10 border-orange-500/30' 
                    : provider.color === 'green'
                      ? 'from-green-900/20 to-green-900/10 border-green-500/30'
                      : 'from-blue-900/20 to-blue-900/10 border-blue-500/30'
                } rounded-b-2xl p-6 border-b border-l border-r border-t-0 flex-grow`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {provider.services.map((service, idx) => (
                      <div key={idx} className="bg-gray-900/40 backdrop-blur-sm p-4 rounded-lg hover:bg-gray-900/60 transition-colors">
                        <h4 className="font-medium text-white mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-300">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-blue-400 text-sm font-medium px-4 py-1 bg-blue-500/10 rounded-full inline-block mb-3">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Have questions about our cloud services? Reach out to us directly or fill out the form below.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl border border-blue-500/20 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-900/50 backdrop-blur-sm flex items-center justify-center text-blue-400 mr-4 border border-blue-700/50">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-gray-400">+91 9363721147</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-900/50 backdrop-blur-sm flex items-center justify-center text-purple-400 mr-4 border border-purple-700/50">
                      <MailIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-gray-400">monarch@timatech.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-900/50 backdrop-blur-sm flex items-center justify-center text-cyan-400 mr-4 border border-cyan-700/50">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Office</h3>
                      <p className="text-gray-400">50, Sundarajapuram AA road,<br />Madurai-625011, India</p>
                    </div>
                  </div>
                </div>

              </motion.div>
              
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-xl shadow-indigo-900/10">
                  {formSubmitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckIcon className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                      <p className="text-gray-300 mb-6">
                        Your message has been successfully submitted. Our team will get back to you shortly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2 bg-indigo-600/50 hover:bg-indigo-600 text-white rounded-md transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ''}
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
                            name="lastName"
                            value={formData.lastName || ''}
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
                          name="email"
                          value={formData.email || ''}
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
                          name="company"
                          value={formData.company || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                          placeholder="Your company name"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Service Interested In</label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service || ''}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                        >
                          <option value="">Select a service</option>
                          <option value="infrastructure">Cloud Infrastructure</option>
                          <option value="data">Data Management</option>
                          <option value="security">Security Services</option>
                          <option value="scalability">Scalability Consulting</option>
                          <option value="other">Other Services</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Project Details</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message || ''}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white"
                          placeholder="Tell us about your project and requirements"
                        ></textarea>
                      </div>
                      
                      {formError && (
                        <div className="mb-6 p-3 bg-red-900/20 border border-red-800 rounded-md text-red-300 text-sm">
                          {formError}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-lg shadow-indigo-900/30 ${
                          formSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                        }`}
                      >
                        {formSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footers />
      
      {/* Service Details Modal */}
      <AnimatePresence>
        {expandedService && (
          <ServiceDetailsModal
            service={expandedService}
            onClose={() => setExpandedService(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 70% / 30% 30% 70% 70%; }
          75% { border-radius: 60% 40% 70% 30% / 70% 50% 40% 30%; }
        }
        
        .animate-blob {
          animation: blob 12s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 20s linear infinite reverse;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CloudServicesPage;