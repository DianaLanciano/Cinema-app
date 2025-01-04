import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/jwtTokenGenerator.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in login", error.message);
    res.status(500).json({ error: "Server error while trying to login" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout", error.message);
    res.status(500).json({ error: "Server error while trying to logout" });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        res.status(400).json({ error: "Data is missing..." });
    }

    const user = await User.findOne({ username });

    if (user) res.status(400).json({ error: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        password: hashedPassword,
        email,
     });


     if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        });
    } else {
        res.status(400).json({error:"Invalid user data"});
    }


  } catch (error) {
    console.error('Error in signup', error.message);
    res.status(500).json({error:"Server error while trying to create an admin"});
  }
};
