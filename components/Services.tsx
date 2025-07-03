import React from 'react'
import Image from "next/image";
import { StickyScroll } from "./ui/sticky-scroll";
const content = [
    {
      title: "Training Certification",
      description:
        "Authenticate training certificates with placement support. Enhance your skill set and open up new career opportunities with our professional training programs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/Teaching.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="Training Certification"
          />
        </div>
      ),
    },
    {
      title: "BPO",
      description:
        "Streamlined outsourcing solutions for businesses. Leverage our expertise to optimize processes, reduce costs, and enhance efficiency.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/BPO.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="BPO Services"
          />
        </div>
      ),
    },
    {
      title: "Software Development",
      description:
        "Custom software solutions and sales support. Tailored applications to meet your unique business needs and enhance productivity.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/Software dev.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="Software Development"
          />
        </div>
      ),
    },
    {
      title: "Blockchain & Crypto",
      description:
        "Expertise in blockchain technologies and cryptocurrency handling. We help you harness the power of decentralized systems to enhance security, transparency, and efficiency. From blockchain development to cryptocurrency management, our solutions are tailored to meet the needs of modern businesses aiming for innovation.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/BlockChain.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="Blockchain & Crypto"
          />
        </div>
      ),
    },
    {
      title: "Cloud Services",
      description:
        "Scalable and secure cloud computing solutions. Elevate your business with our reliable and flexible cloud infrastructure.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/Cloud services.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="Cloud Services"
          />
        </div>
      ),
    },
    {
      title: "Hardware Import",
      description:
        "Importing cutting-edge hardware solutions to meet your needs. Whether it's servers, networking devices, or peripherals, we source the best global hardware to support your operational goals. With a focus on quality and reliability, we ensure that our hardware solutions keep you ahead in the technology landscape.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/Hardware Import.svg"
            width={300}
            height={300}
            className="h-auto w-auto object-contain"
            alt="Hardware Import"
          />
        </div>
      ),
    },
  ];
const Services = () => {
  return (
    <div className="relative">
    <StickyScroll content={content} />
  </div>
  )
}

export default Services