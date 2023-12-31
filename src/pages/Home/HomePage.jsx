import React from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import HomeLayout from "../../components/HomeLayout";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import { useNetwork, useQuery } from "wagmi";
import { getAllCampaign } from "../../fetcher/allCampaign";
import CampaignCard from "./Campaign";
import MintingCard from "./Minting";

export default function HomePage() {
  useDocumentTitle("OAT NFT");
  const { chain } = useNetwork();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["campaigns", chain?.id],
    queryFn: () => getAllCampaign(chain?.id),
  });

  if(chain?.id === 159) {
    return (<BaseLayout>
      <HomeLayout>
        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
         <MintingCard />
        </div>
      </HomeLayout>
    </BaseLayout>)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <BaseLayout>
      <HomeLayout>
        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {data.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              id={campaign.id}
              name={campaign.name}
            />
          ))}
        </div>
      </HomeLayout>
    </BaseLayout>
  );
}
