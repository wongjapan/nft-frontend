import React from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import Panel from '../../components/Launchpad/CreateSale/Panel'
import LaunchpadSVG from '../../svgs/Sidebar/launchpad'
import { useState } from 'react'
import { useDocumentTitle } from 'hooks/setDocumentTitle'

export default function CreateSale() {
    useDocumentTitle("Create Sale")
    const initSaleState = {
        name: '',
        isValid: false,
        airdropAddress: '',
        type:  '',
        tokenAddress: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: '',
        tokenSupply: '',
        image: '',
        description: '',
        tags: '',
        website: '',
        twitter: '',
        linkedin: '',
        github: '',
        telegram: '',
        discord : '',
        youtube: '',
        userBalance: '',
        userAllowance: '0',
    }
    const [saleData, setSaleData] = useState({ ...initSaleState, showLanding: true, showDetails: false })
    return (
        <BaseLayout title={"Launchpad"} title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />} page_name={"Create sale"}
            page_description={"Launch your project with Arborswap."}>
            <Panel saleData={saleData} setSaleData={setSaleData} initSaleState={initSaleState}/>
        </BaseLayout>
    )
}
