import React, { useEffect, useState } from "react";
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
  const [isBoxVisible, setIsBoxVisible] = useState(false); // Start hidden by default
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    // Show the pagination box and Next/Play button after 0.5 seconds
    const timer = setTimeout(() => {
      setIsBoxVisible(true);
      setIsImageVisible(true);
    }, 500); // 0.5-second delay before showing the full pagination box and button

    return () => clearTimeout(timer); // Cleanup the timer
  }, [currentScreenIndex]);

  const handleNextClick = () => {
    // Reset the visibility of the box and button before showing the next screen
    setIsBoxVisible(false);
    setIsImageVisible(false);

    // Move to the next screen after delay
    setTimeout(() => {
      onNext(); // Move to the next screen
      setIsBoxVisible(true); // Show the pagination box and button again
      setIsImageVisible(true);
    }, 500);
  };

  // Handle pagination dot click
  const handleDotClick = (index: number) => {
    // Reset visibility for the animation before changing screens
    setIsBoxVisible(false);
    setIsImageVisible(false);

    // Move to the selected screen
    setTimeout(() => {
      onDotClick(index); // Move to the screen associated with the dot
      setIsBoxVisible(true); // Show the pagination box again with animation
      setIsImageVisible(true); // Reapply fade-in animation for the image
    }, 500); // 0.5-second delay
  };

  return (
    <div
      className="relative flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {currentScreenIndex !== 6 && (
        <button
          className="absolute top-4 right-4 text-white text-sm bg-transparent"
          onClick={onSkip}
        >
          Skip
        </button>
      )}

      {/* Fade-in image for all screens except the 4th one */}
      {isImageVisible && currentScreenIndex !== 4 && (
        <img src={imageUrl} alt="logo" className="h-48 max-w-full fade-in-animation" />
      )}

      {/* Special handling for the 4th screen */}
      {currentScreenIndex === 4 && (
        <div className="flex flex-col items-center w-full">
          {/* Full-width Image */}
          <img src={imageUrl} alt="logo" className="h-48 max-w-full fade-in-animation" />

          {/* Full-width Join Telegram button directly below the image */}
          <button
            className="bg-no-repeat bg-center bg-cover text-white font-semibold rounded-full flex items-center justify-center mt-4"
            style={{
              backgroundImage: "linear-gradient(90deg, #6D00DA 0%, #00DAF7 100%)",
              width: "90%", // Make it full width
              height: "10vh",
              minHeight: "50px",
              maxHeight: "70px",
            }}
          >
            Join the TG channel
          </button>
        </div>
      )}

      {currentScreenIndex === 6 ? (
       <div
       className={`relative w-full rounded-t-3xl p-6 shadow-lg border-t-2 ${isBoxVisible ? "slide-up" : "hidden-box"}`}
       style={{
         background: "#2B004E",
         borderTopColor: "#6D00DA",
       }}
     >
       <div className="relative flex flex-col items-center">
         {/* GIF added here */}
         <img
           src="./images/onboarding/gift.gif" // Replace this with your actual GIF file
           alt="Animated GIF"
           className="block w-3/4 sm:w-2/4 lg:w-2/5 h-auto mb-6"
         />
       </div>
       <button
         className="bg-no-repeat bg-center bg-cover text-white font-semibold rounded-full flex items-center justify-center"
         style={{
           backgroundImage: "linear-gradient(90deg, #6D00DA 0%, #00DAF7 100%)",
           width: "100%", // Make it full width
           maxWidth: "500px", // Increased max width
           height: "8vh", // Increased height for a bigger button
         }}
       >
         <span role="img" aria-label="gift" className="mr-2">
           🎁
         </span>
         Get your present
       </button>
     </div>
      ) : (
        <>
          {/* Pagination Box */}
          <div className={`absolute w-full bottom-0 ${isBoxVisible ? "slide-up" : "hidden-box"}`}>
            <PaginationBox
              title={title}
              description={description}
              currentScreenIndex={currentScreenIndex}
              totalScreens={totalScreens}
              onDotClick={handleDotClick} // Trigger animation on dot click
              onNext={handleNextClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OnBoardingScreen;
