const service = require('../service/service');

module.exports = {
    /** get users */
    getUsers: async (req, res, next) => {
        try {
            const result = await service.getUsers();
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
    /** get user by id */
    getUserById: async (req, res, next) => {
        try {
            const result = await service.getUserById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
    /** create user */
    createUser: async (req, res, next) => {
        try {
            const result = await service.createUser(req.body);
            res.status(201).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
};
