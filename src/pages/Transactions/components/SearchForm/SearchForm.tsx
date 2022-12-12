import { SearchFormContainer } from "./SearchForm.styles";
import {MagnifyingGlass} from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useContext } from "react";
import { TransactionProvider, TrasactionContexts } from "../../../../contexts/TransactionsContexts";

const searchFormSchema = zod.object({
    query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

function SearchFormComponent(){
    const { register, handleSubmit, formState: {isSubmitting} } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    const { loadTransactions } = useContext(TrasactionContexts);

    async function handleSearchTransactions(data: SearchFormInputs){
        await loadTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}

export const SearchForm = memo(SearchFormComponent);