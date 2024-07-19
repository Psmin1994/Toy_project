// JWT 토큰 방식에 사용할 Strategy 정의 파일

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userPasswordVerify } from "../../utils/crypto.util.js";
import UserStorage from "../../models/model_user.js";

export default () => {
  passport.use(
    "local-login",
    new LocalStrategy(
      // passport는 기본적으로 username와 password를 req에서 가져와 비교한다.
      // 그 설정을 바꾸기 위해서 new LocalStrategy의 첫번째 인자로
      //  usernameField: '아이디로 원하는 이름',
      //  passwordField: '비밀번호로 원하는 이름'
      {
        usernameField: "id",
        passwordField: "password",
        // session: true, // 세션에 저장 여부
        // passReqToCallback: false,
      },
      // done은 passport.authenticate('전략', 여기가 done이다 )
      async (id, password, done) => {
        try {
          // 입력된 id로 user 데이터에서 정보 가져오기
          const user = await UserStorage.getUserInfo(id);

          if (user) {
            // 비밀번호 검증
            const result = await userPasswordVerify(password, user.password);

            if (result) {
              done(null, user);
            } else {
              done(null, false, { success: false, msg: "비밀번호가 틀렸습니다." });
            }
          } else {
            done(null, false, { success: false, msg: "가입되지 않은 회원입니다." });
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

// const cookieExtractor = (req) => {
//   let token = null;

//   if (req && req.cookies) {
//     token = req.cookies.accessToken;
//   }

//   return token;
// };

//JWT Strategy
// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       // header에 bearer스키마에 담겨온 토큰 해석할 것
//       // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       jwtFromRequest: cookieExtractor,
//       // 암호 해독 키
//       secretOrKey: process.env.ACCESS_TOKEN_SECRET,
//     },
//     async (payload, done) => {
//       try {
//         if (await jwtUtil.verify(refreshToken, payload.id)) {
//           done(null, payload);
//         } else {
//           done(null, false, { success: false, msg: "Token Error!!" });
//         }
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );
