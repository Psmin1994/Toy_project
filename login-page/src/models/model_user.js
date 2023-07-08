import conn from "../config/db_pool.js";

class UserStorage {
  static async getUserInfo(id) {
    try {
      const sql = "SELECT id, password, nickname FROM users WHERE id = ?";

      await conn.beginTransaction();
      const [user] = await conn.query(sql, [id]);
      await conn.commit();

      return user[0];
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  static async createUser(userInfo) {
    try {
      const sql = "INSERT INTO users(id, password, nickname) VALUES(?, ?, ?);";

      await conn.beginTransaction();
      await conn.query(sql, [userInfo.id, userInfo.password, userInfo.nickName]);
      await conn.commit();

      return { success: true };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}

export default UserStorage;
