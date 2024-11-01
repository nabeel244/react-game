import { cn } from "@/lib/utils";
// import { useUserStore } from "@/store/user-store";
import './userGameDetailStyle.css'
export default function UserGameDetails({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  // const user = useUserStore();
  return (
    <div
    className={cn("flex items-stretch justify-between gap-2 rounded-xl", className)}
    style={{
      borderBottom: '2px solid #00FFFF',
      borderTop: '2px solid #670EAF',
    }}
    {...props}
  >
    <div className="flex-1 flex flex-col items-center justify-center p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in"
    style={{
      borderLeft: '1px solid #00FFFF',
    }}>
        <img className="object-contain" src="/images/reward.png" />{" "}
      <p className="text-[10px] pt-2">Daily Reward</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-xs mt-1">20:10 hrs</p>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in">
        <img className="object-contain" src="/images/cipher.png" />{" "}
      <p className="text-[10px] pt-2">Daily Cipher</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-xs mt-1">20:10 hrs</p>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in">
        <img className="object-contain" src="/images/combo.png" />{" "}
      <p className="text-[10px] pt-2">Daily Combo</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-xs mt-1">20:10 hrs</p>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/5 backdrop-blur-sm rounded-xl fade-in" style={{
      borderRight: '1px solid #00FFFF', // Left border color for the left half
    }}>
        <img className="object-contain" src="/images/mini_game.png" />{" "}
      <p className="text-[10px] pt-2">Mini Game</p>
      <div className="inline-flex items-center space-x-1.5 text-white font-bold">
      <p className="text-gray-400 text-xs mt-1">20:10 hrs</p>
      </div>
    </div>
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
