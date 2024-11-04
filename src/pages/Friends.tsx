// import CopyIcon from "@/components/icons/CopyIcon";
import { Button } from "@/components/ui/button";
import { $http } from "@/lib/http";
import { compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import { PaginationResponse } from "@/types/Response";
import { UserType } from "@/types/UserType";
import { useQuery } from "@tanstack/react-query";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
// import levelConfig from "@/config/level-config";
import './friendsStyle.css'

const shareMessage = encodeURI(
  "Play Crypto Coin with me!"
);

export default function Friends() {
  const [, copy] = useCopyToClipboard();
  const { telegram_id } = useUserStore();
  const { referral, levels } = uesStore();

  // const user = useUserStore();

  const [showMoreBonuses, setShowMoreBonuses] = useState(false);

  const referralLink = useMemo(
    () => `${import.meta.env.VITE_BOT_URL}/?startapp=ref${telegram_id}`,
    [telegram_id]
  );

  const referredUsers = useQuery({
    queryKey: ["referredUsers"],
    queryFn: () => $http.$get<PaginationResponse<UserType>>("/referred-users"),
  });

  return (
    // <div className="flex flex-col justify-end bg-cover flex-1" style={{backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,}}>
    <div className="flex flex-col justify-end bg-cover flex-1 overflow-y-auto"
      style={{
        background: 'linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)',
      }}
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 modal-body">
        <div className="flex flex-row items-center justify-center text-center space-x-2">
          <img src="/images/friends_group.png" alt="Invite Friends" className="w-8 slide-up" />
          <h1 className="text-2xl font-bold uppercase slide-up">Invite Friends!</h1>
        </div>

        <p className="mt-2.5 font-small text-center text-gray-400 slide-up">
          You and your friend will receive bonuses
        </p>
        <div className="mt-4 rounded-xl"
          style={{
            borderBottom: '1px solid #00FFFF',
            borderTop: '1px solid #670EAF',
          }}
        >

          <button className="flex items-center w-full gap-4 px-4 py-2 bg-white/5 rounded-tl-lg rounded-tr-lg border-slide-up"
            style={{
              borderBottom: '0.25px solid #00FFFF',
            }}
          >
            <img
              src="/images/invite_friend_gift.png"
              alt="chest"
              className="object-contain w-9 h-9 mix-blend-screen slide-up"
            />
            <div className="text-sm font-medium text-left">
              <p className="slide-up">Invite a friend</p>
              <div className="flex items-center space-x-1">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-5 h-5 slide-up"
                />
                <span className="font-bold text-primary pt-1 slide-up">
                  +{referral.base.welcome.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 slide-up">for you and your friend</span>
              </div>
            </div>
          </button>
          <button className="flex items-center w-full gap-4 px-4 py-2 bg-white/5 "
          >
            <img
              src="/images/telegram_invite_friend.png"
              alt="chest"
              className="object-contain w-9 h-9 mix-blend-screen slide-up"
            />
            <div className="text-sm font-medium">
              <p className="slide-up">Invite a friend with Telegram premium</p>
              <div className="flex items-center space-x-1">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-5 h-5"
                />
                <span className="font-bold text-primary pt-1 slide-up">
                  +{referral.premium.welcome.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 slide-up">for you and your friend</span>
              </div>
            </div>
          </button>

        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 w-full h-[calc(100%-1rem)] py-6 mt-4 overflow-y-scroll">
            {!showMoreBonuses ? (
              <div className="text-center flex flex-row justify-center">
                <button
                  className="text-[#03F6F4] text-xs font-bold px-4"
                  onClick={() => setShowMoreBonuses((value) => !value)}
                >
                  More Bonuses
                </button>
                <span className="text-white">➔</span>
              </div>
            ) : (
              <>
                <p
                  className="text-[#03F6F4] mt-8 text-sm font-bold uppercase"
                  onClick={() => setShowMoreBonuses((value) => !value)}
                >
                  Bonus for leveling up
                </p>
                <div className="relative flex-1 mt-6 min-h-60">
                  <div className="absolute inset-0 w-full h-full overflow-y-auto">
                    <table className="w-full">
                      <thead className="text-xs text-white/30">
                        <tr className="border-b border-[#D9D9D9]/10">
                          <th className="px-2 py-2 text-left">Level</th>
                          <th className="px-2 py-2 text-right">For friend</th>
                          <th className="px-2 py-2 text-right">Premium</th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels
                          .filter((item) => referral.base.levelUp[item.level])
                          .map((item, key) => (
                            <tr
                              key={key}
                              className="border-b border-[#D9D9D9]/10"
                            >
                              <td className="px-2 py-2 text-xs">{item.name}</td>
                              <td className="px-2 py-2">
                                <div className="flex items-center justify-end gap-1">
                                  <img
                                    src="/images/coin.png"
                                    alt="coin"
                                    className="object-contain w-4 h-4"
                                  />
                                  <span className="text-xs font-medium text-primary">
                                    {referral.base.levelUp[
                                      item.level
                                    ].toLocaleString()}
                                  </span>
                                </div>
                              </td>
                              <td className="px-2 py-2">
                                <div className="flex items-center justify-end gap-1">
                                  <img
                                    src="/images/coin.png"
                                    alt="coin"
                                    className="object-contain w-4 h-4"
                                  />
                                  <span className="text-xs font-medium text-primary">
                                    {(
                                      referral.premium.levelUp[item.level] || 0
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            <p className="mt-8 text-sm uppercase flex flex-row">
              List of your friends{" "}
              {referredUsers.data?.meta
                ? `(${referredUsers.data?.meta.total})`
                : null}
              <img src="/images/refresh_friend_list.png" className="ml-2" />
            </p>

            {referredUsers.isLoading ? (
              <div className="flex items-center justify-center w-full h-14">
                <div className="w-5 h-5 border-2 border-t-[#D9D9D9]/10 rounded-full border-t animate-spin"></div>
              </div>
            ) : referredUsers.data?.data?.length ? (
              <div className="mt-4 space-y-4">
                {referredUsers.data.data.map((item, key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/avatar.png"
                        alt="avatar"
                        className="object-contain w-8 h-8"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-xs text-gray-400">{item.level?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/coin.png"
                        alt="coin"
                        className="object-contain w-5 h-5"
                      />
                      <span className="text-sm font-medium text-primary">
                        {compactNumber(item.balance)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
           
              <div className="flex items-center justify-center px-4 mt-4 border-2 border-dashed rounded-xl border-white/10 h-14">
                <p className="text-xs font-medium text-center text-white/30">
                  You didn’t invite anyone yet
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-4">
       
          <Button
            className="flex-1 items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md"
            onClick={() =>
              Telegram.WebApp.openTelegramLink(
                `https://t.me/share/url?text=${shareMessage}&url=${referralLink}`
              )
            }
          >

            <img src="/images/invite_friend_button.png" alt="Invite Icon" className="w-5 h-5 mr-2" />
            Invite a friend
          </Button>
          <Button
            className="flex bg-gradient-to-r from-[#03F6F4] to-[#03F6F4] rounded-full"
            onClick={() => {
              copy(referralLink);
              toast.success("Referral link copied to clipboard");
            }}
          >
            <img src="/images/copy_icon.png" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}
