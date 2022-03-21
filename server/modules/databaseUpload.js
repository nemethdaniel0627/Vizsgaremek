const functions = require("./functions");
const sqlQueries = require("./sqlQueries");

class databaseUpload {
    async insertDay(day, date) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        let idPrefix;
        idPrefix = functions.convertDate(date);
        try {
            if (day[0] === undefined) {
                for (let i = 1; i <= 5; i++) {
                    await sqlQueries.insert("meal", "id, nev", `${idPrefix}${i}, "ünnep"`);
                }

                await sqlQueries.insert("days", "datum, hetkoznap", `"${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}", "${date.getDay()}"`);
                const selectMealsIds = await sqlQueries.select("meal", "id", `FLOOR(id/10) = "${functions.convertDate(date)}"`);
                const selectDaysId = await sqlQueries.select("days", "id", `datum = "${functions.convertDateWithDash(date)}"`);
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
        } catch (error) {
            throw error;
        }
        await sqlQueries.EndConnection();
        return date;
    }

    async updateDay(day, date) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        let idPrefix;
        idPrefix = functions.convertDate(date);
        let insertDay;
        try {
            if (day[0] === undefined) {
                for (let i = 1; i <= 5; i++) {
                    await sqlQueries.update(
                        "meal",
                        `nev = 'ünnep', ` +
                        `energia = NULL, ` +
                        `feherje = NULL, ` +
                        `zsir = NULL, ` +
                        `tZsir = NULL, ` +
                        `szenhidrat = NULL, ` +
                        `cukor = NULL, ` +
                        `so = NULL, ` +
                        `allergenek = NULL`,
                        `id = ${idPrefix}${i}`);
                }
                date.setDate(date.getDate() + 1);
            }
            else {
                await day.forEach(async (meal) => {
                    const result = await sqlQueries.update(
                        "meal",
                        `nev = '${meal[1]}', ` +
                        `energia = '${meal[2]}', ` +
                        `feherje = '${meal[3]}', ` +
                        `zsir = '${meal[4]}', ` +
                        `tZsir = '${meal[5]}', ` +
                        `szenhidrat = '${meal[6]}', ` +
                        `cukor = '${meal[7]}', ` +
                        `so = '${meal[8]}', ` +
                        `allergenek = '${meal[9]}'`,
                        `id = ${idPrefix}${meal[0]}`);

                    if (result.affectedRows === 0 && insertDay === undefined) {
                        insertDay = day;
                        console.log(insertDay);
                    }
                });
                date.setDate(date.getDate() + 1);
            }
        } catch (error) {
            throw error;
        }
        await sqlQueries.EndConnection();
        return insertDay !== undefined ? insertDay : date;
    }
}

module.exports = new databaseUpload();