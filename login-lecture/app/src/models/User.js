"use strict";

const UserStorage = require("./UserStorage2");

class User {
  constructor(body) {
    // 생성자
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);

      if (user) {
        if (user.id === client.id && user.psw === client.psw) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      } else {
        return { success: false, msg: "존재하지 않는 아이디입니다." };
      }
    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;