const { TaskTypes } = require("../models");
const getAll = async (req, res) => {
  try {
    const tt = await TaskTypes.findAll();
    res.status(200).json(200, tt);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll };
