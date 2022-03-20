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
        const array = await sqlQueries.select(table, `${field}`, `${field} = '${con}'`);
        const unique = await array.find(element => element = con);
        if (unique) return false;
        return true;
    }

    async add(user, pending) {
        let added = false;
        if ((await this.isUnique('omAzon', `${user.omAzon}`)) && (await this.isUnique('email', `${user.email}`)) && (await this.isUnique('email', `${user.email}`, "user_pending")) && (await this.isUnique('omAzon', `${user.omAzon}`, "user_pending"))) {
            await sqlQueries.insert(pending ? "user_pending" : "user",
                "omAzon, " +
                "jelszo, " +
                "nev, " +
                "schoolsId, " +
                "osztaly, " +
                "email ",
                `"${user.omAzon}", "${user.jelszo}", "${user.nev}", ${user.schoolsId}, "${user.osztaly}", "${user.email}"`);
            if (pending === false) {
                const userId = (await sqlQueries.select("user", "id", `omAzon = ${user.omAzon}`, false))[0].id;
                await sqlQueries.insert("user_role", "roleId, userId", `2, ${userId}`);
            }
            added = true;
        }
        return added;
    }

    async getAll(array, limit = 10, offset = 0, tableName = "user", searchValue) {
        const all = await sqlQueries.selectAll(
            `${tableName} ` +
            "INNER JOIN schools " +
            `ON ${tableName}.schoolsId = schools.id ` +
            `WHERE (omAzon REGEXP '${searchValue}' OR ` +
            `${tableName}.nev REGEXP '${searchValue}' OR ` +
            `schools.iskolaOM REGEXP '${searchValue}' OR ` +
            `osztaly REGEXP '${searchValue}' OR ` +
            `email REGEXP '${searchValue}') ` +
            `ORDER BY CONVERT(REGEXP_REPLACE(${tableName}.osztaly,'[a-zA-Z]+', ''), SIGNED), ${tableName}.osztaly, ${tableName}.nev ` +
            `LIMIT ${limit} OFFSET ${offset}`,
            `${tableName}.omAzon, ` +
            `${tableName}.nev, ` +
            `${tableName}.osztaly, ` +
            `${tableName}.email, ` +
            "schools.iskolaOM, " +
            "(" +
            "SELECT " +
            "orders.id " +
            "FROM menu " +
            "INNER JOIN days " +
            "ON menu.daysId = days.id " +
            "INNER JOIN orders " +
            "ON orders.menuId = menu.id " +
            `WHERE datum = '${functions.convertDateWithDash(new Date())}' AND userId = ${tableName}.id` +
            ") AS 'befizetve'", 
            array
        );
        return all;
    }

    async getBy(fields, conditions, array = true, pending = false) {
        return await sqlQueries.select(pending ? 'user_pending' : 'user', `${fields}`, `${conditions}`, array);
    }

    async delete(condition, pending = false) {
        const deleted = await sqlQueries.delete(pending ? 'user_pending' : 'user', `${condition}`);
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        const user = await sqlQueries.update('user', `${fieldValues}`, `${conditions}`);
        return user.affectedRows;
    }

    async convert(iskolaOM) {
        const schoolsId = await sqlQueries.select('schools', 'id', `iskolaOM = ${iskolaOM}`);
        if (schoolsId.length === 0) return -1;
        return schoolsId[0][0];
    }

    async getUsers() {
        return await sqlQueries.innerSelect(
            'user', 
            'user.omAzon, user.nev, schools.iskolaOM, user.osztaly, user.email',
            'INNER JOIN schools ON user.schoolsId = schools.id',
            'user.schoolsId = schools.id', false);
    }
}

module.exports = new User();