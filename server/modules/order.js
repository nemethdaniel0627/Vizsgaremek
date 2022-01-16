const sqlQueries = require("./sqlQueries");

class Order {
    async getOrdersByUserId(userId) {
        await sqlQueries.CreateConnection();
        const user = await sqlQueries.select('user', '*', `Id = ${userId}`);
        if (user.length === 0) return -1;
        const orders = await sqlQueries.select('orders', '*', `userId = ${userId}`);
        if (orders.length === 0) return 0;
        await sqlQueries.EndConnection();
        return orders;
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
        const orders = await sqlQueries.select('orders', '*', 'lemondva = null');
        console.log(orders);
        await sqlQueries.EndConnection();
        return orders;
    }

    async getCanceledOrders() {
        await sqlQueries.CreateConnection();
        const canceled = await sqlQueries.select('orders', '*', 'lemondva != null');
        console.log(canceled);
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

    async order(UId, meals, date) {
        const orders = await this.getOrdersByUserId(UId);
        const userId = UId;
        if (orders === -1) return `No user with ${userId} ID`;
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
        if (menuId.length === 0) return `No menu with this date ${date}`;
        await sqlQueries.insert('orders',
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
        return 'Done';
    }

    async cancelOrder(UId, meals, date) {
        //TODO: befizetve ellenőrzése
        const orders = await this.getOrdersByUserId(UId);
        console.log(orders);
        // Id - orders[0] 
        // menuId - orders[1]
        // userId - orders[2]
        // reggeli - orders[3]
        // tizorai - orders[4]
        // ebed - orders[5]
        // uzsonna - orders[6]
        // vacsora - orders[7]
        // ar - orders[8]
        // datum - orders[9]
        if (orders === -1) return `No user with ${UId} ID`;
        if (orders === 0) return `This ID: (${UId}) has no orders`;
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
        const userId = UId;
        await sqlQueries.insert('orders',
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
        return 'canceled';
    }
}

module.exports = new Order();