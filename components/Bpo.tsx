"use client";

import React, { useRef, forwardRef } from "react";
import Image from "next/image";
import { AnimatedBeam } from "./ui/animated-beam";
import { cn } from "@/lib/utils";

interface BpoProps {
  className?: string; // Optional CSS classes for the container
  containerStyle?: React.CSSProperties; // Optional inline styles for the container
  userIcon?: React.ReactNode; // Optional custom user icon
  timaLogoSrc?: string; // Optional custom Tima logo source
  services?: { icon: string; alt?: string }[]; // Optional service icons
  beamConfig?: {
    curvature?: number;
    duration?: number;
    pathColor?: string;
    gradientStartColor?: string;
    gradientStopColor?: string;
  }; // Optional configuration for the animated beams
}

// Circle Component
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const Bpo: React.FC<BpoProps> = ({
  className = "",
  containerStyle,
  userIcon = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#050A90"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  timaLogoSrc = "/Tima Logo.png",
  services = [
    { icon: "/CONTACT.svg", alt: "Contact" },
    { icon: "/PEOPLE.svg", alt: "People" },
    { icon: "/TECH.svg", alt: "Tech" },
  ],
  beamConfig = {
    curvature: 0.2,
    duration: 2,
    pathColor: "gray",
    gradientStartColor: "#ffaa40",
    gradientStopColor: "#9c40ff",
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const timaLogoRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    services.map(() => React.createRef())
  );

  return (
    <div
      className={`relative flex h-screen w-full items-center justify-center overflow-hidden ${className}`}
      style={containerStyle}
      ref={containerRef}
    >
      {/* User Icon */}
      <Circle ref={userRef} className="absolute left-1/4 -translate-x-1/2">
        {userIcon}
      </Circle>

      {/* Tima Logo */}
      <Circle ref={timaLogoRef} className="z-10">
        <Image
          src={timaLogoSrc}
          alt="Tima Logo"
          width={48}
          height={48}
          className="object-contain"
        />
      </Circle>

      {/* Service Icons */}
      <div className="absolute right-1/4 -translate-x-1/2 flex flex-col gap-6">
        {services.map((service, index) => (
          <Circle key={index} ref={serviceRefs.current[index]}>
            <Image
              src={service.icon}
              alt={service.alt || `Service Icon ${index}`}
              width={32}
              height={32}
              className="object-contain"
            />
          </Circle>
        ))}
      </div>

      {/* Animated Beams */}
      <div className="absolute inset-0 z-0">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={userRef}
          toRef={timaLogoRef}
          curvature={beamConfig.curvature}
          duration={beamConfig.duration}
          pathColor={beamConfig.pathColor}
          gradientStartColor={beamConfig.gradientStartColor}
          gradientStopColor={beamConfig.gradientStopColor}
        />
        {services.map((_, index) => (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={timaLogoRef}
            toRef={serviceRefs.current[index]}
            curvature={beamConfig.curvature}
            duration={beamConfig.duration}
            pathColor={beamConfig.pathColor}
            gradientStartColor={beamConfig.gradientStartColor}
            gradientStopColor={beamConfig.gradientStopColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Bpo;
