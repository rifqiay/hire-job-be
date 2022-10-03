const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const createError = require("http-errors");
const { create, select } = require("../models/skills");

const skillController = {
  skills: async (req, res, next) => {
    try {
      const { nama_skill, id_worker } = req.body;
      const id = uuidv4();
      const data = {
        id,
        nama_skill,
        id_worker,
      };
      create(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "create skill succes")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  getSkills: (req, res, next) => {
    const id = req.params.id;
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200);
      })
      .catch((err) => res.send(err));
  },
  // updateSkills: async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const { nama_skill } = req.body;
  //     const { rowCount } = await findId(id);
  //     if (!rowCount) {
  //       return next(createError(403, "ID is Not Found"));
  //     }
  //     const data = {
  //       id,
  //       nama_skill,
  //     };
  //     update(data)
  //       .then((result) =>
  //         commonHelper.response(res, result.rows, 200, "Product updated")
  //       )
  //       .catch((err) => res.send(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

module.exports = skillController;
