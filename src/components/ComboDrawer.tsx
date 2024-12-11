import { Button } from "./ui/button";
import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useUserStore } from "@/store/user-store";
import { useDailyComboStore } from "@/store/dailyCombo-store";

export default function ComboDrawer({
  card,
  ...props
}: DrawerProps & { card: any | null }) {
  const user = useUserStore();
  const { balance } = useUserStore();
  const { unlockCard } = useDailyComboStore();

  const insufficientBalance = useMemo(() => {
    if (!card?.cost) return false;
    return balance < card?.cost;
  }, [balance, card?.cost]);

  const handleUnlock = async () => {
    try {
      if (!card) return;
      await unlockCard(user.telegram_id,card.id);
      toast.success("Card unlocked successfully!");
      props.onOpenChange?.(false); // Close the drawer
    } catch (error) {
      toast.error("Failed to unlock card. Please try again.");
      console.error(error);
    }
  };

  return (
    <Drawer {...props}>
      {card && (
        <div className="p-4">
          {/* Card Image */}
          <img
            src="/images/market_ceo.png"
            alt={card.title}
            className="object-contain h-32 mx-auto"
          />

          {/* Card Title */}
          <h2 className="mt-4 text-lg font-bold text-center">{card.title}</h2>

          {/* Production Per Hour */}
          <div className="flex flex-col mx-auto mt-4 w-fit">
            <p className="text-xs text-center">Profit per hour</p>
            <Price
              amount={"+" + card.reward.toLocaleString()}
              className="justify-center mt-2 text-sm text-white"
            />
          </div>

          {/* Cost */}
          <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
            <img
              src="/images/coin.png"
              alt="coin"
              className="object-contain w-8 h-8"
            />
            <span className="font-bold">{card.cost.toLocaleString()}</span>
          </div>

          {/* Unlock Button */}
          <Button
            className="w-full mt-6 bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md rounded-full text-white"
            disabled={insufficientBalance}
            onClick={handleUnlock}
          >
            {insufficientBalance ? "Insufficient Balance" : "Unlock Now"}
          </Button>

          {/* Error State */}
          {insufficientBalance && (
            <p className="mt-2 text-xs text-center text-red-400">
              You don’t have enough balance to unlock this card.
            </p>
          )}
        </div>
      )}
    </Drawer>
  );
}
