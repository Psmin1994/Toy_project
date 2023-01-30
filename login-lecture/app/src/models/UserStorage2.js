"use strict";

const db = require("../config/db");

class UserStorage {
  static getUsers(isAll, ...fields) {}

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WhERE id = ?;";
      db.query(sql, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]); // 존재하지 않는 id 일 떄 빈 배열 (undefined)
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO users(id, name, psw) VALUES(?, ?, ?);";
      db.query(sql, [userInfo.id, userInfo.name, userInfo.psw], (err) => {
        if (err) reject(`${err}`);
        else
          resolve({
            success: true,
          });
      });
    });
  }
}

module.exports = UserStorage;
