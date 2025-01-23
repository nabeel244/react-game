import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { useMutation } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";
import { Mission, MissionLevel } from "@/types/MissionType";
import { UserType } from "@/types/UserType";
import { useUserStore } from "@/store/user-store";

export default function MissionDrawer({
  mission,
  ...props
}: DrawerProps & {
  mission: Mission | null;
}) {
  const { balance } = useUserStore();
  const [cooldownTimers, setCooldownTimers] = useState<{ [id: number]: number }>(
    () => JSON.parse(localStorage.getItem("cooldownTimers") || "{}") // Load from localStorage
  );

  const insufficientBalance = useMemo(() => {
    if (!mission?.next_level?.cost) return false;
    return balance < mission?.next_level?.cost;
  }, [balance, mission?.next_level?.cost]);

  useEffect(() => {
    // Countdown logic for cooldown timers
    const interval = setInterval(() => {
      setCooldownTimers((prev) => {
        const updatedTimers: any = { ...prev };
        Object.keys(updatedTimers).forEach((key) => {
          if (updatedTimers[key] > 0) {
            updatedTimers[key] -= 1;
          } else {
            delete updatedTimers[key]; // Remove missions with no cooldown
          }
        });

        // Save updated timers to localStorage
        localStorage.setItem("cooldownTimers", JSON.stringify(updatedTimers));
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const upgradeMution = useMutation({
    mutationFn: () =>
      $http.post<{ message: string; user: UserType; next_level: MissionLevel }>(
        `/clicker/mission-levels/${mission?.next_level?.id}`
      ),
    onSuccess: ({ data }) => {
      toast.success(data.message || "Mission upgraded successfully");
      useUserStore.setState({ ...data.user });

      // Update mission details
      const pph = mission?.next_level?.production_per_hour || 0;
      mission!.production_per_hour = (
        mission?.production_per_hour ? +mission.production_per_hour + pph : pph
      ).toString();
      mission!.next_level = data.next_level;

      // Parse `mission.cooldown` and set the cooldown timer
      if (mission?.cooldown) {
        const cooldownInMinutes = Number(mission.cooldown); // Convert cooldown to a number
        if (!isNaN(cooldownInMinutes)) {
          const cooldownInSeconds = cooldownInMinutes * 60; // Convert to seconds
          setCooldownTimers((prev) => {
            const updatedTimers = {
              ...prev,
              [mission.id]: cooldownInSeconds,
            };
            localStorage.setItem(
              "cooldownTimers",
              JSON.stringify(updatedTimers)
            ); // Save to localStorage
            return updatedTimers;
          });
        } else {
          console.error(`Invalid cooldown value: ${mission.cooldown}`);
        }
      }

      props.onOpenChange?.(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const isCooldownActive = mission && cooldownTimers[mission.id] > 0;

  if (!mission || !mission.next_level) return null;

  return (
    <Drawer {...props}>
      <img
        src={mission.image}
        alt={mission.name}
        className="object-contain h-32 mx-auto"
      />
      <h2 className="mt-6 text-2xl font-medium text-center">{mission.name}</h2>
      <div className="flex flex-col mx-auto mt-4 w-fit">
        <p className="text-xs text-center">Production per hour</p>
        <Price
          amount={"+" + mission.next_level.production_per_hour.toLocaleString()}
          className="justify-center mt-2 text-sm text-white"
        />
      </div>

      <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
        <img
          src="/images/coin.png"
          alt="coin"
          className="object-contain w-8 h-8"
        />
        <span className="font-bold">
          {mission.next_level.cost.toLocaleString()}
        </span>
      </div>

      <Button
        className="w-full mt-6 bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md rounded-full text-white"
        disabled={!!(upgradeMution.isPending || insufficientBalance || isCooldownActive)} // Ensure boolean type
        onClick={() => upgradeMution.mutate()}
      >
        {upgradeMution.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        {isCooldownActive
          ? (() => {
            const totalSeconds = cooldownTimers[mission.id];
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            return `Cooldown: ${hours}h ${minutes}m ${seconds}s`;
          })()
          : insufficientBalance
            ? "Insufficient Balance"
            : "Go ahead"}
      </Button>
    </Drawer>
  );
}




// // import { useState } from "react";
// import { Button } from "./ui/button";
// import Drawer, { DrawerProps } from "./ui/drawer";
// import Price from "./Price";
// import { useMutation } from "@tanstack/react-query";
// import { $http } from "@/lib/http";
// import { toast } from "react-toastify";
// import { Loader2Icon } from "lucide-react";
// import { Mission, MissionLevel } from "@/types/MissionType";
// import { UserType } from "@/types/UserType";
// import { useUserStore } from "@/store/user-store";
// import { useMemo } from "react";

// export default function MissionDrawer({
//   mission,
//   ...props
// }: DrawerProps & {
//   mission: Mission | null;
// }) {
//   // const queryClient = useQueryClient();
//   const { balance } = useUserStore();

//   const insufficientBalance = useMemo(() => {
//     if (!mission?.next_level?.cost) return false;
//     return balance < mission?.next_level?.cost;
//   }, [balance, mission?.next_level?.cost]);

//   const upgradeMution = useMutation({
//     mutationFn: () =>
//       $http.post<{ message: string; user: UserType; next_level: MissionLevel }>(
//         `/clicker/mission-levels/${mission?.next_level?.id}`
//       ),
//     onSuccess: ({ data }) => {
//       toast.success(data.message || "Mission upgraded successfully");
//       useUserStore.setState({ ...data.user });
//       const pph = mission?.next_level?.production_per_hour || 0;
//       mission!.production_per_hour = (
//         mission?.production_per_hour ? +mission.production_per_hour + pph : pph
//       ).toString();
//       mission!.next_level = data.next_level;
//       props.onOpenChange?.(false);
//     },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message || "An error occurred");
//     },
//   });

//   if (!mission || !mission.next_level) return null;
//   return (
//     <Drawer {...props}>
//       <img
//         src={mission.image}
//         // src="/images/missions.png"
//         alt={mission.name}
//         className="object-contain h-32 mx-auto"
//       />
//       <h2 className="mt-6 text-2xl font-medium text-center">{mission.name}</h2>
//       <div className="flex flex-col mx-auto mt-4 w-fit">
//         <p className="text-xs text-center">Production per hour</p>
//         <Price
//           amount={"+" + mission.next_level.production_per_hour.toLocaleString()}
//           className="justify-center mt-2 text-sm text-white"
//         />
//       </div>

//       <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
//         <img
//           src="/images/coin.png"
//           alt="coin"
//           className="object-contain w-8 h-8"
//         />
//         <span className="font-bold">
//           {mission.next_level.cost.toLocaleString()}
//         </span>
//       </div>
//       <Button
//         className="w-full mt-6 bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md rounded-full text-white"
//         disabled={upgradeMution.isPending || insufficientBalance}
//         onClick={() => upgradeMution.mutate()}
//       >
//         {upgradeMution.isPending && (
//           <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
//         )}
//         {insufficientBalance ? "Insufficient Balance" : "Go ahead"}
//       </Button>
//     </Drawer>
//   );
// }
