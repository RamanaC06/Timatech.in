"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhone } from "react-icons/fa6";

interface HeroProps {
  // Props can be added here if needed
}

const Hero: React.FC<HeroProps> = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleContactClick = (): void => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = (): void => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Geometric patterns */}
        <div className="absolute h-full w-full opacity-20">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "linear-gradient(rgba(74, 111, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 111, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
        </div>
        
        {/* Floating gradient orbs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { 
            opacity: 0.3, 
            scale: 1,
            y: [0, -15, 0],
            x: [0, 10, 0]
          } : {}}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-600 to-blue-400 blur-3xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { 
            opacity: 0.2, 
            scale: 1,
            y: [0, 20, 0],
            x: [0, -15, 0]
          } : {}}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1 
          }}
          className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-gradient-to-l from-purple-600 to-indigo-500 blur-3xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { 
            opacity: 0.15, 
            scale: 1,
            y: [0, -10, 0],
            x: [0, -5, 0]
          } : {}}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 0.5 
          }}
          className="absolute top-2/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <Image
                src="/Tima Logo.png"
                alt="TIMA Logo"
                width={180}
                height={180}
                className="drop-shadow-md"
              />
            </motion.div>

            {/* Heading and Underline */}
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl md:text-6xl"
              >
                TIMA Integrated <span className="text-indigo-600">Technology</span>
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={isLoaded ? { width: "40%" } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-3 h-1 rounded-full bg-gradient-to-r from-indigo-950 to-indigo-500"
              />
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1 }}
              className="max-w-xl text-lg leading-relaxed text-slate-700"
            >
              Together we innovate, empower, and deliver exceptional technology
              solutions tailored to your unique business needs, driving growth
              and sustainable success in the digital era.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-2 flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
            >
              <button
                onClick={handleContactClick}
                className="group flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-indigo-950 to-indigo-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-indigo-200/50 hover:shadow-xl"
              >
                <FaPhone className="text-sm" />
                <span>Get in Touch</span>
              </button>
              
              <button
                onClick={handleExploreClick}
                className="group flex items-center justify-center space-x-2 rounded-full border-2 border-indigo-600 px-6 py-3 font-medium text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white"
              >
                <span>Explore Our Services</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration & Graphics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Main Illustration */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Image
                  src="/Solution.svg"
                  alt="TIMA Technology Solutions"
                  width={600}
                  height={600}
                  className="w-full max-w-xl drop-shadow-2xl"
                  priority
                />
              </motion.div>

              

              {/* The tagline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute -bottom-6 right-10 rounded-xl bg-gradient-to-r from-indigo-950 to-indigo-600 px-6 py-4 shadow-xl"
              >
                <p className="text-lg font-semibold italic text-white">
                  "Together We Rise, Together We Thrive."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { number: "10+", text: "Years Experience" },
            { number: "150+", text: "Projects Completed" },
            { number: "100%", text: "Client Satisfaction" },
            { number: "24/7", text: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
              className="flex flex-col items-center justify-center rounded-2xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm"
            >
              <span className="text-4xl font-bold text-indigo-950">{stat.number}</span>
              <span className="text-slate-700">{stat.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;