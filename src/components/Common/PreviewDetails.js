import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext/ThemeProvider";

export default function PreviewDetails({
  name,
  value,
  icon,
  verified,
  tokenSymbol,
  enable_copy,
  address,
  setFunction,
  isInputOpen,
}) {
  const { theme } = useContext(ThemeContext);

  function copyText(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Copied to clipboard");
  }
  return (
    <>
      <div className="py-5 flex gap-x-5 justify-between border-b border-dashed border-dim-text border-opacity-30 relative">
        {/* if setFunction then display a small plus button on side of border */}
        {setFunction && (
          <button
            onClick={() => setFunction()}
            className="absolute w-8 h-8 bg-black text-white dark:bg-white dark:text-black cursor-pointer right-0 -bottom-4 rounded-full"
          >
            {isInputOpen ? "-" : "+"}
          </button>
        )}
        <span className="font-gilroy text-sm font-medium text-gray dark:text-gray-dark">
          {name}
        </span>

        <div className="flex items-center break-all">
          <span className="font-gilroy  text-sm font-bold text-dark-text dark:text-light-text">
            {address ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://bscscan.com/address/${value}`}
              >
                {value}
              </a>
            ) : (
              <span>{value}</span>
            )}{" "}
            {tokenSymbol && tokenSymbol}
          </span>
          {icon && <img className="w-5 h-5 ml-1" src={icon} alt="chain-icon" />}

          {verified && (
            <img
              className="w-[14px] h-[14px] ml-1"
              src="/images/home/collections/cards/verified.svg"
              alt="verified"
            />
          )}
          {enable_copy && (
            <button
              onClick={() => copyText(value)}
              className="ml-2 text-dark-text dark:text-light-text"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="copy"
                width="1em"
                height="1em"
                fill={theme === "dark" ? "white" : "black"}
                aria-hidden="true"
              >
                <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
