const sqlQueries = require("./sqlQueries");

class Order {
    async getOrdersByUserId(userId) {
        await sqlQueries.CreateConnection();
        const user = await sqlQueries.select('user', '*', `Id = ${userId}`);
        if (user.length === 0) return -1;
        const orders = await sqlQueries.select('orders', '*', `userId = ${userId}`);
        if (orders.length === 0) return 0;
        await sqlQueries.EndConnection();
        return 1;
        // -1 - nincs ilyen user
        //  0 - van ilyen user, de nincs orderje
        //  1 - van ilyen user és van orderje
    }

    async getAll() {
        await sqlQueries.CreateConnection();
        const all = await sqlQueries.selectAll('orders');
        await sqlQueries.EndConnection();
        return all;
    }

    async getOrders() {
        await sqlQueries.CreateConnection();
        const orders = await sqlQueries.select('orders', '*', 'lemondva is null');
        await sqlQueries.EndConnection();
        return orders;
    }

    async getCanceledOrders() {
        await sqlQueries.CreateConnection();
        const canceled = await sqlQueries.select('orders', '*', 'lemondva is not null');
        await sqlQueries.EndConnection();
        return canceled;
    }

    async delete(condition) {
        await sqlQueries.CreateConnection();
        const deleted = await sqlQueries.delete('orders', `${condition}`);
        await sqlQueries.EndConnection();
        return deleted.affectedRows;
    }

    async modify(fieldValues, conditions) {
        await sqlQueries.CreateConnection();
        const order = await sqlQueries.update('orders', `${fieldValues}`, `${conditions}`);
        await sqlQueries.EndConnection();
        return order.affectedRows;
    }

    async selectMenuIdByUserId(userId, date) {
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect(
            'menu',
            'menu.id',
            'INNER JOIN days ON menu.daysId = days.id ' +
            'INNER JOIN orders ON orders.menuId = menu.id',
            `orders.userId = ${userId} AND days.datum = '${date}'`);
        if (menuId.length === 0) return false;
        await sqlQueries.EndConnection();
        return menuId;
    }

    async selectMenuIdByDate(date) {
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect(
            'menu', 
            'menu.id', 
            'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
        await sqlQueries.EndConnection();
        if (menuId.length === 0) return -1;
        return menuId;
    }

    async userOrdersByMenuId(userId, date) {
        const orders = await this.getOrdersByUserId(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        if (orders === 0) return `No order with this ID: ${userId}`;
        const menuId = await this.selectMenuIdByDate(date);
        if (menuId === -1) return `No menu for this date: ${date}`;

        await sqlQueries.CreateConnection();
        let userOrder = await sqlQueries.select(
            'orders',
            'reggeli, ' +
            'tizorai, ' +
            'ebed, ' +
            'uzsonna, ' +
            'vacsora',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NULL`);

        let userCanceledOrder = await sqlQueries.select(
            'orders',
            'reggeli, ' +
            'tizorai, ' +
            'ebed, ' +
            'uzsonna, ' +
            'vacsora',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NOT NULL`);
        await sqlQueries.EndConnection();
        
        if (userOrder.length === 0) return `No order\nId: ${userId}\nDate: ${date}`;
        if (userCanceledOrder.length === 0) return `Meals: ${userOrder[0]}\nId: ${userId}\nDate: ${date}`;
        
        const mealsDay = [];
        userOrder = userOrder[0];
        userCanceledOrder = userCanceledOrder[0];
        for (let i = 0; i < 5; i++) {
            if (userOrder[i] === 0) mealsDay.push(userOrder[i]);
            else if (userOrder[i] === userCanceledOrder[i]) mealsDay.push(userOrder[i]);
            else (mealsDay.push(userCanceledOrder[i]))
        }
        return `Meals: ${mealsDay}\nId: ${userId}\nDate: ${date}`;
    }

    async order(userId, meals, date) {
        if (meals.length !== 5) return 'Meals array error';
        if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0 && meals[3] === 0 && meals[4] === 0) return 'Idiot';
        const orders = await this.getOrdersByUserId(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        const menuId = await this.selectMenuIdByDate(date);
        if (menuId === -1) return `No menu for this date: ${date}`;
        const exists = await this.selectMenuIdByUserId(userId, date)
        if (exists) return `Already has order\nId: ${userId}\nDate: ${date}`;
        
        await sqlQueries.CreateConnection();
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
        return `Ordered\nId: ${userId}\nDate: ${date}`;
    }

    async cancelOrder(userId, meals, date) {
        if (meals.length !== 5) return 'Meals array error';
        if (meals[0] === 0 && meals[1] === 0 && meals[2] === 0 && meals[3] === 0 && meals[4] === 0) return 'Idiot';
        const orders = await this.getOrdersByUserId(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        if (orders === 0) return `No order with this ID: ${userId}`;
        const menuId = await this.selectMenuIdByDate(date);
        if (menuId === -1) return `No order for this date: ${date}`;

        await sqlQueries.CreateConnection();
        const orderExists = await sqlQueries.select(
            'orders',
            'id',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NULL`);
        if (orderExists.length === 0) return `No order for ${date} with ID ${userId}`;

        const underCancellation = await sqlQueries.select(
            'orders',
            'id',
            `orders.menuId = ${menuId} AND orders.userId = ${userId} AND orders.lemondva IS NOT NULL`);     
        if (underCancellation.length !== 0) return `Already canceled\nId: ${userId}\nDate: ${date}`;

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
            `${menuId}, ${userId}, ${meals[0]}, ${meals[1]}, ${meals[2]}, ${meals[3]}, ${meals[4]}, 1000, '${date}'`);
        await sqlQueries.EndConnection();
        return `Canceled\nId: ${userId}\nDate: ${date}`;
    }
}

module.exports = new Order();