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

    async selectMenuId(date) {
        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
        if (menuId.length === 0) return `No menu with this date ${date}`;
        await sqlQueries.EndConnection();
        return menuId;
    }

    async userSumOrdersByMenuId(userId, meals) {
        // Id;menuId;userId;reggeli;tizorai;ebed;uzsonna;vacsora;ar;lemondva
        const orders = await this.getOrdersByUserId(userId);
        // console.log(orders);

    }

    async order(userId, meals, date) {
        // Id;menuId;userId;reggeli;tizorai;ebed;uzsonna;vacsora;ar;lemondva
        const orders = await this.getOrdersByUserId(userId);
        if (orders === -1) return `No user with ${userId} ID`;
        const menuId = await this.selectMenuId(date);
        console.log(menuId);
        
        // await sqlQueries.insert('orders',
        //     'menuId, ' +
        //     'userId, ' +
        //     'reggeli, ' +
        //     'tizorai, ' +
        //     'ebed, ' +
        //     'uzsonna, ' +
        //     'vacsora, ' +
        //     'ar, ' +
        //     'lemondva',
        //     `${menuId}, ${userId}, ${meals[0]}, ${meals[1]}, ${meals[2]}, ${meals[3]}, ${meals[4]}, 1000, null`);
        await sqlQueries.EndConnection();
        return 'Done';
    }

    async cancelOrder(UId, meals, date) {
        // Id;menuId;userId;reggeli;tizorai;ebed;uzsonna;vacsora;ar;lemondva
        const orders = await this.getOrdersByUserId(UId);
        console.log(orders);
        if (orders === -1) return `No user with ${UId} ID`;
        if (orders === 0) return `This ID: (${UId}) has no orders`;
        let tmpOrders = [];
        for (let index = 0; index < orders.length; index++) {
            if (orders[index][9] === null) tmpOrders.push(orders[index]);
        }

        await sqlQueries.CreateConnection();
        const menuId = await sqlQueries.innerSelect('menu', 'menu.id', 'INNER JOIN days ON menu.daysId = days.id', `days.datum = '${date}'`);
        if (menuId.length === 0) return `No menu with this date ${date}`;

        tmpOrders.forEach(element => {
            if (element[1] === menuId[0][0])
            {
                let array = [];
                array.push(element[0]);
                array.push(element[3]);
                array.push(element[4]);
                array.push(element[5]);
                array.push(element[6]);
                array.push(element[7]);
                
                console.log(array);
                console.log('  ', meals);
                
                if (array[1] === 0 || array[1] === meals[0]) console.log('Reggeli nem lemondható');
                else console.log('Reggeli lemondva');
                if (array[2] === 0 || array[2] === meals[1]) console.log('Tízórai nem lemondható');
                else console.log('Tízórai lemondva');
                if (array[3] === 0 || array[3] === meals[2]) console.log('Ebéd nem lemondható');
                else console.log('Ebéd lemondva');
                if (array[4] === 0 || array[4] === meals[3]) console.log('Uzsonna nem lemondható');
                else console.log('Uzsonna lemondva');
                if (array[5] === 0 || array[5] === meals[4]) console.log('Vacsora nem lemondható');
                else console.log('Vacsora lemondva');
            }
        });
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