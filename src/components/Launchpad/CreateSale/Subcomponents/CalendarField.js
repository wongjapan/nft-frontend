import React from "react";
import CalendarSVG from "../../../../svgs/TokenLocker/calendar";
import Datetime from "react-datetime";
import { ThemeContext } from "../../../../context/ThemeContext/ThemeProvider";
import HeadingTags from "../../../TokenLocker/Subcomponents/HeadingTags";
import moment from "moment";

export default function CalendarField({ heading, setFunction, index }) {
  const { theme } = React.useContext(ThemeContext);
  const [date, setDate] = React.useState(new Date());
  const valid = (current) => {
    return current.isAfter(new Date() - 86400000);
  };

  const handleChange = (e) => {
    const selected = moment(e);
    const now = moment();
    const oneHourLater = moment(now).add(1, "hour");
    if (
      (selected.isSame(now, "day") && selected.isAfter(oneHourLater)) ||
      selected.isAfter(now)
    ) {
      if (index===undefined) {
        setFunction(selected.unix());
      } else {
        setFunction(selected.unix(), index);
      }
      setDate(selected.toDate());
    } else {
      setDate(new Date());
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <HeadingTags name={heading} required />
        {/* <Tooltip text={} /> */}
      </div>
      <div className="flex items-center mt-5 border-[1.5px] py-4 border-dim-text dark:border-dim-text-dark border-opacity-50 rounded-lg">
        <CalendarSVG className="ml-5 fill-gray dark:fill-gray-dark" />
        <Datetime
          className={`ml-5 font-gilroy font-semibold text-dark-text dark:text-light-text ${
            theme === "dark" ? "dark-calendar" : ""
          }`}
          isValidDate={valid}
          onChange={handleChange}
          dateFormat="DD/MM/YYYY"
          timeFormat="HH:mm:ss"
          value={moment(date)}
          utc={true}
        />
      </div>
    </div>
  );
}
