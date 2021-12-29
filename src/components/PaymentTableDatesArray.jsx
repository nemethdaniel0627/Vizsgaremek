import React from "react";
var date = new Date();

export default function PaymentTableDateArray() {
    var dates = [];
    var d = new Date(date.getMonth() + 1 + " 01," + date.getFullYear());
    for (let index = 0; index < d.getDay() - 1; index++) {
        var day = {
            day: lastDayInTheMonth(date.getMonth()) - (d.getDay() - 1 - (index + 1)),
            month: "-1",
        };
        dates.push(day);
    }
    for (let y = 0; y < 5; y++) {
        for (let x = 1; x < 8; x++) {
            if (dates.length >= 5 * 7) {
                break;
            }
            var dayDate =
                x + y * 7 > lastDayInTheMonth(date.getMonth() + 1)
                    ? x + y * 7 - lastDayInTheMonth(date.getMonth() + 1)
                    : x + y * 7;
            if (x + y * 7 > lastDayInTheMonth(date.getMonth() + 1)) {
                day = { day: dayDate, month: "-1" };
            } else {
                day = { day: dayDate, month: date.getMonth() + 1 };
            }
            dates.push(day);
        }

    }
    return dates;
}



function lastDayInTheMonth(month) {
    if (month > 7) {
        var lastday =
            month % 2 === 1
                ? 30
                : month === 2
                    ? date.getFullYear() % 4 === 0
                        ? 29
                        : 28
                    : 31;
    } else {
        lastday =
            month % 2 === 1
                ? 31
                : month === 2
                    ? date.getFullYear() % 4 === 0
                        ? 29
                        : 28
                    : 30;
    }

    return lastday;
}