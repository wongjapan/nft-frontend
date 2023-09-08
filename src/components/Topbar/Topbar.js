import React from 'react'
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'

export default function Topbar({
  setSideBarMobile,
  sideBarMobile
}) {

  return (
    <div className="h-[110px] flex items-center justify-between pl-[4%] pr-[5%] ">
      <div className="flex items-center">
        <div
          className="flex md:hidden flex-col h-10 w-10 bg-[#F5F6F7] dark:bg-dark-1 hamburger justify-center items-center"
          onClick={() => setSideBarMobile(!sideBarMobile)}
        >
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'} h-0 w-5 border border-dark-text dark:border-light-text`}
          />
          <span className={`${sideBarMobile ? 'block' : 'hidden'} dark:text-light-text`}>&#x2715;</span>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='mr-2'>
          <Web3NetworkSwitch />
        </div>
        <Web3Button icon='hide' />
      </div>
    </div>
  )
}
