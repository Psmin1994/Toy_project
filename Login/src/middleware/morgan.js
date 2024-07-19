import morgan from "morgan";
import logger from "./logger.js";
import dotenv from "dotenv";

dotenv.config(); // 노드 환경 변수 사용

// 로그 작성을 위한 Output stream옵션.
const stream = {
  write: (message) => {
    logger.info(message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ""));
  },
};

const format = () => {
  const result = process.env.NODE_ENV === "production" ? "combined" : "dev";
  return result;
};

// 로깅 스킵 여부
// const skip = (_, res) => {
//   if (process.env.NODE_ENV === "production") {
//     return res.statusCode < 400; // 코드가 400 이상이면 로그 기록
//   }
//   return false;
// };

//? 적용될 moran 미들웨어 형태
const morganMiddleware = morgan(format(), { stream });

export default morganMiddleware;
