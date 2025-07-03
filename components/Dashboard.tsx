import React from 'react';
import { BentoGrid, BentoCard } from './ui/bento-grid';
import Bpo from './Bpo';
import CloudServices from './CloudServices';
import SoftwareServices from './SoftwareServices';
import TechIconCloud from './TechIconCloud';
import { AuroraBackground } from './ui/aurora-background';
import { CodeIcon, CloudIcon, LayersIcon, GraduationCapIcon, ArrowRightIcon } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora Background - Restored */}
      <AuroraBackground className="absolute inset-0 -z-10 w-full h-full opacity-70" />
      
      {/* Decorative Elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-600/10 dark:bg-blue-400/10 rounded-full blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 dark:bg-purple-400/10 rounded-full blur-3xl -z-5"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Dashboard Header */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Enterprise Services
          </h1>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Comprehensive solutions designed to drive your business forward
          </p>
        </div>

        {/* Services Grid - Creative Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* 1. SOFTWARE SERVICES - Larger Card */}
          <div className="md:col-span-6 group">
            <div className="h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm flex flex-col">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-blue-900/20">
                <SoftwareServices
                  className="w-full h-full object-cover scale-95 group-hover:scale-100 transition-all duration-500"
                  containerStyle={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex items-center justify-center">
                  <CodeIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Software Development</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Custom enterprise solutions engineered for scalability, security, and performance excellence.
                  </p>
                </div>
                <a href="/software-services" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 group-hover:translate-x-1 transition-transform">
                  Explore solutions <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. CLOUD SERVICES */}
          <div className="md:col-span-6 group">
            <div className="h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm flex flex-col">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-cyan-900/20">
                <CloudServices
                  className="w-full h-full object-cover scale-95 group-hover:scale-100 transition-all duration-500"
                  containerStyle={{
                    height: '100%',
                    width: '100%',
                    border: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="CLOUD&#10;SERVICES"
                />
                <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex items-center justify-center">
                  <CloudIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Cloud Consulting</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Strategic infrastructure optimization with expert guidance for seamless digital transformation.
                  </p>
                </div>
                <a href="/cloud-services" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group-hover:translate-x-1 transition-transform">
                  Discover platforms <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 3. CERTIFICATION COURSES - Smaller Card */}
          <div className="md:col-span-6 group">
            <div className="h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm flex flex-col">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-teal-900/20">
                <TechIconCloud
                  className="w-full h-full object-cover scale-95 group-hover:scale-100 transition-all duration-500"
                  containerStyle={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex items-center justify-center">
                  <GraduationCapIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Certification Programs</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Industry-recognized training programs to elevate your team's technical capabilities.
                  </p>
                </div>
                <a href="/certification-courses" className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 group-hover:translate-x-1 transition-transform">
                  Browse programs <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* 4. BPO */}
          <div className="md:col-span-6 group">
            <div className="h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm flex flex-col">
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-pink-900/20">
                <Bpo
                  className="w-full h-full object-cover scale-95 group-hover:scale-100 transition-all duration-500"
                  containerStyle={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md flex items-center justify-center">
                  <LayersIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Business Process Outsourcing</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Operational excellence through specialized process management and optimization.
                  </p>
                </div>
                <a href="/bpo-services" className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;