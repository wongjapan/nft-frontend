import { formatUnits } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPublicAirdropsInfos } from "utils/getAirdropList";
import { useDefaultChainId } from "config/useDefaultChainId";
import { getAirdropInfos } from "utils/getAirdropList";
import { info } from "autoprefixer";

export default function AirdropCard({ data, status, privateCard,id }) {
  const [numberOfClaims, setNumberOfclaims] = useState("-");
  const [infos, setInfos] = useState();
  const [filledPerc, setFilledPerc] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [participants, setParticipants] = useState("-");
  const chainId = useDefaultChainId();
  if (privateCard === false) {
    (async () => {
      try {
        const publicAirdropInfos = await getPublicAirdropsInfos(chainId, [
          data.airdropAddress,
        ]);
        console.log(publicAirdropInfos, "publicAirdropInfos")
        const infos = await getAirdropInfos(chainId, [data.airdropAddress]);
        setInfos(infos.data[0]);
        const numberOfClaimsNum = formatUnits(publicAirdropInfos.data[0][1], 0);
        setNumberOfclaims(numberOfClaimsNum);
      } catch (error) {
        // Handle the error
      }
    })();
  }
  console.log(numberOfClaims, "numberOfClaims")
  const tags = data.tags.split(",");
  // let totalAmount = Number(formatUnits(data.info?.totalAmountToAirdrop, 18))
  useEffect(() => {
    if (!infos) return;
    console.log(infos, "infos")
    let totalAmount = Number(formatUnits(infos.info.totalAmountToAirdrop, 18));
    console.log(infos, "info");
    let totalDistributed = Number(
      formatUnits(infos.info.totalAmountDistributed, 18)
    );
    let remaining = totalAmount - totalDistributed;
    let filledPerc = (remaining / totalAmount) * 100;

    if (totalAmount === 0) {
      filledPerc = "NotStartedYet";
    }
    setFilledPerc(filledPerc);
    setRemaining(remaining);
    setTotalAmount(totalAmount);
    setParticipants(infos.info.numberOfParticipants.toNumber());
  }, [infos]);
  return (
    <Link to={`/airdropper/airdrops/${id}`}>
      <div className="flex flex-col">
        <div
          className={`bg-white dark:bg-dark-1 p-6 ${
            status === 3 ? "rounded-t-md" : "rounded-md"
          }`}
        >
          <div className="flex items-center">
            <img
              src={data.image}
              alt={data.name}
              className="w-[54px] h-[54px]"
            />

            <div className=" ml-4">
              <div className="flex items-center">
                <h3 className=" font-semibold text-dark-text dark:text-light-text">
                  {data.name}
                </h3>
                {privateCard ? (
                  <span className="ml-2 text-[10px] font-bold bg-[#E56060] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px]">
                    Private
                  </span>
                ) : (
                  <span className="ml-2 text-[10px] font-bold bg-primary-green dark:bg-primary-green py-[2px] px-2 text-white rounded-[10px]">
                    Public
                  </span>
                )}
              </div>

              <div className="flex items-center mt-2">
                {tags.map(
                  (tag, index) =>
                    tag !== "" && (
                      <div
                        key={index + tag}
                        className="bg-[#F5F1EB] dark:bg-dark-3 mr-[6px] py-[2px] px-[10px] rounded text-xs text-gray dark:text-gray-dark font-medium"
                      >
                        {tag}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <span className="text-sm font-medium text-gray dark:text-gray-dark">
              Amount
            </span>

            <div className="flex items-center">
              <img src={data.image} className="w-[18px] h-[18px]" />

              <span className="ml-2 font-bold text-dark-text dark:text-light-text">
                {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <span className="text-xs  text-gray dark:text-gray-dark">
              Remaining
            </span>

            <span className="text-xs  text-dim-text dark:text-dim-text-dark">
              {remaining.toLocaleString()} {data.token}
            </span>
          </div>

          {filledPerc && totalAmount !== 0 ? (
            <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
              <div
                className={`h-18px ${
                  status === 2 ? "filled-ended" : "filled"
                }  rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                style={{ width: `${Math.floor(filledPerc)}%` }}
              >
                {Math.floor(filledPerc)}%
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]">
              <div
                className={`h-18px ${
                  status === 2 ? "filled-ended" : "filled"
                }  rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                style={{ width: `${"Not Started yet"}` }}
              >
                {"Not Started yet"}
              </div>
            </div>
          )}

          {privateCard ? (
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-col items-center justify-between">
                <span className="text-xs font-medium text-gray dark:text-gray-dark">
                  Selected Addr.
                </span>
                <span className="text-dark-text dark:text-light-text font-semibold">
                  {/* {data.info.numberWLAddresses.toNumber()} */}
                </span>
              </div>

              <div className="flex flex-col justify-between items-center">
                <span className="text-xs font-medium text-gray dark:text-gray-dark">
                  Participants
                </span>

                <span className="text-dark-text dark:text-light-text font-semibold">
                  {data.info.numberOfParticipants.toNumber()}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-col items-center justify-between">
                <span className="text-xs font-medium text-gray dark:text-gray-dark">
                  Selected Addr.
                </span>
                <span className="text-dark-text dark:text-light-text font-semibold">
                  {numberOfClaims==="-"?"-":Math.floor(numberOfClaims)}
                </span>
              </div>

              <div className="flex flex-col justify-between items-center">
                <span className="text-xs font-medium text-gray dark:text-gray-dark">
                  Participants
                </span>

                <span className="text-dark-text dark:text-light-text font-semibold">
                  {participants}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* {data.status === 'Timed' &&
                                    <div className="bg-[#C89211] bg-opacity-[0.08] py-2 px-6 rounded-b-[20px] flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray dark:text-gray-dark">Ends in</span>
                                        <Timer time={data.ends_on} />
                                    </div>
                                } */}
      </div>
    </Link>
  );
}
