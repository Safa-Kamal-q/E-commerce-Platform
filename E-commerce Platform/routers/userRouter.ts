import express from 'express';
import { insertUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/",(req,res)=> {
        insertUser(req.body).then(() => {
          res.status(201).send('user added successfully');
        }).catch(err => {
            console.log('Something went wrong')
        });
      });


export default router;
