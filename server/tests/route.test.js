const functions = require('../modules/functions');
const axios = require('axios');

let token = "";
let omAzon_1 = Math.floor(Math.random() * (72399999999 - 72300000000)) + 72300000000;
let omAzon_2 = Math.floor(Math.random() * (72399999999 - 72300000000)) + 72300000000;
let email_1 = `${functions.randomString(10)}@gmail.com`;
let email_2 = `${functions.randomString(10)}@gmail.com`;


test('Számóló', () => {
    expect(2 + 2).toBe(4);
});

test('Add users from txt', async () => {
    const response = await axios.post("http://localhost:5000/add").then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
    expect(response).toEqual("Success");
});

test('Login', async () => {
    const response = await axios.post("http://localhost:5000/login",
        {
            user: {
                omAzon: "20303340312",
                jelszo: "admin"
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
    expect(response.data).toEqual({ "omAzon": "20303340312" });
});

test('Token ok', async () => {
    const response = await axios.post("http://localhost:5000/token",
        {}, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data.message).toEqual("Sikeres művelet");
});

test('School list', async () => {
    const response = await axios.get("http://localhost:5000/schoollist").then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
    expect(response).toEqual([{ id: 1, nev: 'Jedlik', iskolaOM: '203037' }, { id: 2, nev: 'Alma', iskolaOM: '112233' }]);
});

test("Userdetails", async () => {
    const response = await axios.post("http://localhost:5000/user/details",
        {
            omAzon: "72386351245",
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual([{
        "email": "ka.pal@gmail.com", "id": 7,
        "iskolaOM": "203037",
        "nev": "Ka Pál", "omAzon": "72386351245", "orders": [], "osztaly": "10F", "schoolsId": 1
    }]);
});

test("User", async () => {
    const response = await axios.post("http://localhost:5000/user",
        {
            userId: 1,
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual([
        {
            "befizetve": null,
            "email": "admin@jedlik.eu",
            "id": 1,
            "iskolaNev": "Jedlik",
            "iskolaOM": "203037",
            "nev": "Admin Isztratív",
            "omAzon": "20303340312",
            "osztaly": null,
            "schoolsId": 1
        }
    ]);
});

test("Register 1", async () => {
    const response = await axios.post("http://localhost:5000/register",
        {
            user: {
                nev: "Teszt Elek Béla",
                jelszo: "jelszo",
                email: email_1,
                iskolaOM: 203037,
                osztaly: "10T",
                omAzon: omAzon_1
            }
        }).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeresen létrehozva" });
});

test("Register 2", async () => {
    const response = await axios.post("http://localhost:5000/register",
        {
            user: {
                nev: "Teszt Elek Béla",
                jelszo: "jelszo",
                email: email_2,
                iskolaOM: 203037,
                osztaly: "10T",
                omAzon: omAzon_2
            }
        }).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeresen létrehozva" });
});

test("Accept pending", async () => {
    const response = await axios.put("http://localhost:5000/pending/accept",
        {
            omAzon: omAzon_1
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeresen létrehozva" });
});

test("Reject pending", async () => {
    const response = await axios.delete("http://localhost:5000/pending/reject",
        {
            data: {
                omAzon: omAzon_2
            },
            headers: token.headers
        })
        .then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeres művelet" });
});

test("QR scan", async () => {
    const response = await axios.post("http://localhost:5000/scan",
        {
            omAzon: 72339825529
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "befizetve": "Nincs befizetve" });
});

test("User delete", async () => {
    const response = await axios.delete("http://localhost:5000/user/delete",
        {
            data: {
                omAzon: omAzon_1
            },
            headers: token.headers
        }).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeres művelet" });
});

test("User add", async () => {
    const response = await axios.post("http://localhost:5000/user/add",
        {
            user: {
                nev: "Kis János",
                email: email_1,
                iskolaOM: 203037,
                osztaly: "10T",
                omAzon: omAzon_1,
                jog: 2
            }
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeresen létrehozva" });
});


test("User modify", async () => {
    const response = await axios.put("http://localhost:5000/user/modify",
        {
            omAzon: omAzon_1,
            user: {
                nev: "Nagy Péter",
                email: email_2,
                iskolaOM: 203037,
                osztaly: "10T",
                omAzon: omAzon_2
            }
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "email": email_2, "omAzon": omAzon_2 });
});

test("Password modify", async () => {
    const response = await axios.put("http://localhost:5000/password/modify",
        {
            omAzon: omAzon_2,
            regiJelszo: "kis.janos",
            ujJelszo: "jelszo"
        }, token).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        })
    expect(response.data).toEqual({ "message": "Sikeres művelet" });
});