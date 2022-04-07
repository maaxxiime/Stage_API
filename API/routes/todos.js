const express = require('Express')
const router = express.Router();

const auth = require('../middlewares/auth.js')


router.post('todos/', auth, controllers.create_todos);
router.get('/todos/:TagerId', controllers.read_one);
router.get('/todos/UserId', controllers.read_all);
router.put('todos/:TargetId', auth, controllers.update_todos);
router.delete('todos/:TargetId', auth, controllers.delete_todos);

module.exports = router;

// router.get('/:userID', auth)