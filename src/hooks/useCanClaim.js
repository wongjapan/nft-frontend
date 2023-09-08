import { IssuerAddress } from "config/constants/address"
import { getIssuerAbi } from "utils/getAbi"
import { useContractRead } from "wagmi"

export const useCanClaim = (account, chainId, campaignId) => {

  const { data: isWhitelisted } = useContractRead({
    address: IssuerAddress[chainId],
    abi: getIssuerAbi(),
    functionName: "isWhitelisted",
    args: [account, campaignId]
  });

  const { data: isAlreadyClaimed } = useContractRead({
    address: IssuerAddress[chainId],
    abi: getIssuerAbi(),
    functionName: "isAlreadyClaimed",
    args: [account, campaignId]
  });

  return isWhitelisted && !isAlreadyClaimed

}

export const useAlreadyClaimed = async (account, chainId, campaignId) => {

  const { data: isAlreadyClaimed } = useContractRead({
    address: IssuerAddress[chainId],
    abi: getIssuerAbi(),
    functionName: "isAlreadyClaimed",
    args: [account, campaignId]
  });

  return isAlreadyClaimed
}

export const useIsWhitelisted = async (account, chainId, campaignId) => {

  const { data: isWhitelisted } = useContractRead({
    address: IssuerAddress[chainId],
    abi: getIssuerAbi(),
    functionName: "isWhitelisted",
    args: [account, campaignId]
  });

  return isWhitelisted

}

export const useIsAdmin = async (account, chainId) => {
  // console.log({ account, chainId })
  // const MINTER_ROLE = '0x20c3b784c1251fbb97fe6db3cfa63383dd3aa172d2b3a79bcdb8ea8c7a384afc'
  const MINTER_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000'

  const { data: isAdmin, isLoading, isError } = useContractRead({
    address: IssuerAddress[chainId],
    abi: getIssuerAbi(),
    functionName: "hasRole",
    args: [MINTER_ROLE, account]
  });

  if (!account || !chainId || typeof isAdmin === 'undefined' || typeof chainId === 'undefined') {
    return false
  }

  if (isLoading) return false
  if (isError) return false


  return isAdmin

}