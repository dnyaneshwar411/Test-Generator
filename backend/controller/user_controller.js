import User from "../model/user_model.js";

export const getusers = async (req, res) => {
  try {
    const UserList = await User.find(); // Only fetch tests that are available
    res.status(200).json({ UserList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getg = async (req, res) => {
  try {
    // const UserList = await User; // Only fetch tests that are available
    res.status(200).json({ UserList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
