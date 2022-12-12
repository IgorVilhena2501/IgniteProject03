import { ThemeProvider } from 'styled-components'
import { TransactionProvider } from './contexts/TransactionsContexts'
import { Transactions } from './pages/Transactions/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    
    </ThemeProvider>
  )
}

export default App
