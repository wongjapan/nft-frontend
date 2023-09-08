import { ethers } from "ethers"

/**
 * 
 * @param {import("viem").Chain | undefined} chainId 
 * @returns 
 */
export const fetchAllCampaign = async (chainId) => {
  if (!chainId) {
    return 'provide chainId'
  }
  return chainId.id

}

/**
 * 
 * @param {import("viem").Chain | undefined} chainId 
 */
export const getEthersProvider = (chainId) => {

  if (!chainId) {
    return 'provide chainId'
  }

  return new ethers.providers.JsonRpcProvider()

}