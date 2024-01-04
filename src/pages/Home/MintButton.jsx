import React, { useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { ArborAddress, badgeAddress } from "../../config/constants/address";
import { toast } from "react-toastify";
import { getBadgeAbi, getERC20Abi } from "../../utils/getAbi";
import { useCanClaim } from "../../hooks/useCanClaim";

const uint256Max = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const MintButton = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    abi: getBadgeAbi(),
    address: badgeAddress,
    functionName: "safeMint"
  });

  const {approveConfig} = usePrepareContractWrite({
    abi: getERC20Abi(),
    address: ArborAddress,
    functionName: "approve",
    args: [badgeAddress, uint256Max ]
  })

  const { write, isSuccess, isLoading, isError } = useContractWrite(config);

  const handleClaim = async () => {
    write?.();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Minting successfully");
    }
  }, [isSuccess]);


  return (
    <button
      disabled={isLoading || isError}
      onClick={handleClaim}
      className="px-4 py-2 font-bold text-white rounded-sm bg-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Mint
    </button>
  );
};

export default MintButton;
