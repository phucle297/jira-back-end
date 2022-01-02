const { Projects, ProjectCategory, UserProject } = require("../models");
const { verifyToken } = require("../utils/jwt");

const getAllAdmin = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      include: {
        model: ProjectCategory,
        as: "projectCategory",
      },
    });
    res.status(200).json(200, projects);
  } catch (error) {
    throw error;
  }
};
const getAll = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const projects = await Projects.findAll({
      where: { creator: userLogin.email },
      include: {
        model: ProjectCategory,
        as: "projectCategory",
      },
    });
    res.status(200).json(200, projects);
  } catch (error) {
    throw error;
  }
};
const create = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const project = { ...req.body, creator: userLogin.email };
    const projectCreated = await Projects.create(project);
    await UserProject.create(
      {
        userId: userLogin.id,
        projectId: projectCreated.id,
      },
      {
        fields: ["userId", "projectId"],
      }
    );
    return res.status(201).json(201, projectCreated);
  } catch (error) {
    throw error;
  }
};
const getById = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const id = req.params.id;
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const project = await Projects.findOne({
      where: { creator: userLogin.email, id },
      include: {
        model: ProjectCategory,
        as: "projectCategory",
      },
    });
    if (!project)
      return res
        .status(404)
        .json(
          404,
          "Project not found or you are not the creator of this project"
        );
    return res.status(200).json(200, project);
  } catch (error) {
    throw error;
  }
};
const update = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const id = req.body.id;
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const project = await Projects.findOne({
      where: { creator: userLogin.email, id },
    });
    if (!project)
      return res
        .status(404)
        .json(
          404,
          "Project not found or you are not the creator of this project"
        );
    await project.update(req.body);
    return res.status(200).json(200, project, "Project updated");
  } catch (error) {
    throw error;
  }
};
const remove = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const id = req.params.id;
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const project = await Projects.findOne({
      where: { creator: userLogin.email, id },
    });
    if (!project)
      return res
        .status(404)
        .json(
          404,
          "Project not found or you are not the creator of this project"
        );
    await project.destroy();
    return res.status(200).json(200, "Project deleted");
  } catch (error) {
    throw error;
  }
};
const assignUserProject = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const id = req.body.projectId;
    let userLogin;
    await verifyToken(token).then((data) => (userLogin = data));
    const project = await Projects.findOne({
      where: { creator: userLogin.email, id },
    });
    if (!project)
      return res
        .status(404)
        .json(
          404,
          "Project not found or you are not the creator of this project"
        );
    await project.addUser(req.body.userId);
    return res.status(200).json(200, "User assigned to project");
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllAdmin,
  create,
  getAll,
  getById,
  remove,
  update,
  assignUserProject,
};
