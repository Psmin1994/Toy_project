// 비밀번호 암호화
import crypto from "crypto";
import util from "util";

const randomBytesPromise = util.promisify(crypto.randomBytes);

const createPasswordAndSalt = async (password) => {
  const buf = await randomBytesPromise(64);
  const salt = buf.toString("base64");

  const key = crypto.pbkdf2Sync(password, salt, 104906, 64, "sha512").toString("base64");

  return `${key}$${salt}`;
};

const userPasswordVerify = async (givenPassword, PasswordAndSalt) => {
  const [encrypted, salt] = PasswordAndSalt.split("$");
  const givenEncrypted = crypto.pbkdf2Sync(givenPassword, salt, 104906, 64, "sha512").toString("base64");

  if (givenEncrypted === encrypted) {
    return true;
  } else {
    return false;
  }
};

export { createPasswordAndSalt, userPasswordVerify };
