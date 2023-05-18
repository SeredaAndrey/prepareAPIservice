const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");

const {
  getAllUsersDataController,
  getSingleUserDataController,
  pathUserFollowingController,
  createNewUserController,
  loginUserController,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/", asyncWrapper(createNewUserController));
router.get("/", asyncWrapper(getAllUsersDataController));
router.post("/login", asyncWrapper(loginUserController));
router.get("/:userId", asyncWrapper(getSingleUserDataController));
router.patch("/following/:userId", asyncWrapper(pathUserFollowingController));

module.exports = { userRouter: router };
