const express = require("express");

const { validateBody, authenticate, upload } = require("../../middleware");
const schemas = require("../../schemas/usersSchemas");
const userController = require("../../controllers/auth-controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.signUpSchema),
  userController.signUp
);

router.post(
  "/login",
  validateBody(schemas.signInSchema),
  userController.signIn
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userController.updateAvatar
);

router.get("/current", authenticate, userController.getCurrent);

router.post("/logout", authenticate, userController.logout);

module.exports = router;
