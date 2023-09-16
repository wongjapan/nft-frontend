import { publicDefaultClient } from '../config/wagmi';
import IssuerAbi from '../abi/OatIssuer.json'
import { IssuerAddress } from '../config/constants/address';

export const getAllCampaign = async (chain) => {

  const userChain = chain ? chain : 137;

  const selectedChain = userChain === 137 ? 137 : 80001

  const issuer = await publicDefaultClient(chain).readContract({
    address: IssuerAddress[selectedChain],
    abi: IssuerAbi.abi,
    functionName: "getAllCampaign",
  })

  return issuer

}