import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextsType {
    transactions: Transaction[];
    loadTransactions: (query?: string) => Promise<void>;
    createNewTransaction: (data: createNewTransactionProps) => Promise<void>;
}

interface TransactionProviderProps {
    children: ReactNode;
}

interface createNewTransactionProps {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

export const TrasactionContexts = createContext({} as TransactionContextsType);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function createNewTransaction(data: createNewTransactionProps){
        const response = await api.post('transactions', {
            description: data.description,
            category: data.category,
            price: data.price,
            type: data.type,
            createdAt: new Date(),
        }) 

        setTransactions(state => [...state, response.data])
    }

    async function loadTransactions(query?: string){
    

        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        });
    
        setTransactions(response.data);
    }
    
    useEffect(() => {   
        loadTransactions();
    }, [])
    
    return (
        <TrasactionContexts.Provider value={{ transactions, loadTransactions, createNewTransaction }}>
            {children}
        </TrasactionContexts.Provider>
    )
}

