export const getTextDate = (date: Date) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const currentDate = date.getDate();
    const currentMonth = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();
    return `${
        currentDate < 10 ? "0" : ""
    }${currentDate} - ${currentMonth} - ${currentYear}`;
};
