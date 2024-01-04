import { BrowserRouter as Router } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext/GlobalProvider'
import WebRouter from './route'
import 'react-datetime/css/react-datetime.css'
import { ModalProvider } from 'react-simple-modal-provider'
import modals from './components/Modal'
import { WagmiConfig } from 'wagmi'
import { ethereumClient, modalTheme, projectId, wagmiConfig } from './config/wagmi'
import { Web3Modal } from '@web3modal/react'
import { useTheme } from './context/ThemeContext/ThemeProvider'


function App() {

  const { theme } = useTheme()

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ModalProvider value={modals}>
          <SidebarProvider>
            <Router>
              <WebRouter />
            </Router>
          </SidebarProvider>
        </ModalProvider>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={theme}
        themeVariables={modalTheme}
        chainImages={[{
          159: 'https://mintnft.arborswap.org/images/logo-small.svg'
        }]
        }
      />
    </>
  )
}

export default App;