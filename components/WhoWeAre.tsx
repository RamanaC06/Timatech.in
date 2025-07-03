"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { SparklesCore } from "./ui/sparkles";
import { TextAnimate } from "./ui/text-animate";

const WhoWeAre = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center space-y-10 md:space-y-0">
        {/* Text Content in WobbleCard with Sparkles */}
        <motion.div
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <WobbleCard
            containerClassName="bg-white shadow-lg border border-gray-200 relative overflow-hidden"
            className="rounded-xl p-6"
          >
            {/* Sparkles Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <SparklesCore
                id="wobble-sparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1.2}
                particleDensity={80}
                speed={1.2}
                particleColor="#6A0DAD"
              />
            </div>

            {/* Text Content */}
            <div className="relative z-10">
              <TextAnimate
                animation="slideUp"
                by="word"
                duration={0.6}
                delay={0.1}
                className="text-3xl font-extrabold text-[#050a90] sm:text-4xl"
              >
                Who We Are
              </TextAnimate>
              <TextAnimate
                animation="fadeIn"
                by="line"
                duration={0.5}
                delay={0.3}
                className="mt-4 text-lg text-gray-700"
              >
                At TIMA Integrated Technology, we are more than just a tech
                company—we are a partner in transformation. Our team is fueled
                by a passion for innovation, driven by expertise, and focused
                on delivering exceptional value to our clients.
              </TextAnimate>
            </div>
          </WobbleCard>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/Business.svg" // Ensure this image exists in your public/images directory
            alt="Team Collaboration"
            width={500}
            height={300}
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
