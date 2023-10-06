import express from 'express';

const router = express.Router();

router.post("/createuser",(req,res)=> {
    const username = req.body.username;
    res.send("your username is: " + username);
});

export default router;
