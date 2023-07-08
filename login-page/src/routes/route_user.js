import express from "express";
import ctrl_user from "../controllers/controller_user.js";
import validator_user from "./route_middleware/validator_user.js";
import authJwt from "./route_middleware/jwt_auth.js";

const Router = express.Router();

Router.get("/login", authJwt, ctrl_user.output.login);
Router.get("/register", ctrl_user.output.register);
Router.get("/logout", ctrl_user.process.logout);

Router.post("/login", validator_user.login, ctrl_user.process.login);
Router.post("/register", validator_user.register, ctrl_user.process.register);

export default Router;
