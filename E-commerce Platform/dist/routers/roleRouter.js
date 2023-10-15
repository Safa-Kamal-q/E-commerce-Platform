import express from 'express';
import { getRoles, getRolesByID, insertRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { validateRole } from '../middlewares/validation/role.js';
const router = express.Router();
router.post('/', validateRole, authenticate, authorize('POST_roles/'), async (req, res) => {
    insertRole(req.body).then((data) => {
        res.status(201).send('Role added successfully');
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/', authenticate, authorize('GET_roles/'), (req, res) => {
    getRoles().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});
router.get('/:id', authenticate, authorize('GET_roles/:id'), (req, res) => {
    const id = req.params.id;
    getRolesByID(id).then(data => {
        if (data.length === 0) {
            res.status(404).send(`The role with this Id: ${id} not found`);
        }
        else {
            res.status(201).send(data);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});
export default router;
//# sourceMappingURL=roleRouter.js.map