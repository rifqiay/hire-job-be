const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const createError = require("http-errors");
const { create, select } = require("../models/portfolio");

const portfolioController = {
  portfolio: async (req, res, next) => {
    try {
      const PORT = process.env.PORT || 8000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = uuidv4();
      const photo = req.file.filename;
      const { nama_app, link_repository, type_app, id_worker } = req.body;
      console.log(id_worker);
      const data = {
        id,
        nama_app,
        link_repository,
        type_app,
        photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
        id_worker,
      };
      create(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "create portfolio success"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  getPortfolio: (req, res, next) => {
    const id = req.params.id;
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200);
      })
      .catch((err) => res.send(err));
  },
};

module.exports = portfolioController;
