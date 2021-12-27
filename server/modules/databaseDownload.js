const functions = require('./functions');
const sqlQueries = require('./sqlQueries');
const user = require('./user');

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

    async getUser(userOM) {
        let tmpUser = await user.getBy('*', `felhasznaloNev = ${userOM}`);
        tmpUser = tmpUser[0];
        await sqlQueries.CreateConnection();
        let order = await sqlQueries.select('orders', '*', `userId = ${tmpUser.id}`);
        order = order[0];
        await sqlQueries.EndConnection();
        let vNev = tmpUser.nev.split(' ')[0];
        let kNev = tmpUser.nev.split(' ').splice(1, 2).toString().replace(/,/, ' ');
        const data = {
            vNev: vNev,
            kNev: kNev,
            osztaly: tmpUser.osztaly,
            befizetve: order.lemondva == null ? true : false,
            datum: new Date(),
            om: tmpUser.felhasznaloNev,
            iskolaOM: tmpUser.iskolaOM,
            email: tmpUser.email
        };
        console.log(data);
        return data;
    }
}

module.exports = new databaseDownload();