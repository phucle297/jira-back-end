const { Status } = require("../models");

const getAll = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    return res.status(200).json(200, statuses);
  } catch (error) {
    throw error;
  }
};
module.exports = { getAll };
