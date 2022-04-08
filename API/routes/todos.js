const express = require("Express");
const router = express.Router();

const auth = require("../middlewares/auth.js");
const controllers = require('../controllers/todos.js')


router.post("/", auth, controllers.create_todos);
router.get("/:TargetId",auth, controllers.read_one);
router.get("/", auth, controllers.read_all_by_userId);
router.put("/:TargetId", auth, controllers.update_todos);
router.delete("/:TargetId", auth, controllers.delete_todos);

module.exports = router;

// router.get('/:userID', auth)
