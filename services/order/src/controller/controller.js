const service = require('../service/service');

module.exports = {
    /** get order history */
    getOrderHistory: async (req,res,next) => {
        try {
            const result = await service.getOrderHistory(req.params.id);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
    /** get product catalogue */
    getCatalogue: async (req,res,next) => {
        try {
            const result = await service.getCatalogue();
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
    /** make an order */
    makeOrder: async (req,res,next) => {
        try {
            const result = await service.makeOrder(req.body);
            res.status(201).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },
    /** cancel an order */
    cancelOrder: async (req,res,next) => {
        try {
            const result = await service.cancelOrder(req.body);
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (err) {
            next(err);
        }
    },

};