import { UserType } from "@/types/UserType";
import { create } from "zustand";

type UserStore = UserType & {
  UserTap: () => boolean;
  incraseEnergy: (value: number) => void;
  last_daily_cipher_redeem: string;
  selected_exchange_id: number | null;
  updateUser: (userData: Partial<Omit<UserStore, "updateUser">>) => void;
  updateSelectedExchange: (exchangeId: number) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  telegram_id: 0,
  max_energy: 0,
  balance: 0,
  earn_per_tap: 0,
  available_energy: 0,
  energy_limit_level: 0,
  first_name: "",
  id: 0,
  last_login_date: "",
  last_name: "",
  level_id: 0,
  login_streak: 0,
  multi_tap_level: 0,
  production_per_hour: 0,
  updated_at: "",
  username: "",
  last_daily_cipher_redeem: '',
  selected_exchange_id: 0,
  updateUser: (userData) => set((state) => ({ ...state, ...userData })),
  UserTap() {
    if (get().available_energy < get().earn_per_tap) return false;
    set((state) => ({
      available_energy: state.available_energy - state.earn_per_tap,
      balance: state.balance + state.earn_per_tap,
    }));
    return true;
  },
  updateSelectedExchange: (exchangeId: number) => set({ selected_exchange_id: exchangeId }),
  incraseEnergy: (value) => {
    set((state) => ({
      available_energy: Math.min(
        state.available_energy + value,
        state.max_energy
      ),
    }));
  },
}));
