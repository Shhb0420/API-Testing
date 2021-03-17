const userRouter = require("express").Router();

const userController = require("../controllers/users");
const verifyAccess = require("../helpers/middlewares/verifyAccess");

userRouter.patch("/:id", verifyAccess, userController.updateUser);
userRouter.post("/referrer", verifyAccess, userController.inputReferral);
userRouter.get("/findUser", userController.findUserByName);

module.exports = userRouter;
