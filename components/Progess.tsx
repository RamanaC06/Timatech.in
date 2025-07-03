import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { WobbleCard } from "./ui/wobble-card";
import { SparklesCore } from "./ui/sparkles";
import { Timeline } from "./ui/timeline";
import { TextAnimate } from "./ui/text-animate";

const Progress = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Color theme with improved contrast
  const colors = {
    primary: "#6A0DAD",
    secondary: "#9A4EFF",
    accent: "#FF5E7D",
    background: "bg-gray-50 dark:bg-gray-900"
  };

  const data = [
    {
      title: "2018",
      subtitle: "The Beginning",
      content: (
        <WobbleCard
          containerClassName="bg-white dark:bg-gray-800 shadow-xl border border-purple-200 dark:border-purple-900 relative overflow-hidden w-full"
          className="rounded-2xl p-6 transition-all duration-500"
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hover:opacity-60 transition-opacity duration-700">
            <SparklesCore
              id="sparkles-2018"
              background="transparent"
              minSize={0.4}
              maxSize={1.5}
              particleDensity={70}
              speed={1}
              particleColor={colors.primary}
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-bold text-white bg-purple-700 dark:bg-purple-600 rounded-full">
              Founded
            </div>
            <TextAnimate
              className="text-gray-800 dark:text-white md:text-2xl text-xl font-bold leading-relaxed mb-4"
              animation="slideUp"
              duration={0.7}
              by="word"
            >
              TIMA started its journey in 2018, focusing on tool design and
              engineering solutions. With a small yet passionate team, we
              prioritized quality and innovation, laying a strong foundation for
              our future growth.
            </TextAnimate>
            <div className="flex items-center mt-4 text-purple-800 dark:text-purple-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Pioneering innovation</span>
            </div>
          </div>
        </WobbleCard>
      ),
      image: "/Founding.svg",
    },
    {
      title: "2023",
      subtitle: "Expansion Era",
      content: (
        <WobbleCard
          containerClassName="bg-white dark:bg-gray-800 shadow-xl border border-purple-200 dark:border-purple-900 relative overflow-hidden w-full"
          className="rounded-2xl p-6 transition-all duration-500"
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hover:opacity-60 transition-opacity duration-700">
            <SparklesCore
              id="sparkles-2023"
              background="transparent"
              minSize={0.4}
              maxSize={1.5}
              particleDensity={70}
              speed={1}
              particleColor={colors.secondary}
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-bold text-white bg-purple-700 dark:bg-purple-600 rounded-full">
              Expansion
            </div>
            <TextAnimate
              className="text-gray-800 dark:text-white md:text-2xl text-xl font-bold leading-relaxed mb-4"
              animation="slideUp"
              duration={0.7}
              by="word"
            >
              By 2023, TIMA transitioned into a leading IT service provider. We
              expanded our offerings to include cloud engineering, DevOps, and
              software development, empowering professionals with corporate
              training and certifications.
            </TextAnimate>
            <div className="flex items-center mt-4 text-purple-800 dark:text-purple-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Service transformation</span>
            </div>
          </div>
        </WobbleCard>
      ),
      imageGrid: [
        "/CONTACT.svg",
        "/Certification.svg",
        "/Cloud.svg",
        "/Software dev.svg",
      ],
    },
    {
      title: "Present",
      subtitle: "Global Impact",
      content: (
        <WobbleCard
          containerClassName="bg-white dark:bg-gray-800 shadow-xl border border-purple-200 dark:border-purple-900 relative overflow-hidden w-full"
          className="rounded-2xl p-6 transition-all duration-500"
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hover:opacity-60 transition-opacity duration-700">
            <SparklesCore
              id="sparkles-present"
              background="transparent"
              minSize={0.4}
              maxSize={1.5}
              particleDensity={70}
              speed={1}
              particleColor={colors.accent}
              className="w-full h-full"
            />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-bold text-white bg-purple-700 dark:bg-purple-600 rounded-full">
              Global Presence
            </div>
            <TextAnimate
              className="text-gray-800 dark:text-white md:text-2xl text-xl font-bold leading-relaxed mb-4"
              animation="slideUp"
              duration={0.7}
              by="word"
            >
              TIMA partnered with Pearson to establish global certification and
              placement services. We now provide training and certifications in
              AWS, Azure, Cisco, and Full Stack development, enabling businesses
              and individuals to succeed globally.
            </TextAnimate>
            <div className="flex items-center mt-4 text-purple-800 dark:text-purple-300 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Worldwide certification partner</span>
            </div>
          </div>
        </WobbleCard>
      ),
      image: "/Global.svg",
    },
  ];

  // Intersection Observer to track visible timeline items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`relative py-16 px-4 ${colors.background}`}>
      

      <Timeline
        data={data.map((item, index) => ({
          title: (
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-300">
                {item.title}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
                {item.subtitle}
              </span>
            </div>
          ),
          content: (
            <motion.div
              className={`timeline-item flex flex-col ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8`}
              data-index={index}
              variants={fadeInVariants}
              initial="hidden"
              animate={activeIndex === index ? "visible" : "hidden"}
            >
              {/* Image or Image Grid */}
              <div className="flex-shrink-0 w-full md:w-3/5">
                {item.imageGrid ? (
                  <div className="grid grid-cols-2 gap-4">
                    {item.imageGrid.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        className="overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-800 p-3"
                      >
                        <Image
                          src={img}
                          alt={`${item.title} Image ${i + 1}`}
                          width={300}
                          height={300}
                          className="w-full h-auto transition-transform duration-500 hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: 1, transition: { duration: 0.5 } }}
                    className="overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 p-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="flex-shrink-0 w-full md:w-2/5">{item.content}</div>
            </motion.div>
          ),
          dotClassName: `bg-purple-700 dark:bg-purple-600 shadow-lg transition-all duration-500 hover:scale-110`,
          lineClassName: "bg-purple-400 dark:bg-purple-700 opacity-70"
        }))}
        containerClassName="mx-auto max-w-6xl"
        lineClassName="bg-purple-200 dark:bg-purple-900"
        dotClassName="w-8 h-8 bg-purple-600"
      />
    </div>
  );
};

export default Progress;