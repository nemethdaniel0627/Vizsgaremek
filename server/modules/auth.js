const USER = require("./user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlQueries = require("./sqlQueries");

require('dotenv').config();

class Auth {
    async register(user) {
        const userResult = await USER.getBy("omAzon", `omAzon = "${user.omAzon}"`, false, false);
        const schoolId = await sqlQueries.select("schools", "id", `iskolaOM = ${user.iskolaOM}`, false);
        if (userResult.length !== 0) {
            return undefined;
        }
        else {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            user.schoolId = schoolId[0].id;
            user.password = hashedPassword;
            const created = await USER.add(user, true);
            if (created) return true;
            return undefined;
        }
    }

    async login(user) {
        const userResult = await USER.getBy("jelszo", `omAzon = "${user.userName}"`);
        if (userResult.length === 0) {
            return undefined;
        }
        else {
            const isPasswordMatching = bcrypt.compareSync(user.password, userResult[0][0]);
            if (isPasswordMatching) {
                user.password = undefined;
                const loginUserId = await USER.getBy("id", `omAzon = "${user.userName}"`);
                if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
                const roles = await sqlQueries.select("user_role", "roleId", `userId = ${loginUserId}`);
                await sqlQueries.EndConnection();
                return {
                    tokenData: this.#createToken(loginUserId, { roles: roles[0][0] }),
                    user: user
                }
            }
            return undefined;
        }
    }

    tokenAutheticate(req, res, next) {
        let token = req.headers.authorization.split(" ")[1];
        token = token.split(";")[0];
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            res.unauthorized();
        }
    }

    createCookie(tokenData) {
        return `Bearer ${tokenData.token}; SameSite=None; Secure; Path=/; Max-Age=${tokenData.expiresIn}`;
    }

    #createToken(userId, options = null) {
        const expiresIn = 60 * 60 * 24; // 1 day
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken = userId.toString();
        return {
            expiresIn,
            token: jwt.sign({ _id: dataStoredInToken, roles: options.roles }, secret, { expiresIn: expiresIn }),
        };
    }
}

module.exports = new Auth();