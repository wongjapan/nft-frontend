import React, { useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { IssuerAddress } from "../../config/constants/address";
// import { useTheme } from "context/ThemeContext/ThemeProvider";
import { toast } from "react-toastify";
import { getIssuerAbi } from "../../utils/getAbi";
import { useCanClaim } from "../../hooks/useCanClaim";

const ClaimButton = ({ campaignId }) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    abi: getIssuerAbi(chain?.id),
    address: IssuerAddress[chain?.id],
    functionName: "claimOat",
    args: [campaignId],
  });
  const { write, isSuccess, isLoading } = useContractWrite(config);

  const canClaim = useCanClaim(address, chain?.id, campaignId);

  const handleClaim = async () => {
    write?.();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Claimed successfully");
    }
  }, [isSuccess]);

  console.log("canClaim", canClaim);

  return (
    <button
      disabled={!canClaim || isLoading}
      onClick={handleClaim}
      className="px-4 py-2 font-bold text-white rounded-sm bg-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Claim
    </button>
  );
};

export default ClaimButton;
