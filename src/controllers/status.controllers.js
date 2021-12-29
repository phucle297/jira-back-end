const { Status } = require("../models");
const { ReS } = require("../utils/response");

const getAll = async (req, res) => {
  try {
    const status = await Status.findAll();
    ReS(res, status, 200);
  } catch (error) {
    throw error;
  }
};
module.exports = { getAll };
