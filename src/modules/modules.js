class modules{
    getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));        
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));        
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));        
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);        
        return weekNo;
    }

    toZeroForm(number) {
        return number < 10 ? `0${number}` : number;
    }
}

export default new modules();