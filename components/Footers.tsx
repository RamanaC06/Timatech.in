"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaHeart, 
  FaInstagram,
  FaYoutube,
  FaHome,
  FaInfo,
  FaCloud,
  FaCode,
  FaCertificate,
  FaBusinessTime,
  FaMapMarkerAlt,
  FaArrowUp,
  FaRegNewspaper,
  FaUserShield,
  FaGlobe
} from "react-icons/fa";

// Types
interface ContactLinkProps {
  icon: React.ReactNode;
  href: string;
  text: string;
  external?: boolean;
}

interface FooterProps {
  className?: string;
}

// Helper Components
const ContactLink: React.FC<ContactLinkProps> = ({ icon, href, text, external = false }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group hover:translate-x-1"
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <span className="group-hover:underline">{text}</span>
  </a>
);

const SocialButton: React.FC<ContactLinkProps> = ({ icon, href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative inline-flex items-center justify-center group"
    aria-label={text}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-all duration-300 overflow-hidden z-10">
      {icon}
    </div>
  </a>
);

const FooterLink: React.FC<{
  icon: React.ReactNode;
  href: string;
  text: string;
}> = ({ icon, href, text }) => (
  <a
    href={href}
    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group hover:translate-x-1"
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <span className="group-hover:underline">{text}</span>
  </a>
);

const Footers: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`relative text-gray-200 ${className}`} id="footer">
      {/* Background with modern gradient and pattern */}
      <div className="absolute inset-0 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
      </div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden -translate-y-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 text-gray-950">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-20 pb-8 px-6">
        {/* Top section - Logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 pb-10 border-b border-gray-800/50">
          <div className="mb-10 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="relative w-14 h-14 mr-3">
                <Image
                  src="/Tima monogram logo 6.png"
                  alt="TIMA Logo"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  TIMA
                </h2>
                <p className="text-sm text-gray-400">Integrated Technology</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering businesses with innovative solutions and cutting-edge technology for a digitally transformed future.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for updates and tech insights.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-gray-200 px-4 py-2 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-r-lg font-medium transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Our Mission Section (replacing About Us) */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Our Mission
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>
            
            <div className="bg-gray-900/30 rounded-lg p-5 border border-gray-800/50">
              <p className="text-gray-300 leading-relaxed mb-4">
                Transforming businesses through innovative technology solutions that drive operational excellence and maximize ROI.
              </p>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400">
                  <FaGlobe />
                </div>
                <span>Global enterprise solutions</span>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400">
                  <FaUserShield />
                </div>
                <span>Trust & security focused</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>
            <div className="grid gap-4">
              <FooterLink 
                icon={<FaHome />}
                href="/"
                text="Home"
              />
              <FooterLink 
                icon={<FaInfo />}
                href="/#about"
                text="About Us"
              />
              <FooterLink 
                icon={<FaCertificate />}
                href="/certification-courses"
                text="Certifications"
              />
              <FooterLink 
                icon={<FaBusinessTime />}
                href="/#services"
                text="Services"
              />
              <FooterLink 
                icon={<FaRegNewspaper />}
                href="/blog"
                text="Latest Insights"
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>
            <div className="grid gap-4">
              <FooterLink 
                icon={<FaCloud />}
                href="/cloud-services"
                text="Cloud Services"
              />
              <FooterLink 
                icon={<FaCode />}
                href="/software-services"
                text="Software Development"
              />
              <FooterLink 
                icon={<FaBusinessTime />}
                href="/bpo-services"
                text="Business Process Outsourcing"
              />
              <FooterLink 
                icon={<FaCertificate />}
                href="/certification-courses"
                text="Professional Training"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>

            <div className="bg-gray-900/40 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex-shrink-0 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div className="text-gray-400 text-sm">
                  <p> 50, Sundarajapuram AA road</p>
                  <p>Madurai, Tamil Nadu 625011</p>
                  <p>India</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <ContactLink 
                icon={<FaEnvelope />}
                href="mailto:info@timatech.in"
                text="info@timatech.in"
              />
              <ContactLink 
                icon={<FaPhone />}
                href="tel:+919944608331"
                text="+91 9944608331"
              />
              <ContactLink 
                icon={<FaPhone />}
                href="tel:+918248963902"
                text="+91 8248963902"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section with Social and Copyright */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <SocialButton 
                icon={<FaLinkedin />} 
                href="https://www.linkedin.com/company/tima-integrated-technologies/posts/?feedView=all"
                text="LinkedIn"
              />
              <SocialButton 
                icon={<FaInstagram />} 
                href="https://instagram.com/timatech"
                text="Instagram"
              />
              <SocialButton 
                icon={<FaYoutube />} 
                href="https://youtube.com/timatech"
                text="YouTube"
              />
            </div>
            
            <p className="text-gray-500 text-sm">
              © {currentYear} TIMA Tech™. All rights reserved.
              <span className="ml-2 inline-flex items-center text-pink-500">
                Made with <FaHeart className="mx-1 animate-pulse" /> in India
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footers;