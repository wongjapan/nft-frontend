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
    <div className="flex flex-col gap-3 h-full bg-white dark:bg-dark-1 rounded-[10px] pb-5">
      <div className="w-32 h-32 rounded-t-[10px]">
        <img
          className="object-cover p-8 rounded-t-[10px]"
          src={data.image}
          alt={name}
        />
      </div>

      <h5 className="px-5 text-xl font-semibold tracking-tight text-primary-green dark:text-primary-green">
        {data.name}
      </h5>

      <p className="px-5 text-gray-900 dark:text-white">
        {truncateText(data.description, 100)}
      </p>

      <div className="px-5 mt-auto">
        {isConnected ? <ClaimButton campaignId={id} /> : <ConnectButton />}
      </div>
    </div>
  );
};

export default CampaignCard;
