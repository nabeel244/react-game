import { create } from "zustand";
import { $http } from "@/lib/http";

type ComboCardType = {
  id: number;
  title: string;
  category: string;
  reward: number;
  cost: number;
  image: string;
};

type DailyComboStore = {
  cards: ComboCardType[];
  claimedRewards: number[];
  fetchDailyCards: () => Promise<void>;
  unlockCard: (userId: number, cardId: number) => Promise<void>;
};

export const useDailyComboStore = create<DailyComboStore>((set) => ({
  cards: [],
  claimedRewards: [],

  fetchDailyCards: async () => {
    try {
      const response = await $http.get("/daily-combo/cards");
      set({
        cards: response.data.cards,
        claimedRewards: response.data.claimed_rewards, // Update claimed rewards
      });
    } catch (error) {
      console.error("Failed to fetch daily combo cards:", error);
    }
  },
  

  unlockCard: async (userId: number, cardId: number) => {
    try {
      await $http.post("/daily-combo/unlock-card", {
        telegram_id: userId,
        card_id: cardId,
      });
      set((state) => ({
        claimedRewards: [...state.claimedRewards, cardId],
      }));
    } catch (error) {
      console.error("Failed to unlock card:", error);
    }
  },
}));
