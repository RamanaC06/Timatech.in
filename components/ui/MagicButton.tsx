import React from "react";

const MagicButton = ({
  tittle,
  icon,
  position,
  otherClasses,
  onClick, // Added onClick prop
}: {
  tittle: string;
  icon: React.ReactNode;
  position: string;
  otherClasses?: string;
  onClick?: () => void; // Added optional onClick type
}) => {
  return (
    <div>
      <button
        onClick={onClick} // Attach onClick handler
        className={`inline-flex h-12 animate-shimmer md:w-60 md:mt-10 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${otherClasses}`}
      >
        {position === "left" && icon}
        {tittle}
        {position === "right" && icon}
      </button>
    </div>
  );
};

export default MagicButton;
