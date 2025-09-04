import JWT from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : authHeader

  if (!token) {
    return res.status(403).json({ Error: "No token provided" });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_TOKEN);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ Error: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
