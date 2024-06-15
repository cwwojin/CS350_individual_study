const db = require('../model/pg');

module.exports = {
    /** get all users */
    getUsers: async () => {
        const { rows } = await db.query({
            text: `select * from customer."user" order by created_at desc;`,
        });
        return rows;
    },
    /** get user by ID */
    getUserById: async (id) => {
        const { rows } = await db.query({
            text: `select * from customer."user" where id = $1;`,
            values: [id],
        });
        if (!rows.length) throw { status: 404, message: `No user with id = ${id}` };
        return rows[0];
    },
    /** create user */
    createUser: async (args) => {
        const { rows } = await db.query({
            text: `insert into customer."user" (user_name, address) values ($1, $2) returning *;`,
            values: [args.userName, args.address],
        });
        if (!rows.length) throw { status: 404, message: `No resource was created` };
        return rows[0];
    },
};
