import IssuerAbi from '../abi/OatIssuer.json';
import NFTAbi from '../abi/ArborswapOat.json';
import BadgeAbi from '../abi/Badge.json';
import ERC20Abi from '../abi/ERC20.json';

export const getIssuerAbi = () => IssuerAbi.abi;
export const getNFTAbi = () => NFTAbi.abi;
export const getBadgeAbi = () => BadgeAbi.abi;
export const getERC20Abi = () => ERC20Abi.abi;