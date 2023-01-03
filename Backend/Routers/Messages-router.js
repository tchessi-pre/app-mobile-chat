const express = require("express");
const router = express.Router();
const multer = require("../Middlewares/multer-config");
const auth = require("../Middlewares/auth");

const MessagesCtrl = require("../Controllers/Messages-controllers");

//POST METHODS
router.post("/Messages-create", multer, MessagesCtrl.createMessages);

//GET METHODS
router.get("/Messages", MessagesCtrl.getAllMessages);
router.get("/Messages/:id", MessagesCtrl.getOneMessages);

//PUT METHODS
router.put("/Messages-modify", multer, MessagesCtrl.modifyMessages);

//DELETE METHODS
router.delete("/Messages-delete/:id", MessagesCtrl.deleteMessages);

module.exports = router;