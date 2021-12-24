const sqlQueries = require("./sqlQueries");
const fs = require("fs").promises;

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
            return(this.#data);
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
}

module.exports = new User()