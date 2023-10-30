import express from 'express';
import { insertUser, login } from '../controllers/authController.js';
import { validateUser } from '../middlewares/validation/user.js';
import ApiError from '../middlewares/errorHandlers/apiError.js';

const router = express.Router();

router.post("/register", validateUser, (req, res, next) => {
    insertUser(req.body).then(() => {
        res.status(201).send('user added successfully');
    }).catch(err => {
        next(new ApiError('', 500))
    });
});

router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    login(email, password)
        .then(data => {
            res.cookie('fullName', data.fullName, {
                maxAge: 60 * 60 * 1000
            });
            res.cookie('loginTime', Date.now(), {
                maxAge: 60 * 60 * 1000
            });
            res.cookie('token', data.token, {
                maxAge: 60 * 60 * 60 * 1000
            });

            res.send(data);
        })
        .catch(err => {
            next(new ApiError('err', 401)) 
        })
});

router.get('/logout', (req, res) => {
    res.cookie('fullName', '', {
        maxAge: -1,  // This means the cookie will be deleted
        expires: new Date(Date.now() - 1000)
    });
    res.cookie('loginTime', '', {
        maxAge: -1
    });
    res.cookie('token', '', {
        maxAge: -1
    });

    res.send();
});

export default router;