const sqlQueries = require("./sqlQueries");
const fs = require("fs").promises;
const functions = require("./functions");

class User {
    #data;

    async readFile(filename) {
        try {
            this.#data = [];
            const data = await (await fs.readFile(filename, 'utf-8'))
                .toString()
                .trim()
                .split('\n')
                .forEach(r => {
                    const row = r.trim();
                    this.#data.push(row);
                });
            return (this.#data);
        } catch (error) {
            throw error;
        }

    }

    async add(data = '') {
        await sqlQueries.CreateConnection();
        try {
            await sqlQueries.insert("user",
                "felhasznaloNev," +
                "jelszo, " +
                "nev, " +
                "iskolaOM, " +
                "osztaly, " +
                "email",
                `"${data.split(";")[0]}", "${data.split(";")[1]}", "${data.split(";")[2]}", "${data.split(";")[3]}", "${data.split(";")[4]}", "${data.split(";")[5]}"`);
        } catch (error) {
            throw error;
        }
        await sqlQueries.EndConnection();
    }

    async getAll() {
        await sqlQueries.CreateConnection();
        const all = await sqlQueries.selectAll('user');
        // console.log(all);
        await sqlQueries.EndConnection();
    }

    async getBy(fields, conditions) {
        await sqlQueries.CreateConnection();
        const result = await sqlQueries.select('user', `${fields}`, `${conditions}`);
        console.log(result);
        await sqlQueries.EndConnection();
    }

    async delete(condition) {
        await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete('user', `${condition}`);
        // console.log(deleted.affectedRows);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        await sqlQueries.CreateConnection();
        const user = await sqlQueries.update('user', `${fieldValues}`, `${conditions}`);
        console.log(user);
        await sqlQueries.EndConnection();
        return user.affectedRows;
    }

    async cancelOrder(date) {
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`)
        const userId = 1 //this.user.id
        await sqlQueries.insert('orders',
            'menuId, ' +
            'userId, ' +
            'reggeli, ' +
            'tizorai, ' +
            'ebed, ' +
            'uzsonna, ' +
            'vacsora, ' +
            'ar, ' +
            'lemondva',
            `${menuId}, ${userId}, true, true, true, true, true, 1000, '${functions.convertDate(new Date())}'`);
        await sqlQueries.EndConnection();
    }
}

module.exports = new User()