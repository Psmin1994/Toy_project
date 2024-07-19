import { body, validationResult } from "express-validator";

const validator = async (req, res, next) => {
  var errors = await validationResult(req);

  if (!errors.isEmpty()) {
    const req = {};
    const tmp = errors.array();

    for (var element of tmp) {
      req[element.param] = element.msg;
    }

    return res.json({ errors: req });
  }

  next();
};

export default {
  login: [
    body("id")
      .trim()
      .notEmpty()
      .withMessage("아이디를 입력")
      .bail()
      .isLength({ min: 4, max: 12 })
      .withMessage("아이디는 4글자 이상 12글자 미만")
      .bail()
      .isAlphanumeric()
      .withMessage("아이디는 숫자와 영어 대소문자로 구성"),
    body("password")
      .notEmpty()
      .withMessage("비밀번호를 입력")
      .bail()
      .isLength({ min: 8, max: 15 })
      .withMessage("비밀번호는 8글자 이상 15글자 미만")
      .bail(),
    validator,
  ],
  register: [
    body("id")
      .trim()
      .notEmpty()
      .withMessage("아이디를 입력")
      .bail()
      .isLength({ min: 4, max: 12 })
      .withMessage("아이디는 4글자 이상 12글자 미만")
      .bail()
      .isAlphanumeric()
      .withMessage("아이디는 숫자, 영어 대소문자로 구성"),
    body("password")
      .notEmpty()
      .withMessage("비밀번호를 입력")
      .bail()
      .isLength({ min: 8, max: 15 })
      .withMessage("비밀번호는 8글자 이상 15글자 미만"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("비밀번호를 한번 더 입력하세요")
      .bail()
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("비밀번호가 같지 않습니다."),
    body("nickName")
      .notEmpty()
      .withMessage("닉네임을 입력")
      .bail()
      .isLength({ min: 3, max: 10 })
      .withMessage("닉네임은 3글자 이상 10글자 미만")
      .bail()
      .custom((value) => {
        let checkRegExp = /^[가-힣A-Za-z0-9]+$/;

        return checkRegExp.test(value);
      })
      .withMessage("아이디는 한글, 숫자, 영어 대소문자로 구성"),
    validator,
  ],
};
