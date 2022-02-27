const fs = require('fs').promises;
const bcrypt = require("bcrypt");
const order = require('./order')
class Test {
    #names;
    #data;

    async readFile(filename) {
        try {
            this.#names = [];
            (await fs.readFile(filename, 'utf-8'))
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

    async randomString(length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
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
                const name = await this.randomName('nevek.txt');
                const tmpPassword = name.toLowerCase().split(' ').join('.').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                const password = bcrypt.hashSync(tmpPassword, 10);
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
                    console.log(`${this.#data.length} / ${amount}`);
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

    async orders(date, amount) {
        let count = 0;
        let cancelled = 0;
        if (await order.selectMenuIdByDate(date) === -1) return 'No menu';
        for (let i = 1; i < amount + 1; i++) {
            const meals = [];
            let fullZero = true;
            while (fullZero) {
                for (let i = 0; i < 5; i++) {
                    meals[i] = await this.randomInt(0, 2);
                    if (meals[i] === 1) fullZero = false; 
                }
            }
            const testOrder = await order.order(i, [meals[0], meals[1], meals[2], meals[3], meals[4]], date);
            if (testOrder.split('\n')[0].split(' ')[0] !== 'Already') count++;
            const random = await this.randomInt(0, 3);
            if (random === 1) 
            {
                const co = await order.cancelOrder(i, [meals[0], meals[1], meals[2], meals[3], meals[4]], date);
                if (co.split(' ')[0] !== 'Already') cancelled++;
            }
        }
        return `${count} order(s) added\n${cancelled} order(s) cancelled`;
    }
}

module.exports = new Test();