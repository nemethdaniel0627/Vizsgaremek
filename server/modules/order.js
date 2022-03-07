const sqlQueries = require("./sqlQueries");
const functions = require("./functions");

class Order {
    async isOrderOrUserExists(userId) {
        if (isNaN(Number(userId))) return -1;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const user = await sqlQueries.select('user', '*', `Id = ${userId}`);
        if (user.length === 0) return -1;
        const orders = await sqlQueries.select('orders', '*', `userId = ${userId}`);
        if (orders.length === 0) return 0;
        await sqlQueries.EndConnection();
        return 1;
        // -1 - nincs ilyen user / hiba
        //  0 - van ilyen user, de nincs orderje
        //  1 - van ilyen user és van orderje
    }

    async getAll() {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const all = await sqlQueries.selectAll('orders');
        await sqlQueries.EndConnection();
        return all;
    }

    async getOrders() {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const orders = await sqlQueries.select('orders', '*', 'lemondva is null');
        await sqlQueries.EndConnection();
        return orders;
    }

    async getCanceledOrders() {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const canceled = await sqlQueries.select('orders', '*', 'lemondva is not null');
        await sqlQueries.EndConnection();
        return canceled;
    }

    async delete(condition) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete('orders', `${condition}`);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const order = await sqlQueries.update('orders', `${fieldValues}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return order.affectedRows;
    }

    async doesUserHaveOrderForDate(userId, date) {
        if (isNaN(Number(userId))) return -1;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const orderId = await sqlQueries.innerSelect(
            'menu',
            'orders.id',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id',
            `orders.userId = ${userId} AND days.datum = '${functions.convertDateWithDash(date)}'`);
        if (orderId.length === 0) return false;
        await sqlQueries.EndConnection();
        return orderId;
    }

    async selectMenuIdByUserIdAndDate(userId, date) {
        if (isNaN(Number(userId))) return -1;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect(
            'menu',
            'menu.id',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id',
            `orders.userId = ${userId} AND days.datum = '${functions.convertDateWithDash(date)}'`);
        if (menuId.length === 0) return false;
        await sqlQueries.EndConnection();
        return menuId;
    }

    async selectMenuIdByDate(date) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect(
            'menu', 
            'menu.id', 
            'INNER JOIN days ON menu.daysId = days.id',
            `days.datum = '${functions.convertDateWithDash(new Date(date))}'`);
        await sqlQueries.EndConnection();
        if (menuId.length === 0) return -1;
        return menuId;
    }

    async selectOrdersWithDateByUserId(userId) {
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection(false);
        const ordersWithDate = await sqlQueries.innerSelect(
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
        await sqlQueries.EndConnection();
        return ordersWithDate;
    }

    async order(userId, meals, date) {
        if (meals.length !== 5) return 'Meals array error';
        if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0 && meals[3] === 0 && meals[4] === 0) return 'Nothing ordered';
        const orders = await this.isOrderOrUserExists(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return `No menu for this date: ${date}`;
        const exists = await this.selectMenuIdByUserIdAndDate(userId, new Date(date));
        if (exists) return 'Already has order';

        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
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
        await sqlQueries.EndConnection();
        return 'Ordered';
    }

    async cancelOrder(userId, date) {
        const orders = await this.isOrderOrUserExists(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        if (orders === 0) return `No order with this ID: ${userId}`
        const menuId = await this.selectMenuIdByDate(functions.convertDateWithDash(new Date(date)));
        if (menuId === -1) return `No menu for this date: ${date}`;
        if (await sqlQueries.isConnection() === false) await sqlQueries.CreateConnection();
        let order = await sqlQueries.select(
            'orders',
            'id',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NULL`);
        
        if (order.length === 0) return 'Already cancelled';
        
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
        
        await sqlQueries.EndConnection();
        return 'Cancelled';
    }
}

module.exports = new Order();