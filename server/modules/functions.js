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
    
}

module.exports = new functions();