import { Summary } from "../Summary/Summary";
import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./Header.styles";
import { NewTransactionModal } from "../NewTransactionModal/NewTransactionModal";

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <h3>logo</h3>

                <NewTransactionModal />
            </HeaderContent>
        </HeaderContainer>
    )
}