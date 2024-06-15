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

/** Router for "/api/users" */
router
    .get(
        // GET : get users
        '/',
        controller.getUsers
    )
    .get(
        // GET : get a user by id
        '/:id',
        [
            param('id').exists().isInt({min: 1}),
            validatorChecker,
        ],
        controller.getUserById
    )
    .post(
        // POST : create user
        '/',
        [
            body('userName').exists().isString(),
            body('address').exists().isString(),
            validatorChecker,
        ],
        controller.createUser
    )
;

module.exports = router;