const mysql = require('mysql2/promise');
class sqlQueries {
    _connection;

    async CreateConnection(array = true) {
        this._connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'foode',
            rowsAsArray: array
        });
    }

    async EndConnection() {
        await this._connection.end();
    }

    async insert(tableName, fields, values, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection() : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.execute(`INSERT INTO ${tableName} (${fields}) VALUES (${values});`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async select(tableName, field, conditions, array, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection(array) : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.query(`SELECT ${field} FROM ${tableName} WHERE ${conditions}`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async selectAll(tableName, fields = "*", array, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection(array) : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.query(`SELECT ${fields} FROM ${tableName}`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async innerSelect(tableName, fields, innerJoins, conditions, array, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection(array) : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.query(`SELECT ${fields} FROM ${tableName} ${innerJoins} WHERE ${conditions}`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results
        } catch (error) {
            throw error;
        }
    }

    async delete(tableName, conditions, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection() : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.query(`DELETE FROM ${tableName} WHERE ${conditions}`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async update(tableName, sets, conditions, needConnection = true) {
        try {
            needConnection ? await this.CreateConnection() : setTimeout(() => {}, 0);
            let [results, resultInfo] = await this._connection.query(`UPDATE ${tableName} SET ${sets} WHERE ${conditions}`);
            needConnection ? await this.EndConnection() : setTimeout(() => {}, 0);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new sqlQueries();