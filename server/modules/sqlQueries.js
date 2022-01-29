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

    async isConnection() {
        if (this._connection === undefined || this._connection.connection._closing === true) return false;
        else return true;
    }

    async insert(tableName, fields, values) {
        try {
            let [results, resultInfo] = await this._connection.execute(`INSERT INTO ${tableName} (${fields}) VALUES (${values});`);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async select(tableName, field, conditions) {
        try {
            let [results, resultInfo] = await this._connection.query(`SELECT ${field} FROM ${tableName} WHERE ${conditions}`);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async selectAll(tableName) {
        try {
            let [results, resultInfo] = await this._connection.query(`SELECT * FROM ${tableName}`);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async innerSelect(tableName, fields, innerJoins, conditions) {
        try {
            let [results, resultInfo] = await this._connection.query(`SELECT ${fields} FROM ${tableName} ${innerJoins} WHERE ${conditions}`);
            return results
        } catch (error) {
            throw error;
        }
    }

    async delete(tableName, conditions) {
        try {
            let [results, resultInfo] = await this._connection.query(`DELETE FROM ${tableName} WHERE ${conditions}`);
            return results;
        } catch (error) {
            throw error;
        }
    }

    async update(tableName, sets, conditions) {
        try {
            let [results, resultInfo] = await this._connection.query(`UPDATE ${tableName} SET ${sets} WHERE ${conditions}`);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new sqlQueries()


