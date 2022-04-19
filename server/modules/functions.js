class functions {
    convertDate(date) {
        return `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    }

    convertDateWithDash(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    }

    convertToZeroForm(number) {
        return number < 10 ? `0${number}` : number;
    }

    getFirstDayOfWeek(date) {
        if (date.getDay() === 0) {
            return new Date(date.getFullYear(), date.getMonth(), (date.getDate() - 6) + 7);
        }
        else {
            return new Date(date.getFullYear(), date.getMonth(), (date.getDate() - (date.getDay() - 1)) + 7);
        }
    }

    randomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = new functions();