const fs = require('fs').promises;
class Test {
    #names;
    #data;

    async readFile(filename) {
        try {
            this.#names = [];
            fs.readFile(filename, 'utf-8')
                .toString()
                .trim()
                .split('\n')
                .forEach(r => {
                    const row = r.trim();
                    this.#names.push(row);
                });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async randomInt(min, max) {
        return Math.floor(Math.random() * ((max) - min) + min)
    }

    async randomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        let result = '';
        let characters = chars;
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async randomName(filename) {
        await this.readFile(filename);
        const r = await this.randomInt(0, this.#names.length);
        return this.#names[r];
    }

    async generate(filename, amount) {
        // felhasznaloNev;jelszo;nev;iskolaOM;osztaly;email
        await this.readFile('nevek.txt');
        const minIndex = 72300000000;
        const maxIndex = 72400000000;
        const max = this.#names.length;
        this.#data = [];
        try {
            await this.readFile(filename);
        } catch (error) {
            if (amount > max) return `No enough data\nMaximum: ${max}`;
            let i = 0;
            while (i < amount)
            {
                let row = '';
                const username = await this.randomInt(minIndex, maxIndex);
                const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const name = await this.randomName('nevek.txt');
                const schoolOM = `${await this.randomString(3)}${await this.randomInt(100, 1000)}`;
                const _class = `${await this.randomInt(8, 13)}${await this.randomString(1, 'ABCDEF')}`;
                const email = `${await name.toLowerCase().split(' ').join('.')}@gmail.com`.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                row = `${username};${password};${name};${schoolOM};${_class};${email}`;
                
                const unique = await this.#data.find(
                    element => (element.split(';')[0] === username.toString()) || 
                               (element.split(';')[5]) === email.toString());
                
                if (!unique)
                {
                    i++;
                    this.#data.push(row);
                }
            }
            return await this.writeFile(filename);
        }
        return `${filename} exists`;
    }

    async writeFile(filename) {
        try {
            await fs.readFile(`./${filename}`);
        } catch (error) {
            await fs.writeFile(`./${filename}`, `${this.#data.join('\n')}`);
            return `${filename} created`;
        }
        return;
    }
}

module.exports = new Test()