"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaLightbulb, FaShieldAlt, FaChartLine } from "react-icons/fa";
import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
  image: string;
  color: string;
};

const features: Feature[] = [
  {
    title: "Expertise",
    description: "A highly skilled and dynamic team with years of experience across multiple industries.",
    icon: <FaCheckCircle className="w-8 h-8" />,
    image: "/Experts.svg",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Innovation",
    description: "Cutting-edge technology solutions that ensure your business stays ahead of the curve.",
    icon: <FaLightbulb className="w-8 h-8" />,
    image: "/Innovate.svg",
    color: "from-amber-400 to-amber-600",
  },
  {
    title: "Reliability",
    description: "A commitment to delivering on our promises and supporting our clients every step of the way.",
    icon: <FaShieldAlt className="w-8 h-8" />,
    image: "/Performance.svg",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Growth-Focused",
    description: "From startups to established enterprises, we tailor our services to meet your unique goals and objectives.",
    icon: <FaChartLine className="w-8 h-8" />,
    image: "/Growth Focused.svg",
    color: "from-rose-400 to-rose-600",
  },
];

export default function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/50 rounded-full">
            Why Choose Us?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Our Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Differentiators</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Feature Icons Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer relative overflow-hidden rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-all duration-300 ${
                  activeFeature === index ? 'scale-[1.03] ring-2 ring-offset-4 dark:ring-offset-slate-900 ring-offset-white ring-' + feature.color.split(" ")[1] : 'hover:scale-[1.02]'
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.08] dark:opacity-[0.16]`}></div>
                <div className="relative p-6 flex flex-col items-center text-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature !== null ? activeFeature : "default"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 backdrop-blur-sm"
            >
              {activeFeature !== null ? (
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${features[activeFeature].color} text-white mr-4`}>
                      {features[activeFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{features[activeFeature].title}</h3>
                  </div>
                  
                  <div className="flex-grow relative bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-6 overflow-hidden">
                    <div className="relative z-10">
                      <Image
                        src={features[activeFeature].image}
                        alt={features[activeFeature].title}
                        width={500}
                        height={500}
                        className="mx-auto max-h-64 w-auto object-contain"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].color} opacity-[0.05] dark:opacity-[0.1]`}></div>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300">
                    {features[activeFeature].description}
                  </p>
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center h-full text-center">
                  <div className="text-3xl mb-6 text-slate-400 dark:text-slate-500">👈</div>
                  <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">
                    Select a feature to learn more
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                    Click on any of our key differentiators to see detailed information and visualization
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}