const sqlQueries = require("./sqlQueries");
const fs = require("fs").promises;

class userAdd {
    _filename;
    _data = [];
    async readFile() {
        try {
            this._data = [];
            let data = await (await fs.readFile(`C:/Users/Balázs Martin/Documents/GitHub/test.txt`, 'utf-8'))
            .toString()
            .trim()
            .split('\n')
            .forEach(r => {
                const row = r.trim();
                this._data.push(row);
            });
            return(this._data);
        } catch (error) {
            throw error;
        }
        
    }
    async add(data) {
        await sqlQueries.CreatConnection();
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

    async select() {
        await sqlQueries.CreatConnection();
        
        const a = await sqlQueries.select('user', 'email', `"asd4@asd.com"`);
        console.log(a);

        await sqlQueries.EndConnection();
    }
}

module.exports = new userAdd()