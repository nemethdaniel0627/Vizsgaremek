const fs = require('fs').promises;

class Test {
    #names;
    #data;

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
                // console.log(this.#names);
            return (this.#names);
        } catch (error) {
            throw error;
        }
    }

    async randomInt(min, max) {
        return Math.floor(Math.random() * ((max) - min) + min)
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

    async randomName() {
        await this.readFile('nevek.txt');
        const r = await this.randomInt(0, this.#names.length);
        return this.#names[r];
    }

    async generate(amount) {
        // felhasznaloNev;jelszo;nev;iskolaOM;osztaly;email
        const min = 72300000000;
        const max = 72400000000;
        let row = '';
        let data = [];
        this.#data = [];
        for (let i = 0; i < amount; i++) {
            row = '';
            row += await this.randomInt(min, max); // username
            row += ';';
            row += Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // password
            row += ';';
            let name = await this.randomName();
            row += name; // name
            row += ';';
            row += `${await this.randomString(3)}${await this.randomInt(100, 1000)}`; // schoolOM
            row += ';';
            row += `${await this.randomInt(8, 13)}${await this.randomString(1)}`; // class
            row += ';';
            row += `${await name.toLowerCase().split(' ').join('.')}@gmail.com`; // email
            // console.log(row);
            data.push(row);
            this.#data.push(row);
        }
        await this.writeFile('test.txt')
        return data;
    }

    async writeFile(filename) {
        fs.writeFile(`./${filename}`, `${this.#data[0]}`)
    }
}

module.exports = new Test()