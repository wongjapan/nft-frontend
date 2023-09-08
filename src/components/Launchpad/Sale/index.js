import Timer from "components/LockedAsset/Amount/Timer/Timer";
import React, { useEffect, useState } from "react";
import getSaleInfo from "utils/getSaleInfo";
import { Contract } from "ethers";
import { useEthers } from "@usedapp/core";
import PublicSaleAbi from "../../../config/abi/PublicSale.json";
import PublicSaleErcAbi from "../../../config/abi/PublicSaleErcAbi.json";
import PrivateSaleAbi from "../../../config/abi/PrivateSale.json";
import PrivateSaleErcAbi from "../../../config/abi/PrivateSaleErcAbi.json";
import FairLaunchAbi from "../../../config/abi/FairlaunchSale.json";
import FairLaunchErcAbi from "../../../config/abi/FairlaunchErcAbi.json";
import getSuccessPublic from "utils/successfulPublic";
import useParticipated from "utils/getParticipated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PercentFilled from "../Pools/Subcomponents/PercentFilled";

export default function SaleBox({
  hard_cap,
  hard_cap_icon,
  min_allocation,
  max_allocation,
  ends_on,
  showModal,
  status,
  token,
  whitelisting,
  whitelistedUser,
  soft_cap,
  presale_address,
  currency,
  start_date,
  sale,
  visible,
  isFinished,
  isCancelled
}) {
  const [filled_percent, setFilledPercent] = useState(0);
  const { account, library } = useEthers();
  const [saleInfo, setSaleInfo] = useState(null);
  const saleSuccess = getSuccessPublic(presale_address);
  const participated = useParticipated(presale_address, account);
  console.log(whitelisting && !whitelistedUser, "whitelisting");
  useEffect(() => {
    const result = getSaleInfo(presale_address,sale.saleType).then((res) => {
      setSaleInfo(res);
    });
  }, []);

  const withdrawFunds = async () => {
    if (participated[0] === false) {
      toast.error("You have not participated in this sale");
      return;
    }
    let contract;
    if (sale.currency.symbol === "BNB") {
      if (sale.saleType === "standard") {
        contract = new Contract(
          sale.saleAddress,
          PublicSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchAbi,
          library.getSigner()
        );
      }
    } else {
      if (sale.saleType === "standard") {
        // console.log("STANDARD erc20");
        contract = new Contract(
          sale.saleAddress,
          PublicSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "private") {
        contract = new Contract(
          sale.saleAddress,
          PrivateSaleErcAbi,
          library.getSigner()
        );
      } else if (sale.saleType === "fairlaunch") {
        contract = new Contract(
          sale.saleAddress,
          FairLaunchErcAbi,
          library.getSigner()
        );
      }
    }
    try {
      const tx = await contract.withdrawUserFundsIfSaleCancelled();
      await tx.wait();
      toast.success("Funds withdrawn successfully");
    } catch (err) {
      toast.error("Error withdrawing funds");
    }
  };
  
  return (
    <>
      <div className="p-9 bg-white dark:bg-dark-1 rounded-[20px]">
        <div className="w-full flex justify-between">
          <span className="text-gray dark:text-gray-dark text-sm font-medium">
            Soft/Hard Cap
          </span>

          <div className="bg-primary-green bg-opacity-[0.08] px-3 py-[3px] rounded-[10px] border-[0.5px] border-dashed border-primary-green">
            <span className="rounded-[10px] text-primary-green">{status}</span>
          </div>
        </div>

        <div className="mt-3 flex">
          <div className="ml-3">
            <span className="text-dark-text dark:text-light-text text-2xl font-bold">
              {soft_cap} - {hard_cap} {sale.currency.symbol}
            </span>
          </div>
        </div>

        <div className="mt-7 flex justify-between">
          <span className="font-medium text-sm text-gray dark:text-gray-dark">
            Min Allocation
          </span>
          <span className="font-bold text-sm text-dark-text dark:text-light-text">
            {min_allocation && min_allocation.toLocaleString()}{" "}
            {currency.symbol}
          </span>
        </div>

        <div className="mt-5 flex justify-between">
          <span className="font-medium text-sm text-gray dark:text-gray-dark">
            Max Allocation
          </span>
          <span className="font-bold text-sm text-dark-text dark:text-light-text">
            {max_allocation && max_allocation.toLocaleString()}{" "}
            {currency.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between mt-5">
          {hard_cap && filled_percent != null ? (
            <span className="text-xs font-medium text-gray dark:text-gray-dark">
              {(hard_cap * (filled_percent / 100)).toFixed(4)} {currency.symbol}{" "}
              Raised
            </span>
          ) : (
            <></>
          )}
          <span className="text-xs  text-dim-text dark:text-dim-text-dark">
            {hard_cap} {currency.symbol}
          </span>
        </div>

        <PercentFilled
          address={presale_address}
          setFilled={setFilledPercent}
          showModal={showModal}
          isFinished={isFinished}
          isCancelled={isCancelled}
          saleType={sale.saleType}
          sale={sale}
        />
        {/* if sale is upcoming then show countdown */}

        {status === "Upcoming" ? (
          <div>
            <div className="flex justify-center mt-7">
              <span className="text-sm font-medium text-gray dark:text-gray-dark">
                Sale Starts in
              </span>
            </div>
            <Timer date={new Date(start_date * 1000)} />
          </div>
        ) : whitelisting && !whitelistedUser ? (
          <div className="flex mt-10">
            <button
              className="w-full bg-dim-text bg-opacity-50 dark:bg-dim-text-dark rounded-md text-white font-bold py-4"
              disabled
            >
              WhiteList Only
            </button>
          </div>
        ) : (
          <div className="flex mt-10">
            <button
              disabled={
                status === "Ended" || isFinished || isCancelled ||
                (saleInfo &&
                  saleInfo.totalBNBRaised.toString() -
                    saleInfo.hardCap.toString()) === 0
                  ? true
                  : false
              }
              className={`w-full ${
                status !== "Ended" && !isFinished
                  ? "bg-primary-green"
                  : "bg-dim-text bg-opacity-50 dark:bg-dim-text-dark"
              } rounded-md text-white font-bold py-4 disabled:bg-dim-text disabled:opacity-50 disabled:dark:bg-dim-text-dark`}
              onClick={() => showModal(true)}
            >
              {status === "Ended"
                ? "Ended"
                : saleInfo &&
                  saleInfo.totalBNBRaised.toString() -
                    saleInfo.hardCap.toString() ===
                    0
                ? "Hard Cap Reached":
                isCancelled ? "Sale Cancelled"
                : "Join Sale"}
            </button>
          </div>
        )}

        {status !== "Upcoming" && status !== "Ended" && visible !== false && !isFinished &&(
          <>
            <div className="flex justify-center mt-7">
              <span className="text-sm font-medium text-gray dark:text-gray-dark ">
                {isCancelled? "You can with draw in":"Sale Ends in"}
              </span>
            </div>
          </>
        )}

        {saleSuccess &&
          status === "Ended" &&
          (saleSuccess[0] === false ? (
            <div className="mt-7">
              <button
                onClick={withdrawFunds}
                className={`w-full ${
                  status === "Upcoming"
                    ? "bg-light dark:bg-dark text-dark-text dark:text-light-text"
                    : "bg-primary-green text-white opacity-50"
                } rounded-md font-bold py-4`}
              >
                Withdraw Funds
              </button>
            </div>
          ) : null)}

        {/* if sale ended then just write Sale has ended */}
        {/* if sale is live then show timer */}
        {status !== "Ended" && status !== "Upcoming" && visible !== false && !isFinished &&(
          <Timer date={new Date(ends_on * 1000)} />
        )}
      </div>
    </>
  );
}
