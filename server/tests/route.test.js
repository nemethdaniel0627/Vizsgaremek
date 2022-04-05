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
const { default: axios } = require('axios');
let token = "";

test('Számóló', () => {
    expect(2 + 2).toBe(4);
});

test('Login test', async () => {
    const response = await axios.post("http://localhost:5000/login",
        {
            user: {
                omAzon: "72386351245",
                jelszo: "ka.pal"
            }
        }).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    token = response.headers.authorization.split(" ")[1].split(";")[0];
    token = {
        headers: {
            "Authorization": `Baerer ${token}`
        }
    }
    expect(response.data).toEqual({ "omAzon": "72386351245" });
});

test('School list test', async () => {
    const response = await axios.get("http://localhost:5000/schoollist").then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
    expect(response).toEqual([{ id: 1, nev: 'Jedlik', iskolaOM: '203037' }, { id: 2, nev: 'Alma', iskolaOM: '112233' }]);
});

test('Add users from txt test', async () => {
    const response = await axios.post("http://localhost:5000/add").then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
    expect(response).toEqual("Success");
});

test('Token ok test', async () => {
    const response = await axios.post("http://localhost:5000/token",
        {}, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data.message).toEqual("Sikeres művelet");
});

test("Userdetails test", async () => {
    const response = await axios.post("http://localhost:5000/userdetails",
        {
            omAzon: "72386351245",
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual([{"email": "ka.pal@gmail.com", "id": 4, 
    "iskolaOM": "203037", "jelszo": "$2b$10$4kSQEOoOTQYq9OPUiwlLVuW7njdO1SGqSiBIY8Q4uBt0FEAYbN16C", 
    "nev": "Ka Pál", "omAzon": "72386351245", "orders":  [], "osztaly": "10F", "schoolsId": 1}]);
});

test("User test", async () => {
    const response = await axios.post("http://localhost:5000/user",
        {
            userId: 4,
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual([{"befizetve": false, "email": "ka.pal@gmail.com", 
    "id": 4, "iskolaNev": "Jedlik", "iskolaOM": "203037", 
    "jelszo": "$2b$10$4kSQEOoOTQYq9OPUiwlLVuW7njdO1SGqSiBIY8Q4uBt0FEAYbN16C", "nev": "Ka Pál", 
    "omAzon": "72386351245", "osztaly": "10F", "schoolsId": 1}]);
});