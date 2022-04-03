const menuConvert = require('../modules/menuConvert')
const databaseUpload = require('../modules/databaseUpload');
const sqlQueries = require('../modules/sqlQueries');
const databaseDownload = require('../modules/databaseDownload');
const user = require('../modules/user');
const email = require('../modules/emailSend');
const auth = require('../modules/auth');
const exception = require('../exceptions/exceptions');
const order = require('../modules/order');
const functions = require('../modules/functions');


test('alma', () => {
    expect(2 + 2).toBe(4);
});

test('SQL server connection', async () => {
    try {
        expect(async () => await sqlQueries.CreateConnection());
    } catch (error) {
        expect(error).toEqual("Error: connect ECONNREFUSED 127.0.0.1:3306");
    }
});

test('First user', async () => {
    const data = (await user.getUsers())[0];
    expect(data).toEqual(["72339825529", "Virra Dóra", "203037", "10B", "virra.dora@gmail.com"]);
});
