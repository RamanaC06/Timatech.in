"use client";

import Image from "next/image";
import { OrbitingCircles } from "./ui/orbiting-circles";
import React from "react";

interface CloudServicesProps {
  className?: string; // Optional prop for additional CSS classes
  containerStyle?: React.CSSProperties; // Optional inline styles for the container
  title?: string; // Optional prop to customize the title
  icons?: { src: string; alt: string }[]; // Optional prop to customize icons
}

const defaultIcons = [
  { src: "/AWS.svg", alt: "AWS" },
  { src: "/AZURE.svg", alt: "Azure" },
  { src: "/GCP.svg", alt: "GCP" },
];

const CloudServices: React.FC<CloudServicesProps> = ({
  className = "",
  containerStyle,
  title = "CLOUD\nCONSULTING",
  icons = defaultIcons,
}) => {
  return (
    <div
      className={`relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl ${className}`}
      style={containerStyle}
    >
      {/* Central Title */}
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        {title}
      </span>

      {/* Orbiting Circles with Cloud Service Icons */}
      <OrbitingCircles iconSize={60} radius={160} duration={15} path={false}>
        {icons.map((icon, index) => (
          <Image
            key={index}
            src={icon.src}
            alt={icon.alt}
            width={60}
            height={60}
            className="object-contain"
          />
        ))}
      </OrbitingCircles>
    </div>
  );
};

export default CloudServices;
