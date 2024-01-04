import { publicDefaultClient } from '../config/wagmi';
import IssuerAbi from '../abi/OatIssuer.json'
import ERC20Abi from '../abi/ERC20.json'
import { ArborAddress, IssuerAddress, badgeAddress } from '../config/constants/address';

export const getAllCampaign = async (chain) => {

  const selectedChain = chain ? chain : 137;

  // const selectedChain = userChain === 137 ? 137 : 80001

  console.log("Selected Chain: ", selectedChain)

  const issuer = await publicDefaultClient(selectedChain).readContract({
    address: IssuerAddress[selectedChain],
    abi: IssuerAbi.abi,
    functionName: "getAllCampaign",
  })

  return issuer
}

export const checkAllowance = async (account) => {
  // mint cost is 5 eth big number
  const mintcost = 5000000000000000001n
  // check if account is undefined
  if (!account) return false

  const allowance = await publicDefaultClient(159).readContract({
    address: ArborAddress,
    abi: ERC20Abi.abi,
    functionName: "allowance",
    args: [account, badgeAddress]
  })

  // check if allowance is greater than 0 big number
  if (allowance > mintcost) return true

  return false
}