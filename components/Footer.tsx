"use client";

import React from "react";
import dynamic from "next/dynamic";
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaFacebookSquare, 
  FaGithubSquare,
  FaClock
} from "react-icons/fa";

// Dynamically load the Map component
const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-700 h-full w-full rounded-lg" />
  )
});

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
    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
  >
    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
    <span className="hover:underline">{text}</span>
  </a>
);

const SocialButton: React.FC<ContactLinkProps> = ({ icon, href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-3xl text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
    aria-label={text}
  >
    {icon}
  </a>
);

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-200 pt-16 relative ${className}`} id="footer">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            {/* Logo/Company Name */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                TIMA Integrated Technology
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Empowering businesses with innovative solutions and cutting-edge technology.
              </p>
            </div>

            {/* Business Hours */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaClock className="text-pink-500" />
                Business Hours
              </h4>
              <div className="text-gray-300 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white border-b border-blue-500 pb-2 inline-block">
              Connect With Us
            </h3>
            <div className="grid gap-4">
              <ContactLink 
                icon={<FaEnvelope className="text-pink-500" />}
                href="mailto:info@timatech.in"
                text="info@timatech.in"
              />
              <ContactLink 
                icon={<FaEnvelope className="text-green-500" />}
                href="mailto:support@timatech.in"
                text="support@timatech.in"
              />
              <ContactLink 
                icon={<FaPhone className="text-yellow-500" />}
                href="tel:+919363721147"
                text="+91 9363721147"
              />
              <ContactLink 
                icon={<FaLinkedin className="text-blue-500" />}
                href="https://www.linkedin.com/company/timatech"
                text="TIMA Integrated Technology"
                external
              />
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
              <h3 className="text-2xl font-bold text-white border-b border-blue-500 pb-2">
                Our Location
              </h3>
            </div>
            <div className="h-48 w-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-gray-700">
              <Map />
            </div>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className="mt-16 py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <SocialButton 
                icon={<FaLinkedin />} 
                href="https://www.linkedin.com/company/tima-integrated-technologies/"
                text="LinkedIn"
              />
              <SocialButton 
                icon={<FaFacebookSquare />} 
                href="https://facebook.com/timatech"
                text="Facebook"
              />
              <SocialButton 
                icon={<FaGithubSquare />} 
                href="https://github.com/timatech"
                text="GitHub"
              />
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              © {currentYear} TIMA Tech™. All rights reserved.
              <span className="text-pink-500 animate-pulse">
                <FaHeart className="inline" />
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="h-2 mt-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
    </footer>
  );
};

export default Footer;