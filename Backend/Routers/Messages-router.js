const express = require("express");
const multer = require("../Middlewares/multer-config");
const auth = require("../Middlewares/auth");
const router = express.Router();

// Controllers Require
const MessagesCtrl = require("../Controllers/Messages-controllers");

//POST METHODS
router.post("/Messages-create", auth, multer, MessagesCtrl.createMessages);

//GET METHODS
router.get("/Messages", auth, MessagesCtrl.getAllMessages);
router.get("/Messages/:id", auth, MessagesCtrl.getOneMessages);

//PUT METHODS
router.put("/Messages-modify", auth, multer, MessagesCtrl.modifyMessages);

//DELETE METHODS
router.delete("/Messages-delete/:id", auth, multer, MessagesCtrl.deleteMessages);

module.exports = router;