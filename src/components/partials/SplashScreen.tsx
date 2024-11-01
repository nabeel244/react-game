import  { useEffect } from "react";
import TelegramIcon from "../icons/TelegramIcon.png";
import TwitterIcon from "../icons/TwitterIcon.png";
import YoutubeIcon from "../icons/YoutubeIcon.png";
import '../onBoarding/onBoardingStyle.css'; // Import the CSS file

const socialLinks = [
  {
    title: "Telegram",
    url: "#",
    icon: TelegramIcon,
  },
  {
    title: "Youtube",
    url: "#",
    icon: YoutubeIcon,
  },
  {
    title: "Twitter",
    url: "#",
    icon: TwitterIcon,
  },
];

const splashScreenImages = [
  "/images/splash-screen/bg.png",
];

export default function SplashScreen() {

  const randomImage =
    splashScreenImages[Math.floor(Math.random() * splashScreenImages.length)];

    useEffect(() => {
      document.body.style.overflow = 'hidden';
    }, []);

  return (
    <div
      className="flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${randomImage}')` }}
    >
      {/* Animated Image */}
      <img
        src="/images/splash_logo.png"
        alt="logo"
        className={'h-48 max-w-full scale-up'} // Apply the scale-up class only after animation starts
      />

      {/* Text under the logo */}
      <div className="flex flex-col items-center justify-center mt-2">
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center text-shadow">
          Al Hamster
        </h3>
        <p className="mt-1 text-base sm:text-lg md:text-xl text-center">
          JOIN & EARN COINS
        </p>
      </div>

      {/* Social icons section */}
      <div className="flex flex-col items-center mt-auto mb-4">
        <p
          className="mt-3 font-medium"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          Socialize us to stay connected
        </p>

        {/* Social icons with staggered animation */}
        <div className="flex items-center gap-4 mt-3">
          {socialLinks.map((link, index) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center w-8 h-8 text-primary fade-in-up fade-in-up-delay-${index + 1}`} // Apply staggered class for each icon
            >
              <img src={link.icon} alt={link.title} className="w-8 h-8 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
