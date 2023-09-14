import { publicDefaultClient } from 'config/wagmi';
import IssuerAbi from '../abi/OatIssuer.json'

const { IssuerAddress } = require("config/constants/address")

export const getAllCampaign = async (chain) => {

  // const selectedChain = chain ? chain : 137;
  const selectedChain = 137;

  const issuer = await publicDefaultClient(chain).readContract({
    address: IssuerAddress[selectedChain],
    abi: IssuerAbi.abi,
    functionName: "getAllCampaign",
  })

  return issuer

}