const User = require("../schemas/userSchema");

const createNewUserService = async (user) => {
  const data = await User.findOne({ user });
  if (data) return;
  const newUser = new User({ user });
  await newUser.save();
  return await User.findOne({ user });
};

const getAllUsersDataService = async ({ skip, limit }) => {
  const count = await User.find({}).count();
  const countInPage = await User.find({}).skip(skip).limit(limit).count();
  const users = await User.find({}).skip(skip).limit(limit);
  return { count, countInPage, users };
};

const getSingleUserDataService = async (userId) => {
  return await User.findOne({ _id: userId });
};

const pathUserFollowingService = async ({ _id, userId }) => {
  const user = await User.findOne({
    _id,
    following: { $in: { _id: userId } },
  });
  if (user !== null) {
    const result = await deleteUserFromFollowingListService(_id, userId);
    return { data: result, message: "delete from following success" };
  } else {
    const result = await addUserToFollowingListService(_id, userId);
    return { data: result, message: "add to following success" };
  }
};

const addUserToFollowingListService = async (_id, userId) => {
  await User.findOneAndUpdate(
    { _id },
    { $addToSet: { following: userId } },
    { new: true }
  );
  let { followers } = await User.findOne({ _id: userId });
  followers += 1;
  return await User.findOneAndUpdate(
    { _id: userId },
    { followers },
    { new: true }
  );
};

const deleteUserFromFollowingListService = async (_id, userId) => {
  await User.findOneAndUpdate(
    { _id },
    { $pull: { following: userId } },
    { new: true }
  );
  let { followers } = await User.findOne({ _id: userId });
  followers -= 1;
  return await User.findOneAndUpdate(
    { _id: userId },
    { followers },
    { new: true }
  );
};

module.exports = {
  createNewUserService,
  getAllUsersDataService,
  getSingleUserDataService,
  pathUserFollowingService,
};
