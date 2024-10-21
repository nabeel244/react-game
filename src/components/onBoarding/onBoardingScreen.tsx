import React from "react";
import PaginationBox from "./paginationBox";

interface OnBoardingScreenProps {
  title: string;
  description: string;
  backgroundImage: string;
  imageUrl: string;
  onNext: () => void;
  onSkip: () => void;
  currentScreenIndex: number;
  totalScreens: number;
  onDotClick: (index: number) => void;
}

const OnBoardingScreen: React.FC<OnBoardingScreenProps> = ({
  title,
  description,
  backgroundImage,
  imageUrl,
  onNext,
  onSkip,
  currentScreenIndex,
  totalScreens,
  onDotClick,
}) => {
    console.log(currentScreenIndex, 'currenScreenIndex')
  return (
    <div
      className="relative flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <button
        className="absolute top-4 right-4 text-white text-sm bg-transparent"
        onClick={onSkip}
      >
        Skip
      </button>

      <img src={imageUrl} alt="logo" className="h-48 max-w-full" />
      <div className="w-full absolute bottom-0">
        <PaginationBox
          title={title}
          description={description}
          currentScreenIndex={currentScreenIndex}
          totalScreens={totalScreens}
          onDotClick={onDotClick}
        />
      </div>
      <button
        className="absolute bottom-8 right-20 text-white p-2 px-6 rounded-lg"
        onClick={onNext}
        style={{ backgroundColor: "#6D00DA" }}
      >
        Next
      </button>
    </div>
  );
};

export default OnBoardingScreen;
