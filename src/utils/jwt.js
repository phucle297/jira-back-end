const jwt = require("jsonwebtoken");
const config = require("../config");

const EXPIRES_IN = 60 * 60 * 24 * 30; //? seconds*minutes*hours*days

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });

  return { token, expiresIn: EXPIRES_IN };
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = { generateToken, verifyToken };
