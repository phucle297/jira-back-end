const { Users } = require("../models");
const { generateToken, verifyToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const aws = require("aws-sdk");
const {
  S3_ACCESS_KEY_ID,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_DOMAIN_NAME,
} = require("../config");
const s3 = new aws.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_KEY,
});
const getAll = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json(200, users);
  } catch (error) {
    return res.status(400).json(400, error);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json(400, "User id is invalid");
    }
    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      return res.status(200).json(200, user);
    } else {
      return res.status(404).json(404, "User not found");
    }
  } catch (error) {
    return res.status(400).json(400, error);
  }
};
const signup = async (req, res) => {
  try {
    const isUserExist = await Users.findOne({
      where: { email: req.body.email },
    });
    if (isUserExist) return res.status(400).json(400, "Email already exist");
    await Users.create(req.body);
    return res.status(201).json(201, "User Created");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json(400, error.errors);
    }
    throw error;
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json(404, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      user.password = password;
      const token = generateToken(user);
      return res.status(200).json(200, { token });
    }
    return res.status(404).json(404, "Invalid email or password");
  } catch (error) {
    throw error;
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.body;
    if (!Number(id)) return res.status(400).json(400, "User id is invalid");
    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json(404, "User not found");
    const token = req.header("Authorization").split(" ")[1];
    let userLoginToken;
    await verifyToken(token).then((data) => (userLoginToken = data));
    const lgemail = userLoginToken.email;
    const userLogin = await Users.findOne({
      where: { email: lgemail },
      attributes: { exclude: ["password"] },
    });

    if (userLogin.role === "Admin" || userLogin.email === user.email) {
      await user.update(req.body);
      return res.status(200).json(200, { message: "User updated", user });
    } else {
      return res
        .status(403)
        .json(
          403,
          "You can only edit your own information. Only admin can edit other people's information"
        );
    }
  } catch (error) {
    return res.status(400).json(400, error);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.body;
    if (!Number(id)) {
      return res.status(400).json(400, "User id is invalid");
    }
    const user = await Users.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json(404, "User not found");
    }
    await user.destroy();
    return res.status(200).json(200, "User deleted");
  } catch (error) {
    return res.status(400).json(400, error);
  }
};
const uploadAvatar = (req, res) => {
  const { folder } = req.body;
  const { buffer, originalname, mimetype } = req.file;

  const dst = `${folder}/${Date.now()}_${originalname}`;

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: dst,
    Body: buffer,
    ContentType: mimetype,
  };

  s3.putObject(params, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const url = `${S3_DOMAIN_NAME}/${dst}`;
      const token = req.header("Authorization").split(" ")[1];
      let userLoginToken;
      await verifyToken(token).then((data) => (userLoginToken = data));
      const lgemail = userLoginToken.email;
      const userLogin = await Users.findOne({
        where: { email: lgemail },
        attributes: { exclude: ["password"] },
      });
      userLogin.avatar = url;
      await userLogin.save();
      return res
        .status(200)
        .json(200, { message: "Change Avatar Success!", userLogin });
    }
  });
};
module.exports = { getAll, getById, signup, login, edit, remove, uploadAvatar };
