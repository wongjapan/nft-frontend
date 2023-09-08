import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sitemap as nav_items } from '../../data/sitemap'
import TwitterSVG from '../../svgs/Socials/twitter'
import InstagramSVG from '../../svgs/Socials/instagram'
import { ThemeContext } from '../../context/ThemeContext/ThemeProvider'
import { SidebarContext } from '../../context/SidebarContext/GlobalProvider'
import TelegramSVG from '../../svgs/Socials/telegram'
import SidebarArrowSVG from 'svgs/Sidebar/sidebar_arrow'
import { useRBAPrice } from 'hooks/useRBAPrice'
// import { useAccount, useNetwork } from 'wagmi'
// import { useIsAdmin } from 'hooks/useCanClaim'
// import SheildSecuritySVG from 'svgs/Sidebar/shield_security'

const socials = [
  {
    id: 1,
    icon: <TelegramSVG className="fill-dark-text dark:fill-light-text" />,
    link: 'https://t.me/arborswap',
  },
  {
    id: 2,
    icon: <TwitterSVG className="fill-dark-text dark:fill-light-text" />,
    link: 'https://twitter.com/arborswap_defi?s=21&t=oo8B0OfgInd080XRLyhVwg',
  },
  {
    id: 3,
    icon: <InstagramSVG className="fill-dark-text dark:fill-light-text" />,
    link: 'https://www.instagram.com/arborswapofficial/?igshid=YmMyMTA2M2Y%3D',
  },
  // {
  //   id: 4,
  //   icon: <DribbleSVG className="fill-dark-text dark:fill-light-text" />,
  // },
]

