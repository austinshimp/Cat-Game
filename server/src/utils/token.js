import jwt from "jsonwebtoken";

const TOKEN_TTL = "7d";

// Signs a JWT carrying just enough to identify + authorize the user.
// Keep the payload small — it's decoded on every authenticated request.
export function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

// Shared cookie options for setting/clearing the auth cookie.
// httpOnly keeps it out of reach of JS (XSS-safe); secure is only
// enforced in production so local http://localhost dev still works.
export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches TOKEN_TTL
  };
}
