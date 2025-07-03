"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Cpu, 
  Users, 
  BarChart, 
  Shield, 
  Zap,
  ChevronRight,
  ArrowRight,
  Check,
  MessageSquare,
  Clock,
  Target,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  LineChart,
  Layers,
  LucideIcon,
  Flower
} from 'lucide-react';

// Component imports (assuming these are in your project)
import Footers from '../../components/Footers';

// Google Sheets API utility function
const submitToGoogleSheets = async (formData) => {
  // Replace with your deployed Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuD_Q2FkpuzQPNNoASR8EiEdFO5aB66uQnIMpBtfYTERvHiBsfG1jsc2j87S96SJn0/exec";
  
  try {
    // Create URL-encoded form data
    const formDataEncoded = new URLSearchParams({
      Name: formData.name,
      Email: formData.email,
      Company: formData.company || "",
      Service: formData.service || "",
      Message: formData.message || ""
    }).toString();

    // Submit form data
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataEncoded,
      mode: 'no-cors' // Required for Google Apps Script
    });

    // Since no-cors mode doesn't return readable response, we assume success
    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, message: "Error submitting form. Please try again." };
  }
};

// =====================
// Utility Components
// =====================

// Animated gradient blob SVG component with client-side only rendering
const GradientBlob = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div className={`absolute ${className}`}>
      <div className="w-full h-full opacity-60 mix-blend-lighten">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#blob-gradient)"
            d="M47.4,-57.2C59.2,-45.3,65.1,-27.9,68.2,-9.8C71.4,8.3,71.7,27.1,62.8,40.1C53.8,53.1,35.5,60.3,16.5,66.7C-2.5,73,-22.2,78.5,-37.7,71.6C-53.1,64.7,-64.3,45.3,-70.2,24.8C-76.1,4.3,-76.7,-17.4,-67.9,-33.7C-59.1,-49.9,-41,-60.6,-23.3,-68.5C-5.6,-76.3,11.7,-81.4,26.5,-75.9C41.2,-70.4,53.4,-54.4,47.4,-57.2Z" 
            transform="translate(100 100)"
            className="animate-morph"
          />
        </svg>
      </div>
    </div>
  );
};

