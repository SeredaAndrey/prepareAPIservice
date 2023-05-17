const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");

const {
  getAllUsersDataController,
  getSingleUserDataController,
  pathUserFollowingController,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", asyncWrapper(getAllUsersDataController));
router.get("/:userId", asyncWrapper(getSingleUserDataController));
router.patch("/following/:userId", asyncWrapper(pathUserFollowingController));

module.exports = { userRouter: router };
