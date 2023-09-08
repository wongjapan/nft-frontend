import { useWeb3Modal } from "@web3modal/react";

import React from "react";

const ConnectButton = ({ campaignId }) => {
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={open}
      className="px-4 py-2 font-bold text-white rounded-sm bg-primary-green"
    >
      Connect
    </button>
  );
};

export default ConnectButton;
