import { User } from "../index.js";
import { generateToken, authCookieOptions } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "username, email, and password are required." });
  }

  const existing = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }],
  });
  if (existing) {
    return res
      .status(409)
      .json({ message: "Username or email is already taken." });
  }

  const user = new User({ username, email });
  await user.setPassword(password);
  await user.save(); // runs schema validators (email format, length, etc.)

  const token = generateToken(user);
  res.cookie("token", token, authCookieOptions());
  return res.status(201).json({ user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  // Same generic message whether the email is unknown or the password is
  // wrong — avoids leaking which emails are registered.
  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = generateToken(user);
  res.cookie("token", token, authCookieOptions());
  return res.json({ user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", authCookieOptions());
  return res.json({ message: "Logged out." });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  return res.json({ user });
});
