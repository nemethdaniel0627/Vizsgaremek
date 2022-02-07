const sqlQueries = require("./sqlQueries");
const fs = require("fs").promises;
const functions = require("./functions");

class User {
    #data;

    async readFile(filename) {
        try {
            this.#data = [];
            (await fs.readFile(filename, 'utf-8'))
                .toString()
                .trim()
                .split('\n')
                .forEach(r => {
                    const row = r.trim();
                    this.#data.push(row);
                });
            return this.#data;
        } catch (error) {
            throw error;
        }
    }

    async isUnique(field, con) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const array = await sqlQueries.select('user', `${field}`, `${field} = '${con}'`);
        const unique = await array.find(element => element = con);
        if (unique) return false;
        return true;
    }

    async add(data = '') {
        let added = false;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();

        if ((await this.isUnique('omAzon', data.split(';')[0])) && (await this.isUnique('email', data.split(';')[5]))) {
            await sqlQueries.insert("user",
                "omAzon," +
                "jelszo, " +
                "nev, " +
                "iskolaOM, " +
                "osztaly, " +
                "email",
                `"${data.split(";")[0]}", "${data.split(";")[1]}", "${data.split(";")[2]}", "${data.split(";")[3]}", "${data.split(";")[4]}", "${data.split(";")[5]}"`);
            const userId = await sqlQueries.select("user", "id", `omAzon = ${data.split(';')[0]}`);
            await sqlQueries.insert("user_role", "roleId, userId", `2, ${userId}`);
            added = true;
        }
        await sqlQueries.EndConnection();
        return added;
    }

    async getAll(isJson) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(isJson);
        const all = await sqlQueries.selectAll(
            "user ORDER BY user.osztaly, user.nev",
            "*, "+
            "(" +
            "SELECT " +
            "orders.id " +
            "FROM menu " +
            "INNER JOIN days " +
            "ON menu.daysId = days.id " +
            "INNER JOIN orders " +
            "ON orders.menuId = menu.id " +
            `WHERE datum = '${functions.convertDateWithDash(new Date())}' AND userId = user.id` +
            ") AS 'befizetve'"
        );
        await sqlQueries.EndConnection();
        return all;
    }

    async getBy(fields, conditions, array = true) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(array);
        const result = await sqlQueries.select('user', `${fields}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return result;
    }

    async delete(condition) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete('user', `${condition}`);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const user = await sqlQueries.update('user', `${fieldValues}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return user.affectedRows;
    }
}

module.exports = new User();