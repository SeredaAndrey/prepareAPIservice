const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const {
  getAllUsersDataService,
  getSingleUserDataService,
  pathUserFollowingService,
} = require("../services/userServices");
const { paginationQueryValidation } = require("../validate/paginationValidate");

const getAllUsersDataController = async (req, res, next) => {
  const reqValidate = paginationQueryValidation.validate(req.query);
  if (!reqValidate.error) {
    let { page = 1, limit = 3 } = req.query;
    limit = parseInt(limit);
    const skip = (parseInt(page) - 1) * limit;
    const users = await getAllUsersDataService({ skip, limit });
    if (users) {
      res.status(200).json({
        message: "Users found success",
        code: 200,
        users: users.users,
        count: users.count,
        countInPage: users.countInPage,
        page: page,
      });
    } else throw new FoundingError("Users list not found");
  } else throw new ValidateError(reqValidate.error);
};

const getSingleUserDataController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getSingleUserDataService(userId);
  if (user) {
    res.status(200).json({
      message: "User found success",
      code: 200,
      user,
    });
  } else throw new FoundingError("User not found");
};

const pathUserFollowingController = async (req, res, next) => {
  const { userId } = req.params;
  const { _id } = req.body;
  const user = await pathUserFollowingService({
    _id,
    userId,
  });
  if (user) {
    res.status(200).json({
      message: user.message,
      code: 200,
      data: user.data,
    });
  } else {
    throw new FoundingError("user not found");
  }
};

module.exports = {
  getAllUsersDataController,
  getSingleUserDataController,
  pathUserFollowingController,
};
