import LaunchpadSVG from '../svgs/Sidebar/launchpad'
import AirplaneSVG from '../svgs/Sidebar/airplane'
import DashboardSVG from '../svgs/Sidebar/dashboard'
import MoreProductsSVG from '../svgs/Sidebar/more_products'
// import SheildSecuritySVG from 'svgs/Sidebar/shield_security'
import StakingSVG from '../svgs/Sidebar/staking'
import TradeSVG from '../svgs/Sidebar/trade'

const PROTOCOL_BASE = 'https://protocol.arborswap.org'
const HOME_BASE = 'https://www.arborswap.org'
export const sitemap = [
  {
    id: 1,
    name: 'Home',
    extendable: false,
    icon: <DashboardSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <DashboardSVG className="fill-primary-green" />,
    subitems: [],
    link: HOME_BASE,
    sublinks: [HOME_BASE],
  },
  {
    id: 2,
    name: 'Launchpad',
    extendable: true,
    icon: <LaunchpadSVG className="fill-dim-text dark:fill-dim-text-dark" />,
    activeIcon: <LaunchpadSVG className="fill-primary-green" />,
    subitems: [
      {
        id: 1,
        name: 'Pools',
        link: PROTOCOL_BASE + '/launchpad/pools',
      },
      {
        id: 2,
        name: 'Create Sale',
        link: PROTOCOL_BASE + '/launchpad/create-sale',
      },
    ],
    sublinks: [PROTOCOL_BASE + '/launchpad/pools', PROTOCOL_BASE + '/launchpad/create-sale'],
  },

  {
    id: 3,
    name: 'Locker',
    extendable: true,
    icon: <StakingSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <StakingSVG className="fill-primary-green" />,
    subitems: [
      {
        id: 1,
        name: 'Locked Assets',
        link: PROTOCOL_BASE + '/locked-assets',
      },
      {
        id: 2,
        name: 'Token Locker',
        link: PROTOCOL_BASE + '/locker/token-locker',
      },
      {
        id: 3,
        name: 'LP Locker',
        link: PROTOCOL_BASE + '/locker/lp-locker',
      },
    ],
    sublinks: [PROTOCOL_BASE + '/locked-assets', PROTOCOL_BASE + 'locker/token-locker', PROTOCOL_BASE + 'locker/lp-locker'],
  },
  {
    id: 4,
    name: 'Airdropper',
    extendable: true,
    icon: <AirplaneSVG className="fill-dim-text dark:fill-dim-text-dark scale-[1.2] hover:fill-primary-green" style={{ paddingLeft: '2px' }} />,
    activeIcon: <AirplaneSVG className="fill-primary-green scale-[1.2]" />,
    subitems: [
      {
        id: 1,
        name: 'Airdrops',
        link: PROTOCOL_BASE + '/airdropper/airdrops',
      },
      {
        id: 2,
        name: 'Create Airdrop',
        link: PROTOCOL_BASE + '/airdropper/create-airdrop',
      },
    ],
    sublinks: [PROTOCOL_BASE + '/airdropper/airdrops', PROTOCOL_BASE + '/airdropper/create-airdrop'],
  },
  {
    id: 5,
    name: 'Trade',
    extendable: true,
    icon: <TradeSVG className="fill-dim-text dark:fill-dim-text-dark scale-[1.2] hover:fill-primary-green" style={{ paddingLeft: '1.9px', width: '22px' }} />,
    activeIcon: <TradeSVG className="fill-primary-green scale-[1.2]" />,
    subitems: [
      {
        id: 1,
        name: 'Exchange',
        link: 'https://www.arborswap.org/swap',
      },
      {
        id: 2,
        name: 'Liquidity',
        link: 'https://www.arborswap.org/add',
      },
      {
        id: 3,
        name: 'Limit Orders',
        link: 'https://www.arborswap.org/liquidity',
      },
    ],
    sublinks: ['/airdropper/airdrops', '/airdropper/create-airdrop'],
  },
  {
    id: 6,
    name: 'Staking',
    extendable: false,
    icon: <StakingSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <StakingSVG className="fill-primary-green" />,
    subitems: [],
    link: 'https://www.arborswap.org/pools',
    sublinks: [],
  },
  {
    id: 7,
    name: 'OAT NFT',
    extendable: false,
    icon: <MoreProductsSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <MoreProductsSVG className="fill-primary-green" />,
    subitems: [],
    link: '/',
    sublinks: []
  }
]
