const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const {
  findEmail,
  create,
  selectAll,
  select,
  countData,
  update,
  findId,
} = require("../models/worker");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

const workerController = {
  getAllWorker: async (req, res) => {
    try {
      const key = req.query.key || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "nama";
      const sort = req.query.sort || "ASC";
      const result = await selectAll({ key, limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getWorker: (req, res) => {
    const id = req.params.id;
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200);
      })
      .catch((err) => res.send(err));
  },

  register: async (req, res, next) => {
    try {
      const { nama, email, phone, sandi } = req.body;
      const { rowCount } = await findEmail(email);
      const sandiHash = bcrypt.hashSync(sandi);
      const photo = req.filename;
      const id = uuidv4();
      if (rowCount) {
        return next(createError(403, "Email is already used"));
      }
      const data = {
        id,
        nama,
        email,
        phone,
        sandi: sandiHash,
      };
      create(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Register succes")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, sandi } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return commonHelper.response(res, null, 403, "Email is invalid");
      }
      const isValidPassword = bcrypt.compareSync(sandi, user.sandi);
      console.log(isValidPassword);

      if (!isValidPassword) {
        return commonHelper.response(res, null, 403, "Password is invalid");
      }
      delete user.sandi;
      const payload = {
        id: user.id,
        email: user.email,
      };
      user.token = authHelper.generateToken(payload);
      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const PORT = process.env.PORT || 8000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = req.params.id;
      const photo = req.file.filename;
      const { nama, job_desc, domisili, tempat_kerja, deskripsi_singkat } =
        req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        nama,
        job_desc,
        domisili,
        tempat_kerja,
        photo: `http://${DB_HOST}:${PORT}/img/${photo}`,
        deskripsi_singkat,
      };
      update(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    console.log(payload);
    const result = {
      token: authHelper.generateToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = workerController;
