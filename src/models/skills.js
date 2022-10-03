const Pool = require("../config/db");

const create = (data) => {
  const { id, nama_skill, id_worker } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO skills(id,nama_skill,id_worker) VALUES('${id}','${nama_skill}','${id_worker}')`,
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
  return Pool.query(`SELECT * FROM skills WHERE id_worker='${id}'`);
};

// const update = (data) => {
//   const { id, nama_skill } = data;
//   return Pool.query(
//     `UPDATE skills SET nama_skill = '${nama_skill}' WHERE id='${id}'`
//   );
// };

// const findId = (id) => {
//   return new Promise((resolve, reject) =>
//     Pool.query(`SELECT id FROM skills WHERE id='${id}'`, (error, result) => {
//       if (!error) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     })
//   );
// };

module.exports = {
  create,
  select,
};
