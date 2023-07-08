import logger from "../middleware/logger.js";
import passport from "passport";
import jwtUtil from "../utils/jwt.util.js";
import { createPasswordAndSalt } from "../utils/crypto.util.js";
import UserStorage from "../models/model_user.js";
import redisClient from "../config/redis.js";

const output = {
  login: (req, res) => {
    if (req.user) {
      res.render("user/login", {
        is_login: true,
        nickname: req.user.nickname,
      });
    } else {
      res.render("user/login", {
        is_login: false,
      });
    }
  },

  register: (req, res) => {
    res.render("user/register");
  },
};

const process = {
  login: (req, res, next) => {
    passport.authenticate("local-login", (err, user, response) => {
      if (err) return next(err);

      if (!user) return res.json(response);

      return req.logIn(user, { session: false }, async (err) => {
        if (err) return next(err);

        // 클라이언트에게 JWT 생성 후 반환
        const accessToken = jwtUtil.sign(user);
        const refreshToken = jwtUtil.refreshSign(user);

        await redisClient.set(user.id, refreshToken);

        res.cookie("accessToken", accessToken, {
          sameSite: "strict",
          httpOnly: true,
          secure: false,
        });
        res.cookie("refreshToken", refreshToken, {
          sameSite: "strict",
          httpOnly: true,
          secure: false,
        });

        res.status(200).json({ success: true });

        // res.setHeader("Content-Type", "application/json; charset=utf-8");
        // res.setHeader("Authorization", "Bearer " + accessToken);
        // res.setHeader("Refresh", "Bearer " + refreshToken);
        // return res.status(200).json({
        //   status: 200,
        //   token: {
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        //   },
        // });
      });
    })(req, res, next);
  },

  register: async (req, res, next) => {
    try {
      var { id, password } = req.body, // 프론트에서 보낸 폼데이터를 받는다.
        response = {};

      // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
      const user = await UserStorage.getUserInfo(id);

      if (user) {
        response = { success: false, msg: "아이디가 존재합니다." };
      } else {
        // 정상적인 회원가입 절차면 해시화
        req.body.password = await createPasswordAndSalt(password);

        // DB에 해당 회원정보 생성
        response = await UserStorage.createUser(req.body);
      }

      return res.json(response);
    } catch (err) {
      next(err);
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie("accessToken", {
        maxAge: 60 * 1000,
        sameSite: "strict",
        httpOnly: true,
        secure: false,
      });

      res
        .clearCookie("refreshToken", {
          maxAge: 60 * 1000,
          sameSite: "strict",
          httpOnly: true,
          secure: false,
        })
        .redirect("/user/login");
    } catch (err) {
      next(err);
    }
  },
};

export default { output, process };
