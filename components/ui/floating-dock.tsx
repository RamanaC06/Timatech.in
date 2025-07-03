"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        handleScroll={handleScroll}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        handleScroll={handleScroll}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  handleScroll,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  handleScroll: (href: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => handleScroll(item.href)}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  handleScroll,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  handleScroll: (href: string) => void;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.title}
          onClick={() => handleScroll(item.href)}
          className="flex items-center justify-center"
        >
          <IconContainer mouseX={mouseX} icon={item.icon} />
        </button>
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  icon,
}: {
  mouseX: MotionValue;
  icon: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { stiffness: 150, damping: 12 });
  const widthIconSpring = useSpring(widthIcon, { stiffness: 150, damping: 12 });
  const heightIconSpring = useSpring(heightIcon, { stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center"
    >
      <motion.div
        style={{ width: widthIconSpring, height: heightIconSpring }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
