import React from "react";
import { truncateText } from "../../utils/textTruncate";
import ClaimButton from "./ClaimButton";
import { useAccount, useQuery } from "wagmi";
import ConnectButton from "./ConnectButton";
import { fetch_metadata } from "../../fetcher/campaignDetail";
import { checkAllowance } from "../../fetcher/allCampaign";
import MintButton from "./MintButton";
import ApproveButton from "./ApproveButton";

const METADATA = {
  name: "Roburna Testnet NFT",
  image: 'https://mintnft.arborswap.org/images/badge.jpg',
  description: 'Exclusive NFT to claim on Roburna Testnet, a token of your Testnet Campaign journey.'
}

const MintingCard = () => {
  const { isConnected, address } = useAccount();

  const { isLoading, data } = useQuery({
    queryKey: ["allowance", address],
    queryFn: () => checkAllowance(address),
    refetchInterval:2000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="flex flex-col gap-3 bg-white dark:bg-dark-1 rounded-[10px] pb-5">
      <div className="w-full rounded-t-[10px]">
        <img
          className="object-cover rounded-t-[10px]"
          src={METADATA.image}
          alt={METADATA.name}
        />
      </div>

      <h5 className="px-5 text-xl font-semibold tracking-tight text-primary-green dark:text-primary-green">
        {METADATA.name}
      </h5>

      <p className="px-5 text-gray-900 dark:text-white">
        {truncateText(METADATA.description, 100)}
      </p>

      <div className="px-5 mt-auto">
        {isConnected ? (data === true? <MintButton /> : <ApproveButton />) : <ConnectButton />}
      </div>
    </div>
  );
};

export default MintingCard;
