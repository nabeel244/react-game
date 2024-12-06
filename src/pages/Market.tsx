
import { useUserStore } from "../store/user-store";
import { compactNumber } from "@/lib/utils";
import { useDailyComboStore } from "@/store/dailyCombo-store";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Price from "@/components/Price";
import ComboDrawer from "@/components/ComboDrawer";


export default function Market() {
    const user = useUserStore();
    const {
        cards,
        fetchDailyCards,
        claimedRewards,
    } = useDailyComboStore();

    const [activeTab, setActiveTab] = useState("Markets");
    const [loading, setLoading] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const tabs = ["Markets", "PR&Team", "Legal", "Web3", "Specials"];

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        setLoading(true);
        try {
            await fetchDailyCards();
        } catch (error) {
            console.error("Error fetching daily combo cards:", error);
        } finally {
            setLoading(false);
        }
    };


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
                {loading ? (
                    <p>Loading cards...</p>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cards
                            .filter((card) => card.category === activeTab)
                            .map((card, index) => (
                                <div
                                    onClick={() => {
                                        setSelectedCard(card);
                                        setOpenDrawer(true);
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
                                                className="flex flex-col items-center justify-center p-2 select-none bg-white/10 backdrop-blur-sm rounded-xl"
                                                style={{
                                                    background: "linear-gradient(90deg, #00d9ff, #00b4ff)",
                                                }}
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
                                        <p className="text-sm">Level 0</p>
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
                )}
            </div>
            <ComboDrawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
                card={selectedCard}
            />
        </div>
    );
}
