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

    async insert(tableName, fields, values) {
        try {
            await this.CreateConnection();
            let [results, resultInfo] = await this._connection.execute(`INSERT INTO ${tableName} (${fields}) VALUES (${values});`);
            await this.EndConnection();
            return results;
        } catch (error) {
            throw error;
        }
    }

    async select(tableName, field, conditions, array) {
        try {
            await this.CreateConnection(array);
            let [results, resultInfo] = await this._connection.query(`SELECT ${field} FROM ${tableName} WHERE ${conditions}`);
            await this.EndConnection();
            return results;
        } catch (error) {
            throw error;
        }
    }

    async selectAll(tableName, fields = "*", array) {
        try {
            await this.CreateConnection(array);
            let [results, resultInfo] = await this._connection.query(`SELECT ${fields} FROM ${tableName}`);
            await this.EndConnection();
            return results;
        } catch (error) {
            throw error;
        }
    }

    async innerSelect(tableName, fields, innerJoins, conditions, array) {
        try {
            await this.CreateConnection(array);
            let [results, resultInfo] = await this._connection.query(`SELECT ${fields} FROM ${tableName} ${innerJoins} WHERE ${conditions}`);
            await this.EndConnection();
            return results
        } catch (error) {
            throw error;
        }
    }

    async delete(tableName, conditions) {
        try {
            await this.CreateConnection();
            let [results, resultInfo] = await this._connection.query(`DELETE FROM ${tableName} WHERE ${conditions}`);
            await this.EndConnection();
            return results;
        } catch (error) {
            throw error;
        }
    }

    async update(tableName, sets, conditions) {
        try {
            await this.CreateConnection();
            let [results, resultInfo] = await this._connection.query(`UPDATE ${tableName} SET ${sets} WHERE ${conditions}`);
            await this.EndConnection();
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new sqlQueries();