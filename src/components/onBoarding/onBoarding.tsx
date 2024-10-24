import React, { useState } from "react";
import OnBoardingScreen from "./onBoardingScreen";

interface Screen {
  title: string;
  description: string;
  backgroundImage: string;
  imageUrl: string;
}

export default function OnBoarding() {
  const screens: Screen[] = [
    {
      title: "Tap and earn coins",
      description: "You can use boosters and tricky strategies",
      backgroundImage: "/images/onboarding/onBoarding1.png",
      imageUrl: "/images/onboarding/coinsAmico.png",
    },
    {
      title: "Pump up the bot",
      description: "Go all the way and become the best CEO",
      backgroundImage: "/images/onboarding/onBoarding2.png",
      imageUrl: "/images/onboarding/avatars.png",
    },
    {
      title: "Upgrade your exchange",
      description: "Level up your cards, increase your income",
      backgroundImage: "/images/onboarding/onBoarding2.png",
      imageUrl: "/images/onboarding/nextStep.png",
    },
    {
      title: "Refer your friends",
      description: "You and your friend will receive bonuses",
      backgroundImage: "/images/onboarding/onBoarding2.png",
      imageUrl: "/images/onboarding/referFriend.png",
    },
    {
      title: "Subscribe to our social media",
      description: "Socialize us and subscribe to our channels",
      backgroundImage: "/images/onboarding/onBoarding2.png",
      imageUrl: "/images/onboarding/subscriber.png",
    },
    {
      title: "Use coins to get an airdrop",
      description: "Don’t forget to invite your friends. Good luck!",
      backgroundImage: "/images/onboarding/onBoarding2.png",
      imageUrl: "/images/onboarding/group.png",
    },
    {
      title: "",
      description: "",
      backgroundImage: "/images/onboarding/giftCard.png",
      imageUrl: "/images/onboarding/giftBox.png",
    },
  ];

  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);

  const handleNext = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    } else {
      console.log("Onboarding complete, navigate to home!");
      // Navigate to home or next page after the last screen
    }
  };
  const handleDotClick = (index: number) => {
    setCurrentScreenIndex(index);
  };

  const handleSkip = () => {
    console.log("Skip button clicked, navigate to home!");
    // Skip the onboarding and navigate to home
  };

  const currentScreen = screens[currentScreenIndex];

  return (
    <OnBoardingScreen
      title={currentScreen.title}
      description={currentScreen.description}
      backgroundImage={currentScreen.backgroundImage}
      imageUrl={currentScreen.imageUrl}
      onNext={handleNext}
      onSkip={handleSkip}
      currentScreenIndex={currentScreenIndex}
      totalScreens={screens.length}
      onDotClick={handleDotClick}
    />
  );
}
