import { create } from 'zustand';
import axios from 'axios';

interface Transaction {
    category: string;
    id: number;
    date: string;
    name: string;
    amount: number;
    placement: string;
    notes: string;
}

export interface TransactionRequest {
    type: 'INCOME' | 'OUTCOME';
    date: string;
    name: string;
    amount: number;
    placement: string;
    category: string;
    notes?: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface TransactionState {
    income: { data: Transaction[]; pagination: Pagination };
    outcome: { data: Transaction[]; pagination: Pagination };
    loadingFetchTx: boolean;
    loadingCreateTx: boolean;
    error: string | null;
    errorCreateTx: string | null;
    fetchTransactions: (type: 'INCOME' | 'OUTCOME', page: number, limit: number) => Promise<void>;
    setState: (state: TransactionState) => void;
    addTransaction: (transaction: TransactionRequest) => Promise<void>;
}

export const useTransaction = create<TransactionState>((set) => ({
    income: { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 1 } },
    outcome: { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 1 } },
    loadingFetchTx: false,
    loadingCreateTx: false,
    error: null,
    errorCreateTx: null,
    setState: (state: TransactionState) => set(state),
    fetchTransactions: async (type, page = 1, limit = 10) => {
        set({ loadingFetchTx: true, error: null });

        try {
            const token = localStorage.getItem('accessToken'); // Or your preferred auth method
            const response = await axios.post(
                '/api/transaction',
                { type, page, limit },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (type === 'INCOME') {
                set({ income: { data: response.data.data, pagination: response.data.pagination } });
            } else {
                set({ outcome: { data: response.data.data, pagination: response.data.pagination } });
            }
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch transactions',
            });
        } finally {
            set({ loadingFetchTx: false });
        }
    },
    addTransaction: async (transactionRequest: TransactionRequest) => {
        set({ loadingCreateTx: true, errorCreateTx: null });
        try {
            const token = localStorage.getItem('accessToken'); // Or your preferred auth method
            const response = await axios.post(
                '/api/transaction/create',
                { 
                    type: transactionRequest.type,
                    date: transactionRequest.date,
                    name: transactionRequest.name,
                    amount: transactionRequest.amount,
                    placement: transactionRequest.placement,
                    category: transactionRequest.category,
                    notes: transactionRequest.notes
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("response add transaction", response);
        } catch (error) {
            set({
                errorCreateTx: error instanceof Error ? error.message : 'Failed to fetch transactions',
            });
        } finally {
            set({ loadingCreateTx: false });
        }
    },
}));