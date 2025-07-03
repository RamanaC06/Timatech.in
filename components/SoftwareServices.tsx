"use client";

import Image from "next/image";
import Marquee from "./ui/marquee";
import React from "react";

interface Service {
  title: string;
  tools: { name: string; src: string }[];
}

interface SoftwareServicesProps {
  className?: string; // Optional prop for additional CSS classes
  containerStyle?: React.CSSProperties; // Optional inline styles for the container
  services?: Service[]; // Optional prop to override the default services
}

const defaultServices: Service[] = [
  {
    title: "Web Development",
    tools: [
      { name: "Next.js", src: "/NEXT JS.svg" },
      { name: "React", src: "/REACT.svg" },
      { name: "Mongo DB", src: "/MONGO.svg" },
    ],
  },
  {
    title: "Mobile App Development",
    tools: [
      { name: "Flutter", src: "/FLUTTER.svg" },
      { name: "React Native", src: "/REACT.svg" },
    ],
  },
  {
    title: "DevOps & Automation",
    tools: [
      { name: "AWS DevOps", src: "/AWS.svg" },
      { name: "Azure DevOps", src: "/AZURE.svg" },
    ],
  },
];

export default function SoftwareServices({
  className = "",
  containerStyle,
  services = defaultServices,
}: SoftwareServicesProps) {
  return (
    <div className={`space-y-10 p-10 ${className}`} style={containerStyle}>
      <div className="rounded-lg border p-6 bg-white shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Software Development Services
        </h2>
        <Marquee>
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg mx-4 border"
            >
              {/* Service Title */}
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {service.title}
              </h3>
              {/* Icons */}
              <div className="flex space-x-6">
                {service.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="flex items-center justify-center">
                    <Image
                      src={tool.src}
                      alt={tool.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
