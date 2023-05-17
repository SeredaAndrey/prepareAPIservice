const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");

const {
  getAllUsersDataController,
  getSingleUserDataController,
  pathUserFollowingController,
  createNewUserController,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/", asyncWrapper(createNewUserController));
router.get("/", asyncWrapper(getAllUsersDataController));
router.get("/:userId", asyncWrapper(getSingleUserDataController));
router.patch("/following/:userId", asyncWrapper(pathUserFollowingController));

module.exports = { userRouter: router };
