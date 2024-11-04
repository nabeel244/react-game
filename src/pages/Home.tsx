import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
// import levelConfig from "@/config/level-config";
// import { cn, compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import Header from "@/components/Header";

export default function Home() {
  const user = useUserStore();
  const { maxLevel } = uesStore();
  return (
    <div
      // className="flex-1 px-5 pb-20 bg-center bg-cover"
      className="flex-1 px-5 pb-20 bg-center bg-cover pt-20"
      style={{
        // backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
        background: 'linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)',
      }}
    >
      <Header />
   
      <UserGameDetails className="mt-3" />
      <div className="flex mt-1 space-x-1.5 justify-center items-center select-none">
        <img
          src="/images/coins.png"
          alt="coins"
          className="object-contain w-15 h-15"
        />
        <span className="text-3xl mt-3 font-bold text-gradient">
          {Math.floor(user.balance)?.toLocaleString()}
        </span>
      </div>
      <div className="">
        <Link
          to={"/leaderboard"}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center text-xs">
            <span>{user.level?.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs">Level</span>
            <span className="font-bold">
              {user.level?.level}/{maxLevel}
            </span>
          </div>
        </Link>
        <div className="bg-[#FFDAA3]/10 border overflow-hidden border-[#FFDAA3]/10 rounded-full h-4 w-full">
  <div
    className="h-full"
    style={{
      width: `${(user?.balance! / user?.level!?.to_balance) * 100}%`,
      background: 'linear-gradient(90deg, #03F6F4 0%, #6D00DA 45%, #AC5AFF 100%)', // Apply the gradient
    }}
  ></div>
</div>

        {/* <div className="bg-[#FFDAA3]/10 border overflow-hidden border-[#FFDAA3]/10 rounded-full mt-2 h-4 w-full">
          <div
            className="bg-[linear-gradient(180deg,#FBEDE0_0%,#F7B87D_21%,#F3A155_52%,#E6824B_84%,#D36224_100%)] h-full"
            style={{
              width: `${(user?.balance! / user?.level!?.to_balance) * 100}%`,
            }}
          ></div>
        </div> */}
      </div>
      <UserTap />
    </div>
  );
}
