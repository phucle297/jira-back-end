const { ProjectCategory } = require("../models");

const getAll = async (req, res) => {
  try {
    const projectCategory = await ProjectCategory.findAll();
    return res.status(200).json(200, projectCategory);
  } catch (error) {
    throw error;
  }
};
module.exports = { getAll };
