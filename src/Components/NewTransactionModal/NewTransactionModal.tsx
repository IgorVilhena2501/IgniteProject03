import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, FileDoc, X } from 'phosphor-react'
import { NewTransactionButton } from "../Header/Header.styles";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./NewTransactionModal.styles";
import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from "../../lib/axios";
import { useContext } from "react";
import { TrasactionContexts } from "../../contexts/TransactionsContexts";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
    const { createNewTransaction } = useContext(TrasactionContexts)

    const {register, handleSubmit, formState: { isSubmitting }, control, reset} = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })


    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        await createNewTransaction({
            description: data.description,
            price: data.price,
            category: data.category,
            type: data.type,
        })

        reset();
    }



    return(
        <Dialog.Root>
            
            <Dialog.Trigger asChild>
                <NewTransactionButton>nova transação</NewTransactionButton>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Overlay />
                    
                <Content>
                    <Dialog.Title>Nova Transação</Dialog.Title>

                    <CloseButton >
                        <X size={24}/>
                    </CloseButton>

                    <form action="#" onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input type="text" placeholder="Descrição" {...register('description')}/>
                        <input type="number" placeholder="Preço" {...register('price', { valueAsNumber: true})}/>
                        <input type="text" placeholder="Categoria" {...register('category')}/>

                        <Controller
                            control={control}
                            name="type"
                            render={({field}) => {
                                return (
                                    <TransactionType onValueChange={field.onChange} value={field.value}>
                                        <TransactionTypeButton varient="income" value="income">
                                            <ArrowCircleUp size={24}/>
                                            Entrada
                                        </TransactionTypeButton>

                                        <TransactionTypeButton varient="outcome" value="outcome">
                                            <ArrowCircleDown size={24}/>
                                            Saida
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }}
                        />

                        <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                    </form>
                </Content>
            
            </Dialog.Portal>
        
        </Dialog.Root>
    )
}