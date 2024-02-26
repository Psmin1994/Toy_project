import Sequelize from "sequelize";

// 클래스를 불러옵니다.
import User from "./users.js";
import Post from "./posts.js";

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성합니다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어줍니다.
db.sequelize = sequelize;

// 모델 클래스를 넣어줍니다.
db.User = User;
db.Post = Post;

// 모델 정의
User.init(sequelize);
Post.init(sequelize);

// 모델간의 관계 정의
User.associate(db);
Post.associate(db);

export default db;
