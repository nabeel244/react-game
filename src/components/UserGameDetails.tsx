import { cn } from "@/lib/utils";
import './userGameDetailStyle.css'
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import DailyDrawer from "./DailyDrawer";
import {  useNavigate } from "react-router-dom";

export default function UserGameDetails({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const user = useUserStore();
  const navigate = useNavigate()
  const calculateTimeToMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set the time to 12:00 AM of the next day
    return Math.floor((midnight.getTime() - now.getTime()) / 1000); // Difference in seconds
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeToMidnight());
  const [isDailyDrawerOpen, setIsDailyDrawerOpen] = useState(false);

  // Check if the last_daily_cipher_redeem is today
  const isToday = (dateString: string) => {
    const today = new Date().toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    const givenDate = new Date(dateString).toLocaleDateString("en-CA");
    return today === givenDate;
  };

  const hasRedeemedToday = user?.last_daily_cipher_redeem && isToday(user.last_daily_cipher_redeem);
  // Format time to HH:mm:ss
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeRemaining <= 0) return; // Stop timer if it reaches 0

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeRemaining]);

  // Logic to execute when countdown ends
  useEffect(() => {
    if (timeRemaining === 0) {
      console.log("Daily cipher is available now!");
      // Add your trigger logic here, e.g., notify the user or unlock a feature
    }
  }, [timeRemaining]);


  const clickDailyCombo = () => {
    navigate("/mine");
  };
  
  return (
    <div
    className={cn("flex items-stretch justify-between gap-1 rounded-xl", className)}
    style={{
      borderBottom: '2px solid #00FFFF',
      borderTop: '2px solid #670EAF',
    }}
    {...props}
  >
    <div onClick={() => setIsDailyDrawerOpen(true)} className="flex-1 cursor-pointer flex flex-col items-center justify-center p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in"
    style={{
      borderLeft: '1px solid #00FFFF',
    }}>
        <img className="object-contain" src="/images/reward.png" />{" "}
      <p className="text-[8px] pt-1">Daily Reward</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-[8px] mt-1">{formatTime(timeRemaining)}</p>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in">
      {
        hasRedeemedToday && (
          <img src="/images/task_completed.png"  className="absolute top-1 right-1 w-4 h-4" alt="" />
        )
      }
        <img className="object-contain" src="/images/cipher.png" />{" "}
      <p className="text-[8px] pt-1">Daily Cipher</p>

      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-[8px] mt-1">{formatTime(timeRemaining)}</p>
      </div>
    </div>
  

    <div onClick={() =>clickDailyCombo()} className="flex flex-col items-center cursor-pointer justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in">
        <img className="object-contain" src="/images/combo.png" />{" "}
      <p className="text-[8px] pt-1">Daily Combo</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-[8px] mt-1">{formatTime(timeRemaining)}</p>
      </div>
    </div>
    
   
    <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in" style={{
      borderRight: '1px solid #00FFFF', // Left border color for the left half
    }}>
        <img className="object-contain" src="/images/mini_game.png" />{" "}
      <p className="text-[8px] pt-1">Mini Game</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-[8px] mt-1">20:10 hrs</p>
      </div>
    </div>
    <DailyDrawer
        open={isDailyDrawerOpen}
        onOpenChange={setIsDailyDrawerOpen}
      />
  </div>
    // <div
    //   className={cn("flex items-stretch justify-between gap-2", className)}
    //   {...props}
    // >
    //   <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
    //     <p className="mb-1 text-xs text-center">Earn per tap</p>
    //     <div className="inline-flex items-center space-x-1.5 text-white font-bold">
    //       <img className="object-contain w-5 h-5" src="/images/coin.png" />{" "}
    //       <span className="text-sm">+{user?.earn_per_tap}</span>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
    //     <p className="mb-1 text-xs text-center">Coins to level up</p>
    //     {user.level && (
    //       <div className="inline-flex items-center space-x-1.5 text-gradient font-bold">
    //         <span className="text-sm">
    //           {compactNumber(user.level.to_balance)}
    //         </span>
    //       </div>
    //     )}
    //   </div>
    //   <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl">
    //     <p className="mb-1 text-xs text-center">Profit per hour</p>
    //     <div className="inline-flex items-center space-x-1.5 text-white font-bold">
    //       <img className="object-contain w-5 h-5" src="/images/coin.png" />
    //       <span className="text-sm">
    //         +{compactNumber(user.production_per_hour)}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
}
