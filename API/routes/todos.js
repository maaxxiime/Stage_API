const express = require('Express')
const router = express.Router();

router.post('todos/', auth, controllers.create_todos);
router.get('/todos/:TagerId', controllers.read_one);
router.get('/todos/UserId', controllers.read_all);
router.put('todos/:TargetId', auth, controllers.update_todos);
router.delete('todos/:TargetId', auth, controllers.delete_todos);



// const auth = require('../middlewares/auth.js')

// router.get('/:userID', auth)