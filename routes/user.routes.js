const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/users", userController.createUser);
router.post("/users/login", userController.login);
router.get("/users/:id", userController.getOneUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
