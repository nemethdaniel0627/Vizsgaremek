const sqlQueries = require("./sqlQueries");

class databaseUpload {
    async insertDay(day, date) {
        await sqlQueries.CreatConnection();

        let idPrefix;
        idPrefix = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1}${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
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
                `${selectDaysId[0].id}, ${selectMealsIds[0].id}, ${selectMealsIds[1].id}, ${selectMealsIds[2].id}, ${selectMealsIds[3].id}, ${selectMealsIds[4].id}`);
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
            const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${date.getFullYear()}${date.getMonth() + 1}${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}"`);
            await sqlQueries.insert(
                "menu",
                "daysId, reggeliId, tizoraiId, ebedId, uzsonnaId, vacsoraId",
                `${selectDaysId[0].id}, ${selectMealsIds[0].id}, ${selectMealsIds[1].id}, ${selectMealsIds[2].id}, ${selectMealsIds[3].id}, ${selectMealsIds[4].id}`);
            date.setDate(date.getDate() + 1);

        }
        await sqlQueries.EndConnection();
        return date;
    }
}

module.exports = new databaseUpload();