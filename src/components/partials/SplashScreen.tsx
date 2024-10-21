import TelegramIcon from "../icons/TelegramIcon.png";
import TwitterIcon from "../icons/TwitterIcon.png";
import YoutubeIcon from "../icons/YoutubeIcon.png";

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
    splashScreenImages[Math.floor(Math.random() * splashScreenImages.length)]
  return (
    <div
      className="flex flex-col items-center justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
      style={{ backgroundImage: `url('${randomImage}')` }}
    >
      <img src="/images/splash_logo.png" alt="logo" className="h-48 max-w-full" />

      {/* Text under the logo */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-medium text-center text-shadow">Al Hamster</h1>
        <p className="mt-2 text-center">JOIN & EARN COINS</p>
      </div>
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

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center justify-center gap-4 mt-3">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8  text-primary"
              >
                <img src={link.icon} alt={link.title} className="w-8 h-8 object-contain" />
              </a>
            ))}
          </div>


        </div>

      </div>
    </div>
  );
}
