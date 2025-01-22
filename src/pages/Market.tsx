
import { useUserStore } from "../store/user-store";
import { cn, compactNumber } from "@/lib/utils";
import { useDailyComboStore } from "@/store/dailyCombo-store";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Price from "@/components/Price";
import ComboDrawer from "@/components/ComboDrawer";
import { toast } from "react-toastify";
import { $http } from "@/lib/http";
import { Mission } from "@/types/MissionType";
import { useQuery } from "@tanstack/react-query";
import { uesStore } from "@/store";
import { Loader2Icon } from "lucide-react";
import MissionDrawer from "@/components/MissionDrawer";


export default function Market() {
    const user = useUserStore();
    const {
        cards,
        fetchDailyCards,
        claimedRewards,
    } = useDailyComboStore();

    const [activeTab, setActiveTab] = useState("Markets");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const tabs = ["Markets", "PR&Team", "Legal", "Web3", "Specials"];

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        // setLoading(true);
        try {
            await fetchDailyCards();
        } catch (error) {
            console.error("Error fetching daily combo cards:", error);
        } finally {
            // setLoading(false);
        }
    };

    const { missionTypes, totalReferals } = uesStore();
    const [activeType, setActiveType] = useState(missionTypes?.[0] || null);
    const [openComboDrawer, setOpenComboDrawer] = useState(false);
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
    useEffect(() => {
        if (missionTypes?.length && !activeType) {
            setActiveType(missionTypes[0]); // Set a default type
        }
    }, [missionTypes]);
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
        <div
            className="flex-1 px-5 pb-20 bg-center bg-cover"
            style={{
                background:
                    "linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)",
            }}
        >
            <Header />
            <div className="flex mt-1 space-x-1.5 justify-center items-center select-none">
                <img src="/images/coins.png" alt="coins" className="object-contain w-15 h-15" />
                <span className="text-3xl mt-3 font-bold text-gradient">
                    {Math.floor(user.balance)?.toLocaleString()}
                </span>
            </div>
            <div
                className="flex items-center justify-between rounded-lg shadow-md h-12 px-4 w-full mt-3"
                style={{
                    background: "linear-gradient(90deg, #03F6F4 0%, #37BBFE 100%)",
                }}
            >
                <span className="text-black text-xs font-bold">Daily combo</span>
                <div className="flex items-center">
                    <img src="/images/coin.png" alt="coin" className="w-5 h-5 mb-1" />
                    <span className="text-black font-bold text-xs">+5,000,000</span>
                </div>
            </div>
            <div className="flex justify-around bg-[#2b004e] rounded-md py-2 mb-4 mt-5">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 rounded-md font-bold text-sm ${activeTab === tab ? "bg-[#6D00DA] text-white" : "text-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="p-4 bg-[#3e0074] rounded-md text-white">
                {activeTab === "Markets" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        "bg-[#2b004e] rounded-lg shadow-md p-4 text-white space-y-2 cursor-pointer",
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
                                            src={mission.image}
                                            alt={mission.name}
                                            className="object-contain w-16 h-16"
                                        />
                                        <div className="flex flex-col ">
                                            <p className="text-[12px]">{mission.name}</p>
                                            <div className="bg-gradient-to-r from-[#03F6F4] to-[#37BBFE] rounded-md p-1 mt-1">
                                                <p className="text-[9px] text-center text-black">
                                                    Profit per hour
                                                </p>
                                                <Price
                                                    amount={
                                                        `+${mission.next_level?.production_per_hour || 0}`
                                                    }
                                                    className=" text-[9px] text-black"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-[1px] bg-[#03F6F4]"></div>
                                    {mission.next_level && (
                                        <div className="mt-2 border-t border-solid border-white/5 border-[#03F6F4] ">
                                            <div className="flex space-x-3 justify-between">
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
                )}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {cards
                        .filter((card) => card.category === activeTab)
                        .map((card, index) => (
                            <div
                                onClick={() => {
                                    if (claimedRewards.includes(card.id)) {
                                        // Show a toast or prevent drawer opening
                                        toast.info("This card is already unlocked!");
                                        return;
                                    }
                                    setSelectedCard(card);
                                    setOpenComboDrawer(true);
                                }}
                                key={index}
                                className="bg-[#2b004e] rounded-lg shadow-md p-4 text-white space-y-2 cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src='/images/market_ceo.png'
                                        alt={card.title}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-sm">{card.title}</p>
                                        <div
                                            className="bg-gradient-to-r from-[#03F6F4] to-[#37BBFE] rounded-md p-1 mt-1"
                                          
                                        >
                                            <p className="text-[9px] text-center text-black">Profit per hour</p>
                                            <div className="inline-flex items-center text-black">
                                                <img
                                                    className="object-contain w-5 h-5"
                                                    src="/images/coin.png"
                                                />
                                                <span className="text-xs mt-1">
                                                    +{compactNumber(card.reward)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-[#03F6F4] my-1"></div>
                                <div className="flex justify-between">
                                    <p className="w-16 text-xs font-bold">Level 1</p>
                                    {claimedRewards.includes(card.id) ? (
                                        <p className="text-sm text-green-400">Claimed</p>
                                    ) : (
                                        <>
                                            <Price
                                                amount={compactNumber(card.cost)}
                                                className="text-[10px]"
                                            />

                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>

            </div>
            <ComboDrawer
                open={openComboDrawer}
                onOpenChange={setOpenComboDrawer}
                card={selectedCard}
            />

            <MissionDrawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
                mission={selectedMission}
            />
        </div>
    );
}