// 세션 방식에 사용할 Strategy 정의 파일

import passport from "passport";
import local from "./localStrategy.js";

import UserStorage from "../../models/model_user.js";

export default () => {
  // serializeUser, deserializeUser 부분은 기본적으로 있어야합니다.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserStorage.getUserInfo(id);

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  local();
};
