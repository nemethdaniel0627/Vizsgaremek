const fs = require('fs').promises;
const user = require('./user');
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

    async generate(filename, amount) {
        // felhasznaloNev;jelszo;nev;iskolaOM;osztaly;email
        const min = 72300000000;
        const max = 72400000000;
        this.#data = [];
        if (amount < this.#data.length) return "No enough data"
        for (let i = 0; i < amount; i++) {
            let row = '';
            const username = await this.randomInt(min, max);
            const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const name = await this.randomName();
            const schoolOM = `${await this.randomString(3)}${await this.randomInt(100, 1000)}`;
            const _class = `${await this.randomInt(8, 13)}${await this.randomString(1)}`;
            const email = `${await name.toLowerCase().split(' ').join('.')}@gmail.com`;
            row = `${username};${password};${name};${schoolOM};${_class};${email}`;
            // console.log(row);
            user.add(row);
            this.#data.push(row);
        }
        const exits = await this.writeFile(filename)
        return exits;
    }

    async writeFile(filename) {
        try {
            await fs.readFile(`./${filename}`)
        } catch (error) {
            await fs.writeFile(`./${filename}`, `${this.#data.join('\n')}`);
            return `${filename} created`;
        }
        return `${filename} exists`;
    }
}

module.exports = new Test()