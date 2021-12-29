const { Priority } = require("../models");
const { ReS } = require("../utils/response");

const getAll = async (req, res) => {
  try {
    const priority = await Priority.findAll();
    return res.status(200).json(200, priority);
  } catch (error) {
    throw error;
  }
};
module.exports = { getAll };
