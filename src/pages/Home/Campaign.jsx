import { ALL_CAMPAIGN } from "data/mock/campaign";
import React from "react";
import { truncateText } from "utils/textTruncate";
import ClaimButton from "./ClaimButton";
import { useAccount, useQuery } from "wagmi";
import ConnectButton from "./ConnectButton";
import { fetch_metadata } from "fetcher/campaignDetail";

const CampaignCard = ({ id, name }) => {
  const { isConnected } = useAccount();

  const { isLoading, data } = useQuery({
    queryKey: ["campaigns", "detail", id],
    queryFn: () => fetch_metadata(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-dark-1 rounded-[10px] overflow-hidden">
      <div className="w-32 h-32">
        <img
          className="object-cover p-8 rounded-t-lg"
          src={data.image}
          alt={name}
        />
      </div>
      <div className="px-5 pt-5 pb-5">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-primary-green dark:text-primary-green">
            {truncateText(data.name)}
          </h5>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          <p className="text-gray-900 dark:text-white">
            {truncateText(data.description, 100)}
          </p>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          {isConnected ? <ClaimButton campaignId={id} /> : <ConnectButton />}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
