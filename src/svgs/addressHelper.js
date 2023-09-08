import { nftAddress, nftIssuer } from "constants/address"

/**
 * 
 * @param {number} chain 
 * @returns string contract address
 */
export const getNFTAddress = (chain) => {
  return nftAddress[chain]
}

/**
 * 
 * @param {number} chain 
 * @returns string contract address
 */
export const getIsserAddress = (chain) => {
  return nftIssuer[chain]
}

