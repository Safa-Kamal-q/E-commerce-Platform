import express from 'express';
import { insertUser, login } from '../controllers/authController.js';
import { validateUser } from '../middlewares/validation/user.js';
const router = express.Router();
router.post("/register", validateUser, (req, res) => {
    insertUser(req.body).then(() => {
        res.status(201).send('user added successfully');
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.post("/login", (req, res) => {
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
            maxAge: 60 * 60 * 1000
        });
        res.send(data);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.get('/logout', (req, res) => {
    res.cookie('fullName', '', {
        maxAge: -1,
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
//# sourceMappingURL=authRouter.js.map