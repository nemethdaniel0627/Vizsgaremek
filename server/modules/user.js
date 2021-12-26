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


    async isUnique(field, con) {
        const array = await sqlQueries.select('user', `${field}`, `${field} = '${con}'`);
        const unique = array.find(element => element = con);
        if (unique) return false;
        return true;
    }
  
    async add(data = '') {
        let count = 0;
        await sqlQueries.CreateConnection();

        if ((await this.isUnique('felhasznaloNev', data.split(';')[0])) && (await this.isUnique('email', data.split(';')[5])))
        {
            await sqlQueries.insert("user", 
            "felhasznaloNev," +
            "jelszo, " +
            "nev, " +
            "iskolaOM, " +
            "osztaly, " +
            "email",
            `"${data.split(";")[0]}", "${data.split(";")[1]}", "${data.split(";")[2]}", "${data.split(";")[3]}", "${data.split(";")[4]}", "${data.split(";")[5]}"`);
            count++;
        }
        await sqlQueries.EndConnection();
        return count;
    }

    async getAll() {
        await sqlQueries.CreateConnection();
        const all = await sqlQueries.selectAll('user');
        await sqlQueries.EndConnection();
    }

    async getBy(fields, conditions) {
        await sqlQueries.CreateConnection();
        const result = await sqlQueries.select('user', `${fields}`, `${conditions}`);
        await sqlQueries.EndConnection();
    }

    async delete(condition) {
        await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete('user', `${condition}`);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        await sqlQueries.CreateConnection();
        const user = await sqlQueries.update('user', `${fieldValues}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return user.affectedRows;
    }

    async cancelOrder(date, meals) {
        //TODO: befizetve ellenőrzése
        await sqlQueries.CreateConnection();
        const validDate = await sqlQueries.select('days', 'datum', `datum = '${date}'`);
        if (!validDate) return false;
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
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
            `${menuId}, ${userId}, ${meals[0]}, ${meals[1]}, ${meals[2]}, ${meals[3]}, ${meals[4]}, 1000, '${date}'`);
        await sqlQueries.EndConnection();
        return true;
    }
}

module.exports = new User()