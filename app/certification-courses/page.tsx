"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { 
  GraduationCapIcon, 
  BriefcaseIcon,
  ArrowRightIcon, 
  MailIcon, 
  BookOpenIcon,
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  AwardIcon,
  CodeIcon,
  CloudIcon,
  ServerIcon,
  UserCircle2,
  ArrowDownIcon,
  PhoneIcon,
  ClockIcon,
  LockIcon,
  UnlockIcon
} from 'lucide-react';
import Footers from "../../components/Footers";
import Image from "next/image";

// Updated Validation Schemas
const AccessFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Please provide your name'),
  phone: z.string().min(10, 'Please provide a valid phone number')
});

const EnrollmentSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Please provide your name'),
  phone: z.string().min(10, 'Please provide a valid phone number'),
  course: z.string().min(1, 'Please select a course')
});

// Types
type Course = {
  id: string;
  title: string;
  duration: string;
  level: string;
  description: string;
  features: string[];
  certification: string;
  category: string;
  imagePath: string;
};

type UserData = {
  email: string;
  name: string;
  phone: string;
  course: string;
};

// Updated Google Sheets API utility function for initial access form
const submitAccessFormToSheets = async (userData) => {
  // Replace with your deployed Google Apps Script Web App URL for email capture
  const SCRIPT_URL =  "https://script.google.com/macros/s/AKfycbwgVl0T5TF3q9PjaKMG6LbgijHR5KU6WOv2hst0ZF291eUarzNkcLRPlVB5P7f-5D41YA/exec";
  
  try {
    // Create URL-encoded form data with all user fields
    const formDataEncoded = new URLSearchParams({
      Name: userData.name,
      Email: userData.email,
      Phone: userData.phone
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

    return { success: true, message: "Information submitted successfully" };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, message: "Error submitting information. Please try again." };
  }
};

// Google Sheets API utility function for course enrollment
const submitEnrollmentToSheets = async (userData) => {
  // Replace with your deployed Google Apps Script Web App URL for enrollment
  const SCRIPT_URL =  "https://script.google.com/macros/s/AKfycby5rekDOAzZ2rqMum236O446hep0nA7b1o9uKwLWa_382VR_iiwuhWr8ee91Pyc5fUVtQ/exec";
  
  try {
    // Create URL-encoded form data
    const formDataEncoded = new URLSearchParams({
      Name: userData.name,
      Email: userData.email,
      Phone: userData.phone,
      Course: userData.course
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

    return { success: true, message: "Enrollment submitted successfully" };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, message: "Error submitting enrollment. Please try again." };
  }
};

// Courses Data - Complete list from document with all categories
const COURSES: Course[] = [
  // International Certifications
  {
    id: 'adobe-cert',
    title: 'Adobe Certification',
    duration: '8 Weeks',
    level: 'Beginner to Advanced',
    description: 'Master Adobe Creative Cloud applications and earn industry-recognized certification to validate your skills.',
    features: [
      'Comprehensive training in Adobe Photoshop, Illustrator, and InDesign',
      'Preparation for Adobe Certified Professional exams',
      'Portfolio development projects',
      'Expert-led training sessions'
    ],
    certification: 'Adobe Certified Professional',
    category: 'International Certification',
    imagePath: '/ADOBE.svg'
  },
  {
    id: 'linux-cert',
    title: 'Linux Certification',
    duration: '10 Weeks',
    level: 'Intermediate',
    description: 'Build expertise in Linux operating systems and administration, preparing for respected industry certifications.',
    features: [
      'Linux installation and configuration',
      'System administration fundamentals',
      'Networking in Linux environments',
      'Security implementation and troubleshooting'
    ],
    certification: 'CompTIA Linux+ and LPIC-1',
    category: 'International Certification',
    imagePath: '/LINUX.svg'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Certification',
    duration: '6 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive certification in all aspects of digital marketing, from social media to SEO and content strategy.',
    features: [
      'Social media marketing strategies',
      'Search engine optimization techniques',
      'Content marketing and analytics',
      'Campaign planning and execution'
    ],
    certification: 'Certified Digital Marketing Professional',
    category: 'International Certification',
    imagePath: '/DG MARK.svg'
  },
  {
    id: 'postgresql-cert',
    title: 'PostgreSQL Certification',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Master PostgreSQL database administration, development, and optimization techniques with this comprehensive certification.',
    features: [
      'Database design and management',
      'Performance tuning and optimization',
      'High availability and replication',
      'PostgreSQL security best practices'
    ],
    certification: 'PostgreSQL Certified Associate',
    category: 'International Certification',
    imagePath: '/postgresql.svg'
  },
  {
    id: 'intel-cert',
    title: 'INTEL Certification',
    duration: '10 Weeks',
    level: 'Intermediate',
    description: 'Gain expertise in Intel technologies with this official certification program covering hardware, software optimization, and more.',
    features: [
      'Intel architecture fundamentals',
      'Performance optimization techniques',
      'Intel-based system troubleshooting',
      'Emerging Intel technologies'
    ],
    certification: 'Intel Certified Professional',
    category: 'International Certification',
    imagePath: '/INTEL.svg'
  },
  {
    id: 'amazon-cert',
    title: 'Amazon Certification',
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive AWS certification training covering cloud architecture, services, and best practices for AWS solutions.',
    features: [
      'AWS core services and infrastructure',
      'Cloud architecture design principles',
      'Security and compliance in AWS',
      'Cost optimization strategies'
    ],
    certification: 'AWS Certified Solutions Architect',
    category: 'International Certification',
    imagePath: '/AWS.svg'
  },
  {
    id: 'novell-cert',
    title: 'Novell Certification',
    duration: '8 Weeks',
    level: 'Intermediate',
    description: 'Build expertise in Novell technologies and solutions for enterprise networking and system administration.',
    features: [
      'Novell directory services and administration',
      'Network infrastructure management',
      'Security and identity management',
      'Enterprise system integration'
    ],
    certification: 'Novell Certified Administrator',
    category: 'International Certification',
    imagePath: '/NOVELL.svg'
  },
  {
    id: 'netiq-cert',
    title: 'NetIQ Certification',
    duration: '6 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Specialized training and certification in NetIQ security, identity, and access management solutions.',
    features: [
      'Identity and access management',
      'Security information and event management',
      'Compliance reporting and monitoring',
      'Advanced authentication techniques'
    ],
    certification: 'NetIQ Certified Professional',
    category: 'International Certification',
    imagePath: '/NETIQ.svg'
  },
  {
    id: 'suse-cert',
    title: 'Suse Certification',
    duration: '10 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Master SUSE Linux Enterprise solutions and earn industry-recognized certification in enterprise Linux administration.',
    features: [
      'SUSE Linux Enterprise Server administration',
      'High availability configuration',
      'Cloud integration and management',
      'Enterprise security implementation'
    ],
    certification: 'SUSE Certified Administrator',
    category: 'International Certification',
    imagePath: '/SUSE.svg'
  },
  {
    id: 'vmware-cert',
    title: 'VMware Certification',
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive training in VMware virtualization technologies for enterprise infrastructure and cloud computing.',
    features: [
      'vSphere installation and configuration',
      'Virtual infrastructure management',
      'High availability and fault tolerance',
      'Resource management and optimization'
    ],
    certification: 'VMware Certified Professional',
    category: 'International Certification',
    imagePath: '/VMWARE.svg'
  },
  {
    id: 'mongodb-cert',
    title: 'MongoDB Certification',
    duration: '8 Weeks',
    level: 'Intermediate',
    description: 'Become a certified MongoDB professional and master NoSQL database design, implementation, and optimization.',
    features: [
      'MongoDB architecture and data modeling',
      'Query optimization and indexing',
      'Replication and sharding',
      'Performance monitoring and tuning'
    ],
    certification: 'MongoDB Certified DBA',
    category: 'International Certification',
    imagePath: '/MONOGODB-2.svg'
  },
  {
    id: 'android-cert',
    title: 'Android Certification',
    duration: '10 Weeks',
    level: 'Intermediate',
    description: 'Specialized training in Android application development and certification to validate your mobile development skills.',
    features: [
      'Android SDK and development environment',
      'UI design and implementation',
      'Data storage and retrieval',
      'Publishing and monetization strategies'
    ],
    certification: 'Android Certified Application Developer',
    category: 'International Certification',
    imagePath: '/ANDROID.svg'
  },
  {
    id: 'google-cert',
    title: 'Google Certification',
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive training for Google Cloud Platform certifications covering cloud architecture, development, and operations.',
    features: [
      'GCP services and infrastructure',
      'Cloud solution architecture',
      'Security and compliance',
      'DevOps and automation'
    ],
    certification: 'Google Cloud Certified Professional',
    category: 'International Certification',
    imagePath: '/GCP.svg'
  },
  {
    id: 'cpp-institute-cert',
    title: 'C++ Institute Certification',
    duration: '10 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Official C++ Institute certification training to validate your skills in professional C++ programming and application development.',
    features: [
      'Advanced C++ programming techniques',
      'Object-oriented design patterns',
      'Memory management and optimization',
      'Standard Template Library mastery'
    ],
    certification: 'Certified Professional Programmer (CPP)',
    category: 'International Certification',
    imagePath: '/C++.svg'
  },
  {
    id: 'corel-cert',
    title: 'Corel Certification',
    duration: '6 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Master Corel creative software suite and earn official certification to validate your graphic design and digital media skills.',
    features: [
      'CorelDRAW for vector illustration',
      'Corel PHOTO-PAINT for image editing',
      'Digital design fundamentals',
      'Print and web production techniques'
    ],
    certification: 'Corel Certified Professional',
    category: 'International Certification',
    imagePath: '/CORELDRAW.svg'
  },
  {
    id: 'microchip-cert',
    title: 'Microchip Certification',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Specialized training in Microchip technologies for embedded systems development and microcontroller programming.',
    features: [
      'PIC and AVR microcontroller programming',
      'Embedded systems design',
      'Interface protocols and communication',
      'Real-time operating systems'
    ],
    certification: 'Microchip Certified Engineer',
    category: 'International Certification',
    imagePath: 'MICROCHIP.svg'
  },
  {
    id: 'hp-enterprise-cert',
    title: 'HP Enterprise Education',
    duration: '10 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive training in HP Enterprise technologies, server infrastructure, and enterprise solutions.',
    features: [
      'HP server and storage technologies',
      'Enterprise network administration',
      'Data center optimization',
      'Cloud infrastructure management'
    ],
    certification: 'HP Enterprise Certified Professional',
    category: 'International Certification',
    imagePath: '/HP.svg'
  },
  
  // Professional Courses
  {
    id: 'diploma-c-cpp',
    title: 'Diploma in C and C++',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive training in C and C++ programming languages covering fundamentals through advanced concepts.',
    features: [
      'C language fundamentals and advanced concepts',
      'Object-oriented programming with C++',
      'Data structures and algorithm implementation',
      'Real-world project development'
    ],
    certification: 'Professional Diploma in C and C++',
    category: 'Professional Course',
    imagePath: 'C++.svg'
  },
  {
    id: 'diploma-j2ee',
    title: 'Diploma in J2EE',
    duration: '16 Weeks',
    level: 'Intermediate',
    description: 'Master Java Enterprise Edition (J2EE) development for building scalable, secure enterprise applications.',
    features: [
      'Core Java and advanced concepts',
      'Enterprise Java Beans (EJB)',
      'Servlets and JavaServer Pages (JSP)',
      'Spring and Hibernate frameworks'
    ],
    certification: 'Professional Diploma in J2EE',
    category: 'Professional Course',
    imagePath: '/JAVA-2.svg'
  },
  {
    id: 'diploma-dotnet',
    title: 'Diploma in .NET',
    duration: '14 Weeks',
    level: 'Intermediate',
    description: 'Comprehensive training in Microsoft .NET Framework for developing modern applications for web, mobile, and desktop.',
    features: [
      'C# programming language fundamentals',
      'ASP.NET for web applications',
      '.NET Core cross-platform development',
      'Entity Framework for data access'
    ],
    certification: 'Professional Diploma in .NET Development',
    category: 'Professional Course',
    imagePath: '/MSNET.svg'
  },
  {
    id: 'diploma-core-java',
    title: 'Diploma in Core JAVA',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive training in Java programming fundamentals and object-oriented development techniques.',
    features: [
      'Java syntax and programming basics',
      'Object-oriented programming principles',
      'Java collections framework',
      'Exception handling and multithreading'
    ],
    certification: 'Professional Diploma in Core Java',
    category: 'Professional Course',
    imagePath: '/JAVA-2.svg'
  },
  {
    id: 'software-testing',
    title: 'Software Testing',
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Learn software testing methodologies, tools, and techniques for ensuring software quality and reliability.',
    features: [
      'Manual testing techniques',
      'Automated testing with Selenium',
      'Performance and security testing',
      'Test planning and execution'
    ],
    certification: 'Certified Software Testing Professional',
    category: 'Professional Course',
    imagePath: '/SELENIUM.svg'
  },
  {
    id: 'diploma-vb6',
    title: 'Diploma in VB - 6.0',
    duration: '8 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Learn Visual Basic 6.0 programming for Windows application development and database connectivity.',
    features: [
      'Visual Basic programming fundamentals',
      'User interface design',
      'Database connectivity and operations',
      'COM and ActiveX development'
    ],
    certification: 'Professional Diploma in Visual Basic 6.0',
    category: 'Professional Course',
    imagePath: '/VISUAL BASIC.svg'
  },
  
  // Certificate Courses
  {
    id: 'php-mysql',
    title: 'Diploma in PHP & MySQL',
    duration: '8 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Learn PHP programming and MySQL database management for dynamic web application development.',
    features: [
      'PHP syntax and programming concepts',
      'MySQL database design and queries',
      'Content Management System development',
      'API development with PHP'
    ],
    certification: 'Certificate in PHP & MySQL Development',
    category: 'Certificate Course',
    imagePath: '/PHP.svg'
  },
  {
    id: 'tally-erp',
    title: 'Certified Computer Accountant Tally ERP 9',
    duration: '6 Weeks',
    level: 'Beginner',
    description: 'Master Tally ERP 9 for accounting, inventory management, GST compliance, and business reporting.',
    features: [
      'Basic and advanced accounting in Tally',
      'Inventory management and reporting',
      'GST implementation and tax compliance',
      'Payroll management and financial statements'
    ],
    certification: 'Certified Tally ERP 9 Professional',
    category: 'Certificate Course',
    imagePath: '/TALLY.svg'
  },
  {
    id: 'web-design',
    title: 'Diploma in Web Designing',
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive training in modern web design technologies, principles, and practices.',
    features: [
      'HTML5, CSS3, and JavaScript fundamentals',
      'Responsive design techniques',
      'UI/UX design principles',
      'WordPress theme development'
    ],
    certification: 'Professional Web Designer',
    category: 'Certificate Course',
    imagePath: '/HTML_CSS_JS.jpg'
  },
  {
    id: 'animation',
    title: 'Diploma in Animation',
    duration: '16 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Learn 2D and 3D animation techniques for creating engaging visual content for various media platforms.',
    features: [
      '2D animation principles and techniques',
      '3D modeling and animation',
      'Character design and development',
      'Animation production workflow'
    ],
    certification: 'Professional Diploma in Animation',
    category: 'Certificate Course',
    imagePath: '/ADOBE ANIMATE.svg'
  },
  {
    id: 'computer-networking',
    title: 'Diploma in Computer & Networking',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Comprehensive training in computer hardware, network setup, configuration, and troubleshooting.',
    features: [
      'Computer hardware assembly and maintenance',
      'Network protocols and architecture',
      'Router and switch configuration',
      'Network security implementation'
    ],
    certification: 'Professional Diploma in Computer & Networking',
    category: 'Certificate Course',
    imagePath: '/CISCO.svg'
  },
  {
    id: 'information-technology',
    title: 'Diploma in Information Technology',
    duration: '16 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Broad-based training program covering key information technology skills and concepts for IT professionals.',
    features: [
      'Computer fundamentals and operating systems',
      'Programming and web development basics',
      'Database management systems',
      'IT project management'
    ],
    certification: 'Diploma in Information Technology',
    category: 'Certificate Course',
    imagePath: '/IT TECH.svg'
  },
  {
    id: 'flash-training',
    title: 'Flash Training',
    duration: '6 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Learn Adobe Flash for creating interactive animations, applications, and multimedia content.',
    features: [
      'ActionScript programming',
      'Animation techniques',
      'Interactive content development',
      'Web integration and publishing'
    ],
    certification: 'Certified Flash Developer',
    category: 'Certificate Course',
    imagePath: '/ADOBE FLASH.svg'
  },
  {
    id: 'photoshop',
    title: 'Diploma in Photoshop',
    duration: '8 Weeks',
    level: 'Beginner to Intermediate',
    description: 'Master Adobe Photoshop for digital image editing, photo manipulation, and graphic design.',
    features: [
      'Photo editing and retouching',
      'Digital drawing and painting',
      'Layer management and masking',
      'Advanced compositing techniques'
    ],
    certification: 'Professional Diploma in Photoshop',
    category: 'Certificate Course',
    imagePath: '/ADOBE PHOTOSHOP.svg'
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence - QLIK',
    duration: '8 Weeks',
    level: 'Intermediate',
    description: 'Learn to use Qlik tools for business intelligence, data visualization, and analytics.',
    features: [
      'QlikView and Qlik Sense fundamentals',
      'Data modeling and ETL processes',
      'Dashboard creation and design',
      'Advanced analytics and reporting'
    ],
    certification: 'Certified Qlik Business Intelligence Professional',
    category: 'Certificate Course',
    imagePath: '/QLIK.svg'
  },
  {
    id: 'blockchain',
    title: 'Blockchain Technology',
    duration: '10 Weeks',
    level: 'Intermediate to Advanced',
    description: 'Comprehensive training in blockchain concepts, development, and applications across industries.',
    features: [
      'Blockchain fundamentals and architecture',
      'Smart contract development',
      'Decentralized application (DApp) creation',
      'Blockchain security and best practices'
    ],
    certification: 'Certified Blockchain Developer',
    category: 'Certificate Course',
    imagePath: '/BLOCK CHAIN.svg'
  },
  
  // Community College
  {
    id: 'pmkvy',
    title: 'PMKVY',
    duration: 'Variable',
    level: 'Beginner',
    description: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY) training programs for skill development and employment enhancement.',
    features: [
      'Industry-relevant skill training',
      'Assessment and certification',
      'Placement assistance',
      'Recognition of prior learning'
    ],
    certification: 'PMKVY Certification',
    category: 'Community College',
    imagePath: '/PMKVY.png'
  },
  {
    id: 'tnsdc',
    title: 'TNSDC',
    duration: 'Variable',
    level: 'Beginner',
    description: 'Tamil Nadu Skill Development Corporation (TNSDC) training programs for enhancing employability skills.',
    features: [
      'Sector-specific skill training',
      'Practical hands-on learning',
      'Industry collaboration',
      'Employment opportunities'
    ],
    certification: 'TNSDC Certification',
    category: 'Community College',
    imagePath: '/TNSDC.png'
  },
  {
    id: 'nielit-esdm',
    title: 'NIELIT - ESDM',
    duration: 'Variable',
    level: 'Beginner to Intermediate',
    description: 'National Institute of Electronics & Information Technology (NIELIT) training in Electronic System Design and Manufacturing (ESDM).',
    features: [
      'Electronics hardware fundamentals',
      'PCB design and manufacturing',
      'Testing and quality assurance',
      'ESDM project implementation'
    ],
    certification: 'NIELIT ESDM Certification',
    category: 'Community College',
    imagePath: '/NIELIT - ESDM.jpeg'
  }
];

// Updated Access Form Screen Component (renamed from EmailCaptureScreen)
const AccessFormScreen = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      // Validate all required fields
      AccessFormSchema.parse(formData);
      
      // Submit data to Google Sheets
      const result = await submitAccessFormToSheets(formData);
      
      if (result.success) {
        // Pass user data to parent component
        onFormSubmit(formData);
      } else {
        setError(result.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/30" />
      
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="Tima Logo.png" 
              alt="TIMA Integrated Technologies Logo" 
              className="h-16 mr-4"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">TIMA Integrated Technologies</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Together We Raise Together We Thrive</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
              <LockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Unlock Access to Our Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please provide your details to explore our certification programs
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your full name"
                  required
                />
                <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                  required
                />
                <MailIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your phone number"
                  required
                />
                <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Continue to Courses <UnlockIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              By continuing, you agree to our terms of service and privacy policy.
              We'll send you updates about our courses and special offers.
            </p>
          </form>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <LockIcon className="h-4 w-4 mr-1" />
              <span>Secure form</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>Instant access</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const coursesRef = useRef<HTMLDivElement>(null);
  
  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/30" />
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Company Logo and Name */}
        <div className="flex items-center justify-center md:justify-start mb-12">
          <img 
            src="Tima Logo.png" 
            alt="TIMA Integrated Technologies Logo" 
            className="h-16 md:h-20 mr-4"
          />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">TIMA Integrated Technologies</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Together We Raise Together We Thrive </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
                Industry-Recognized Certifications
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Accelerate Your <span className="text-blue-600 dark:text-blue-400">Tech Career</span> With Expert Certification
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
                Our certification programs combine hands-on training, placement assistance, and interview preparation to help you land your dream tech job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToCourses}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  Explore Courses <ArrowDownIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { id: 1, value: "95%", label: "Placement Rate" },
                  { id: 2, value: "700+", label: "Companies Hiring" },
                  { id: 3, value: "15,000+", label: "Students Certified" },
                  { id: 4, value: "40%", label: "Salary Increase" }
                ].map(stat => (
                  <div key={stat.id} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-2 gap-1 p-1">
                <div className="aspect-square bg-blue-100 dark:bg-blue-900/30 rounded-tl-xl overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <CloudIcon className="h-20 w-20 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="aspect-square bg-purple-100 dark:bg-purple-900/30 rounded-tr-xl overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <CodeIcon className="h-20 w-20 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="aspect-square bg-green-100 dark:bg-green-900/30 rounded-bl-xl overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <ServerIcon className="h-20 w-20 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="aspect-square bg-indigo-100 dark:bg-indigo-900/30 rounded-br-xl overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <GraduationCapIcon className="h-20 w-20 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/80 to-transparent dark:from-gray-800/80 backdrop-blur-sm">
                <div className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg max-w-md m-4">
                  <div className="flex items-center mb-4">
                    <AwardIcon className="h-10 w-10 text-blue-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certification Benefits</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Industry-recognized qualifications</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {['Expert instructors', 'Hands-on projects', 'Job placement assistance', 'Interview preparation'].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div ref={coursesRef}></div>
    </div>
  );
};

