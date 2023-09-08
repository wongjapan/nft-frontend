import { IssuerAddress } from "config/constants/address";
import { useContractRead, useNetwork } from "wagmi"
// import nftAbi from '../abi/ArborswapOat.json'
import nftIssuer from '../abi/OatIssuer.json'


export const useAllCampaign = async () => {

  const { chain } = useNetwork();

  const selectedChain = chain ? chain.id : 137;

  console.log("selectedChain", selectedChain)

  return useContractRead({
    address: IssuerAddress[selectedChain],
    abi: nftIssuer.abi,
    functionName: "getAllCampaign",
    chainId: selectedChain,
  })

  // return { data, isLoading, isError }

}