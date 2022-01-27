const functions = require('./functions');
const sqlQueries = require('./sqlQueries');

class databaseDownload {
    async getMenu(date) {
        if (date.getDay() === 0) date.setDate(date.getDate() + 1);        
        else if (date.getDay() !== 1) date.setDate(date.getDate() - (date.getDay() - 1))

        const startDate = functions.convertDateWithDash(date);        
        date.setDate(date.getDate() + 6);
        const endDate = functions.convertDateWithDash(date);        
        await sqlQueries.CreateConnection(true);
        const menu = await sqlQueries.innerSelect(
            "menu",
            "mealReggeli.nev," +
            "mealTizorai.nev," +
            "mealEbed.nev," +
            "mealUszonna.nev," +
            "mealVacsora.nev ",
            "INNER JOIN days ON menu.daysId = days.id " +
            "INNER JOIN meal AS mealReggeli ON menu.reggeliId = mealReggeli.id " +
            "INNER JOIN meal AS mealTizorai ON menu.tizoraiId = mealTizorai.id " +
            "INNER JOIN meal AS mealEbed ON menu.ebedId = mealEbed.id " +
            "INNER JOIN meal AS mealUszonna ON menu.uzsonnaId = mealUszonna.id " +
            "INNER JOIN meal AS mealVacsora ON menu.vacsoraId = mealVacsora.id ",
            `days.datum BETWEEN "${startDate}" AND "${endDate}"`
        )
        await sqlQueries.EndConnection();        
        return menu;
    }
}

module.exports = new databaseDownload();