const express = require("express");

const { validateBody, authenticate } = require("../../middleware");
const schemas = require("../../schemas/usersSchemas");
const userController = require("../../controllers/auth-controllers");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schemas.signUpSchema),
  userController.signUp
);

router.post(
  "/signin",
  validateBody(schemas.signInSchema),
  userController.signIn
);

router.get("/current", authenticate, userController.getCurrent);

router.post("/logout", authenticate, userController.logout);

module.exports = router;
