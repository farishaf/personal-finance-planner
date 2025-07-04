import { create } from 'zustand';
import axios from 'axios';

interface HomepageState {
    loadingSummary: boolean;
    errorSummary: string | null;
    txSummary: TransactionSummary[];
    fetchSummary: () => Promise<void>;
}

interface TransactionSummary {
    placementName: string;
    placementTag: string;
    totalAmount: number;
    color: string;
    lastUpdated: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useHomepage = create<HomepageState>((set, get) => ({
    loadingSummary: false,
    errorSummary: null,
    txSummary: [],
    fetchSummary: async () => {
        set({ loadingSummary: true, errorSummary: null });

        try {
            const token = localStorage.getItem('accessToken'); // Or your preferred auth method
            const response = await axios.get(
                '/api/transaction/summary',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("response", response);
            if (response.status === 200) {
                set({ txSummary: response.data });
            }
        } catch (error) {
            set({
                errorSummary: error instanceof Error ? error.message : 'Failed to fetch transactions',
            });
        } finally {
            set({ loadingSummary: false });
        }
    },
}))