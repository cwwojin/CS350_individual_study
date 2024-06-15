const { Router } = require('express');
const { body, param, query, validationResult } = require('express-validator');

const controller = require('../controller/controller');

// Middleware
const validatorChecker = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            message: `Invalid request : ` + errors.array()[0].msg,
            data: {
                errors: errors.array(),
            },
        });
    }
    next();
};

const router = Router();

router
    .get(
        // GET : view order history
        '/:id',
        [
            param('id').exists().isInt({min: 1}),
            validatorChecker,
        ],
        controller.getOrderHistory
    )
    .get(
        // GET : get product catalogue
        '/catalogue',
        controller.getCatalogue
    )
    .post(
        // POST : make an order
        '/',
        [
            body('customerId').exists().isInt({min: 1}),
            body('productId').exists().isInt({min: 1}),
            body('amount').exists().isInt({min: 1}),
            body('address').optional().isString(),
            validatorChecker,
        ],
        controller.makeOrder
    )
    .post(
        '/cancel',
        [
            body('customerId').exists().isInt({min: 1}),
            body('orderId').exists().isInt({min: 1}),
            validatorChecker,
        ],
        controller.cancelOrder
    )
;

module.exports = router;