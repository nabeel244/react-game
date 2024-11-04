/* eslint-disable @typescript-eslint/no-explicit-any */
import MissionDrawer from "@/components/MissionDrawer";
import Price from "@/components/Price";
// import UserGameDetails from "@/components/UserGameDetails";
import { $http } from "@/lib/http";
import { cn, compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import { Mission } from "@/types/MissionType";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
// import levelConfig from "@/config/level-config";
import Header from "@/components/Header";

export default function Missions() {
  const user = useUserStore();
  const { missionTypes, totalReferals } = uesStore();
  const [activeType, setActiveType] = useState(missionTypes?.[0]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const missions = useQuery({
    queryKey: ["/clicker/missions", activeType?.id],
    queryFn: () =>
      $http.$get<Mission[]>(`/clicker/missions`, {
        params: { type: activeType?.id },
      }),
    staleTime: 1000 * 60,
    enabled: !!activeType?.id,
  });

  return (
    // <div className="flex flex-col justify-end bg-cover flex-1" style={{backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,}}>
    <div className="flex flex-col justify-end bg-cover flex-1 overflow-y-auto" 
      style={{
        background: 'linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)',
      }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 pb-24 modal-body">
      <Header />
        {/* <UserGameDetails className="mt-4" /> */}
        <div className="flex items-center justify-center mt-10 space-x-1 text-gradient">
          <img
            src="/images/coins.png"
            alt="coins"
            className="object-contain w-14 h-14"
          />
          <span className="text-3xl font-bold mt-3">
            {Math.floor(user.balance)?.toLocaleString()}
          </span>
        </div>
        <div className="mt-10">
          <div className="flex gap-4">
            {missionTypes.map((type, key) => (
              <button
                key={key}
                className={cn("text-xs font-bold uppercase", {
                  "opacity-40": activeType.id !== type.id,
                })}
                onClick={() => setActiveType(type)}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-3">
              {missions.isLoading ? (
                <div className="flex items-center justify-center h-full col-span-2 mt-6">
                  <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                missions.data &&
                missions.data.map((mission, key) => (
                  <div
                    key={key}
                    className={cn(
                      "flex flex-col py-3 px-3 bg-[#D9D9D9]/10 rounded-xl cursor-pointer",
                      {
                        "opacity-40 cursor-not-allowed":
                          (mission?.required_user_level &&
                            mission.required_user_level > user.level!.level) ||
                          (mission.required_friends_invitation &&
                            mission.required_friends_invitation >
                              totalReferals),
                      }
                    )}
                    onClick={() => {
                      if (
                        !mission.next_level ||
                        (mission?.required_user_level &&
                          mission.required_user_level > user.level!.level) ||
                        (mission.required_friends_invitation &&
                          mission.required_friends_invitation > totalReferals)
                      )
                        return;
                      setSelectedMission(mission);
                      setOpenDrawer(true);
                    }}
                  >
                    <div className="flex items-start flex-1 space-x-3">
                      <img
                        // src={mission.image}
                        src='/images/missions.png'
                        alt={mission.name}
                        className="object-contain w-16 h-16"
                      />
                      <div className="flex flex-col ">
                        <p className="text-[10px]">{mission.name}</p>
                        <div className="bg-gradient-to-r from-[#03F6F4] to-[#37BBFE] rounded-md p-1 mt-1">
                        <p className=" text-[10px] font-medium text-black">
                          Profit per hour
                        </p>
                        <Price
                          amount={
                            mission.production_per_hour ||
                            `+${mission.next_level?.production_per_hour || 0}`
                          }
                          className=" text-[10px] text-black"
                        />
                        </div>
                      </div>
                    </div>
                    {mission.next_level && (
                      <div className="pt-3 mt-3 border-t border-solid border-white/5 border-[#03F6F4]">
                        <div className="flex items-center space-x-3">
                          <p className="w-16 text-xs font-bold">
                            LEVEL {mission.next_level?.level}
                          </p>
                          {mission.required_user_level &&
                          mission.required_user_level > user.level!.level ? (
                            <div className="flex items-center gap-2 text-[10px]">
                              <img
                                src="/images/lock.png"
                                alt="lock"
                                className="object-contain w-5 h-5"
                              />
                              <span>
                                Mission required lvl{" "}
                                {mission.required_user_level}
                              </span>
                            </div>
                          ) : mission.required_friends_invitation &&
                            mission.required_friends_invitation >
                              totalReferals ? (
                            <div className="flex items-center gap-2 text-[10px]">
                              <img
                                src="/images/lock.png"
                                alt="lock"
                                className="object-contain w-5 h-5"
                              />
                              <span>
                                Mission required friends{" "}
                                {mission.required_friends_invitation} invited
                              </span>
                            </div>
                          ) : (
                            mission.next_level?.cost && (
                              <Price
                                amount={compactNumber(mission.next_level?.cost)}
                                className="text-[10px]"
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <MissionDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        mission={selectedMission}
      />
    </div>
  );
}
