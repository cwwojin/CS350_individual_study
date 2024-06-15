const db = require('../model/pg');

const CUSTOMER_ENDPOINT = "http://customers:3000";

module.exports = {
    /** get order history */
    getOrderHistory: async (id) => {
        const { rows } = await db.query({
            text: `select * from "order"."order" where customer_id = $1 order by created_at desc;`,
            values: [id],
        });
        return rows;
    },
    /** get product catalogue */
    getCatalogue: async () => {
        const { rows } = await db.query({
            text: `select * from "order"."product";`,
        });
        return rows;
    },
    /** get user by id 
     * - request to the "customer" service running on same compose stack
    */
    getUserById: async (id) => {
        return undefined;
    },
    /** get product by id */
    getProductById: async (id) => {
        const { rows } = await db.query({
            text: `select * from "order"."product" where id = $1;`,
        });
        if(!rows.length)
            throw ({ status: 404, message: `No product with id = ${id}`});
        return rows[0];
    },
    /** make an order */
    makeOrder: async (args) => {
        const product = await module.exports.getProductById(args.productId);
        // const 
        const totalPrice = product.price * args.amount;
        const { rows } = await db.query({
            text: `insert into "order"."order" (customer_id, product_id, amount, price, address) 
                values ($1, $2, $3, $4, $5) returning *;`,
            values: [
                args.customerId,
                args.productId,
                args.amount,
                totalPrice,
                (args.address !== undefined) ? args.address : '',
            ],
        });
        if(!rows.length)
            throw ({ status: 404, message: `No records were inserted`});
        return rows[0];
    },
    /** cancel an order */
    cancelOrder: async (args) => {
        const { rows } = await db.query({
            text: `update "order"."order" set status = $3 where id = $1 and customer_id = $2 returning *;`,
            values: [
                args.orderId,
                args.customerId,
                false,
            ],
        });
        if(!rows.length)
            throw ({ status: 404, message: `No records were modified. Either order doesn't exist, or customer-ID is not valid.`});
        return rows[0];
    }
}