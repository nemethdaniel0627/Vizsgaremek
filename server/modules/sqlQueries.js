const mysql = require('mysql2/promise');
class sqlQueries {
    async insert(tableName, fields, values) {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'foode'
            });
            let [results, resultInfo] = await connection.execute(`INSERT INTO ${tableName} (${fields}) VALUES (${values});`);
            connection.end()
            return results;
        } catch (error) {
            throw error;
        }
    }

    async select(tableName, field, conditions) {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'foode'
            });
            let [results, resultInfo] = await connection.query(`SELECT ${field} FROM ${tableName} WHERE ${conditions}`);
            connection.end();            
            // console.log(resultInfo);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new sqlQueries()