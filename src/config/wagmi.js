import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
// import { alchemyProvider } from 'wagmi/providers/alchemy'

const rbaChain = {
  id: 159,
  name: 'Rbachain',
  network: 'rbachain',
  nativeCurrency: {
    decimals: 18,
    name: 'Roburna',
    symbol: 'RBA',
  },
  rpcUrls: {
    public: { http: ['https://preseed-testnet-1.roburna.com/'] },
    default: { http: ['https://preseed-testnet-1.roburna.com/'] },
  },
  blockExplorers: {
    etherscan: { name: 'RBASCAN', url: 'https://rbascan.com' },
    default: { name: 'RBASCAN', url: 'https://rbascan.com' },
  },
  contracts: {
    multicall3: {
      address: '0x147cf52DEd2eeC39aDEC1d7434C4870218C66894',
      blockCreated: 4_514_041,
    },
  },
}

const chains = [polygon, polygonMumbai, rbaChain]
export const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECTID

export const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)

export const modalTheme = {
  "--w3m-color-fg-1": "rgb(228,231,231)",
  "--w3m-color-fg-2": "rgb(148,158,158)",
  "--w3m-color-fg-3": "rgb(110,119,119)",
  "--w3m-color-bg-1": "rgb(20,20,20)",
  "--w3m-color-bg-2": "rgb(39,42,42)",
  "--w3m-color-bg-3": "rgb(59,64,64)",
  "--w3m-color-overlay": "rgba(255,255,255,0.1)",
  "--w3m-accent-color": "rgb(0, 120, 63)",
  "--w3m-accent-fill-color": "#FFFFFF",
  "--w3m-z-index": "89",
  "--w3m-background-color": "rgb(0, 120, 63)",
  "--w3m-background-border-radius": "6px",
  "--w3m-container-border-radius": "30px",
  "--w3m-wallet-icon-border-radius": "15px",
  "--w3m-wallet-icon-large-border-radius": "30px",
  "--w3m-wallet-icon-small-border-radius": "7px",
  "--w3m-input-border-radius": "28px",
  "--w3m-button-border-radius": "6px",
  "--w3m-notification-border-radius": "36px",
  "--w3m-secondary-button-border-radius": "28px",
  "--w3m-icon-button-border-radius": "50%",
  "--w3m-button-hover-highlight-border-radius": "10px",
  "--w3m-text-big-bold-size": "20px",
  "--w3m-text-big-bold-weight": "600",
  "--w3m-text-big-bold-line-height": "24px",
  "--w3m-text-big-bold-letter-spacing": "-0.03em",
  "--w3m-text-big-bold-text-transform": "none",
  "--w3m-text-xsmall-bold-size": "10px",
  "--w3m-text-xsmall-bold-weight": "700",
  "--w3m-text-xsmall-bold-line-height": "12px",
  "--w3m-text-xsmall-bold-letter-spacing": "0.02em",
  "--w3m-text-xsmall-bold-text-transform": "uppercase",
  "--w3m-text-xsmall-regular-size": "12px",
  "--w3m-text-xsmall-regular-weight": "600",
  "--w3m-text-xsmall-regular-line-height": "14px",
  "--w3m-text-xsmall-regular-letter-spacing": "-0.03em",
  "--w3m-text-xsmall-regular-text-transform": "none",
  "--w3m-text-small-thin-size": "14px",
  "--w3m-text-small-thin-weight": "500",
  "--w3m-text-small-thin-line-height": "16px",
  "--w3m-text-small-thin-letter-spacing": "-0.03em",
  "--w3m-text-small-thin-text-transform": "none",
  "--w3m-text-small-regular-size": "14px",
  "--w3m-text-small-regular-weight": "600",
  "--w3m-text-small-regular-line-height": "16px",
  "--w3m-text-small-regular-letter-spacing": "-0.03em",
  "--w3m-text-small-regular-text-transform": "none",
  "--w3m-text-medium-regular-size": "16px",
  "--w3m-text-medium-regular-weight": "600",
  "--w3m-text-medium-regular-line-height": "20px",
  "--w3m-text-medium-regular-letter-spacing": "-0.03em",
  "--w3m-text-medium-regular-text-transform": "none",
  "--w3m-font-family": "Gilroy",
  "--w3m-font-feature-settings": "'tnum' on, 'lnum' on, 'case' on",
  "--w3m-success-color": "rgb(38,181,98)",
  "--w3m-error-color": "rgb(242, 90, 103)",
  "--w3m-overlay-background-color": "rgba(0, 0, 0, 0.3)",
  "--w3m-overlay-backdrop-filter": "none",
  "--w3m-background-image-url": "none",
  "--w3m-color-av-1": "rgb(213, 82, 52)",
  "--w3m-color-av-2": "rgb(29, 70, 140)",
  "--w3m-color-av-3": "rgb(171, 31, 209)",
  "--w3m-color-av-4": "rgb(157, 114, 147)",
  "--w3m-color-av-5": "rgb(132, 183, 137)"
}

export const publicDefaultClient = (chain = 80001) => {
  let defaultUrl
  let defaultChain

  if (chain === 137) {
    defaultChain = polygon
    defaultUrl = 'https://rpc-mainnet.maticvigil.com/'
  }
  else if (chain === 159) {
    defaultChain = rbaChain
    defaultUrl = 'https://preseed-testnet-1.roburna.com/'
  }
  else {
    defaultUrl = 'https://rpc.ankr.com/polygon_mumbai'
    defaultChain = polygonMumbai;
  }



  return createPublicClient({
    chain: defaultChain,
    transport: http(defaultUrl)
  })
}
