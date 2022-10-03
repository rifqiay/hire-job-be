const Pool = require("../config/db");

const selectAll = ({ key, limit, offset, sort, sortby }) => {
  return Pool.query(
    `select * from worker where nama ilike '%${key}%' order by ${sortby} ${sort} limit ${limit} offset ${offset}`
  );
};

const select = (id) => {
  return Pool.query(`SELECT * FROM worker WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM worker");
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM worker WHERE email='${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};
const create = (data) => {
  const { id, nama, email, phone, sandi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO worker(id,nama,email,phone,sandi) VALUES('${id}','${nama}','${email}','${phone}','${sandi}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const update = (data) => {
  const {
    id,
    nama,
    job_desc,
    domisili,
    tempat_kerja,
    photo,
    deskripsi_singkat,
  } = data;
  return Pool.query(
    `UPDATE worker SET nama = '${nama}', job_desc = '${job_desc}', domisili = '${domisili}', tempat_kerja = '${tempat_kerja}', photo = '${photo}', deskripsi_singkat = '${deskripsi_singkat}' WHERE id='${id}'`
  );
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM worker WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  findEmail,
  create,
  selectAll,
  select,
  countData,
  update,
  findId,
};
