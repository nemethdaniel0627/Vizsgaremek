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

    async isUnique(field, con, table = "user") {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const array = await sqlQueries.select(table, `${field}`, `${field} = '${con}'`);
        const unique = await array.find(element => element = con);
        if (unique) return false;
        return true;
    }

    async add(user, pending) {
        let added = false;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        if ((await this.isUnique('omAzon', `${user.omAzon}`)) && (await this.isUnique('email', `${user.email}`)) && (await this.isUnique('email', `${user.email}`, "user_pending")) && (await this.isUnique('omAzon', `${user.omAzon}`, "user_pending"))) {
            await sqlQueries.insert(pending ? "user_pending" : "user",
                "omAzon, " +
                "jelszo, " +
                "nev, " +
                "schoolsId, "  +
                "osztaly, "  +
                "email ",
                `"${user.omAzon}", "${user.jelszo}", "${user.nev}", ${user.schoolsId}, "${user.osztaly}", "${user.email}"`);
            if (pending === false) {
                const userId = await sqlQueries.select("user", "id", `omAzon = ${user.omAzon}`, false);
                await sqlQueries.insert("user_role", "roleId, userId", `2, ${userId}`);
            }
            added = true;
        }
        await sqlQueries.EndConnection();
        return added;
    }

    async getAll(isJson, limit = 10, offset = 0, pending = false) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(isJson);
        const all = await sqlQueries.selectAll(
            pending ? "user_pending " : "user " +
            "INNER JOIN schools " +
            "ON user.schoolsId = schools.id " +
            "ORDER BY CONVERT(REGEXP_REPLACE(user.osztaly,'[a-zA-Z]+', ''), SIGNED), user.osztaly, user.nev " + 
            `LIMIT ${limit} OFFSET ${offset}`,
            "user.omAzon, " +
            "user.nev, " +
            "user.osztaly, " +
            "user.email, " +
            "schools.iskolaOM, " +
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

    async getBy(fields, conditions, array = true, pending = false) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(array);
        const result = await sqlQueries.select(pending ? 'user_pending' : 'user', `${fields}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return result;
    }

    async delete(condition, pending = false) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete(pending ? 'user_pending' : 'user', `${condition}`);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const user = await sqlQueries.update('user', `${fieldValues}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return user.affectedRows;
    }

    async convert(iskolaOM) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const schoolsId = await sqlQueries.select('schools', 'id', `iskolaOM = ${iskolaOM}`);
        await sqlQueries.EndConnection();
        if (schoolsId.length === 0) return -1;
        return schoolsId[0][0];
    }

    async getUsers() {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const users = await sqlQueries.innerSelect(
            'user', 
            'user.omAzon, user.nev, schools.iskolaOM, user.osztaly, user.email',
            'INNER JOIN schools ON user.schoolsId = schools.id',
            'user.schoolsId = schools.id', false);
          await sqlQueries.EndConnection();
        return users;
    }
}

module.exports = new User();