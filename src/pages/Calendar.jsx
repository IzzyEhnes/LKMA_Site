import { useState, useEffect } from "react";
import { CalendarComponent } from "./components/calendarPage/calendarComponent";
import JsonData from "./data/calendarData.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

const Calendar = () => {
    const [calendarPageData, setCalendarPageData] = useState({});
    useEffect(() => {
        setCalendarPageData(JsonData);
    }, []);

    return (
        <div>
            <CalendarComponent data={calendarPageData.CalendarData} />
        </div>
    );
};

export default Calendar;