export default function Sidebar({ fullSidebar, tempfixed, handleTempFixed, activeLink }) {

  const { setShowSidebar } = useContext(SidebarContext)
  const [activeItem, setActiveItem] = useState('null')


  const { theme } = useContext(ThemeContext)
  const location = useLocation()
  const rbaPrice = useRBAPrice()

  // const { chain } = useNetwork()
  // const { address } = useAccount()
  // const isAdmin = useIsAdmin(address, chain?.id)

  useEffect(() => {
    setActiveItem(activeLink)
  }, [activeLink])

  const handleActiveItem = (nav_item, nav_item_extendable) => {
    if (nav_item_extendable) {
      if (nav_item === activeItem) {
        setActiveItem('null')
      } else {
        setActiveItem(nav_item)
      }
    }
  }

  const handleSmallSidebar = (nav_item) => {
    if (nav_item === activeItem) {
      setActiveItem('null')
    } else {
      setActiveItem(nav_item)
    }
    setShowSidebar(true)
  }


  if (!fullSidebar) {
    return (
      <div className="flex justify-end w-full">
        <div className="w-[50%] flex flex-col items-center mb-[5%] justify-between">
          <div className="flex mt-5 logo-div">
            <img src="/images/logo-small.svg" className='w-8 h-10' alt="logo" />
          </div>
          <div className="nav-items">
            {nav_items.map((nav_item, index) =>
              nav_item.extendable ? (
                <div key={nav_item.id} className="mt-8" onClick={() => handleSmallSidebar(nav_item.name)}>
                  {nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}
                </div>
              ) : (
                <Link key={nav_item.id} to={nav_item.link}>
                  <div className="mt-8">{nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}</div>
                </Link>
              ),
            )}
          </div>
          <div className='flex flex-col justify-end border-t-2 border-[#858585] border-opacity-10 pt-5'>
            <div className="flex items-center justify-end mb-5">
              {theme === 'dark' ? (
                <img className="w-5 h-5 mr-3" src="/images/sidebar/moon.svg" alt="moon" />
              ) : (
                <img className="mr-3" src="/images/sidebar/sun.svg" alt="sun" />
              )}
              <label htmlFor="default-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  checked={tempfixed ? false : true}
                  id="default-toggle"
                  className="sr-only peer"
                  onChange={handleTempFixed}
                />
                <div className="w-14 h-7 bg-[#F5F1EB] peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all border-[#F5F1EB] peer-checked:bg-dark-3" />
              </label>
            </div>
            <div className="bg-[#C89211] rounded-[14px] flex items-center px-2 py-1">
              <img src="/images/sidebar/logo.svg" alt="logo" />

              <span className="ml-2 font-semibold text-white font-gilroySemiBold">
                {"$" + (rbaPrice?.rbaPriceUsd?.toFixed(4))}
              </span>
            </div>
          </div>

        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-between w-full h-full pb-5 mb-5 ">
      <div className='h-full'>
        <div className="flex justify-center mt-5 logo-div">
          <img src="/images/logo.svg" alt="logo" className='w-40 h-10' />
        </div>
        <div className="h-full overflow-x-scroll nav-items ">
          {nav_items.map((nav_item) => (
            <div key={nav_item.id} className="w-full mt-6 cursor-pointer">
              <Link to={nav_item.link}>
                <div
                  className="flex items-center justify-between"
                  onClick={(nav_item_name) => handleActiveItem(nav_item.name, nav_item.extendable)}
                >
                  <div className="flex ml-[12%]">
                    {nav_item.name === activeLink ? nav_item.activeIcon : nav_item.icon}
                    <span
                      className={`font-gilroy ml-2 ${'text-gray dark:text-dim-text-dark hover:text-primary-green'
                        }`}
                    >
                      {nav_item.name}
                    </span>
                  </div>
                  {nav_item.extendable && (
                    <div className="mr-4">
                      <SidebarArrowSVG className="fill-gray dark:fill-light-text hover:fill-primary-green" />
                    </div>
                  )}
                </div>
              </Link>
              {(nav_item.id !== 1 && nav_item.id !== 7) &&
                <div className={`bg-[#FAF8F5] dark:bg-dark-2 flex flex-col  pl-[calc(10%+38px)]  overflow-hidden ${activeItem === nav_item.name ? "transition-sidebar-open pb-5  mt-3 pt-3" : "transition-sidebar-close"}`}>
                  {nav_item.subitems.map((subItem, index) => (
                    <a key={index} href={subItem.link} className="mt-5 first:mt-0">
                      <span
                        className={`font-medium font-gilroy ${location.pathname === subItem.link
                          ? 'text-primary-green'
                          : 'text-dim-text dark:text-dim-text-dark hover:text-primary-green'
                          }`}
                      >
                        {subItem.name}
                      </span>
                    </a>
                  ))}
                </div>}



            </div>
          ))}
          {activeItem === 'null' && <div className="bg-white dark:bg-dark-1 pt-[20%]"></div>}
          {/* {(address && isAdmin) && (
            <div className='w-full mt-6 cursor-pointer'>
              <Link to={'/admin'}>
                <div
                  className="flex items-center justify-between"
                  onClick={() => handleActiveItem('Admin Page', false)}
                >
                  <div className="flex ml-[12%]">
                    <SheildSecuritySVG className="fill-gray dark:fill-light-text hover:fill-primary-green" />
                    <span
                      className={`font-gilroy ml-2 ${'text-gray dark:text-dim-text-dark hover:text-primary-green'
                        }`}
                    >
                      Admin Page
                    </span>
                  </div>

                </div>
              </Link>
            </div>
          )} */}
        </div>

      </div>
      <div className="h-20 md:hidden"></div>

      <div className=" flex flex-col items-center border-t-2 border-[#858585] border-opacity-10 pt-5">
        <div className="flex justify-end w-full pr-5" >
          {theme === 'dark' ? (
            <img className="mr-3" src="/images/sidebar/moon.svg" alt="moon" />
          ) : (
            <img className="mr-3" src="/images/sidebar/sun.svg" alt="sun" />
          )}
          <label htmlFor="default-toggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={tempfixed ? false : true}
              id="default-toggle"
              className="sr-only peer"
              onChange={handleTempFixed}
            />
            <div className="w-14 h-6 md:w-14 md:h-[25px] bg-[#807373] bg-opacity-30 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[5px] after:md:top-[5px] after:left-[4px] after:md:left-[4px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:md:h-5 after:w-5 after:md:w-5 after:transition-all border-[#F5F1EB] peer-checked:after:left-3 peer-checked:bg-dark-3" />
          </label>

          <div className="bg-[#C89211] rounded-[14px] flex items-center px-2 py-1 ml-8">
            <img src="/images/sidebar/logo.svg" alt="logo" />

            <span className="ml-2 font-semibold text-white font-gilroySemiBold">
              {"$" + (rbaPrice?.rbaPriceUsd?.toFixed(4))}
            </span>
          </div>
        </div>

        <div className="flex w-full mt-4 ml-10 socials">
          {socials.map((social) => (
            <a key={social.id} href={social.link} className="ml-[14px] first:ml-0" target="_blank" rel='noreferrer'>
              <div
                className="twitter flex items-center justify-center bg-[#F5F1EB] dark:bg-dark-3 w-[34px] h-[34px] rounded-md "
              >
                {social.icon}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-5 copyrights">
          <span className=" text-[10px] text-dim-text dark:text-dim-text-dark font-gilroy font-medium">
            @2023 Arborswap. All right Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}
