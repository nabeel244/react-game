import React from "react";
import './onBoardingStyle.css';

interface PaginationBoxProps {
  title: string;
  description: string;
  currentScreenIndex: number;
  totalScreens: number;
  onDotClick: (index: number) => void;
  onNext: () => void;
}

const PaginationBox: React.FC<PaginationBoxProps> = ({
  title,
  description,
  currentScreenIndex,
  totalScreens,
  onDotClick,
  onNext,
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

      {/* Flex container to align dots and Next button in the same row */}
      <div className="flex justify-center items-center space-x-4">
        {/* Dots container */}
        {currentScreenIndex === 5 ? (
          <>
            <button
              className="bg-[#6D00DA] text-white font-semibold py-1 px-6 rounded-full"
              onClick={onNext}
              style={{
                backgroundImage: "linear-gradient(90deg, #6D00DA 0%, #00DAF7 100%)",
                width: "calc(100% - 40px)", // Adjust width based on available space
                maxWidth: "500px",
                height: "auto",
                minHeight: "50px",
                maxHeight: "70px",
                margin: "0 auto", // Center the button
              }}
            >
              Play
            </button>
          </>
        ) :
          <>
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: totalScreens }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => onDotClick(index)} // Handle dot clicks
                  className={`cursor-pointer rounded-full ${index === currentScreenIndex
                    ? "bg-[#6D00DA] h-3 w-8"
                    : "border-2 border-[#6D00DA] h-2 w-2"
                    }`}
                ></div>
              ))}
            </div>
            <button
              className="bg-[#6D00DA] text-white font-semibold py-1 px-6 rounded-lg"
              onClick={onNext}
              style={{
                backgroundColor: "#6D00DA",
              }}
            >
              Next
            </button>
          </>
        }

      </div>
    </div>
  );
};

export default PaginationBox;
