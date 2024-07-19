import jwtUtil from "../../utils/jwt.util.js";

const authJwt = async (req, res, next) => {
  try {
    if (req.cookies.accessToken && req.cookies.refreshToken) {
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      // access 토큰 검증 함수
      const accessResult = await jwtUtil.verify(accessToken);

      if (accessResult.success === true) {
        // case 1 :accessToken이 유효한 경우

        //req.user에 토큰 검증으로 얻은 정보를 담아 다음 미들웨어로 보냅니다
        req.user = accessResult;
        next();
      } else {
        // case 2 : accessToken은 만료, refreshToken은 유효한 경우

        // refresh 토큰 검증 함수
        const refreshResult = await jwtUtil.refreshVerify(refreshToken);

        // 검증 성공 시
        if (refreshResult.success === true) {
          // access 토큰 생성
          let newAccessToken = jwtUtil.sign(refreshResult);

          // access 토큰 재발급
          res.cookie("accessToken", newAccessToken, {
            maxAge: 60 * 1000,
            sameSite: "strict",
            httpOnly: true,
            secure: false,
          });

          res.redirect("/user/login");
        }
      }
    } else {
      // case 3 : cookie에 토큰이 존재하지 않은 경우

      // 정보 제공 없이 다음 미들웨어로 보냅니다
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default authJwt;
