import jwt from "jsonwebtoken";

// Verifies the httpOnly "token" cookie and attaches { id, role } to req.user.
// Any route behind this can trust req.user is a logged-in, valid user.
export function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session." });
  }
}

// Gate a route to specific roles, e.g. requireRole("developer").
// Must run after requireAuth so req.user is already set.
export function requireRole(...allowedRoles) {
  return function checkRole(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized." });
    }
    return next();
  };
}