// Particle animation component with client-side only rendering
const Particles = ({ count = 25 }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Generate particle data only once on client
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10
    }));
    
    setParticles(newParticles);
  }, [count]);
  
  if (!isMounted) return null;
  
  return (
    <>
      {particles.map((particle) => (
        <div 
          key={particle.id}
          className="absolute bg-white/40 rounded-full animate-float"
          style={{
            top: particle.top,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </>
  );
};

// Card component with subtle hover effects - simplified to avoid hydration issues
const HoverCard = ({ children, className }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <motion.div
      whileHover={isMounted ? { scale: 1.03 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

// CountUp animation component with client-side only rendering
const CountUp = ({ end, decimals = 0, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const nodeRef = useRef(null);
  
  useEffect(() => {
    setIsMounted(true);
    let timer;
    
    const animate = () => {
      let start = 0;
      const step = end / (duration * 60);
      
      timer = setInterval(() => {
        start += step;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000/60);
    };
    
    // Start animation after a short delay to ensure component is mounted
    const startTimer = setTimeout(() => {
      animate();
    }, 500);
    
    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [end, duration]);
  
  return (
    <span ref={nodeRef}>
      {isMounted ? (decimals === 0 ? Math.floor(count) : count.toFixed(decimals)) : "0"}
      {suffix}
    </span>
  );
};

// Function component for tabs with animated underline
const AnimatedTabs = ({ tabs, activeTab, onChange }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="relative flex space-x-1 mt-12">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive ? 'text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            onMouseEnter={() => setHoveredTab(tab)}
            onMouseLeave={() => setHoveredTab(null)}
            onClick={() => onChange(tab)}
          >
            {tab}
            {isMounted && (isActive || hoveredTab === tab) && (
              <motion.div
                layoutId="tabs-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

// Icon badge component for consistent styling
const IconBadge = ({ icon: Icon, color = "blue" }) => (
  <div className={`bg-${color}-100 p-3 rounded-xl`}>
    <Icon className={`h-6 w-6 text-${color}-600`} strokeWidth={1.5} />
  </div>
);

// Service feature component
const ServiceFeature = ({ 
  title, 
  description,
  icon: Icon,
  color = "blue",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className={`relative flex items-start p-5 rounded-xl transition-all duration-300 hover:bg-blue-50`}>
        <div className="mr-4 flex-shrink-0">
          <div className={`bg-blue-100 p-2 rounded-lg transition-all duration-300 group-hover:bg-blue-200`}>
            <Icon className={`h-5 w-5 text-blue-600`} strokeWidth={1.5} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// InfoCard component for statistics/achievements
const InfoCard = ({ title, value, icon: Icon, color = "blue", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/20`}
    >
      <div className={`bg-blue-500/20 p-3 rounded-xl mb-4 w-12 h-12 flex items-center justify-center`}>
        <Icon className={`h-6 w-6 text-blue-400`} />
      </div>
      
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className="text-sm text-blue-200">{title}</p>
    </motion.div>
  );
};

// =====================
// Main Page Sections
// =====================

// Hero Section Component
const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Stats for infographic
  const businessStats = [
    { value: 40, suffix: "%", label: "Operational Efficiency" },
    { value: 75, suffix: "%", label: "Business Growth" },
    { value: 24, suffix: "/7", label: "Customer Support" },
    { value: 97, suffix: "%", label: "Client Satisfaction" }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-600/30 to-transparent rounded-tl-full blur-3xl" />
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-br-full blur-3xl" />
      </div>
      
      {/* Gradient blobs - client-side only */}
      {isMounted && (
        <>
          <GradientBlob className="top-10 right-[10%] w-96 h-96 -rotate-12" />
          <GradientBlob className="bottom-0 left-[5%] w-72 h-72 rotate-45" />
        </>
      )}
      
      {/* Floating particles - client-side only */}
      <div className="absolute inset-0 z-0">
        <Particles count={30} />
      </div>
      
      <div className="container mx-auto px-6 pt-28 pb-32 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-5 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:col-span-3 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Company Logo */}
              <div className="flex items-center mb-8">
                <div className="bg-white rounded-xl p-2 mr-4 shadow-lg shadow-blue-500/20">
                  {/* Replace with actual logo image */}
                  <div className="relative w-14 h-14">
                    {isMounted ? (
                      <Image 
                        src="/Tima monogram logo 3.png" 
                        alt="TIMA Logo" 
                        width={56}
                        height={56}
                        priority
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 animate-pulse rounded-lg" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">TIMA</span>
                  <p className="text-blue-200 text-sm">Integrated Technologies</p>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block mb-2">Empowering Your</span>
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  Digital Transformation
                </span>
              </h1>
              
              {/* Company Slogan */}
              <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-lg text-blue-200 font-medium mb-8 border border-white/20">
                Together We Raise, Together We Thrive
              </div>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                Innovative technology solutions that empower businesses to reach new heights of efficiency, growth, and success in the digital landscape.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link href="#services" className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                  <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-medium flex items-center shadow-lg shadow-blue-900/30">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <Link href="#contact" className="px-8 py-4 text-white font-medium border border-white/30 rounded-full hover:bg-white/10 transition duration-200 flex items-center backdrop-blur-sm">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-md"></div>
                <HoverCard className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm text-white">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Business Impact</h3>
                      <span className="bg-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30">
                        Real Results
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {businessStats.map((stat, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                          <h4 className="text-blue-300 text-sm mb-1">{stat.label}</h4>
                          <p className="text-2xl md:text-3xl font-bold">
                            <CountUp end={stat.value} suffix={stat.suffix} />
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Customized technology integration for your unique needs</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">Continuous support & innovation partnership</span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="#f9fafb" preserveAspectRatio="none">
          <path d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

// Main Features Section Component
const ServicesSection = () => {
  const [activeFeature, setActiveFeature] = useState("optimize");
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Service features data
  const features = {
    optimize: {
      title: "Process Optimization",
      description: "Streamline operations and eliminate inefficiencies for maximum productivity.",
      icon: Zap,
      benefits: [
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks and streamline complex workflows with intelligent solutions.",
          icon: Layers
        },
        {
          title: "Process Mapping",
          description: "Visualize and optimize your business processes to identify bottlenecks and inefficiencies.",
          icon: Flower
        },
        {
          title: "Continuous Improvement",
          description: "Implement ongoing optimization with data-driven insights and iterative enhancements.",
          icon: Target
        }
      ]
    },
    global: {
      title: "Global Reach",
      description: "Expand your business across borders with localized expertise and international support.",
      icon: Globe,
      benefits: [
        {
          title: "Multi-language Support",
          description: "Engage with customers in their native language with our multilingual service capabilities.",
          icon: MessageSquare
        },
        {
          title: "Cultural Adaptation",
          description: "Navigate cultural nuances with localized business approaches and market-specific strategies.",
          icon: Users
        },
        {
          title: "Global Compliance",
          description: "Stay compliant with international regulations and regional business requirements.",
          icon: Shield
        }
      ]
    },
    technology: {
      title: "Technology Integration",
      description: "Harness cutting-edge technologies to transform your business operations.",
      icon: Cpu,
      benefits: [
        {
          title: "AI Implementation",
          description: "Leverage artificial intelligence to enhance decision-making and automate complex processes.",
          icon: Sparkles
        },
        {
          title: "Data Analytics",
          description: "Extract actionable insights from your business data with advanced analytics solutions.",
          icon: LineChart
        },
        {
          title: "Digital Transformation",
          description: "Modernize legacy systems and embrace digital solutions for improved performance.",
          icon: Zap
        }
      ]
    }
  };

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored approaches to transform your business operations and drive sustainable growth
          </p>
        </motion.div>
        
        <div className="flex justify-center">
          <AnimatedTabs 
            tabs={Object.keys(features).map(k => features[k].title)}
            activeTab={features[activeFeature].title}
            onChange={(tab) => {
              const key = Object.keys(features).find(k => features[k].title === tab);
              if (key) setActiveFeature(key);
            }}
          />
        </div>
        
        <motion.div 
          className="mt-12 grid lg:grid-cols-2 gap-8 items-center"
          layout
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="lg:pr-10"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  {React.createElement(features[activeFeature].icon, { 
                    className: "h-7 w-7 text-blue-600", 
                    strokeWidth: 1.5 
                  })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {features[activeFeature].title}
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                {features[activeFeature].description}
              </p>
              
              <div className="space-y-6">
                {features[activeFeature].benefits.map((benefit, idx) => (
                  <ServiceFeature
                    key={idx}
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                    delay={idx * 0.1}
                  />
                ))}
              </div>
              
              <div className="mt-10">
                <Link 
                  href="#contact"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
                >
                  <span>Learn how we can help your business</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-70"></div>
            <HoverCard className="relative z-10 p-0 overflow-hidden bg-white">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                {React.createElement(features[activeFeature].icon, { 
                  className: "h-16 w-16 text-white", 
                  strokeWidth: 1.2 
                })}
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h4>
                <ul className="space-y-3">
                  {[
                    activeFeature === "optimize" ? "35% average operational cost reduction" : 
                    activeFeature === "global" ? "Expand into new markets efficiently" : 
                    "Leverage cutting-edge technology solutions",
                    
                    activeFeature === "optimize" ? "Streamlined workflows & enhanced productivity" : 
                    activeFeature === "global" ? "Multilingual support in 40+ languages" : 
                    "AI-driven process automation and insights",
                    
                    activeFeature === "optimize" ? "Data-driven decision making processes" : 
                    activeFeature === "global" ? "Global compliance management" : 
                    "Digital transformation and system integration",
                    
                    activeFeature === "optimize" ? "Continuous improvement methodologies" : 
                    activeFeature === "global" ? "24/7 international operations support" : 
                    "Future-proof technology implementation"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="text-lg font-bold text-gray-900">98%</p>
                    </div>
                    <Link href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                      Request Demo
                    </Link>
                  </div>
                </div>
              </div>
            </HoverCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Section Component
const ProcessSection = () => {
  // Data for process steps
  const processSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "We conduct a thorough analysis of your current operations to identify optimization opportunities."
    },
    {
      number: 2,
      title: "Strategy",
      description: "Our team develops a tailored roadmap with clear milestones and measurable outcomes."
    },
    {
      number: 3,
      title: "Implementation",
      description: "We execute the plan with precision, integrating solutions seamlessly into your operations."
    },
    {
      number: 4,
      title: "Optimization",
      description: "Continuous refinement ensures ongoing improvements and adaptability to changing needs."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Transform Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A systematic approach to optimizing your operations
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Connecting line between steps */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 hidden md:block"></div>
          
          <div className="space-y-20">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  idx % 2 === 1 ? 'md:rtl' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'md:text-right md:ltr' : ''}>
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mr-3 z-10"
                    >
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 max-w-md">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {[
                      idx === 0 ? "Comprehensive process analysis" : 
                      idx === 1 ? "Customized implementation roadmap" : 
                      idx === 2 ? "Seamless integration procedures" :
                      "Continuous performance monitoring",
                      
                      idx === 0 ? "Stakeholder interviews & feedback" : 
                      idx === 1 ? "Clear KPIs and success metrics" : 
                      idx === 2 ? "Staff training and enablement" :
                      "Iterative enhancement processes",
                      
                      idx === 0 ? "Data-driven insights gathering" : 
                      idx === 1 ? "Risk assessment & mitigation plan" : 
                      idx === 2 ? "Change management support" :
                      "Long-term strategic refinement"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`relative ${idx % 2 === 1 ? 'md:ltr' : ''}`}>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-70"></div>
                  <HoverCard className="relative z-10 bg-white">
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        {idx === 0 ? "Analysis" : 
                         idx === 1 ? "Planning" :
                         idx === 2 ? "Execution" : 
                         "Refinement"}
                      </span>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-4">
                        {idx === 0 ? "Understanding Your Unique Challenges" : 
                         idx === 1 ? "Building the Perfect Roadmap" :
                         idx === 2 ? "Bringing Solutions to Life" : 
                         "Continuous Evolution"}
                      </h4>
                      
                      <p className="text-gray-600 mb-6">
                        {idx === 0 ? "We dive deep into your operations, identifying inefficiencies and untapped opportunities through data analysis and process mapping." : 
                         idx === 1 ? "Our experts develop a comprehensive strategy tailored to your specific needs, with clear milestones and measurable outcomes." :
                         idx === 2 ? "We implement solutions with precision, ensuring minimal disruption and maximum adoption across your organization." : 
                         "Our approach ensures your operations continue to evolve and improve as your business grows and market conditions change."}
                      </p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Timeline</p>
                          <p className="text-lg font-medium">
                            {idx === 0 ? "1-2 Weeks" : 
                             idx === 1 ? "2-3 Weeks" :
                             idx === 2 ? "4-8 Weeks" : 
                             "Ongoing"}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Deliverables</p>
                          <p className="text-lg font-medium">
                            {idx === 0 ? "Analysis Report" : 
                             idx === 1 ? "Strategic Roadmap" :
                             idx === 2 ? "Optimized Processes" : 
                             "Performance Dashboard"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link 
            href="#contact" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Transformation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section Component with Google Sheets Integration
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Call the Google Sheets submission function
      const result = await submitToGoogleSheets(formData);
      
      setSubmitStatus({
        success: result.success,
        message: result.success ? 
          "Thanks for your message! We'll contact you soon." : 
          result.message || "Something went wrong. Please try again later."
      });
      
      // Reset form on success
      if (result.success) {
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-blue-800 text-blue-200 rounded-full text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Schedule a consultation with our experts to discuss how TIMA Integrated Technologies can help you achieve your business goals.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10 border border-white/10"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              {submitStatus && (
                <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-white"
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-white"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-blue-200 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-white"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-blue-200 mb-1">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-white"
                  >
                    <option value="" className="bg-blue-900">Select a service</option>
                    <option value="Process Optimization" className="bg-blue-900">Process Optimization</option>
                    <option value="Global Reach" className="bg-blue-900">Global Reach</option>
                    <option value="Technology Integration" className="bg-blue-900">Technology Integration</option>
                    <option value="Custom Solution" className="bg-blue-900">Custom Solution</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-1">
                  Your Goals
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all text-white"
                  placeholder="Tell us about your business challenges and goals"
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium group-hover:from-cyan-600 group-hover:to-blue-600 transition-all flex items-center justify-center">
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Schedule Consultation'
                    )}
                  </div>
                </button>
                
                <div className="flex justify-center space-x-6 mt-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-cyan-400 mr-2" />
                    <span className="text-sm text-blue-200">24hr Response</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-cyan-400 mr-2" />
                    <span className="text-sm text-blue-200">Secure & Confidential</span>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
const TIMAPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with new design */}
      <HeroSection />
      
      {/* Main Features Section with Interactive Tabs */}
      <ServicesSection />
      
      {/* Process Section with Numbered Steps */}
      <ProcessSection />
      
      {/* Contact Section with Google Sheets Integration */}
      <ContactSection />
      
      {/* Footer */}
      <Footers />
      
      {/* Floating action button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors p-0">
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
          50% { border-radius: 30% 70% 70% 30% / 50% 40% 60% 50%; }
          75% { border-radius: 70% 30% 50% 50% / 40% 60% 40% 60%; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin 15s linear infinite reverse;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TIMAPage;