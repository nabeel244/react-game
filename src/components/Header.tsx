import { useUserStore } from "@/store/user-store";
import { compactNumber } from "@/lib/utils";

export default function Header() {
    const user = useUserStore();
    return (
        <header className="flex items-center justify-between mt-4 gap-1 flex-wrap">

        <div className="flex items-center gap-1">
          <img
            src="/images/avatar.png"
            alt="user-avatar"
            className="object-cover w-10 h-10"
          />
          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {user?.first_name} {user?.last_name}
            </p>
            <div className="flex items-center gap-1">
              <button
                className="text-xs font-medium text-black px-2 py-1 rounded-md"
                style={{
                  background: 'linear-gradient(90deg, #00d9ff, #00b4ff)',
                }}
              >
                Buy skin
              </button>
              <img
                src="/images/setting.png"
                alt="settings-icon"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      
        {/* Right Section: Profit Hourly and Exchange */}
        <div className="flex gap-1">
          <div className="flex flex-col items-center justify-center p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl min-w-auto">
            <p className="text-[9px] text-center">Profit hourly</p>
            <div className="inline-flex items-center text-white font-bold">
              <img className="object-contain w-5 h-5" src="/images/coin.png" />
              <span className="text-xs mt-1">
                +{compactNumber(user.production_per_hour)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl min-w-auto">
            <div className="inline-flex items-center space-x-1.5 text-white font-bold">
              <img className="object-contain w-5 h-5" src="/images/exchange-icon.png" />
              <p className="text-[9px] text-center">Exchange</p>
            </div>
          </div>
        </div>
      </header>
      

        // <header className="flex items-center mt-4">
        //     <div className="flex items-center gap-3 px-4">
        //         <img
        //             src="/images/avatar.png"
        //             alt="user-avatar"
        //             className="object-cover w-10 h-10"
        //         />
        //         <div className="flex flex-col">
        //             <p className="text-sm font-bold">
        //                 {user?.first_name} {user?.last_name}
        //             </p>
        //             <div className="flex items-center gap-2">
        //                 <button
        //                     className="text-sm font-medium text-black px-2 py-0 rounded-md"
        //                     style={{
        //                         background: 'linear-gradient(90deg, #00d9ff, #00b4ff)',
        //                     }}
        //                 >
        //                     Buy skin
        //                 </button>
        //                 <img
        //                     src="/images/setting.png"
        //                     alt="settings-icon"
        //                     className="w-5 h-5 cursor-pointer"
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl mx-1">
        //         <p className="mb-1 text-xs text-center">Profit hourly</p>
        //         <div className="inline-flex items-center text-white font-bold">
        //             <img className="object-contain w-15 h-5" src="/images/coin.png" />
        //             <span className="text-sm">
        //                 +{compactNumber(user.production_per_hour)}
        //             </span>
        //         </div>
        //     </div>
        //     <div className="flex flex-col items-center justify-center flex-1 p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl min-h-[55px]">
        //         <div className="inline-flex items-center space-x-1.5 text-white font-bold">
        //             <img className="object-contain w-5 h-5" src="/images/exchange-icon.png" />
        //             <p className="text-xs text-center">Exchange</p>
        //         </div>
        //     </div>
        // </header>
    )

}