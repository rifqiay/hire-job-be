const Pool = require("../config/db");

const create = (data) => {
  const { id, nama_app, link_repository, type_app, photo, id_worker } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO portfolio(id,nama_app,link_repository,type_app,photo,id_worker) VALUES('${id}','${nama_app}','${link_repository}','${type_app}','${photo}','${id_worker}')`,
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

const select = (id) => {
  return Pool.query(`SELECT * FROM portfolio WHERE id_worker='${id}'`);
};

module.exports = {
  create,
  select,
};
