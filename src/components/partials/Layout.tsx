import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "../AppBar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { PopupMessageType } from "@/types/PopupMessageType";
import PopupMessageDialog from "../PopupMessageDialog";
import OnBoarding from "../onBoarding/onBoarding";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const popupMessgae = useQuery({
    queryKey: ["popup-message"],
    queryFn: () => $http.$get<PopupMessageType>("/popups"),
  });
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      window.Telegram.WebApp.BackButton.show();
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [pathname]);

  useEffect(() => {
    window.Telegram.WebApp.BackButton.onClick(() => {
      navigate("/");
    });
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true');
  };
  return (
    // <main className="flex flex-col w-full max-w-lg h-[--tg-viewport-height] mx-auto text-white  overflow-y-auto">
    <main className="flex flex-col w-full max-w-lg h-screen mx-auto text-white overflow-y-auto pb-10">
      {
        showOnboarding ? <OnBoarding onComplete={handleOnboardingComplete} /> :
          <>
            <Outlet />
            <AppBar />
            <PopupMessageDialog message={popupMessgae.data} />
          </>
      }

    </main>
  );
}
