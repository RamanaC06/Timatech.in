"use client";

import { IconCloud } from "./ui/icon-cloud"; // Import the IconCloud component
import React from "react";

const icons: string[] = [
  "/AWS.svg",
  "/AZURE.svg",
  "/GCP.svg",
  "/JAVA.svg",
  "/PYTHON.svg",
  "/C.svg",
  "/REACT.svg",
  "/NEXT JS.svg",
  "/MONGO.svg",
];

interface TechIconCloudProps {
  className?: string; // Optional prop to add custom CSS classes
  containerStyle?: React.CSSProperties; // Optional inline style for the container
}

const TechIconCloud: React.FC<TechIconCloudProps> = ({
  className = "",
  containerStyle,
}) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{
        height: "100vh", // Necessary for centering the content
        ...containerStyle, // Allow additional dynamic inline styles
      }}
    >
      <IconCloud images={icons}/>
    </div>
  );
};

export default TechIconCloud;
