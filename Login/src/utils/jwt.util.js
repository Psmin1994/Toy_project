import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export default {
  sign: (user) => {
    return jwt.sign(
      {
        id: user.id,
        nickname: user.nickname,
      },
      accessTokenSecret,
      {
        expiresIn: "1h", // 유효기간
      }
    );
  },

  verify: async (accessToken) => {
    try {
      const decoded = await jwt.verify(accessToken, accessTokenSecret);

      return {
        success: true,
        id: decoded.id,
        nickname: decoded.nickname,
      };
    } catch (err) {
      return { success: false, msg: err };
    }
  },

  refreshSign: (user) => {
    return jwt.sign(
      {
        id: user.id,
        nickname: user.nickname,
      },
      refreshTokenSecret,
      {
        expiresIn: "14d", // 유효기간
      }
    );
  },

  refreshVerify: async (refreshToken) => {
    try {
      const user = await jwt.verify(refreshToken, refreshTokenSecret);

      const data = await redisClient.get(user.id); // redis에서 refreshToken 가져오기

      if (refreshToken === data) {
        return {
          success: true,
          id: user.id,
          nickname: user.nickname,
        };
      } else {
        throw false;
      }
    } catch (err) {
      return { success: false, msg: err };
    }
  },
};
