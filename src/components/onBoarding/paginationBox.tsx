import React from "react";

interface PaginationBoxProps {
  title: string;
  description: string;
  currentScreenIndex: number;
  totalScreens: number;
  onDotClick: (index: number) => void;
}

const PaginationBox: React.FC<PaginationBoxProps> = ({
  title,
  description,
  currentScreenIndex,
  totalScreens,
  onDotClick,
}) => {
  return (
    <div
      className="w-full rounded-t-3xl p-6 shadow-lg border-t-2"
      style={{
        background: "linear-gradient(180deg, #2B004E 0%, #08142B 76.28%)",
        borderTopColor: "#6D00DA",
      }}
    >
      <h2 className="text-white text-center font-bold text-lg mb-2">{title}</h2>
      <p className="text-gray-300 text-center text-sm mb-6">{description}</p>

      <div className="flex justify-center items-center mb-6">
      {Array.from({ length: totalScreens }).map((_, index) => (
          <div
            key={index}
            onClick={() => onDotClick(index)} // Handle dot clicks
            className={`cursor-pointer mx-1 rounded-full ${
              index === currentScreenIndex
                ? "bg-[#6D00DA] h-2 w-8"
                : "border-2 border-[#6D00DA] h-2 w-2"
            }`}
        ></div>
        ))}
      </div>
    </div>
  );
};

export default PaginationBox;