// Benefits Section
const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Certification Programs?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We offer comprehensive training programs designed to prepare you for industry demands and career success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <GraduationCapIcon className="h-8 w-8 text-blue-600" />,
              title: "Industry-Recognized Certifications",
              description: "Our programs are aligned with the latest industry standards and recognized by leading tech companies worldwide."
            },
            {
              icon: <UserIcon className="h-8 w-8 text-blue-600" />,
              title: "Expert Instructors",
              description: "Learn from seasoned professionals with extensive experience in their respective fields and technologies."
            },
            {
              icon: <CalendarIcon className="h-8 w-8 text-blue-600" />,
              title: "Flexible Learning Schedule",
              description: "Choose from weekend, weekday, and evening batches to fit certification training around your existing commitments."
            },
            {
              icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
              title: "Placement Assistance",
              description: "Get access to our extensive network of hiring partners and dedicated placement support throughout your job search."
            },
            {
              icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
              title: "Hands-on Learning",
              description: "Apply concepts through practical projects that mirror real-world industry scenarios and build your portfolio."
            },
            {
              icon: <AwardIcon className="h-8 w-8 text-blue-600" />,
              title: "Certification Exam Prep",
              description: "Dedicated sessions focused on exam strategies, practice tests, and comprehensive review materials."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg w-fit mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Updated Course Category Section with fixed image alignment and no text overlay
const CategorySection = ({ category, courses, onEnrollClick }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 px-4 py-2 inline-block bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 rounded-lg">
          {category}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-600 flex flex-col h-full"
            >
              {/* Fixed image container with proper aspect ratio */}
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className="w-full h-full relative">
                  <Image 
                    src={course.imagePath || '/placeholder-course.jpg'} 
                    alt={course.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    className="p-3"
                  />
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                  <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                  {course.description}
                </p>
                
                <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-600 mt-auto">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Course Details →
                  </button>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <AwardIcon className="h-3 w-3 inline mr-1" />
                    Certificate
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedCourse.title}</h3>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="text-white hover:text-blue-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                {/* Improved course image in the modal with proper aspect ratio */}
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image 
                    src={selectedCourse.imagePath || '/placeholder-course.jpg'} 
                    alt={selectedCourse.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="p-3"
                  />
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    {selectedCourse.duration}
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                    {selectedCourse.level}
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    <AwardIcon className="h-4 w-4 inline mr-1" />
                    Certification
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  {selectedCourse.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedCourse.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Certification</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCourse.certification}
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedCourse(null);
                    onEnrollClick(selectedCourse.title);
                  }}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  Enroll Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Courses Section Container
const CoursesContainer = ({ onEnrollClick }) => {
  // Get unique categories
  const categories = [...new Set(COURSES.map(course => course.category))];
  
  return (
    <div id="courses">
      {categories.map(category => (
        <CategorySection 
          key={category}
          category={category}
          courses={COURSES.filter(course => course.category === category)}
          onEnrollClick={onEnrollClick}
        />
      ))}
    </div>
  );
};

// Enrollment Form
const EnrollmentForm = ({ preSelectedCourse = '', userData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    course: preSelectedCourse || ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    try {
      EnrollmentSchema.parse(formData);
      
      // Submit to Google Sheets
      const result = await submitEnrollmentToSheets(formData);
      
      if (result.success) {
        onSubmit(formData);
      } else {
        setError(result.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center rounded-2xl overflow-hidden shadow-xl">
          <div className="lg:w-1/2 bg-blue-600 dark:bg-blue-800 text-white p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Certification Journey Today
            </h2>
            <p className="text-blue-100 mb-8">
              Fill out the form to receive detailed information about our certification programs, upcoming batches, and special offers.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-700 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Personalized Learning Path</h3>
                  <p className="text-blue-100 text-sm">
                    Our counselors will help you choose the right certification based on your career goals
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-700 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Flexible Payment Options</h3>
                  <p className="text-blue-100 text-sm">
                    Installment plans and scholarship opportunities available for eligible candidates
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-700 dark:bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Job Guarantee Program</h3>
                  <p className="text-blue-100 text-sm">
                    Ask about our special program that guarantees job placement after certification
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Request Information
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your contact number"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Course Interest
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a course</option>
                  {COURSES.map(course => (
                    <option key={course.id} value={course.title}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Get Course Information <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Thank You Message Component
const ThankYouMessage = ({ userData, onReturn }) => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl max-w-2xl mx-auto"
      >
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thank You, {userData?.name}!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          We've received your information and will contact you shortly at {userData?.email} with details about {userData?.course || "our courses"}.
        </p>
        <button
          onClick={onReturn}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Return to Courses
        </button>
      </motion.div>
    </div>
  </section>
);

// Main Component (Updated to always show contact form)
export default function CertificationCoursesPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const enrollRef = useRef<HTMLDivElement>(null);

  // Handle access form submission
  const handleAccessFormSubmit = (formData) => {
    setUserData(formData);
    setHasAccess(true);
  };

  // Handle enroll button click from course details
  const handleEnrollClick = (courseTitle) => {
    setSelectedCourse(courseTitle);
    // Scroll to the enrollment form section
    enrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle enrollment form submission
  const handleEnrollmentSubmit = (enrollmentData: UserData) => {
    setUserData(enrollmentData);
    setShowThankYou(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return from thank you message
  const handleReturnFromThankYou = () => {
    setShowThankYou(false);
    setSelectedCourse('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user hasn't provided details, show access form screen
  if (!hasAccess) {
    return <AccessFormScreen onFormSubmit={handleAccessFormSubmit} />;
  }

  return (
    <>
      {showThankYou ? (
        <ThankYouMessage userData={userData} onReturn={handleReturnFromThankYou} />
      ) : (
        <>
          <HeroSection />
          <BenefitsSection />
          <CoursesContainer onEnrollClick={handleEnrollClick} />
          
          {/* Always show the enrollment form */}
          <div ref={enrollRef}>
            <EnrollmentForm 
              preSelectedCourse={selectedCourse} 
              userData={userData}
              onSubmit={handleEnrollmentSubmit} 
            />
          </div>
        </>
      )}
      
      <Footers />
    </>
  );
}