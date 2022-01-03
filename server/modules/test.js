const fs = require('fs').promises;

class Test {
    #names;

    async readFile(filename) {
        try {
            this.#names = [];
            const data = await (await fs.readFile(filename, 'utf-8'))
                .toString()
                .trim()
                .split('\n')
                .forEach(r => {
                    const row = r.trim();
                    this.#names.push(row);
                });
                console.log(this.#names);
            return (this.#names);
        } catch (error) {
            throw error;
        }
    }

    async randomInt(max, min) {
        return Math.floor(Math.random() * ((max + 1) - min) + min)
    }

    async randomString(length) {
            let result = '';
            let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
           }
           return result;
    }

    async generate(amount) {
        // felhasznaloNev;jelszo;nev;iskolaOM;osztaly;email
        const max = 72399999999;
        const min = 72300000000;
        let row = '';
        let data = [];
        for (let i = 0; i < amount; i++) {
            row = '';
            row += await this.randomInt(max, min); // username
            row += ';';
            row += Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // password
            row += ';';
            let name = 'Teszt Elek Lajos';
            row += name; // name
            row += ';';
            row += `${await this.randomString(3)}${await this.randomInt(999, 100)}`; // schoolOM
            row += ';';
            row += `${await this.randomInt(12, 8)}${await this.randomString(1)}`; // class
            row += ';';
            row += `${name.toLowerCase().split(' ').join('.')}@gmail.com`; // email
            console.log(row);
            data.push(row)
        }
        return data;
    }


}

module.exports = new Test()