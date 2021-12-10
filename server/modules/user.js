const sqlQueries = require("./sqlQueries");
const fs = require("fs").promises;

class User {
    #data;

    constructor(row) {
        this.#data = row;
        this.#data = {
            felhasznaloNev: 0,
            jelszo: '',
            nev: '',
            iskolaOM: '',
            osztaly: null,
            email: ''
        }
    }

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
}

module.exports = new User()