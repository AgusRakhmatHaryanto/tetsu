const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH,
  JWT_SECRET_ACCESS_VERIFY,
} = require("../config/env");

async function generateToken(data) {
  const token = await jwt.sign(data, JWT_SECRET_ACCESS, {
    expiresIn: "1d",
  });
  return token;
}

async function generateVerifyToken(data) {
  const token = await jwt.sign(data, JWT_SECRET_ACCESS_VERIFY, {
    expiresIn: "5m",
  });
  return token;
}

async function generateRefreshToken(data) {
  const token = await jwt.sign(data, JWT_SECRET_REFRESH, {
    expiresIn: "3d",
  });
  return token;
}

async function verifyRefreshToken(token) {
  const decoded = await jwt.verify(token, JWT_SECRET_REFRESH);
  if (!decoded) {
    throw new Error("Authentication failed: Invalid token");
  }
  return decoded;
}

async function verifyEmailToken(token) {
  const decoded = await jwt.verify(token, JWT_SECRET_ACCESS_VERIFY);
  if (!decoded) {
    throw new Error("Authentication failed: Invalid token");
  }
  // console.log(decoded.email);
  return decoded;
}

async function verifyToken(token) {
  const data = await jwt.verify(token, JWT_SECRET_ACCESS);
  if (!data) {
    throw new Error("Authentication failed: Invalid token");
  }
  return data;
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  generateVerifyToken,
  verifyEmailToken,
  verifyRefreshToken,
};
