var date = new Date();

export default function PaymentTableDateArray() {
    var dates = [];
    var d = new Date(date.getMonth() + 2 + " 01," + date.getFullYear());
    var month = date.getMonth() + 1;
    for (let index = 0; index < d.getDay() - 1; index++) {
        var day = {
            day: lastDayInTheMonth(month) - (d.getDay() - 1 - (index + 1)),
            month: "-1",
            cancel: null,
        };
        dates.push(day);
    }
    for (let y = 0; y < 6; y++) {
        for (let x = 1; x < 8; x++) {
            if (dates.length >= 6 * 7) {
                break;
            }
            var dayDate =
                x + y * 7 > lastDayInTheMonth((month + 1 > 12 ? 1 : month + 1))
                    ? x + y * 7 - lastDayInTheMonth((month + 1 > 12 ? 1 : month + 1))
                    : x + y * 7;
            if (x + y * 7 > lastDayInTheMonth((month + 1 > 12 ? 1 : month + 1))) {
                day = { day: dayDate, month: "-1", cancel: null };
            } else {
                day = { day: dayDate, month: (month + 1 > 12 ? 1 : month + 1), cancel: false };
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