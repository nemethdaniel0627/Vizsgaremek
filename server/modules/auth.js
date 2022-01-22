const USER = require("./user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlQueries = require("./sqlQueries");

require('dotenv').config();

class Auth {
    async register(user) {
        const userResult = await USER.getBy("felhasznaloNev", `felhasznaloNev = "${user.userName}"`);
        if (userResult.length !== 0) {
            return undefined;
        }
        else {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            const created = await USER.add(`${user.userName};${hashedPassword};${user.name};${user.iskolaOM};${user.osztaly};${user.email}`);
            console.log(created);
            if (created) {
                const createdUserId = await USER.getBy("id", `felhasznaloNev = "${user.userName}"`);
                await sqlQueries.CreateConnection();
                await sqlQueries.insert("user_role", "userId, roleId", `${createdUserId}, 2`);
                const roles = await sqlQueries.select("user_role", "roleId", `userId = ${createdUserId}`);
                await sqlQueries.EndConnection();
                user.password = undefined;
                return {
                    tokenData: this.#createToken(createdUserId, { roles: roles[0] }),
                    user: user
                }
            }
            return undefined;
        }
    }

    async login(user) {
        const userResult = await USER.getBy("jelszo", `felhasznaloNev = "${user.userName}"`);
        console.log(userResult);
        if (userResult.length === 0) {
            console.log("asd");
            return undefined;
        }
        else {
            console.log(user.password);
            const isPasswordMatching = bcrypt.compareSync(user.password, userResult[0][0]);
            console.log(isPasswordMatching);
            if (isPasswordMatching) {
                user.password = undefined;
                const loginUserId = await USER.getBy("id", `felhasznaloNev = "${user.userName}"`);
                await sqlQueries.CreateConnection();
                const roles = await sqlQueries.select("user_role", "roleId", `userId = ${loginUserId}`);
                await sqlQueries.EndConnection();
                console.log(roles[0]);
                return {
                    tokenData: this.#createToken(loginUserId, { roles: roles[0][0] }),
                    user: user
                }

            }
            return undefined;
        }
    }

    tokenAutheticate(req, res, next) {
        const cookie = req.headers.cookie.toString().split("=")[1];
        try {
            const jwtAuth = jwt.verify(cookie, process.env.JWT_SECRET);
            console.log(jwtAuth);
            next();
        } catch (error) {
            res.status(401);
            res.send("Unauthorized");
        }
    }

    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; SameSite=None; Secure; Path=/; Max-Age=${tokenData.expiresIn}`;
    }

    #createToken(userId, options = null) {
        const expiresIn = 24 * 60 * 60; // 1 day
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = userId.toString();
        console.log(expiresIn);
        return {
            expiresIn,
            token: jwt.sign({ _id: dataStoredInToken, roles: 2 }, secret, { expiresIn: expiresIn }),
        };
    }
}

module.exports = new Auth();