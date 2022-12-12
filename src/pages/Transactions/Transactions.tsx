import { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/Header/Header";
import {Summary } from "../../Components/Summary/Summary";
import { TrasactionContexts } from "../../contexts/TransactionsContexts";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./Transactions.styles";



export function Transactions(){
    const { transactions } = useContext(TrasactionContexts);
    

    return(
        <div>
            <Header />
            <Summary />


            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            console.log(transaction);
                            return(
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighlight varient={transaction.type}>
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                            
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
            
        </div>
    )
}