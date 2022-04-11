const express = require("Express");
const router = express.Router();

const auth = require("../middlewares/auth.js");
const controllers = require("../controllers/todos.js");

const multer = require("../middlewares/multer_images.js");

router.post("/", auth, multer, controllers.create_todos);
router.get("/:TargetId", auth, controllers.read_one);
router.get("/", auth, controllers.read_all_by_userId);
router.put("/:TargetId", auth, multer, controllers.update_todos);
router.delete("/:TargetId", auth, controllers.delete_todos);

module.exports = router;

// router.get('/:userID', auth)
