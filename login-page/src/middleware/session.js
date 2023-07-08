import session from "express-session";
// import mysqlStore from "express-mysql-session";

// const mysqlStoreSession = mysqlStore(session);

// const options = {
//   host: process.env.DB_HOST, //실제로 연결할 데이터베이스의 위치
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
//   clearExpired: true, // 만료된 세션 자동 삭제 기능
//   checkExpirationInterval: 30 * 60 * 1000, // 30분 ,만료된 세션이 지워지는 빈도 (밀리초)
//   createDatabaseTable: true,
//   expiration: 1 * 60 * 60 * 1000, // 1시간, 유효한 세션의 최대 시간 (밀리초)
//   schema: {
//     tableName: "sessions",
//     columnNames: {
//       session_id: "session_id",
//       expires: "expires",
//       data: "data",
//     },
//   },
// };

// const sessionStore = new mysqlStoreSession(options);

// sessionStore
//   .onReady()
//   .then(() => {
//     // MySQL session store ready for use.
//     console.log("MySQLStore ready");
//   })
//   .catch((err) => {
//     // Something went wrong.
//     console.error(err);
//   });

export default session({
  resave: false, // 세션을 언제나 저장할지
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET, // 암호화하는 데 쓰일 키
  secure: true, // https 환경에서만 session 정보 처리
  // store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 쿠키 유효기간 24시간
  },
});
