import React, { useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useQueryClient,
} from "wagmi";
import { ArborAddress, badgeAddress } from "../../config/constants/address";
import { toast } from "react-toastify";
import { getBadgeAbi, getERC20Abi } from "../../utils/getAbi";

const uint256Max = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

const ApproveButton = () => {
  const queryClient = useQueryClient()

  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    abi: getERC20Abi(),
    address: ArborAddress,
    functionName: "approve",
    args: [badgeAddress, uint256Max ]
  });


  const { write, isSuccess, isLoading, isError } = useContractWrite(config);

  const handleClaim = async () => {
    write?.();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Approve successfully");
      queryClient.invalidateQueries('allowance', { refetchActive: true })
    }
  }, [isSuccess]);


  return (
    <button
      disabled={isLoading}
      onClick={handleClaim}
      className="px-4 py-2 font-bold text-white rounded-sm bg-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Approve
    </button>
  );
};

export default ApproveButton;
