const functions = require("./functions");
const sqlQueries = require("./sqlQueries");

class databaseUpload {
    async insertDay(day, date) {
        await sqlQueries.CreateConnection();

        let idPrefix;
        idPrefix = functions.convertDate(date);
        if (day.length === 0) {
            for (let i = 1; i <= 5; i++) {
                await sqlQueries.insert("meal", "id, nev", `${idPrefix}${i}, "ünnep"`);
            }

            await sqlQueries.insert("days", "datum, hetkoznap", `"${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}", "${date.getDay()}"`);
            const selectDaysId = await sqlQueries.select("days", "id", `datum = "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}"`);
            const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}"`);
            await sqlQueries.insert(
                "menu",
                "daysId, reggeliId, tizoraiId, ebedId, uzsonnaId, vacsoraId",
                `${selectDaysId[0]}, ${selectMealsIds[0]}, ${selectMealsIds[1]}, ${selectMealsIds[2]}, ${selectMealsIds[3]}, ${selectMealsIds[4]}`);
            date.setDate(date.getDate() + 1);
        }
        else {
            await day.forEach(async (meal) => {
                await sqlQueries.insert(
                    "meal",
                    "id," +
                    "nev," +
                    "energia," +
                    "feherje," +
                    "zsir," +
                    "tZsir," +
                    "szenhidrat," +
                    "cukor," +
                    "so," +
                    "allergenek",
                    `${idPrefix}${meal[0]},"${meal[1]}","${meal[2]}","${meal[3]}","${meal[4]}","${meal[5]}","${meal[6]}","${meal[7]}","${meal[8]}","${meal[9]}"`);
            })
            await sqlQueries.insert("days", "datum, hetkoznap", `"${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}", "${date.getDay()}"`);
            const selectDaysId = await sqlQueries.select("days", "id", `datum = "${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}"`);
            const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${functions.convertDate(date)}"`);
            await sqlQueries.insert(
                "menu",
                "daysId, reggeliId, tizoraiId, ebedId, uzsonnaId, vacsoraId",
                `${selectDaysId[0]}, ${selectMealsIds[0]}, ${selectMealsIds[1]}, ${selectMealsIds[2]}, ${selectMealsIds[3]}, ${selectMealsIds[4]}`);
            date.setDate(date.getDate() + 1);

        }
        await sqlQueries.EndConnection();
        return date;
    }
}

module.exports = new databaseUpload();