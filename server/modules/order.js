const sqlQueries = require("./sqlQueries");
const functions = require("./functions");

class Order {
    async isOrderOrUserExists(userId) {
        if (isNaN(Number(userId))) return -1;
        const user = await sqlQueries.select('user', '*', `Id = ${userId}`);
        if (user.length === 0) return -1;
        const orders = await sqlQueries.select('orders', '*', `userId = ${userId}`);
        if (orders.length === 0) return 0;
        return 1;
        // -1 - nincs ilyen user / hiba
        //  0 - van ilyen user, de nincs orderje
        //  1 - van ilyen user és van orderje
    }

    async getAll() {
        return await sqlQueries.selectAll('orders');
    }

    async getOrders() {
        return await sqlQueries.select('orders', '*', 'lemondva is null');
    }

    async getCanceledOrders() {
        return await sqlQueries.select('orders', '*', 'lemondva is not null');
    }

    async delete(condition) {
        const deleted = await sqlQueries.delete('orders', `${condition}`);
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        const order = await sqlQueries.update('orders', `${fieldValues}`, `${conditions}`);
        return order.affectedRows;
    }

    async getCancelledDates(userId) {
        const days = await sqlQueries.innerSelect(
            'days',
            'days.datum',
            'INNER JOIN menu ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id ' +
            'INNER JOIN user ON orders.userId = user.id ',
            `user.id = ${userId} AND orders.lemondva IS NOT NULL`, false
        );
        let dates = [];
        days.forEach(day => {
            dates.push(functions.convertDateWithDash(new Date(day.datum)))
        });
        return dates;
    }

    async doesUserHaveOrderForDate(userId, date) {
        if (isNaN(Number(userId))) return -1;
        const orderId = await sqlQueries.innerSelect(
            'menu',
            'orders.id',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id',
            `orders.userId = ${userId} AND days.datum = '${functions.convertDateWithDash(date)}'`);
        if (orderId.length === 0) return false;
        return orderId;
    }

    async selectMenuIdByUserIdAndDate(userId, date) {
        if (isNaN(Number(userId))) return -1;
        const menuId = await sqlQueries.innerSelect(
            'menu',
            'menu.id',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id',
            `orders.userId = ${userId} AND days.datum = '${functions.convertDateWithDash(date)}'`);
        if (menuId.length === 0) return false;
        return menuId;
    }

    async selectMenuIdByDate(date) {
        const menuId = await sqlQueries.innerSelect(
            'menu',
            'menu.id',
            'INNER JOIN days ON menu.daysId = days.id',
            `days.datum = '${functions.convertDateWithDash(new Date(date))}'`);
        if (menuId.length === 0) return -1;
        return menuId;
    }

    async selectOrdersWithDateByUserId(userId) {
        return await sqlQueries.innerSelect(
            'menu',
            'days.datum, ' +
            'orders.reggeli, ' +
            'orders.tizorai, ' +
            'orders.ebed, ' +
            'orders.uzsonna, ' +
            'orders.vacsora, ' +
            'orders.ar, ' +
            'orders.lemondva ',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id ',
            `userid = '${userId}' ORDER BY days.datum`,
            false);
    }

    async order(userId, meals, date) {
        if (meals.length !== 5) return false; // Meals tömb hiba
        if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0 && meals[3] === 0 && meals[4] === 0) return false; // Nem rendelt semmit
        const orders = await this.isOrderOrUserExists(userId);
        if (orders === -1) return false; // Nincs ilyen user
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return false; // Nincs menu erre a napra
        const exists = await this.selectMenuIdByUserIdAndDate(userId, new Date(date));
        if (exists) return false; // Már rendelt

        await sqlQueries.insert(
            'orders',
            'menuId, ' +
            'userId, ' +
            'reggeli, ' +
            'tizorai, ' +
            'ebed, ' +
            'uzsonna, ' +
            'vacsora, ' +
            'ar, ' +
            'lemondva',
            `${menuId}, ${userId}, ${meals[0]}, ${meals[1]}, ${meals[2]}, ${meals[3]}, ${meals[4]}, 1000, null`);
        return true;
    }

    async cancelOrder(userId, date) {
        const orders = await this.isOrderOrUserExists(userId);
        if (orders === -1) return false; // Nincs ilyen user
        if (orders === 0) return false; // Nincs rendelése a usernek
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return false; // Nincs menu erre a napra
        const today = functions.convertDateWithDash(new Date());
        date = functions.convertDateWithDash(new Date(date));
        const dateFrom = functions.convertDateWithDash(new Date(await this.cancelDateFrom()));
        if (date <= dateFrom) return false; // Nem lemondható nap / idő miatt

        let order = await sqlQueries.select(
            'orders',
            'id',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NULL`);

        if (order.length === 0) return false; // Már lemondva

        order = order[0];
        await sqlQueries.update(
            'orders',
            `lemondva = '${today}' `,
            `orders.id = ${order[0]}`);
        return true;
    }

    async cancelDateFrom() {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(new Date(today).getDate() + 1);
        tomorrow = functions.convertDateWithDash(tomorrow);
        const day = today.getDay();
        const time = Number(today.getHours().toString() + functions.convertToZeroForm(today.getMinutes()));
        today = functions.convertDateWithDash(today);

        let dateFrom;
        if (day > 0 && day < 5) {
            if (time < 830) 
                dateFrom = today;
            else 
                dateFrom = tomorrow;
        } else if (day === 5) {
            if (time < 830) 
                dateFrom = today;
            else 
                dateFrom = functions.convertDateWithDash(functions.getFirstDayOfWeek(new Date(today)));
        } else 
            dateFrom = functions.convertDateWithDash(functions.getFirstDayOfWeek(new Date(today)));

        return dateFrom;
    }
}

module.exports = new Order();