const { TaskTypes } = require("../models");
const { ReS } = require("../utils/response");
const getAll = async (req, res) => {
  try {
    const tt = await TaskTypes.findAll();
    ReS(res, tt, 200);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAll };
