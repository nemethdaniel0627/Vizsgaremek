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
        if (meals.length !== 5) return false; // 'Meals array error';
        if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0 && meals[3] === 0 && meals[4] === 0) return false; // 'Nothing ordered';
        const orders = await this.isOrderOrUserExists(userId);
        if (orders === -1) return false; // `No user with ${userId} ID`;
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return false; // `No menu for this date: ${date}`;
        const exists = await this.selectMenuIdByUserIdAndDate(userId, new Date(date));
        if (exists) return false; // 'Already has order';

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
        if (orders === -1) return false; // `No user with ${userId} ID`;
        if (orders === 0) return false; // `No order with this ID: ${userId}`
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return false; // `No menu for this date: ${date}`;
        
        let order = await sqlQueries.select(
            'orders',
            'id',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NULL`);
        
        if (order.length === 0) return false; // 'Already cancelled';
        
        order = order[0];
        const today = functions.convertDateWithDash(new Date());
        await sqlQueries.update(
            'orders', 
            'reggeli = 0, ' + 
            'tizorai = 0, ' + 
            'ebed = 0, ' + 
            'uzsonna = 0, ' + 
            'vacsora = 0, ' +
            'ar = 0, ' +
            `lemondva = '${today}' `,
            `orders.id = ${order[0]}`);
        return true;
    }
}

module.exports = new Order();