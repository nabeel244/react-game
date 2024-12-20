import create from 'zustand';
import { $http } from '@/lib/http';

interface Exchange {
  id: number;
  name: string;
  logo: string;
}

interface CEOStore {
  exchanges: Exchange[];
  selectedExchange: Exchange | null;
  loading: boolean;
  fetchExchanges: () => Promise<void>;
  signContract: (exchangeId: number) => Promise<string>;
}

const useExchangeStore = create<CEOStore>((set) => ({
  exchanges: [],
  selectedExchange: null,
  loading: false,

  // Fetch all exchanges
  fetchExchanges: async () => {
    set({ loading: true });
    try {
      const response = await $http.get('/exchanges');
      set({ exchanges: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch exchanges:', error);
      set({ loading: false });
    }
  },

  // Sign a contract with an exchange
  signContract: async (exchangeId: number) => {
    set({ loading: true });
    try {
      const response = await $http.post('/sign-contract', { exchange_id: exchangeId });
      set({ selectedExchange: response.data.exchange, loading: false });
      return response.data.message; // Return success message
    } catch (error) {
      console.error('Failed to sign contract:', error);
      set({ loading: false });
      throw error; // Propagate error for handling in the component
    }
  },
}));

export default useExchangeStore;
