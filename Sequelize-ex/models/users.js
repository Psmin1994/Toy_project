import { DataTypes, Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          // unique
          // defaultValue
          // validate
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize, // Sequelize 인스턴스
        timestamps: false, // true : created_at, updated_at 컬럼이 생성되며 데이터의 생성, 수정 시 시간이 자동으로 입력됩니다.
        paranoid: false /* true : deletedAt 컬럼이 생성되며 지운 시각이 기록됩니다. */,
        underscored: true, // true : 카멜케이스 대신 스네이크케이스를 사용
        freezeTableName: true, // 모델이름 변환 X, 지정한 이름 사용
        modelName: "User", // 모델 이름 명시적 지정
        tableName: "users", // 테이블 이름 명시적 설정
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "user_id" });
  }
}

export default User;
