const mysql = require('mysql2');

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'foode'
});

class sqlQueries {
    insert(tableName, fields, values) {
        connection.execute(
            `INSERT INTO ${tableName} (${fields}) VALUES (${values});`, (error, results, resultFields) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                    console.log(resultFields);
                }
            }
        );
    }

    async select(tableName, field, conditions){
        let [error, results] = await connection.query(
            `SELECT ${field} FROM ${tableName} WHERE ${conditions}`, (error, results, resultFields) => {
                if (error) {
                    console.log(error);
                }
                if (results !== undefined) {
                    console.log(`ad ${results[0].id}`);
                    return results;
                }
            }
        );
        return results;
    }
}

module.exports = new sqlQueries()